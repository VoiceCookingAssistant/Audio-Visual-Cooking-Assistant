<script>
  import { createEventDispatcher } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import { images, currRecipe, currRecipeStep } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  export let url;
  export let id;

  const dispatch = createEventDispatcher();

  const mapPortions = [
    { id: '2P', name: 'two' },
    { id: '3P', name: 'three' },
    { id: '4P', name: 'four' },
    { id: '5P', name: 'five' },
  ];

  // Make functions available in parent
  export const overlayFunctions = {
    startRecipe({ screenId, actionId, voice }) {
      setActiveToFalse($images, screenId);
      let activeObject = $currRecipe.steps.find((obj) => obj.id === actionId);
      activeObject.active = true;
      currRecipeStep.increment();
      $images = $images;
      if (voice) {
        dispatch('TTS', {
          text: `You are now on step ${$currRecipeStep}. ${
            activeObject.startTTS ? activeObject.startTTS : ''
          } `,
        });
      }
    },
    addPortion({ screenId, actionId, voice, slots, sessionId }) {
      if (voice) {
        const topic = 'hermes/dialogueManager/endSession';
        setActiveToFalse($images, screenId);
        let portionSlot = slots.find((obj) => obj.entity === 'portions');
        if (portionSlot) {
          let numberStr = portionSlot.rawValue;
          let addOn = mapPortions.find((obj) => obj.name == numberStr);
          let portionScreen = $currRecipe.overview.find(
            (obj) => obj.id === `RecipeOverview_${addOn.id}`
          );
          portionScreen.active = true;
          const text = `Ok you are cooking now ${numberStr} portions`;
          let data = {
            sessionId,
            text,
          };

          dispatch('dialogueManager', {
            topic,
            data,
          });

          $images = $images;
        } else {
          dispatch('TTS', {
            text: `I could not recognise the persons.`,
          });
        }
      } else {
        setActiveToFalse($images, screenId);
        let portionScreen = $currRecipe.overview.find(
          (obj) => obj.id === actionId
        );
        portionScreen.active = true;
        $images = $images;
      }
    },
    removePortion({ screenId, actionId, voice }) {
      if (voice) {
        dispatch('TTS', {
          text: `You are now on step ${$currRecipeStep} of ${$currRecipe.name}`,
        });
      } else {
        setActiveToFalse($images, screenId);
        let portionScreen = $currRecipe.overview.find(
          (obj) => obj.id === actionId
        );
        portionScreen.active = true;
        $images = $images;
      }
    },
    getDuration({ screenId, actionId, voice, slots, sessionId }) {
      dispatch('TTS', {
        text: `The cooking time is ${$currRecipe.overview[0].TTSDuration}`,
      });
    },
    cancelRecipe({ screenId, actionId, voice, slots, sessionId }) {
      if (voice) {
        let intentFilter;
        let text;
        let topic;
        let data;

        if (!slots) {
          setActiveToFalse($images, screenId);
          let activeModal = $images.modals.find((obj) => obj.id === actionId);
          activeModal.active = true;
          $images = $images;
          topic = 'hermes/dialogueManager/continueSession';
          text = 'Do you really want to cancel the recipe?';
          intentFilter = activeModal.intentFilter;
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
          console.log('Error');
        }
      } else {
        setActiveToFalse($images, screenId);
        let activeModal = $images.modals.find((obj) => obj.id === actionId);
        activeModal.active = true;
        $images = $images;
      }
    },
  };
</script>

<Image {url} {id} />
