<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Login from "./pages/login/Login.svelte";
  export let url = "";


</script>

<Router {url}>
  <Route path="/"><Login /></Route>
</Router>
