<script lang="ts">
  export let players: any[] = [];

  import Avatar from './Avatar.svelte';
</script>

{#if players.length > 0}
  {#each players as { name, pic, badge, active }}
    <Avatar name={name} image={pic} badge={badge} active={active} />
  {/each}
{:else}
  <div class="text-gray-400 uppercase text-sm tracking-wider">
    Aún no se han añadido jugadores a la sala.
  </div>
{/if}
