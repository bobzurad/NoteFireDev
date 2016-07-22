#NoteFire

NoteFire is a collection of simple note apps. Each app is written using a different  [Firebase JavaScript Library](https://firebase.google.com/docs/libraries/). The goal of this project is to show how a simple notes app can be written using the libraries that Firebase offers. Each app points to the same Firebase, so each app contains identical data.

So far this project contains two apps. One written using [BackboneFire](https://github.com/firebase/backbonefire) and another using [AngularFire](https://github.com/firebase/angularfire).

##Development
Developing this project requires
* [node.js](http://nodejs.org/)
* A [firebase](http://firebase.google.com) account
  * Only needed if you want to write to your own firebase.
  * Install [firebase-tools](https://www.npmjs.com/package/firebase-tools) to deploy to your own firebase account

###Installation
Once you've cloned this repository, cd to it's location and run:

```bash
$ npm install
$ bower install
```

###Running on localhost
You can run this application locally at http://localhost:8001 by running:
```bash
$ npm start
```

If you need to run this application at a different port you can change it in package.json.
```json
"start": "http-server ./app -a localhost -p 8001",
```

###Configuration
You can configure this application to point to your own firebase. Each app has it's own location for the Firebase url, which will need to be changed.

* BackboneFire: app/backbonefire/js/models/constants.js
* AngularFire: app/angularfire/js/app.js

```javascript
FirebaseUrl: 'https://<your-firebase-name>.firebaseio.com/',
```
