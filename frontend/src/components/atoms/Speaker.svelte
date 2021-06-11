<script>
  export let streaming;
</script>

<div class:active={streaming ? true : false} class="button" on:click={streamer}>
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
    height: 100px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 100px;
    background-color: red;
    border-radius: 50%;
    &.active > .bar {
      animation: sound 0ms -600ms linear infinite alternate;
    }
  }

  .bar {
    background: blue;
    bottom: 1px;
    height: 3px;
    width: 5px;
    margin: 0px 2px;
    border-radius: 5px;
  }

  .bar:nth-child(1) {
    height: 10px;
    animation-duration: 474ms !important;
  }
  .bar:nth-child(2) {
    height: 30px;
    animation-duration: 433ms !important;
  }
  .bar:nth-child(3) {
    height: 50px;
    animation-duration: 407ms !important;
  }
  .bar:nth-child(4) {
    height: 70px;
    animation-duration: 458ms !important;
  }
  .bar:nth-child(5) {
    height: 50px;
    animation-duration: 400ms !important;
  }
  .bar:nth-child(6) {
    height: 30px;
    animation-duration: 427ms !important;
  }
  .bar:nth-child(7) {
    height: 10px;
    animation-duration: 441ms !important;
  }

  @keyframes sound {
    0% {
      opacity: 0.35;
      height: 3px;
    }
    100% {
      opacity: 1;
      height: 50px;
    }
  }
</style>
