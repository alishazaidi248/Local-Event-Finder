var app = angular.module('eventApp', []);

app.controller('EventController', function ($scope, $timeout) {

  /* 🔥 FIREBASE CONFIG */
  const firebaseConfig = {
    apiKey: "AIzaSyAX5Hww_2M8LzXheMkY4tuVqmBLf1zHHm8",
    authDomain: "auththingyyyyyyyyyy.firebaseapp.com",
    projectId: "auththingyyyyyyyyyy",
    storageBucket: "auththingyyyyyyyyyy.firebasestorage.app",
    messagingSenderId: "88018644426",
    appId: "1:88018644426:web:8fbae4fdd3f521b2fe3333"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  let userId = null;

  /* ================= SPLASH ================= */
  $scope.showSplash = true;
  $timeout(() => $scope.showSplash = false, 1500);

  /* ================= NAVIGATION ================= */
  $scope.activePage = "dashboard";
  $scope.setPage = page => $scope.activePage = page;

  /* ================= SETTINGS ================= */
  $scope.showSettings = false;
  $scope.openSettings = () => $scope.showSettings = true;
  $scope.closeSettings = () => $scope.showSettings = false;

  /* ================= DARK MODE ================= */
  $scope.isDarkMode = localStorage.getItem("theme") === "dark";
  if ($scope.isDarkMode) document.body.classList.add("dark-theme");

  $scope.toggleDarkMode = function () {
    $scope.isDarkMode = !$scope.isDarkMode;
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", $scope.isDarkMode ? "dark" : "light");
  };

  /* ================= EVENTS ================= */
  $scope.categories = ['Concert', 'Food Festival', 'Lecture', 'Sports'];

  $scope.events = [
    { id: '1', name: 'Rock Night', category: 'Concert', date: 'Jan 10', location: 'Mumbai' },
    { id: '2', name: 'Taco Fiesta', category: 'Food Festival', date: 'Jan 12', location: 'Navi Mumbai' },
    { id: '3', name: 'Tech Talk', category: 'Lecture', date: 'Jan 15', location: 'Mumbai' }
  ];

  /* ================= REGISTRATIONS ================= */
  $scope.myEvents = [];

  function loadRegistrations() {
    if (!userId) return;

    db.collection("registrations")
      .where("userId", "==", userId)
      .onSnapshot(snapshot => {
        $scope.myEvents = snapshot.docs.map(d => d.data());
        $scope.$applyAsync();
      });
  }

  $scope.isRegistered = function (event) {
    return $scope.myEvents.some(e => e.eventId === event.id);
  };

  $scope.register = function (event) {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if ($scope.isRegistered(event)) return;

    db.collection("registrations").add({
      userId: userId,
      eventId: event.id,
      eventName: event.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {

      // 🔔 SAVE NOTIFICATION
      db.collection("notifications").add({
        userId: userId,
        text: "You registered for " + event.name,
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      $scope.message = "🎉 Registered for " + event.name;
      $scope.$applyAsync();
    }).catch(err => {
      alert(err.message);
    });
  };

  /* ================= AUTH STATE ================= */
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    userId = user.uid;

    $scope.user = {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(user.metadata.creationTime),
      photoURL: user.photoURL || null
    };

    loadRegistrations();

    // Load profile photo from Firestore
    db.collection("users").doc(userId).get().then(doc => {
      if (doc.exists) {
        $scope.user.photoURL = doc.data().photoURL || $scope.user.photoURL;
        $scope.$applyAsync();
      }
    });

    // Load notifications
    db.collection("notifications")
      .where("userId", "==", userId)
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        $scope.notifications = snapshot.docs.map(d => d.data());
        $scope.$applyAsync();
      });

    $scope.$applyAsync();
  });

  /* ================= ACCOUNT ACTIONS ================= */
  $scope.uploadPhoto = function(files) {
  if (!files.length || !$scope.user) return;

  const file = files[0];
  const ref = storage.ref(`profiles/${$scope.user.uid}.jpg`);

  ref.put(file)
    .then(snap => snap.ref.getDownloadURL())
    .then(url => {

      // ✅ Update Firebase Auth profile
      return auth.currentUser.updateProfile({
        photoURL: url
      }).then(() => url);
    })
    .then(url => {

      // ✅ Save to Firestore (optional but good)
      return db.collection("users").doc($scope.user.uid).set({
        photoURL: url,
        email: $scope.user.email,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).then(() => url);
    })
    .then(url => {
      // ✅ Update Angular scope
      $scope.user.photoURL = url;
      $scope.$applyAsync();
    })
    .catch(err => alert(err.message));
};

  $scope.logout = function () {
    auth.signOut().then(() => {
      window.location.href = "login.html";
    });
  };

  $scope.resetPassword = function () {
    auth.sendPasswordResetEmail($scope.user.email)
      .then(() => alert("Password reset email sent"))
      .catch(err => alert(err.message));
  };

});
