import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDNKSgP75lklwZn50zdrniYCpI7Jkwcv7U",
    authDomain: "developers-bookmark.firebaseapp.com",
    databaseURL: "https://developers-bookmark.firebaseio.com",
    projectId: "developers-bookmark",
    storageBucket: "developers-bookmark.appspot.com",
    messagingSenderId: "1039203257068"
  };
  firebase.initializeApp(config);

  export default firebase;