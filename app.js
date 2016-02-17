var hangMyApp = angular.module('hangMyApp',['ngRoute','ngResource']);

hangMyApp.controller('gameController',['$scope', '$http', '$route', '$location', function($scope, $http, $route, $location){
  
	$scope.missCount = 0;
	$scope.words = [];
  $scope.guessedChars = [];
  $scope.guessCount = 0;
  $scope.chars = [];
  $scope.word = [];

	$http.get('words.json')
            .success(function(data) {
                getRandomWord(data);
            })
            .error(function() {
                console.log('could not find words.json');
            });

  var getRandomWord = function(data) {
   	var words = data.words;
   	var random_word =  words[Math.floor(Math.random() * words.length)];
   	console.log(random_word);
   	$scope.currentWord = random_word;
    $scope.word = $scope.currentWord.split("");
	};
  
  $scope.checkGuess = function(){
  	if($scope.guess.length > 1){
  		if((angular.lowercase($scope.guess)) == (angular.lowercase($scope.currentWord))){
     		$scope.guessedChars = $scope.uniqeCheck($scope.guess);
   			$scope.guessCount++;
   			$scope.guess = "";
  		}
  		else {
   			$scope.guessCount++;
   			$scope.missCount++;
   			$scope.guess = "";
   			$scope.checkLose();
  		}
  	}
   	else if(($scope.guessedChars.indexOf(angular.lowercase($scope.guess)) === -1)&&($scope.guessedChars.indexOf(angular.uppercase($scope.guess)) === -1)){
     	$scope.guessedChars.push($scope.guess);
   		$scope.guessCount++;
      console.log($scope.chars);
   		if (($scope.word.indexOf(angular.lowercase($scope.guess)) === -1 )&&($scope.word.indexOf(angular.uppercase($scope.guess)) === -1 )){
   			$scope.missCount++;
   			$scope.checkLose();
   		}
   		$scope.guess = "";
   	}

  };

  $scope.displayChars = function(){
   	$scope.chars = $scope.currentWord.split("");
   
   	_.each($scope.chars, function(val, index){
     		if(($scope.guessedChars.indexOf(angular.lowercase(val)) === -1)&&($scope.guessedChars.indexOf(angular.uppercase(val)) === -1)){
       		$scope.chars[index] = "_";
     		}
   	});
   	$scope.checkWin($scope.chars);
   	return $scope.chars;
  };
  
  $scope.checkWin = function(chars){
  	if ( chars.indexOf( '_' ) > -1 ){}
 		else {
 			$location.path('/won');
 		}
  };
  
  $scope.checkLose = function(){
 		if ($scope.missCount >= 5){
 			$location.path('/lost');
 		}
 	};

  $scope.uniqeCheck = function(data) {
    var seen = {};
    var out = [];
    var len = data.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
      var item = data[i];
      if(seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = item;
      }
    }
  return out;
  };

  $scope.reset = function() {
    $scope.missCount = 0;
    $scope.words = [];
    $scope.guessedChars = [];
    $scope.guessCount = 0;
    $scope.chars = [];
    $scope.word = [];

    $http.get('words.json')
            .success(function(data) {
                getRandomWord(data);
            })
            .error(function() {
                console.log('could not find words.json');
            });
  }

}]);

hangMyApp.config(function($routeProvider){
    $routeProvider
        .when('/',
        {
            templateUrl: 'home.htm'
        })
        .when('/lost',
        {
            templateUrl: 'lost.htm'
        })
        .when('/won',
        {
            templateUrl: 'won.htm'
        }
    )
  });

