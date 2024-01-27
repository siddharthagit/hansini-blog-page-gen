// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dashboardPageUrl: "dashboard",
  apiBaseURL: "api",
  isCustomAuthServer: false,
  isFireBaseAuth: true,

  firebase: {
    apiKey: "AIzaSyAxkV1UW3J3t1rUk63AEpV0XElqLLWZGxg",
    authDomain: "hansini-6801f.firebaseapp.com",
    databaseURL: "https://hansini-6801f.firebaseio.com",
    projectId: "hansini-6801f",
    storageBucket: "hansini-6801f.appspot.com",
    appId:"1:237235311955:web:b6de2c5e191916fab13da6",
    measurementId: "G-YH5LR1P8ZV",
    messagingSenderId: "237235311955",

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
