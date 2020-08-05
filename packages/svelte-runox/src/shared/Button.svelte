<style>
  .rnx-button {
    background-color: #983128;
    border: 5px solid rgba(0, 0, 0, 0.42);
    border-radius: 26px;
    box-sizing: border-box;
    color: #ffcfcb;
    font-size: 22px;
    font-weight: 700;
    padding: 0.98rem 3rem;
    transition: 0.12s ease-in-out all;
    outline: none;
  }

  .rnx-button:hover {
    transform: scale(1.082);
  }

  .rnx-button:active {
    transform: scale(0.94);
  }
</style>

<button class='rnx-button'>
  <slot></slot>
</button>
