console.log("hello")
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyA17BX2p9pTUnQz8fWZL7av7FV9umRflgU',
  authDomain: 'buyo-4545o.firebaseapp.com',
  projectId: 'buyo-4545o'
});

var db = firebase.firestore();

db.collection("cats").add({
  id: 5,
  name: "Lovelace"
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});