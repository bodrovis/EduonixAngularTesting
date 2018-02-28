// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCZuCInoEdZny7MXIVTs3TgMVXgoIjWjns",
    authDomain: "angular-tdd-eduonix.firebaseapp.com",
    databaseURL: "https://angular-tdd-eduonix.firebaseio.com",
    projectId: "angular-tdd-eduonix",
    storageBucket: "angular-tdd-eduonix.appspot.com",
    messagingSenderId: "25723624635"
  }
};
