// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  version: '1.0.0-beta.1',
  defaultLanguage: 'en-GB',
  // Initialize Firebase
  firebase: {
    apiKey: "AIzaSyBfH63MEZZCE7_8YkExetcviJxwn8eNaSY",
    authDomain: "bookey-dev.firebaseapp.com",
    databaseURL: "https://bookey-dev.firebaseio.com",
    projectId: "bookey-dev",
    storageBucket: "bookey-dev.appspot.com",
    messagingSenderId: "319067930874"
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
