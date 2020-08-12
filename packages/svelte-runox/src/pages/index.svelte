<script lang="ts">
  import Chat from "../shared/chat/Chat.svelte";
  import Button from "../shared/Button.svelte";
  import Card from "../shared/Card.svelte";
  import PlayerList from "../shared/PlayerList.svelte";
  import { store } from "../store";
  import { AppStatus } from "../store/types";
  import { goto } from '@sveltech/routify';
  import {
    createRoom,
    handleFixRoom,
    handleRoomName,
    login,
    logout,
    startGame,
  } from "./handlers";

  let showChat: boolean = true;
  let inputRoom: any;

  // https://svelte.dev/tutorial/updating-arrays-and-objects
  let players = [];

  // [Declaraciones reactivas]
  $: isAuthenticated = $store.status === AppStatus.AUTHENTICATED;
  $: if (isAuthenticated && !$store.hasRoomNameFixed && inputRoom) {
    inputRoom.focus();
  }
  $: if (isAuthenticated && players.length === 0) {
    players = [...players, { name: $store.user.name, pic: $store.user.pic }];
  }
  $: if (players.length > 0 && $store.user === null) {
    players = [];
  }
</script>

<style>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .input-room {
    font-weight: 600;
    margin: 1rem auto;
    text-align: center;
    text-transform: uppercase;
    width: 50%;
  }
  .logout {
    float: right;
    height: 100%;
    margin: 0.2rem 0.5rem 0.2rem;
    max-width: 80px;
    width: 80px;
  }
  .logout button {
    margin-bottom: 0.4rem;
    font-size: medium;
    color: #f2f2f2;
    background-color: #181818;
    border: 1px solid #181818;
    border-radius: 4px;
    padding: 0.2rem;
  }
  /* .waiting {
    margin-top: 2rem;
  } */
</style>

<template>
  <!-- Todo: Login -->

  {#if isAuthenticated}
    {#if showChat === true && $store.hasRoomNameFixed}
      <Chat roomName={$store.roomName} />
    {/if}

    <div class="logout">
      {#if $store.hasRoomNameFixed}
        <button
          on:click={() => {
            showChat = !showChat;
          }}>
          chat
        </button>
      {/if}
      <button on:click={logout}>logout</button>
    </div>
  {/if}

  <div class="login-page">
    <Card>
      <!-- Header -->
      <div slot="header" class="flex justify-center">
        <img src="assets/images/logo.png" alt="RunoxSvelte" />
      </div>

      <!-- Content -->
      <div slot="content" class="text-center">
        <div class="opacity-75 text-sm">SALA</div>

        {#if $store.roomName?.length > 0}
          <h1
            on:dblclick={() => store.setHasRoomNameFixed(false)}
            class="text-2xl font-semibold uppercase">
            {$store.roomName}
          </h1>
        {/if}
        {#if !isAuthenticated}
          <div on:click={login} class="mt-6">
            <Button>LOGIN & CREATE ROOM!</Button>
          </div>
        {:else if !$store.hasRoomNameFixed}
          <input
            bind:this={inputRoom}
            value={$store.roomName}
            on:keyup={(e) => handleFixRoom(e.key, $store.roomName)}
            on:input={(e) => handleRoomName(e.target.value)}
            class="input-room"
            placeholder="Room name here..."
            type="text" />

          <div on:click={() => createRoom($store.roomName)} class="mt-6">
            <Button>CREATE ROOM!</Button>
          </div>
        {:else}
          <div on:click={startGame} class="mt-6">
            <Button>START THE GAME!</Button>
          </div>

          <!-- <div class="waiting px-4 text-2xl text-red-700 font-semibold">
            WAITING FOR THE OWNER TO START THE GAME
          </div> -->
        {/if}

      </div>

      <!-- Footer -->
      <div slot="footer" class="footer">
        <div class="opacity-75 text-sm pb-2 mb-3 border-b border-gray-800">
          PLAYERS
        </div>

        <PlayerList {players} />

      </div>
    </Card>
  </div>

</template>
