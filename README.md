# Firebase universal portfolio
Themed for willshown.com

This is an unejected `create-react-app` project built to be hosted on Firebase with server-side rendering (SSR) performed by Firebase Cloud Functions.

The project is a monorepo with the `create-react-app` universal code and the server-only code as separate Yarn workspaces. So far deployment has worked fine this way, since Yarn hoists nearly all of the dependencies to `/functions`, however Babel sometimes has trouble finding its presets & plugins since `firebase deploy` runs from the root directory above `/functions` — to fix this, symlinking `/node_modules` to `/functions/node_modules` appears to satisfy all the things.

## Setup

Add the config files with the app's Firebase credentials. Run `yarn install` from `/functions` to install dependencies. You can now run `yarn dev` from `/functions` to run the entire app locally, or if you don’t need the server you can run `yarn start` from `/functions/app` to start just the React app.

## Config files

Certain config files are omitted from the git repo which the app needs in order to run.

#### `functions/config/access-codes.json`

The access codes that grant access to private portfolio sections.

```json
[
  {
    "accessCode": "~~~",
    "displayName": "~~~"
  }
]
```

#### `functions/config/cors.json`

CORS rules.

```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

#### `functions/config/service-credentials.json`

The credentials the server will use to perform Firebase actions with elevated permissions.

```json
{
  "type": "service_account",
  "project_id": "~~~",
  "private_key_id": "~~~",
  "private_key": "~~~",
  "client_email": "~~~",
  "client_id": "~~~",
  "auth_uri": "~~~",
  "token_uri": "~~~",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "~~~"
}
```

#### `functions/app/src/config/client-credentials.json`

Firebase client app credentials.

```json
{
  "apiKey": "~~~",
  "authDomain": "~~~",
  "databaseURL": "~~~",
  "projectId": "~~~",
  "storageBucket": "~~~",
  "messagingSenderId": "~~~"
}
```

## Acknowledgements

The SSR architecture here borrows heavily from Patrick Cason’s ["Server-side rendering in Create React App"](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e).

The icons are from [Feather Icons](https://feathericons.com/).
