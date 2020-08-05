<script lang="ts">
  export let name: string;
  export let image: string;
  export let badge: number;
  export let active: boolean;
</script>

<style>
  .rnx-avatar {
    display: inline-flex;
    flex-direction: column;
    width: 99px;
  }

  .rnx-avatar_container {
    position: relative;
  }

  .rnx-avatar_image {
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 99px;
    object-fit: cover;
    width: 99px;
  }

  .rnx-avatar_badge {
    align-items: center;
    background-color: #983128;
    border: 3px solid white;
    border-radius: 50%;
    display: flex;
    font-size: 10px;
    font-weight: 600;
    height: 27px;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 27px;
  }

  .rnx-avatar_name {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 6px;
    letter-spacing: 0.16em;
    word-wrap: none;
    overflow: hidden;
    height: 30px;
  }

  .rnx-avatar.active .rnx-avatar_image {
    border-width: 6px;
    height: 100px;
    width: 100px;
  }

  .rnx-avatar.active .rnx-avatar_image img {
    filter: grayscale(0%);
  }

  .rnx-avatar.active .rnx-avatar_image .rnx-avatar_badge {
    font-size: 14px;
    height: 26px;
    width: 26px;
  }

  .rnx-avatar.active .rnx-avatar_name {
    color: white;
    font-size: 14px;
  }
</style>

<div class="rnx-avatar" class:active={active}>
  <div class="rnx-avatar_name">{name}</div>

  <div class="rnx-avatar_container">
    <img src={image} alt="name" class="rnx-avatar_image" />

    {#if badge}<div class="rnx-avatar_badge">{badge}</div>{/if}
  </div>
</div>
