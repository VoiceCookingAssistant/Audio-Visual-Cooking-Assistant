<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import { images, currRecipe, currRecipeStep, filter } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  export let url;
  export let id;

  const dispatch = createEventDispatcher();
  // Make functions available in parent
  export const overlayFunctions = {
    nextStep({ screenId, actionId, voice, sessionId, skip }) {
      setActiveToFalse($images, screenId);
      let step = false;
      let activeObj = $currRecipe.steps.find((obj) => obj.id === actionId);
      if (!activeObj) {
        activeObj = $images.modals.find((obj) => obj.id === actionId);
      } else {
        step = true;
        currRecipeStep.increment();
      }
      activeObj.active = true;
      $images = $images;
      if (voice) {
        if (step) {
          let text = activeObj.startTTS ? activeObj.startTTS : '';
          if (skip) {
            text =
              'Ok, I skipped this step, now you have to ' + activeObj.startTTS;
          }
          dispatch('TTS', { text });
        } else {
          if (activeObj.startSession) {
            const topic = 'hermes/dialogueManager/continueSession';
            const intentFilter = activeObj.intentFilter;
            const text = activeObj.startTTS;
            $filter = intentFilter;
            const sendIntentNotRecognized = true;
            const data = {
              sessionId,
              text,
              intentFilter,
              sendIntentNotRecognized,
            };

            dispatch('dialogueManager', {
              topic,
              data,
            });
          }
        }
      }
    },
    prevStep({ screenId, actionId, voice }) {
      let idx = $currRecipeStep;
      setActiveToFalse($images, screenId);
      if (idx - 2 >= 0) {
        $currRecipe.steps[idx - 2].active = true;
        currRecipeStep.decrement();
      } else {
        $currRecipe.overview[0].active = true;
        currRecipeStep.reset();
      }
      $images = $images;

      if (voice) {
        dispatch('TTS', {
          text: `You are now on step ${$currRecipeStep + 1} of the recipe ${
            $currRecipe.name
          }`,
        });
      }
    },
    scale({ screenId, actionId, voice }) {
      setActiveToFalse($images, screenId);
      let audio = new Audio('assets/VoiceCommand_CC.mp3');
      audio.play();
      let activeObj = $images.extras.find((obj) => obj.id === actionId);
      activeObj.active = true;
      $images = $images;
    },
    repeatExplanation({ screenId }) {
      let activeObj = $currRecipe.steps.find((obj) => obj.id === screenId);
      dispatch('TTS', {
        text: `${activeObj.startTTS}`,
      });
    },
    cancelRecipe({ screenId, actionId, voice, slots, sessionId }) {
      setActiveToFalse($images, screenId);
      let activeModal = $images.modals.find((obj) => obj.id === actionId);
      activeModal.active = true;
      if (voice) {
        let intentFilter;
        let text;
        let topic;
        let data;

        if (!slots) {
          topic = 'hermes/dialogueManager/continueSession';
          text = 'Do you really want to cancel the recipe?';
          intentFilter = activeModal.intentFilter;
          $filter = intentFilter;
          const sendIntentNotRecognized = true;
          data = {
            sessionId,
            text,
            intentFilter,
            sendIntentNotRecognized,
          };

          dispatch('dialogueManager', {
            topic,
            data,
          });
        } else {
          console.error('Error in canceling the recipe');
        }
      }
      $images = $images;
    },
  };
</script>

<Image {url} {id} />
