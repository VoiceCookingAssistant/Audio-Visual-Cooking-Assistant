import dotenv from 'dotenv';
const path = require('path');
dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == 'prod' ? '.env' : '.env.docker'
  ),
});
import cors from 'cors';
import express from 'express';
const app = express();

const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const MQTTHOST = process.env.MQTTHOST || '127.0.0.1';
const RHASSPY_PORT = process.env.RHASSPY_PORT || 12183;

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const ss = require('socket.io-stream');

// MQTT
const mqtt = require('mqtt');
const mqtt_options = {
  host: MQTTHOST,
  port: RHASSPY_PORT,
  protocol: 'mqtt',
};

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const mqtt_client = mqtt.connect(mqtt_options);

// Subscribe 'intent recognition'
mqtt_client.subscribe('hermes/intent/#', (err) => {
  if (!err) {
    console.log('subscribe success hermes intent');
  } else {
    console.log(err);
  }
});

mqtt_client.subscribe('hermes/dialogueManager/intentNotRecognized', (err) => {
  if (!err) {
    console.log('Subscribe to MQTT intentNotRecognized');
  } else {
    console.log(err);
  }
});

mqtt_client.subscribe('hermes/dialogueManager/sessionStarted', (err) => {
  if (!err) {
    console.log('Subscribe to session started');
  } else {
    console.log(err);
  }
});

// Subscribe 'get audio buffer from tts'
mqtt_client.subscribe('hermes/audioServer/default/playBytes/#', (err) => {
  if (!err) {
    console.log(`subscribe to MQTT Audio Buffer Get`);
  } else {
    console.log(err);
  }
});

mqtt_client.subscribe('hermes/dialogueManager/sessionEnded', (err) => {
  if (!err) {
    console.log(`subscribe to MQTT session ended`);
  } else {
    console.log(err);
  }
});

// When subscribed topic is published  - you get message here
mqtt_client.on('message', (topic, message) => {
  if (topic.indexOf('hermes/intent/') === 0) {
    let intentJSON = JSON.parse(message);
    io.emit('voiceAnimation', false);
    io.emit('intent', intentJSON);
  } else if (topic.indexOf('hermes/audioServer/default/playBytes/') == 0) {
    // get audio buffer from tts
    io.emit('results', message);
    fs.writeFile('result.wav', message, (err) => {
      if (!err) {
        console.log('audio write success');
      }
    });
  } else if (topic.indexOf('hermes/dialogueManager/sessionStarted') === 0) {
    io.emit('voiceAnimation', true);
  } else if (topic.indexOf('hermes/dialogueManager/intentNotRecognized') == 0) {
    io.emit('intentNotRecognized');
  } else if (topic.indexOf('hermes/dialogueManager/sessionEnded') == 0) {
    io.emit('voiceAnimation', false);
  }
});

io.on('connection', (client) => {
  console.log('client connected');
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
  client.emit('server_setup', `${client.id}`);

  client.on('tts', (data) => {
    sendTTS(data);
  });

  client.on('mqttpublish', (data) => {
    mqttPublish(data);
  });

  // when the client sends 'stream' events
  ss(client).on('stream', async (stream, data) => {
    // get the name of the stream
    const filename = path.basename(data.name);

    // pipe the filename to the stream
    stream.pipe(fs.createWriteStream(filename));
    stream.on('data', (chunk) => {
      mqtt_client.publish('hermes/audioServer/default/audioFrame', chunk);
    });
    stream.on('end', () => {});

    stream.on('err', (err) => {
      console.log(err);
    });
  });
});

const mqttPublish = (msg) => {
  const topic = msg.topic;
  const data = JSON.stringify(msg.data);
  mqtt_client.publish(topic, data);
};

// send text to tts
const sendTTS = (msg) => {
  const host_path =
    'http://' + process.env.MQTTHOST + ':12101/api/text-to-speech';

  axios
    .post(host_path, msg)
    .then((res) => {
      console.log(`Send TTS`);
    })
    .catch((error) => {
      console.error(error);
    });
};

server.listen(PORT, HOST, () =>
  console.log(`App listening on host ${HOST} and port ${PORT}!`)
);
