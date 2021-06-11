<script>
  import { createEventDispatcher } from 'svelte';
  import Image from 'components/molecules/Image.svelte';
  import { images, currRecipe } from 'utils/store.js';
  import { setActiveToFalse } from 'utils/util.js';
  const dispatch = createEventDispatcher();
  export let url;
  export let id;

  const mapRecipes = [
    { id: 'CatalanCream', name: 'catalan cream' },
    { id: 'CurryChicken', name: 'chicken' },
  ];

  // Make functions available in parent
  export const overlayFunctions = {
    selectRecipe({ screenId, actionId, voice, sessionId }) {
      setActiveToFalse($images, screenId);
      let recipeId;
      let rawSlot;
      if (voice) {
        rawSlot = actionId[0].rawValue;
        recipeId = mapRecipes.find((o) => o.name === rawSlot).id;
      } else {
        recipeId = actionId;
      }
      currRecipe.set($images.recipes.find((obj) => obj.id === recipeId));
      $currRecipe.overview[0].active = true;
      $images = $images;

      if (voice) {
        const topic = 'hermes/dialogueManager/continueSession';
        const intentFilter = ['SetPortions'];
        const text = `You are now on the ${rawSlot} recipe. How many portions do you want to cook?`;
        const data = {
          sessionId,
          text,
          intentFilter,
        };

        dispatch('dialogueManager', {
          topic,
          data,
        });
      }
    },
  };
</script>

<Image {url} {id} />
