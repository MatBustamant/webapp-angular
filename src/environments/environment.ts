// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authURL: 'http://localhost:8080/api/auth',
  crudURL: 'http://localhost:8080/api/portfolio',
  firebaseConfig: {
    apiKey: "AIzaSyDHC_8rcm1-2ajeVQ6VtmdAVJwAlz0D0ak",
    authDomain: "portfolio-angular-9c08e.firebaseapp.com",
    projectId: "portfolio-angular-9c08e",
    storageBucket: "portfolio-angular-9c08e.appspot.com",
    messagingSenderId: "1068555374252",
    appId: "1:1068555374252:web:444fb594382b33dfd61909",
    measurementId: "G-MG9R7FH643"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
