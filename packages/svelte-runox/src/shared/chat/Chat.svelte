<script>
  import { Collection } from "sveltefire";
  import Burble from "./Burble.svelte";
  import { User } from "sveltefire";
  export let roomName;
  let message = "";
</script>

<style>
  .rnx-chat {
    background-color: rgba(0, 0, 0, 0.6);
    float: left;
    height: 100%;
    max-width: 340px;
    width: 35vw;
  }

  .rnx-chat-top {
    align-items: center;
    background-color: #1a1712;
    box-shadow: 0 10px 14px rgba(0, 0, 0, 0.23);
    color: #ffffff;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    height: 64px;
  }

  .rnx-chat-title {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .rnx-chat-content {
    align-items: flex-end;
    flex: 1;
    height: calc(100vh - 109px - 2rem);
    margin: 0.5rem 0;
    overflow-y: auto;
    padding: 1rem 0.5rem;
  }

  .divider-chat {
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffff;
    font-weight: bold;
    font-size: 14px;
  }

  .divider-chat::before,
  .divider-chat::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #2d3748;
  }

  .divider-chat::before {
    margin-right: 0.25em;
  }

  .divider-chat::after {
    margin-left: 0.25em;
  }

  .rnx-chat-actions {
    margin: 0.4rem 0 0.4rem 0.4rem;
  }

  .rnx-button-send-message {
    margin-left: 0;
    margin-right: 0;
    color: #ffffff;
    text-align: center;
    height: 3rem;
    width: 18%;
    background: #111;
    font-size: 1rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>

<template>
  <Collection
    let:data={messages}
    let:first={lastMsg}
    let:last={firstMsg}
    let:ref={messagesRef}
    log
    on:data
    path={'messages'}
    query={(ref) => ref.orderBy('timestamp').limit(10)}
    traceId={'readMessages'}
    on:ref>

    <div slot="fallback">Unable to display comments...</div>
    <div slot="loading">Loading...</div>

    <div class="rnx-chat">

      <!-- Top -->
      <div class="rnx-chat-top">
        <h1 class="rnx-chat-title">
          <img src="assets/images/logo2x.png" alt="RunoX logo" />
        </h1>
      </div>

      <!-- Content -->
      <div class="rnx-chat-content">
        {#each messages as msg}
          <div class="divider-chat">
            {new Date(msg.timestamp).toLocaleDateString()}
          </div>
          <Burble message={msg} />
        {/each}
      </div>

      <!-- Actions -->
      <div class="rnx-chat-actions">
        <User let:user>
          <input
            on:keyup={(e) => {
              if (e.key === 'Enter' && message.length > 0) {
                messagesRef.add({
                  roomName: roomName,
                  text: message,
                  name: user.displayName,
                  timestamp: Date.now(),
                });
              }
            }}
            bind:value={message}
            class="input-write-message"
            placeholder="Escribe tu mensaje"
            type="text" />

          <button
            on:click={() => {
              if (message.length > 0) {
                messagesRef.add({
                  roomName: roomName,
                  text: message,
                  name: user.displayName,
                  timestamp: Date.now(),
                });
                message = '';
              }
            }}
            class="rnx-button-send-message">
            Enviar
          </button>
        </User>
      </div>

    </div>
  </Collection>

</template>
