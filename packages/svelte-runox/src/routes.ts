import Login from './pages/login/Login.svelte';
import Game from './pages/game/Game.svelte';

export const routes = [
  { name: '/', component: Login },
  { name: 'game', component: Game }
]
