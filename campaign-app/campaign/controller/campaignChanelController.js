app.controller('compaignChanelController',['$scope','$rootScope','campaignFactory','$window','$location','loaderEvent','overviewFactory','sharedMain', function($scope, $rootScope, campaignFactory, $window, $location, loaderEvent, overviewFactory, sharedMain) {

	init();
    function init() {
        $rootScope.companyDropDownEvent = false;
        if ($window.localStorage.accessToken) {

            campaignFactory.getFinalCampaignList().then(function(response, status){
                $scope.campaignList = response;
            });

            var param = {};
                param.dateRange = '2016-01-01,2017-01-31';
            overviewFactory.getCompanyList(param).then(function(response, status){                
                $rootScope.companyList = response;
                sharedMain.campaign_id = response[0].campaign_id;
            });
            loaderEvent.loaderDeactivate();
        }
    };

    $scope.goToChangeUrl = function(){
        $location.path("/new_campaign");
        $rootScope.newCampaignObjectSection = true;
    };

    $scope.editSelectCampaign = function(campaign){
        $location.path("/new_campaign");
        $rootScope.newCampaignObjectSection = false;
        $rootScope.channelScopeSet = campaign;
    };

    $scope.deleteSelectCampaign = function(campaign_id){
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
          if (result.value) {
            loaderEvent.loaderActivate();
            return campaignFactory.deleteSelectCampaign(campaign_id).then(function(response, status){
                init();
                loaderEvent.loaderDeactivate();
            });
          }
        });
    };

    

}])