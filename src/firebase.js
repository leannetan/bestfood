import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyCtiL4BszcHsxWCH9kAX9mDUzcCdvr9KQo",
  authDomain: "bt3103-week-6-f749f.firebaseapp.com",
  projectId: "bt3103-week-6-f749f",
  storageBucket: "bt3103-week-6-f749f.appspot.com",
  messagingSenderId: "479346776904",
  appId: "1:479346776904:web:f3100e9312c6804b01f17d",
  measurementId: "G-BD6YXH5PF6"
};
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.firestore();
export default database;
