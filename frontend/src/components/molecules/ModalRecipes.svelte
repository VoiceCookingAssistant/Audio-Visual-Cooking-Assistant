<script>
  import { createEventDispatcher } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import { images, currRecipe, currRecipeStep } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  export let url;
  export let id;

  const dispatch = createEventDispatcher();

  // Make functions available in parent
  export const overlayFunctions = {
    cancelRecipe({ screenId, actionId, voice, slots, sessionId }) {
      if (voice) {
        let text;
        let topic;
        let data;

        if (!slots) {
          console.log('NOT RECOGNISED');
        } else {
          let answer = slots[0].value.value;
          topic = 'hermes/dialogueManager/endSession';
          setActiveToFalse($images, screenId);
          if (answer == 'yes') {
            text =
              'Okay I canceled the recipe and you are now back on the menu.';
            $images.home.active = true;
            currRecipeStep.reset();
            currRecipe.set(null);
          } else {
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
        if (actionId) {
          $images.home.active = true;
          currRecipeStep.reset();
          currRecipe.set(null);
        } else {
          if ($currRecipeStep > 0) {
            $currRecipe.steps[$currRecipeStep - 1].active = true;
          } else {
            $currRecipe.overview[0].active = true;
          }
        }
        $images = $images;
      }
    },
    addOrContinue({ screenId, actionId, voice, slots, sessionId }) {
      setActiveToFalse($images, screenId);
      if (voice) {
        if (!slots) {
          console.log('NOT RECOGNIZED');
          return;
        }
        const topic = 'hermes/dialogueManager/endSession';
        let answer = slots[0].value.value;
        let text;
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
            let activeObj = $currRecipe.steps[$currRecipeStep - 1];
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
        let idx = $currRecipe.steps.findIndex((obj) => obj.id === actionId);
        idx + 1 !== $currRecipeStep ? currRecipeStep.increment() : null;
        activeObj.active = true;
        $images = $images;
      }
    },
  };
</script>

<Image {url} {id} />
