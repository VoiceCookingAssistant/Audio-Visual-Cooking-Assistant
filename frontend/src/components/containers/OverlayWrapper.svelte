<script>
  import { createEventDispatcher } from 'svelte';
  export let clickableOverlay;
  export let id;

  let tranistionTime = 0;
  let progressbar = false;
  $: if (clickableOverlay.transitionTime) {
    tranistionTime = clickableOverlay.transitionTime;
    setTimeout(() => {
      progressbar = true;
    }, 100);

    setTimeout(() => {
      progressbar = false;
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.continue.actionId,
        func: 'doneModal',
      });
    }, tranistionTime * 1000);
  }

  const dispatch = createEventDispatcher();
  const handleClickOnScreen = ({ screenId, actionId, func }) => {
    dispatch('handleClickOnScreen', { screenId, actionId, func });
  };
</script>

{#if clickableOverlay && clickableOverlay.overlay === 'recipesWrapper'}
  <div
    class="select-recipe-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.select.actionId,
        func: 'selectRecipe',
      })}
  />
{:else if clickableOverlay && clickableOverlay.overlay === 'clickOverlay2'}
  <div
    class="select-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.select.actionId,
        func: 'selectNextStep',
      })}
  />
  <div
    class="scale-btn"
    class:pointer={clickableOverlay.scale &&
      clickableOverlay.scale.actionId !== ''}
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.scale.actionId,
        func: 'scale',
      })}
  />
  <div
    class="cancel-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.cancel.actionId,
        func: 'cancelRecipe',
      })}
  />
  <div
    class="next-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.next.actionId,
        func: 'nextStep',
      })}
  />
  <div
    class="prev-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.prev.actionId,
        func: 'prevStep',
      })}
  />
{:else if clickableOverlay && clickableOverlay.overlay === 'clickOverlay3'}
  <div
    class="select-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.select.actionId,
        func: 'startRecipeOverview',
      })}
  />
  <div
    class="add-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.add.actionId,
        func: 'add',
      })}
  />
  <div
    class="decr-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.decr.actionId,
        func: 'decr',
      })}
  />
  <div
    class="next-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.next.actionId,
        func: 'startRecipeOverview',
      })}
  />
  <div
    class="prev-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.cancel.actionId,
        func: 'cancelRecipe',
      })}
  />
  <div
    class="cancel-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.cancel.actionId,
        func: 'cancelRecipe',
      })}
  />
{:else if clickableOverlay && clickableOverlay.overlay === 'modalOverlay1'}
  <div
    class="modal-cancel-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.cancel.actionId,
        func: 'cancelRecipe',
      })}
  />
  <div
    class="modal-back-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        func: 'closeModal',
      })}
  />
{:else if clickableOverlay && clickableOverlay.overlay === 'modalOverlay2'}
  <div
    class="modal-continue-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.continue.actionId,
        func: 'addOrContinue',
      })}
  />
  <div
    class="modal-add-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.add.actionId,
        func: 'addOrContinue',
      })}
  />
{:else if clickableOverlay && clickableOverlay.overlay === 'modalOverlay3'}
  <div
    class="modal-back-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        func: 'closeModal',
      })}
  />
  <div
    class="modal-letsgo-btn"
    on:click={() =>
      handleClickOnScreen({
        screenId: id,
        actionId: clickableOverlay.continue.actionId,
        func: 'nextModal',
      })}
  />
{:else if clickableOverlay && clickableOverlay.overlay === 'modalOverlay4'}
  <div
    class="progressbar"
    class:transition={progressbar}
    style="--transition: {tranistionTime}s"
  />
{/if}

<style lang="scss">
  .select-recipe-btn {
    position: absolute;
    bottom: 28%;
    z-index: 100;
    height: 35%;
    left: 50%;
    transform: translateX(-43%);
    width: 31%;
    border-radius: 6%;
    cursor: pointer;
  }

  .select-btn {
    position: absolute;
    bottom: 2%;
    z-index: 100;
    height: 9%;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    border-radius: 13%;
    cursor: pointer;
  }

  .add-btn {
    position: absolute;
    bottom: 51%;
    z-index: 100;
    height: 9%;
    left: 21%;
    width: 5%;
    border-radius: 67%;
    cursor: pointer;
  }

  .decr-btn {
    position: absolute;
    bottom: 51%;
    z-index: 100;
    height: 9%;
    left: 4%;
    width: 5%;
    border-radius: 67%;
    cursor: pointer;
  }

  .next-btn {
    position: absolute;
    bottom: 2%;
    z-index: 100;
    height: 9%;
    left: 92%;
    width: 5%;
    border-radius: 67%;
    cursor: pointer;
  }

  .prev-btn {
    position: absolute;
    bottom: 2%;
    z-index: 100;
    height: 9%;
    left: 4%;
    width: 5%;
    border-radius: 67%;
    cursor: pointer;
  }

  .cancel-btn {
    position: absolute;
    bottom: 89%;
    z-index: 100;
    height: 9%;
    left: 4%;
    width: 5%;
    border-radius: 67%;
    cursor: pointer;
  }

  .modal-cancel-btn {
    position: absolute;
    bottom: 21%;
    z-index: 100;
    height: 9%;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    border-radius: 13%;
    cursor: pointer;
  }

  .modal-back-btn {
    position: absolute;
    bottom: 74%;
    z-index: 100;
    height: 9%;
    left: 75%;
    width: 5%;
    border-radius: 67%;
    cursor: pointer;
  }

  .scale-btn {
    position: absolute;
    bottom: 12%;
    z-index: 100;
    height: 30%;
    left: 5%;
    width: 47%;
    pointer-events: none;
    &.pointer {
      pointer-events: all;
      cursor: pointer;
    }
  }

  .modal-add-btn {
    position: absolute;
    bottom: 21%;
    z-index: 100;
    height: 9%;
    left: 24%;
    width: 20%;
    border-radius: 13%;
    cursor: pointer;
  }
  .modal-continue-btn {
    position: absolute;
    bottom: 21%;
    z-index: 100;
    height: 9%;
    left: 50%;
    width: 20%;
    border-radius: 13%;
    cursor: pointer;
  }
  .modal-letsgo-btn {
    position: absolute;
    bottom: 21%;
    z-index: 100;
    height: 9%;
    left: 50%;
    width: 20%;
    transform: translateX(-50%);
    border-radius: 13%;
    cursor: pointer;
  }

  .progressbar {
    position: absolute;
    bottom: 39%;
    z-index: 100;
    height: 3%;
    left: 30.5%;
    width: 3%;
    border-radius: 20px;
    background-color: black;
    transition: width var(--transition) linear;
    &.transition {
      width: 41.5%;
    }
  }
</style>
