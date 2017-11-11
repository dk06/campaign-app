app.controller('compaignChanelController',['$scope','$rootScope','compaignChanelFactory', function($scope, $rootScope, compaignChanelFactory) {

	$scope.getCompaignChanel = function(params){
        return compaignChanelFactory.getCompaignChanel(params).then(function(response, status) {
        	$scope.compaignChenel = response;
        });
	};

    $scope.newChanel = function(){
        $scope.compaignChanelSection =false;
        $scope.newCompaignChanelSection = true;
    };

    $scope.savedCompaignChanel = function(){
        $scope.compaignChanelSection = false;
        $scope.audienceSegementSection = true;        
    };

    $scope.createNewCompaignChanel = function(chenel){        
        return compaignChanelFactory.postCompaignChanel(chenel).then(function(response, status) {
            $scope.compaignChanelSection = true;
            $scope.newCompaignChanelSection = false;
        });
    };

}])