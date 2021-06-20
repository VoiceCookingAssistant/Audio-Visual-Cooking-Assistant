<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import {
    images,
    currRecipe,
    currRecipeStep,
    modalOpen,
  } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  export let url;
  export let id;

  const dispatch = createEventDispatcher();

  onMount(() => {
    $modalOpen = true;
  });

  onDestroy(() => {
    $modalOpen = false;
  });

  // Make functions available in parent
  export const overlayFunctions = {
    cancelRecipe({ screenId, actionId, voice, slots, sessionId }) {
      if (voice) {
        let text;
        let topic;
        let data;

        if (!slots) {
          console.warn('Command not recognized');
        } else {
          let answer = slots[0].value.value.toLowerCase();
          topic = 'hermes/dialogueManager/endSession';
          setActiveToFalse($images, screenId);
          if (answer.includes('yes')) {
            text =
              'Okay I canceled the recipe and you are now back on the menu.';
            $images.home.active = true;
            currRecipeStep.reset();
            currRecipe.set(null);
          } else if (answer.includes('no')) {
            if ($currRecipeStep > 0) {
              $currRecipe.steps[$currRecipeStep - 1].active = true;
            } else {
              $currRecipe.overview[0].active = true;
            }

            text = 'Okay you can continue cooking';
          }
          $images = $images;

          data = {
            sessionId,
            text,
          };

          dispatch('dialogueManager', {
            topic,
            data,
          });
        }
      } else {
        setActiveToFalse($images, screenId);
        $images.home.active = true;
        currRecipeStep.reset();
        currRecipe.set(null);
        $images = $images;
      }
    },
    closeModal({ screenId }) {
      setActiveToFalse($images, screenId);
      if ($currRecipeStep > 0) {
        $currRecipe.steps[$currRecipeStep - 1].active = true;
      } else {
        $currRecipe.overview[0].active = true;
      }
      $images = $images;
    },
    addOrContinue({ screenId, actionId, voice, slots, sessionId }) {
      setActiveToFalse($images, screenId);
      if (voice) {
        if (!slots) {
          console.warn('slot not recognized');
          return;
        }
        const topic = 'hermes/dialogueManager/endSession';
        let answer = slots[0].value.value;
        let text;
        let activeObj;
        switch (answer) {
          case 'add':
          case 'add more':
            $currRecipe.steps[$currRecipeStep - 1].active = true;
            text = 'Ok you can add more by clicking on the scale';
            break;
          case 'next':
          case 'go on':
          case 'continue':
            currRecipeStep.increment();
            activeObj = $currRecipe.steps[$currRecipeStep - 1];
            activeObj.active = true;
            text = `Ok, you are now on step ${$currRecipeStep}. ${
              activeObj.startTTS ? activeObj.startTTS : ''
            } `;
            break;
          default:
            console.warn('No correct slot');
            break;
        }

        const data = {
          sessionId,
          text,
        };

        dispatch('dialogueManager', {
          topic,
          data,
        });
        $images = $images;
      } else {
        let activeObj = $currRecipe.steps.find((obj) => obj.id === actionId);
        if (activeObj) {
          currRecipeStep.increment();
        } else {
          activeObj = $images.extras.find((obj) => obj.id === actionId);
        }
        activeObj.active = true;
        $images = $images;
      }
    },
    nextModal({ screenId, actionId, voice, slots, sessionId }) {
      setActiveToFalse($images, screenId);
      if (voice) {
        if (!slots) {
          console.warn('slot not recognized');
          return;
        }
        const topic = 'hermes/dialogueManager/endSession';
        let answer = slots[0].value.value;
        let text;
        switch (answer) {
          case 'yes':
            text = "Okay I'm starting the process";
            let activeObj = $images.modals.find((obj) => obj.id === actionId);
            activeObj.active = true;
            break;
          case 'no':
            $currRecipe.steps[$currRecipeStep - 1].active = true;
            text = `Okay you are back on step ${$currRecipeStep}`;
            break;
          default:
            console.warn('No correct slot');
            break;
        }
        const data = {
          sessionId,
          text,
        };

        dispatch('dialogueManager', {
          topic,
          data,
        });
      } else {
        let activeObj = $images.modals.find((obj) => obj.id === actionId);
        activeObj.active = true;
      }
      $images = $images;
    },
    doneModal({ screenId, actionId, voice, slots, sessionId }) {
      setActiveToFalse($images, screenId);
      let audio = new Audio('assets/VoiceCommand_CC.mp3');
      audio.play();
      let activeObj = $currRecipe.steps.find((obj) => obj.id === actionId);
      currRecipeStep.increment();
      activeObj.active = true;
      $images = $images;
    },
  };
</script>

<Image {url} {id} />
