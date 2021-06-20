<script>
  import { createEventDispatcher } from 'svelte';
  import OverlayWapper from 'components/containers/OverlayWrapper.svelte';
  export let id;
  export let cp;
  export let clickableOverlay;
  export let url;
  export let slots;
  export let startSession;
  export let TTSrecommendations;
  export let sessionId;
  export let intent;

  const dispatch = createEventDispatcher();

  let overlayFunctions;

  //Handle Intent and call child component functions
  $: if (intent) {
    try {
      switch (intent) {
        case 'SelectRecipe':
          overlayFunctions.selectRecipe({
            screenId: id,
            sessionId,
            actionId: slots,
            voice: true,
          });
          break;
        case 'StartRecipe':
          overlayFunctions.startRecipe({
            screenId: id,
            actionId: clickableOverlay.select.actionId,
            voice: true,
          });
          break;
        case 'NextStep':
          overlayFunctions.nextStep({
            screenId: id,
            sessionId,
            actionId: clickableOverlay.next.actionId,
            voice: true,
          });
          break;
        case 'PreviousStep':
          overlayFunctions.prevStep({
            screenId: id,
            actionId: clickableOverlay.prev.actionId,
            voice: true,
          });
          break;
        case 'CancelRecipe':
          overlayFunctions.cancelRecipe({
            screenId: id,
            sessionId,
            actionId: clickableOverlay.cancel.actionId,
            slots,
            voice: true,
          });
          break;
        case 'SetPortions':
          overlayFunctions.addPortion({
            screenId: id,
            slots,
            sessionId,
            voice: true,
          });
          break;
        case 'ReactionToDisplay':
          overlayFunctions.addOrContinue({
            screenId: id,
            sessionId,
            slots,
            voice: true,
          });
          break;
        case 'ReactMixingDisplay':
          overlayFunctions.nextModal({
            screenId: id,
            sessionId,
            actionId: clickableOverlay.continue.actionId,
            slots,
            voice: true,
          });
          break;
        case 'GetDuration':
          overlayFunctions.getDuration({
            screenId: id,
            sessionId,
            slots,
            voice: true,
          });
          break;
        case 'RepeatExplanation':
          overlayFunctions.repeatExplanation({
            screenId: id,
            sessionId,
            slots,
            voice: true,
          });
          break;
        case 'SkipStep':
          overlayFunctions.nextStep({
            screenId: id,
            sessionId,
            skip: true,
            actionId: clickableOverlay.next.actionId,
            voice: true,
          });
          break;
        default:
          handleTTSRecommendations();
          break;
      }
    } catch (err) {
      console.error(err);
      handleTTSRecommendations();
    }
  }

  const handleTTSRecommendations = () => {
    dispatch('TTS', {
      text: `I'm sorry, I can't process this command on this screen. ${
        TTSrecommendations
          ? 'On this screen, you can for example ask me to' + TTSrecommendations
          : ''
      }`,
    });
  };
  //call function in child compoenent
  const handleClickOnScreen = (event) => {
    let { screenId, func, actionId } = event.detail;
    switch (func) {
      case 'selectRecipe':
        overlayFunctions.selectRecipe({ screenId, actionId, voice: false });
        break;
      case 'startRecipeOverview':
        overlayFunctions.startRecipe({ screenId, actionId, voice: false });
        break;
      case 'cancelRecipe':
        overlayFunctions.cancelRecipe({ screenId, actionId, voice: false });
        break;
      case 'add':
        overlayFunctions.addPortion({ screenId, actionId, voice: false });
        break;
      case 'decr':
        overlayFunctions.removePortion({ screenId, actionId, voice: false });
        break;
      case 'nextStep':
      case 'selectNextStep':
        overlayFunctions.nextStep({
          screenId,
          sessionId,
          actionId,
          voice: false,
        });
        break;
      case 'prevStep':
        overlayFunctions.prevStep({ screenId, actionId, voice: false });
        break;
      case 'scale':
        if (actionId !== '') {
          overlayFunctions.scale({ screenId, actionId, voice: false });
        }
        break;
      case 'closeModal':
        overlayFunctions.closeModal({ screenId, actionId, voice: false });
        break;
      case 'addOrContinue':
        overlayFunctions.addOrContinue({ screenId, actionId, voice: false });
        break;
      case 'nextModal':
        overlayFunctions.nextModal({ screenId, actionId, voice: false });
        break;
      case 'doneModal':
        overlayFunctions.doneModal({ screenId, actionId, voice: false });
        break;
      default:
        console.warn('No function');
        break;
    }
  };
</script>

<div class="imageWrapper">
  <OverlayWapper
    {clickableOverlay}
    {id}
    on:handleClickOnScreen={(e) => handleClickOnScreen(e)}
  />
  <svelte:component
    this={cp}
    on:TTS
    on:dialogueManager
    bind:overlayFunctions
    {url}
    {id}
    {intent}
  />
</div>

<style lang="scss">
  .imageWrapper {
    display: flex;
    position: relative;
    max-width: 800px;
    width: 100%;
  }
</style>
