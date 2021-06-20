<script>
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import RecordRTC from 'recordrtc';
  import OuterRootWrapper from 'components/containers/OuterRootWrapper.svelte';
  import Speaker from 'components/atoms/Speaker.svelte';
  import { images, filter } from 'utils/store.js';

  const ENDPOINT = 'http://0.0.0.0:3000';
  let socket;
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    socket = io(ENDPOINT, { reconnection: true });
  } else {
    socket = io({ reconnection: true });
  }
  let activeObject;
  let socketId;
  let talking = false;
  let intentName;
  let sessionId;
  let slots;
  let recordAudio;
  let streaming = false;
  let mediaStream;
  let modal = true;
  let storage;

  onMount(() => {
    storage = window.sessionStorage;
    const data = sessionStorage.getItem('modal');
    if (data) {
      modal = false;
      //Enable streaming on page load
      streamer();
    }
  });

  // Run reactive everytime when store images change
  $: {
    intentName = null;
    setActiveImage({ obj: $images, key: 'active', value: true });
  }

  const setActiveImage = ({ obj, key: keyExpected, value }) => {
    Object.keys(obj).forEach((key) => {
      if (key === keyExpected && obj[key] === value) {
        activeObject = obj;
      } else if (typeof obj[key] === 'object') {
        setActiveImage({ obj: obj[key], key: keyExpected, value });
      }
    });
  };

  socket.on('server_setup', (data) => {
    console.log('Server connected: id:', data);
    socketId = data;
  });

  socket.on('mqtt_setup', (data) => {
    console.log(data);
  });

  socket.on('intent', (data) => {
    processIntent(data);
  });

  socket.on('intentNotRecognized', (_) => {
    const topic = 'hermes/dialogueManager/continueSession';
    const text = `I didn't get this. Please try again.`;
    const intentFilter = $filter;
    const data = {
      sessionId,
      text,
      intentFilter,
    };
    socket.emit('mqttpublish', { topic, data });
  });

  socket.on('voiceAnimation', (data) => {
    talking = data;
  });

  const handleTTS = (event) => {
    socket.emit('tts', event.detail.text);
  };

  const handleStreamer = (event) => {
    let stream = event.detail.streaming;
    if (stream) {
      streamer();
    } else {
      stopStreamer();
    }
  };

  const closeModal = () => {
    modal = false;
    storage.setItem('modal', true);
    streamer();
  };

  socket.on('results', function (data) {
    playOutput(data);
  });

  const playOutput = (arrayBuffer) => {
    let audioContext = new AudioContext();
    let outputSource;
    try {
      if (arrayBuffer.byteLength > 0) {
        audioContext.decodeAudioData(
          arrayBuffer,
          (buffer) => {
            audioContext.resume();
            outputSource = audioContext.createBufferSource();
            outputSource.connect(audioContext.destination);
            outputSource.buffer = buffer;
            outputSource.start(0);
          },
          () => {
            console.log(arguments);
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const processIntent = (data) => {
    try {
      intentName = data.intent.intentName;
      slots = data.slots.length ? data.slots : null;
      sessionId = data.sessionId;
    } catch (err) {
      console.error(err);
    }
  };

  const handleDialogueManager = (event) => {
    const topic = event.detail.topic;
    const data = event.detail.data;
    socket.emit('mqttpublish', { topic, data });
  };

  const streamer = async () => {
    if (!streaming) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streaming = true;
        recordAudio = RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
          bufferSize: 16384,
          sampleRate: 44100, //should be the same then in the server code
          desiredSampRate: 16000,
          recorderType: RecordRTC.StereoAudioRecorder,
          numberOfAudioChannels: 1,

          // get intervals based blobs
          // value in milliseconds
          // as you might not want to make detect calls every seconds
          timeSlice: 0,
          ondataavailable: (blob) => {
            mediaStream = stream;
            // making use of socket.io-stream for bi-directional
            // streaming, create a stream
            let streamSS = ss.createStream();
            // stream directly to server
            // it will be temp. stored locally
            ss(socket).emit('stream', streamSS, {
              name: 'stream.wav',
              socketId,
              size: blob.size,
            });
            // pipe the audio blob to the read stream
            ss.createBlobReadStream(blob).pipe(streamSS);
          },
        });
        recordAudio.startRecording();
      } catch (err) {
        console.error(err);
      }
    } else {
      stopStreamer();
    }
  };

  const stopStreamer = async () => {
    if (recordAudio && mediaStream) {
      await recordAudio.stopRecording();
      streaming = false;
      mediaStream.stop();
    } else {
      console.warn('Streamer not running');
    }
  };
</script>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/socket.io-stream/0.9.1/socket.io-stream.js"></script>
</svelte:head>

<div class="modal-outerwrapper" class:open={modal}>
  <div class="backdrop" />
  <div class="modal-wrapper">
    <div class="header">Welcome to the Audio-Visual-Cooking-Assistant</div>
    <p>
      This prototype visualizes an example of a fully implemented interface
      within a multi-function food processor.
    </p>
    <p>
      The project was a student project of the User-Experience Master at
      Technische Hochschule Ingolstadt in summer term 2021.
    </p>
    <p style="margin-top: 20px">
      <strong
        >Please enable and allow this application to use your microphone to
        properly work.</strong
      >
    </p>

    <button on:click={closeModal} style="margin-top: 50px">Let' start</button>
  </div>
</div>

<div
  class="wrapper dem-display-flex dem-justify-content-center dem-align-items-center"
>
  <div class="dem-display-flex dem-position-relative">
    <div class="speaker-wrapper">
      <Speaker {talking} {streaming} on:streaming={handleStreamer} />
    </div>
    <OuterRootWrapper
      on:TTS={handleTTS}
      on:dialogueManager={handleDialogueManager}
      {...activeObject}
      intent={intentName}
      {sessionId}
      {slots}
    />
  </div>
</div>

<style lang="scss">
  .wrapper {
    padding: 100px;
    height: 100vh;
    width: 100vw;
    background-color: #d2d2d2;
    @media screen and (max-width: 800px) {
      padding: 20px;
    }
  }

  .speaker-wrapper {
    position: absolute;
    z-index: 100;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    top: 2.5%;
  }

  .modal-outerwrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 150;
    display: none;
    &.open {
      display: flex;
    }
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .modal-wrapper {
    background-color: #fff;
    padding: 70px 50px;
    z-index: 200;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .header {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 1.4;
  }

  p {
    line-height: 1.4;
    font-weight: 300;
  }

  button {
    padding: 12px 50px;
    min-width: 160px;
    background-color: #000;
    color: #fff;
    font-size: 12px;
    border: 0;
    border-radius: 50px;
    display: inline-block;
    cursor: pointer;
    width: fit-content;
    font-weight: 300;
  }
</style>
