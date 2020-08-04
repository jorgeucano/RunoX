<style>
  .rnx-card {
    background: rgba(24, 24, 24, 0.82);
    border-radius: 8px;
    color: #f2f2f2;
    min-height: 400px;
    overflow: hidden;
    width: 800px;
  }

  .rnx-card_header {
    padding: 2.5rem;
    text-align: center;
  }

  .rnx-card_footer {
    padding: 2.5rem;
    text-align: center;
  }

  .rnx-card_header:empty,
  .rnx-card_footer:empty {
    display: none;
  }

  .rnx-card_content {
    background-color: #181818;
    padding: 2.5rem;
  }
</style>

<div class="rnx-card">

  <!-- Header -->
  <div class="rnx-card_header">
    <slot name="header">
      <div class="missing">Unknown header</div>
    </slot>
  </div>

  <!-- Content -->
  <div class="rnx-card_content">
    <slot name="content">
      <div class="missing">Unknown content</div>
    </slot>
  </div>

  <!-- Footer -->
  <div class="rnx-card_footer">
    <slot name="footer">
      <div class="missing">Unknown footer</div>
    </slot>
  </div>

</div>
