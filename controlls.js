var app = angular.module('eventApp', []);
app.controller('EventController', function($scope) {
  $scope.categories = ['Concert', 'Food Festival', 'Lecture', 'Sports'];
  $scope.events = [
    { name: 'Rock Night', category: 'Concert', date: 'Nov 5, 2025', location: 'City Park' },
    { name: 'Taco Fiesta', category: 'Food Festival', date: 'Nov 10, 2025', location: 'Main Square' },
    { name: 'AI Seminar', category: 'Lecture', date: 'Nov 12, 2025', location: 'Tech Center' },
    { name: 'Marathon 5K', category: 'Sports', date: 'Nov 20, 2025', location: 'River Track' }
  ];
  $scope.register = function(event) {
    $scope.message = 'you registered for: ' + event.name + '!';
  };

});
