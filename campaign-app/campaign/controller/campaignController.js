
app.controller('CampaignController',['$scope','campaignFactory','campaignChanelFactory','audienceFactory','$window','$timeout', function($scope, campaignFactory, campaignChanelFactory, audienceFactory, $window, $timeout ) {

    $scope.headingTitle = 'App Start';
	init();
    function init() {
        if ($window.localStorage.accessToken) {
            return campaignFactory.getCategories().then(function(response, status) {
                document.getElementById("setObject").style.color = "#5e92e5";
                $scope.obj = response;
            });
        }
    };

    $scope.campaignSection = true;
    $scope.audienceSegementSection = false;
    $scope.campaignActivate = false;
    $scope.channel = {};
    $scope.campaignSelectValid = false;
    $scope.selectCampaign = function(data){
        $scope.campaignName = data;
        $scope.campaignSelectValid = true;
    };
    $scope.campaignCreate = function(){
        document.getElementById("setObject").style.background = "#b0e2e5";        
        $scope.campaignSection = false;
        $scope.campaignChanelSection =true;
    };

    //audienc segement section start


    $scope.getAudienceSegement = function(chanelId){
        return audienceFactory.getAudienceSegement(chanelId).then(function(response, status){
            $scope.audienceSegementData = response;            
        })
    };

    $scope.savedAudienceSegement = function(){
        document.getElementById("setTargetAudience").style.background = "#b0e2e5";        
        $scope.audienceSegementSection = false;
        $scope.campaignActivate = true;        
        document.getElementById("setActivateCampaign").style.color = "#5e92e5";
        document.getElementById("setActivateCampaign").style.background = "#b0e2e5";
    };

    $scope.createNewCompaign = function(){
        $scope.campaignSection = true;
        $scope.audienceSegementSection = false;
        $scope.campaignActivate = false;
        $scope.campaignName = '';
        $scope.chanelId = '';
        document.getElementById("setObject").removeAttribute("style");
        document.getElementById("setTargetAudience").removeAttribute("style");
        document.getElementById("setConfigureChanel").removeAttribute("style");
        document.getElementById("setConfigureChanel").removeAttribute("style");
        document.getElementById("setActivateCampaign").removeAttribute("style");
        document.getElementById("setActivateCampaign").removeAttribute("style");
        document.getElementById("setObject").style.color = "#5e92e5";
    };

    $scope.newSegementCreate = function(segment){
        $scope.audienceSegementSection = false;
        $scope.newSegementCreateForm = true;
        $scope.advanceActive = false;      
    };

    $scope.savedAudience = function(segment, chanelId){
        if($scope.chanelId){
            var chanelId = $scope.chanelId;
        }else{
            var chanelId = chanelId;
        }
        var params = {};
        params.segmentData = segment;
        params.chanelId = chanelId;
        return audienceFactory.postAudienceSegement(params).then(function(response, status){
            alert('SuccessFully Add..');
            $scope.newSegementCreateForm = false;
            $scope.audienceSegementSection = false;
            $scope.audienceSegementData = response.data;
            if ($window.confirm("can you creata new segement?")) 
            {
                $scope.advanceActive = false;
                $scope.newSegementCreateForm = true;
                $scope.Message = "You clicked YES.";
            }
            // else
            // {
            //     $scope.campaignChanelSection = true;
            //     $scope.newSegementCreateForm = false;
            //     $scope.audienceSegementSection = false;
            // }
             else {
                        $scope.Message = "You clicked NO.";
                        if ($window.confirm("can you creata new chanel?")) 
                        {
                            $scope.advanceActive = true;
                            $scope.Message = "You clicked YES.";
                        }
                        else
                        {
                            $scope.campaignChanelSection = true;
                            $scope.newSegementCreateForm = false;
                            $scope.audienceSegementSection = false;
                        }
                    }
        });
    };

    $scope.editAudienceSegement = function(chenel){
        return audienceFactory.editAudienceSegement(chenel).then(function(response, status){
            $scope.getAudienceSegement();
        });
    };

    $scope.getCustomSegmentsFields = function(){
        return audienceFactory.getCustomSegmentsFields().then(function(response, status){
            $scope.customFormFields = response;
            $scope.getDemographic();
        });
    };
    

    $scope.getCustomFormFieldsData = function(filterDate){
        switch(filterDate){
            case 'Demographics' :
                $scope.getDemographic();
                break;
            case 'Technology' :
                $scope.getTechnology();
                break;
            case 'Create New Channel' :
                $scope.createNewChannelForm();
                break;
            case 'Location sidebar' :
                $scope.getCountry();
                break;
            }
    };

    $scope.getDemographic = function(){        
        $scope.technology = false;
        $scope.loaction = false;
        $scope.newChanele = false;
        return campaignFactory.getDemographic().then(function(response, status){
            $scope.demographic = true;
            $scope.customSegementForm = response;
        });
    };

    $scope.getTechnology = function(){
        $scope.demographic = false;       
        $scope.loaction = false;
        $scope.newChanele = false;
        return campaignFactory.getTechnology().then(function(response,status){
            $scope.technology = true;
            $scope.technologyData = response;
        });
    };    

    $scope.getCountry = function(){ 
        $scope.newChanele = false;
        $scope.technology = false;
        $scope.demographic = false;
        return campaignFactory.getCountry().then(function(response,status){
            $scope.loaction = true;
            $scope.countyData = response;
        });
    };

    $scope.getState = function(countyCode){        
        return campaignFactory.getState(countyCode).then(function(response,status){
            $scope.stateData = response;
        });
    };

    $scope.getCity = function(stateCode){        
        return campaignFactory.getCity(stateCode).then(function(response,status){
            $scope.cityData = response;
        });
    };

    $scope.getZipCode = function(countyCode){        
        
    };

    $scope.createNewChannelForm = function(){
        $scope.newChanele = true;
        $scope.technology = false;
        $scope.demographic = false;
        $scope.loaction = false;
    };

    $scope.deleteAudienceSegement = function(chenel){
        return audienceFactory.deleteAudienceSegement(chenel).then(function(response,status){
            $scope.getAudienceSegement();
        });
    };

    $scope.audienceCancel = function(){
        $scope.audienceSegementSection = false;
        $scope.campaignChanelSection = true;
        $scope.newSegementCreateForm = false;
    };

    $scope.reset = function(){
    	$scope.obj = '';
    };

    //audienc segement section end

    //compaign chanel section start

    $scope.getCampaignChanel = function(params){
        document.getElementById("setConfigureChanel").style.color = "#5e92e5";
        return campaignChanelFactory.getCampaignChanel(params).then(function(response, status) {
            $scope.campaignChenel = response;
        });
    };

    $scope.newChanel = function(){
        $scope.chanelId = '';
        $scope.campaignChanelSection =false;
        //$scope.newCampaignChanelSection = true;
        $scope.newSegementCreateForm = true;
        $scope.advanceActive = true;

    };

    $scope.selectChanel = function(chanelId){
        $scope.chanelId = chanelId;
    };

    $scope.savedCampaignChanel = function(){
        if($scope.chanelId){
            document.getElementById("setConfigureChanel").style.background = "#b0e2e5";
            document.getElementById("setTargetAudience").style.color = "#5e92e5";
            $scope.campaignChanelSection = false;
            $scope.audienceSegementSection = true;       
            $scope.getAudienceSegement($scope.chanelId); 
       }else{
            alert('Select channel');
       }
                
    };

    $scope.createNewCampaignChanel = function(ChannelObj){ 
        if ($scope.advanceActive) {
        //     if($scope.chanelId){            
        //     params.chanelId = $scope.chanelId;
        //     params.Channel = ChannelObj;
        // }    
            return campaignChanelFactory.postCampaignChanel(ChannelObj).then(function(response, status) {
                $scope.campaignChanelSection = false;
                $scope.newCampaignChanelSection = false;
                $scope.newSegementCreateForm = false;
                 if ( $window.confirm("can you creata new segement?")) 
                    {
                        $scope.newSegementCreateForm = true;
                        $scope.advanceActive = false;
                        $scope.demographic = true;
                        $scope.technology = false;
                        $scope.loaction = false;
                        $scope.newChanele = false;
                        $scope.chanelId = response;
                        $scope.channel = {}
                    } 
                    else {
                        $scope.Message = "You clicked NO.";
                        if ($window.confirm("can you creata new chanel?")) 
                        {
                            $scope.advanceActive = true;
                            $scope.Message = "You clicked YES.";
                        }
                        else
                        {
                            $scope.campaignChanelSection = true;
                            $scope.newSegementCreateForm = false;
                        }
                    }
            });
        } else{
            $scope.savedAudience(ChannelObj, $scope.chanelId);
        }
    };

    $scope.editCampaignChenel = function(Channel){
        return campaignChanelFactory.editCampaignChenel(Channel).then(function(response, status){
            $scope.getCompaignChanel();
        });
    };

    $scope.deleteCampaignChenel = function(Channel){
        return campaignChanelFactory.deleteCampaignChenel(Channel).then(function(response,status){
            $scope.getCampaignChanel();
        });
    };

    $scope.slideChange = function(select){

    }

}]);