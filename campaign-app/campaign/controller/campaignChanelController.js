app.controller('compaignChanelController',['$scope','$rootScope','campaignFactory','$window','$location', function($scope, $rootScope, campaignFactory, $window, $location) {

	init();
    function init() {
        if ($window.localStorage.accessToken) {
            loaderActivate();

            return campaignFactory.getFinalCampaignList().then(function(response, status){
                $scope.campaignList = response;
                loaderDeactivate();
            });          
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
            loaderActivate();
            return campaignFactory.deleteSelectCampaign(campaign_id).then(function(response, status){
                init();
                loaderDeactivate();
            });
          }
        });
    };

    function loaderActivate(){
        var current_effect = 'win8_linear';
        run_waitMe($('.containerBlock > div'), 1, current_effect);
        function run_waitMe(el, num, effect){
            text = '';
            fontSize = '';
            switch (num) {
                case 1:
                maxSize = '';
                textPos = 'vertical';
                break;
                case 2:
                text = '';
                maxSize = 30;
                textPos = 'vertical';
                break;
                case 3:
                maxSize = 30;
                textPos = 'horizontal';
                fontSize = '18px';
                break;
            }
            console.log(effect)
            el.waitMe({
                effect: effect,
                text: text,
                bg: 'rgba(255,255,255,0.7)',
                color: '#000',
                maxSize: maxSize,
                source: 'img.svg',
                textPos: textPos,
                fontSize: fontSize,
                onClose: function() {}
            });
        }
    };

    function loaderDeactivate(){
        $('.containerBlock > div').waitMe('hide');
    }

}])