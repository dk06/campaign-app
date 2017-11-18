
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
    $scope.selectCampaign = function(name, id){
        $scope.campaignObject = name;
        $scope.campaignId = id;
        $scope.campaignSelectValid = true;
    };
    $scope.campaignCreate = function(campaign){
        $scope.campaignName = campaign;
        document.getElementById("setObject").style.background = "#b0e2e5";        
        $scope.campaignSection = false;
        $scope.campaignChanelSection =true;
    };

    $scope.getChannelType = function(){                
        return campaignChanelFactory.getChannelType().then(function(response, status) {
            $scope.channelType = response;
        });
    };

    $scope.editSelectChennelId = function(chanelId){
        $scope.editChanelId = chanelId;
        $scope.getChannelType();
    };

    $scope.addNewChannel = function(channel){
        var params = {
            campaignId : $scope.campaignId, 
            channelName : channel.channelName,
            editChanelId : $scope.editChanelId,
            channelAccessToken : channel.accessTocken
        }
        return campaignChanelFactory.getChannelData(params).then(function(response, status) {
            $scope.channelType = response;
            alert('<script language="JavaScript"> var STD="101"; var ISD="102"; var pn="NS"; var cn="1";var tagparameters = "ReplaceValue" </script><script src="https://dcpub.cuberoot.co/dcode2/dmpbasedc.js"></script>');
            $scope.getCampaignChanel();
        });
    };

    //audienc segement section start


    $scope.getAudienceSegement = function(chanelId){
        return audienceFactory.getAudienceSegement(chanelId).then(function(response, status){
            $scope.audienceSegementData = response;            
        })
    };

    $scope.savedAudienceSegement = function(){
        if ($scope.segementId) {
            document.getElementById("setTargetAudience").style.background = "#b0e2e5";        
            $scope.audienceSegementSection = false;
            $scope.campaignActivate = false;
            $scope.reviewAndActiveCampaign = true
        }else{
            alert('Select Audience Segement');
        }
    };

    $scope.createNewCompaign = function(){
        $scope.campaignSection = true;
        $scope.audienceSegementSection = false;
        $scope.campaignActivate = false;
        $scope.reviewAndActiveCampaign = false;
        $scope.campaignObject = '';
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
            $scope.channel = {}
            if ($window.confirm("can you creata new segement?")) 
            {
                $scope.advanceActive = false;
                $scope.newSegementCreateForm = true;
            }
            else
            {
                $scope.campaignChanelSection = false;
                $scope.newSegementCreateForm = false;
                $scope.audienceSegementSection = true;
            }


             // else {
             //            $scope.Message = "You clicked NO.";
             //            if ($window.confirm("can you creata new chanel?")) 
             //            {
             //                $scope.advanceActive = true;
             //                $scope.Message = "You clicked YES.";
             //            }
             //            else
             //            {
             //                $scope.campaignChanelSection = true;
             //                $scope.newSegementCreateForm = false;
             //                $scope.audienceSegementSection = false;
             //            }
             //        }
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

    $scope.selectChannel = function(chanel){
        $scope.chanelId = chanel.channel_id;
        $scope.channelList = chanel;
    };

    $scope.selectAudienceSeg = function(segementId, segName){
        $scope.segementId = segementId;
        $scope.segementName = segName;
    }

    $scope.savedCampaignChannel = function(){
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

    $scope.finalCampaignList = function(){
        $scope.channelData = {
            campaignName: $scope.campaignName,
            campaignObject:  $scope.campaignObject,
            segementName: $scope.segementName,
            audienceName: '',
            channel : $scope.channelList
        }
    };

    $scope.editClick = function(select){
        switch(select){
            case "Campaign":
                $scope.reviewAndActiveCampaign = false;
                $scope.campaignSection = true;
                break;
            case "Audience":
                $scope.reviewAndActiveCampaign = false;
                $scope.audienceSegementSection = true;
                break;
            case "Channel":
                $scope.reviewAndActiveCampaign = false;
                $scope.campaignChanelSection = true;
                break;
        }
    };

    $scope.activeCamapign = function(){
        $scope.reviewAndActiveCampaign = false;
        $scope.campaignActivate = true;
        document.getElementById("setActivateCampaign").style.color = "#5e92e5";
        document.getElementById("setActivateCampaign").style.background = "#b0e2e5";
    };

    $scope.slideChange = function(select){

    };

}]);