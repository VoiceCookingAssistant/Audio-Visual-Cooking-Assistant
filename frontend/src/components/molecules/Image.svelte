<script>
  export let url;
  export let id;
</script>

<img class="image" src={url} alt={id} />

<style lang="scss">
  .image {
    width: 100%;
    object-fit: contain;
  }
</style>
