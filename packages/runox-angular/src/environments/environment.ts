// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gameMode: {
    randomTakeDeckCard: false
  },
  firebase: {
    apiKey: 'AIzaSyAZX1DilyM9IY01_xFa2pE4ull7FYOsQ00',
    authDomain: 'runox-card.firebaseapp.com',
    databaseURL: 'https://runox-card.firebaseio.com',
    projectId: 'runox-card',
    storageBucket: 'runox-card.appspot.com',
    messagingSenderId: '608707088831',
    appId: '1:608707088831:web:f204f1e44046d59d23d10a',
    measurementId: 'G-RVDLEJNBM9',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
