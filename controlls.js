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
$scope.setPage = function (page) {
  $scope.activePage = page;
  $scope.showSidebar = false; // ✅ auto close sidebar
};
  /* ================= SIDEBAR TOGGLE ================= */
$scope.showSidebar = false;

$scope.toggleSidebar = function () {
  $scope.showSidebar = !$scope.showSidebar;
};


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
  {
    id: '1',
    name: 'Rock Night',
    category: 'Concert',
    date: 'Jan 10',
    time: '7:00 PM – 11:00 PM',
    location: 'Mumbai',
    ageLimit: '18+',
    price: '$50',
    description: 'A live concert featuring top artists with immersive sound.',
    images: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      'https://images.unsplash.com/photo-1497032205916-ac775f0649ae'
    ],
    currentImage: 0
  },
  {
    id: '2',
    name: 'Taco Fiesta',
    category: 'Food Festival',
    date: 'Jan 12',
    time: '12:00 PM – 9:00 PM',
    location: 'Navi Mumbai',
    ageLimit: 'All Ages',
    price: '$20',
    description: 'A celebration of food with multiple cuisines and vendors.',
    images: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe'
    ],
    currentImage: 0
  },
  {
    id: '3',
    name: 'Tech Talk 2025',
    category: 'Lecture',
    date: 'Jan 15',
    time: '2:00 PM – 5:00 PM',
    location: 'Bangalore',
    ageLimit: '15+',
    price: 'Free',
    description: 'An informative session on upcoming tech trends.',
    images: [
      'https://images.unsplash.com/photo-1581091870622-37e0bbd07db4',
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620'
    ],
    currentImage: 0
  },
  {
    id: '4',
    name: 'Jazz Evening',
    category: 'Concert',
    date: 'Jan 18',
    time: '6:00 PM – 10:00 PM',
    location: 'Pune',
    ageLimit: '18+',
    price: '$40',
    description: 'Smooth jazz night with renowned artists.',
    images: [
      'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'
    ],
    currentImage: 0
  },
  {
    id: '5',
    name: 'Burger Bonanza',
    category: 'Food Festival',
    date: 'Jan 20',
    time: '11:00 AM – 8:00 PM',
    location: 'Delhi',
    ageLimit: 'All Ages',
    price: '$15',
    description: 'All-you-can-eat burger festival.',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1'
    ],
    currentImage: 0
  },
  {
    id: '6',
    name: 'AI Workshop',
    category: 'Lecture',
    date: 'Jan 22',
    time: '10:00 AM – 3:00 PM',
    location: 'Bangalore',
    ageLimit: '16+',
    price: '$30',
    description: 'Hands-on workshop on AI and machine learning.',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
    ],
    currentImage: 0
  },
  {
    id: '7',
    name: 'Hip-Hop Night',
    category: 'Concert',
    date: 'Jan 25',
    time: '8:00 PM – 12:00 AM',
    location: 'Chennai',
    ageLimit: '18+',
    price: '$60',
    description: 'Live hip-hop performances with special guests.',
    images: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      'https://images.unsplash.com/photo-1497032205916-ac775f0649ae'
    ],
    currentImage: 0
  },
  {
    id: '8',
    name: 'Pizza Fiesta',
    category: 'Food Festival',
    date: 'Jan 28',
    time: '12:00 PM – 9:00 PM',
    location: 'Kolkata',
    ageLimit: 'All Ages',
    price: '$25',
    description: 'Pizza lovers unite! Multiple varieties and vendors.',
    images: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe'
    ],
    currentImage: 0
  },
  {
    id: '9',
    name: 'Science Seminar',
    category: 'Lecture',
    date: 'Jan 30',
    time: '1:00 PM – 4:00 PM',
    location: 'Hyderabad',
    ageLimit: '15+',
    price: 'Free',
    description: 'Seminar on recent advancements in science and research.',
    images: [
      'https://images.unsplash.com/photo-1581091870622-37e0bbd07db4',
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620'
    ],
    currentImage: 0
  }
];

  $scope.nextImage = function (event) {
    event.currentImage = (event.currentImage + 1) % event.images.length;
  };

  $scope.prevImage = function (event) {
    event.currentImage =
      (event.currentImage - 1 + event.images.length) % event.images.length;
  };

  /* ================= EVENT DETAILS (✅ ONLY ADDITION) ================= */
  $scope.selectedEvent = null;

  $scope.viewEvent = function (event) {
    $scope.selectedEvent = {
      ...event,
      time: "6:00 PM – 10:00 PM",
      ageLimit: "18+",
      description:
        event.category === "Concert"
          ? "A live concert featuring top artists and immersive sound."
          : event.category === "Food Festival"
          ? "A celebration of food with multiple cuisines and vendors."
          : "An informative and engaging event."
    };
    $scope.setPage('eventDetails');
  };

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

      db.collection("notifications").add({
        userId: userId,
        text: "You registered for " + event.name,
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      $scope.message = "🎉 Registered for " + event.name;
      $scope.$applyAsync();
    });
  };

  /* ================= AUTH ================= */
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

    db.collection("notifications")
      .where("userId", "==", userId)
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        $scope.notifications = snapshot.docs.map(d => d.data());
        $scope.$applyAsync();
      });

    $scope.$applyAsync();
  });

});
