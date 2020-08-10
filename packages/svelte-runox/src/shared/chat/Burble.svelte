<script>
  export let message;
</script>

<style>
  .chat-bubble {
    background-color: #181818;
    color: #ffff;
    border-radius: 3px;
    margin: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }

  .rnx-chat-bubble-timestamp {
    font-size: 0.6rem;
    margin-bottom: 0.5rem;
    text-align: end;
  }

  .rnx-chat-bubble-username {
    font-size: 0.7rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
</style>

{#if message !== undefined}
  <div class="chat-bubble">
    <div class="rnx-chat-bubble-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
    <div class="rnx-chat-bubble-username">{message.name}</div>
    <div class="rnx-chat-bubble-message">{message.text}</div>
  </div>
{/if}
