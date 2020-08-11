<script lang="ts">
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  import * as firebase from "firebase";
  import "firebase/auth";
  import "firebase/firestore";
  import { FirebaseApp } from "sveltefire";

  const firebaseConfig = {
    apiKey: 'AIzaSyAZX1DilyM9IY01_xFa2pE4ull7FYOsQ00',
    authDomain: 'runox-card.firebaseapp.com',
    databaseURL: 'https://runox-card.firebaseio.com',
    projectId: 'runox-card',
    storageBucket: 'runox-card.appspot.com',
    messagingSenderId: '608707088831',
    appId: '1:608707088831:web:f204f1e44046d59d23d10a',
    measurementId: 'G-RVDLEJNBM9',
  };
  firebase.initializeApp(firebaseConfig);
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>
