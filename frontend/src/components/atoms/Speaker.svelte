<script>
  import { createEventDispatcher } from 'svelte';
  export let talking = false;
  export let streaming;
  import { modalOpen } from 'utils/store.js';

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    streaming = !streaming;
    dispatch('streaming', { streaming });
  };
</script>

<div
  class:talking
  class:remove={$modalOpen}
  class:streaming={!streaming}
  class="button"
  on:click={handleClick}
>
  <div class="bar" />
  <div class="bar" />
  <div class="bar" />
  <div class="bar" />
  <div class="bar" />
  <div class="bar" />
  <div class="bar" />
</div>

<style lang="scss">
  .button {
    height: 2vw;
    min-height: 35px;
    min-width: 35px;
    max-height: 40px;
    max-width: 40px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 2vw;
    pointer-events: all;
    background-color: #718dbc;
    border-radius: 50%;
    &.talking {
      pointer-events: none;
      & > .bar {
        animation: sound 0ms -600ms linear infinite alternate;
      }
    }
    &.streaming {
      background-color: #d4deed;
    }
    &.remove {
      opacity: 0;
      pointer-events: none;
    }
  }

  .bar {
    background: #fff;
    bottom: 1px;
    height: 3px;
    width: 1px;
    margin: 0px 1px;
    border-radius: 2px;
  }

  .bar:nth-child(1) {
    height: 3px;
    animation-duration: 474ms !important;
  }
  .bar:nth-child(2) {
    height: 8px;
    animation-duration: 433ms !important;
  }
  .bar:nth-child(3) {
    height: 13px;
    animation-duration: 407ms !important;
  }
  .bar:nth-child(4) {
    height: 18px;
    animation-duration: 458ms !important;
  }
  .bar:nth-child(5) {
    height: 13px;
    animation-duration: 400ms !important;
  }
  .bar:nth-child(6) {
    height: 8px;
    animation-duration: 427ms !important;
  }
  .bar:nth-child(7) {
    height: 3px;
    animation-duration: 441ms !important;
  }

  @keyframes sound {
    0% {
      opacity: 0.35;
      height: 3px;
    }
    100% {
      opacity: 1;
      height: 18px;
    }
  }
</style>
