app.controller('compaignChanelController',['$scope','$rootScope','campaignChannelFactory', function($scope, $rootScope, campaignChannelFactory) {

	$scope.getCompaignChanel = function(params){
        return campaignChannelFactory.getCompaignChanel(params).then(function(response, status) {
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
        return campaignChannelFactory.postCompaignChanel(chenel).then(function(response, status) {
            $scope.compaignChanelSection = true;
            $scope.newCompaignChanelSection = false;
        });
    };

}])