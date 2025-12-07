var app = angular.module('eventApp', []);

app.controller('EventController', function($scope, $timeout) {

  // Splash screen timer
  $scope.showSplash = true;
  $timeout(function() {
    $scope.showSplash = false;
  }, 1500);

  // Categories
  $scope.categories = [
    'Concert', 'Food Festival', 'Lecture', 'Sports'
  ];

  // STATIC EVENTS (use Firebase storage URLs later)
  $scope.events = [
    {
      name: 'Rock Night',
      category: 'Concert',
      date: 'Jan 10, 2025',
      location: 'Mumbai',
      image: 'https://source.unsplash.com/featured/?concert'
    },
    {
      name: 'Taco Fiesta',
      category: 'Food Festival',
      date: 'Jan 12, 2025',
      location: 'Navi Mumbai',
      image: 'https://source.unsplash.com/featured/?food-festival'
    },
    {
      name: 'Future Tech Talk',
      category: 'Lecture',
      date: 'Jan 15, 2025',
      location: 'Mumbai',
      image: 'https://source.unsplash.com/featured/?technology'
    },
    {
      name: 'City Marathon',
      category: 'Sports',
      date: 'Jan 20, 2025',
      location: 'Pune',
      image: 'https://source.unsplash.com/featured/?marathon'
    }
  ];

  // Register click message
  $scope.message = "";
  $scope.register = function(event) {
    $scope.message = "🎉 You successfully registered for: " + event.name + "!";
  };
});
