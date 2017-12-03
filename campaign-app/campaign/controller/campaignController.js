
app.controller('CampaignController',['$scope','campaignFactory','campaignChannelFactory','audienceFactory','$window','$timeout', function($scope, campaignFactory, campaignChannelFactory, audienceFactory, $window, $timeout ) {

    $scope.headingTitle = 'App Start';
	init();
    function init() {
        if ($window.localStorage.accessToken) {
            return campaignFactory.getCategories().then(function(response, status) {
                $scope.obj = response;

                //Awareness section icons set
                $scope.volume_up = response.awarnes[0].icons_tag;
                $scope.accessibility = response.awarnes[1].icons_tag;

                //Consideration section icons set
                $scope.traffic = response.consdrition[0].icons_tag;
                $scope.compare_arrows = response.consdrition[1].icons_tag;
                $scope.get_app = response.consdrition[2].icons_tag;
                $scope.videocam = response.consdrition[3].icons_tag;
                $scope.filter_list = response.consdrition[4].icons_tag;

                //Conversion section icons set
                $scope.swap_horiz = response.converstion[0].icons_tag;
                $scope.shopping_cart = response.converstion[1].icons_tag;
                $scope.store_mall_directory = response.converstion[2].icons_tag;
            });            
        }
    };
     
    $scope.channelData = {
            campaignName: '',
            campaignObject:  '',
            segementName: '',
            audienceName: '',
            channel : ''
        }

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
        if ($scope.channelData.campaignObject == '') {
            $scope.campaignName = campaign;    
            $scope.campaignSection = false;
            $scope.campaignChanelSection =true;
            $scope.getCampaignChanel();
        }else{
            $scope.campaignName = campaign;
            $scope.campaignSection = false;
            $scope.reviewAndActiveCampaign = true;
            $scope.finalCampaignList();
            $('.campaign-section').removeClass('content-active');
            $('.configure-channels-section').removeClass('content-active');
            $('.activate-campaign-section').addClass('content-active');
        }
    };

    $scope.getChannelType = function(){                
        return campaignChannelFactory.getChannelType().then(function(response, status) {
            $scope.channelType = response;
        });
    };

    $scope.newTabeOpen = function(selectType){
        $("#myModal").modal();
        $scope.SelectChannelName = selectType;
        switch(selectType){
        case 'Facebook':
            $window.open('https://www.facebook.com');
            break;
        case 'Adwords':
            $window.open('https://www.adwords.com');
            break;
        case 'DBM':
            $window.open('https://www.dbm.com');
            break;
        case 'Lightning':
            $window.open('https://www.lightning.com');
            break;
        case 'Email':
            $window.open('https://www.email.com');
            break;
        case 'SMS':
            $window.open('https://www.sms.com');
            break;
        case 'WhatsApp':
            $window.open('https://web.whatsapp.com');
            break;
        }
    };

    $scope.editSelectChennelId = function(channel){
        $scope.editChanelId = channel.channel_id;
        $scope.channel.channelNameUpdate = channel.channel_name;
        $scope.channel.accessTockenUpdate = channel.channelAccessToken;
        $scope.getChannelType();
    };

    $scope.addNewChannel = function(channel){
        var params = {
            channelName : $scope.SelectChannelName,
            channelAccessToken : channel.accessTocken,
            editChanelId : $scope.editChanelId
        }
        return campaignChannelFactory.getChannelData(params).then(function(response, status) {
            //$scope.channelType = response;
            //$scope.channel.accessTocken = '';
            //alert

            // swal({
            //   title: 'Please copy this script',
            //   text: response.scriptTag.tag});

            //alert(response.scriptTag.tag);
            $scope.getCampaignChanel();
        });
    };

    $scope.updateChannel = function(channel){
        var params = {
            campaignId : $scope.campaignId, 
            channelName : channel.channelNameUpdate,
            editChanelId : $scope.editChanelId,
            channelAccessToken : channel.accessTockenUpdate
        }
        return campaignChannelFactory.getChannelData(params).then(function(response, status) {
            $scope.channelType = response;
            //alert(response.scriptTag.tag);
            swal({
              title: 'Please copy this script',
              text: response.scriptTag.tag});
            $scope.getCampaignChanel();
        });
    };

    $scope.viewChannel = function(params){
        return campaignChannelFactory.viewCampaignChanel(params).then(function(response, status) {
            $scope.campaignViewChennel = response;
        });
    };

    $scope.deleteCampaignChennel = function(Channel){
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
            return campaignChannelFactory.deleteCampaignChennel(Channel).then(function(response,status){
                swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                $scope.getCampaignChanel();
            });
          }
        })
    };

    //audienc segement section start

    $scope.getAudienceSegement = function(chanelId){
        return audienceFactory.getAudienceSegement(chanelId).then(function(response, status){
            $scope.audienceSegementData = response;            
        })
    };

    $scope.savedAudienceSegement = function(){
        if ($scope.channelData.campaignName == '') {
            if ($scope.segementId) {
                $scope.audienceSegementSection = false;
                $scope.campaignActivate = false;
                $scope.reviewAndActiveCampaign = true;
                $scope.finalCampaignList();
            }else{
                swal('Select Audience Segement');
                //alert('Select Audience Segement');
            }
        }else{
            $scope.finalCampaignList();
            $scope.audienceSegementSection = false;
            $scope.reviewAndActiveCampaign = true;
            $('.audience-section').removeClass('content-active');
            $('.activate-campaign-section').addClass('content-active');
        }
    };

    $scope.newSegementCreate = function(segment){
        $scope.audienceSegementSection = false;
        $scope.newSegementCreateForm = true;
        $scope.advanceActive = false;      
    };

    $scope.savedAudience = function(segment, chanelId){
         var count = Object.keys(segment).length;
        if (count >= 19) {
            $scope.savedAudienceSegementFields(segment, chanelId);
        }else{
            swal('All fields are Mandatory!');
        }
    };

    $scope.savedAudienceSegementFields = function(segment, chanelId){
         var count = Object.keys(segment).length;
        if (count >= 19) {
            if($scope.chanelId){
                var chanelId = $scope.chanelId;
            }else{
                var chanelId = chanelId;
            }
            var params = {};
            params.segmentData = segment;
            params.chanelId = chanelId;
            params.segment_type = $scope.selectChan;
            return audienceFactory.postAudienceSegement(params).then(function(response, status){
                //alert('SuccessFully Add..');
                $scope.newSegementCreateForm = false;
                $scope.audienceSegementSection = false;
                $scope.channel = {}
                swal({
                  title: 'Can you create new segement?',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Create new segement!'
                }).then(function (result) {
                  if (result.value) {
                    $('.audience-section').removeClass('content-active');
                    $('.database-marketplace-options').removeClass('content-showcase');
                    $('.set-audience-parameters').addClass('content-active');
                    document.getElementById("defaultOpen").click();
                    //$('.create-audience-section').addClass('content-showcase');
                  }
                  else{
                    $('.create-audience-section').removeClass('content-active');
                    $('.audience-section').addClass('content-active');
                    $scope.getAudienceSegement($scope.chanelId);
                  }
                })
            });
        }
    };

    $scope.cancelAudienceSegement = function(){
        $('.create-audience-section').removeClass('content-active');
        $('.audience-section').addClass('content-active');
        $scope.getAudienceSegement($scope.chanelId);
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
   
    $scope.getDeviceModel = function(deviceType){
        if (deviceType == 'Mobile') {
            $scope.deviceSelect = 'Mobile';
            return campaignFactory.getDeviceModel().then(function(response,status){
                $scope.devioceModel = response;
            });
        }else{
            $scope.deviceSelect = '';
            $scope.channel.Model = '';
        }

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
            return audienceFactory.deleteAudienceSegement(chenel).then(function(response,status){
                swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                $scope.getAudienceSegement($scope.chanelId);
            });
          }
        })
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
        return campaignChannelFactory.getCampaignChanel(params).then(function(response, status) {
            $scope.campaignChennel = response;
        });
    };
    $scope.newChanel = function(){
        $scope.chanelId = '';
        $scope.advanceActive = true;
    };
    $scope.selectChannel = function(channel){
        swal({
            title: 'Please copy this script',
            text: channel.scriptTag,
            confirmButtonColor: '#3085d6',            
            confirmButtonText: 'Ok'
        }).then(function (result) {
          if (result.value) {
            $scope.chanelId = channel.channel_id;
            $scope.channelList = channel;
            $scope.selectChan = channel.channel_name;
          }
        });        
    };

    $scope.selectAudienceSeg = function(segement){
        $scope.segementId = segement.seg_id;
        $scope.segementName = segement.segement_name;
    };

    $scope.savedCampaignChannel = function(){
        if ($scope.channelData.channel == ''){
            if($scope.chanelId){
                $scope.getAudienceSegement($scope.chanelId); 
           }else{
                //alert('Select channel');
                swal('Select channel');
           }
       }else{
            $scope.finalCampaignList();
            $('.configure-channels-block').removeClass('active');
            $('.configure-channels-section').removeClass('content-active');
            $('.audience-section').removeClass('content-active');
            $('.activate-campaign-section').addClass('content-active');
            $('.activate-campaign-block').addClass('active');
       }   
    };

    $scope.createNewCampaignChanel = function(ChannelObj){ 
        if ($scope.advanceActive) {
            return campaignChannelFactory.postCampaignChanel(ChannelObj).then(function(response, status) {
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
    

    $scope.finalCampaignList = function(){
        $scope.channelData = {
            campaignName: $scope.campaignName,
            campaignObject:  document.getElementById('getCampaignObj').innerText,
            segementName: $scope.segementName,
            audienceName: '',
            channel : $scope.channelList
        }
    };

    $scope.editClick = function(select){
        switch(select){
            case "Campaign":
                $scope.campaign = $scope.campaignName;
                $('.activate-campaign-section').removeClass('content-active');
                $('.campaign-section').addClass('content-active');                
                break;
            case "Audience":
                $('.activate-campaign-section').removeClass('content-active');
                $('.audience-section').addClass('content-active');               
                break;
            case "Channel":
                $('.activate-campaign-section').removeClass('content-active');
                $('.configure-channels-section').addClass('content-active');
                break;
        }
    };

    $scope.activeCamapign = function(){
        $scope.campaignActivate = true;
        $scope.campaign = '';
        $scope.segementId ='';
        $scope.channelData = {
            campaignName: '',
            campaignObject:  '',
            segementName: '',
            audienceName: '',
            channel : ''
        }
    };

    $scope.createNewCompaign = function(){
        $scope.campaignObject = '';
        $scope.chanelId = '';
        $scope.campaign = '';
        $scope.segementId = '';
        $scope.channelData = {
            campaignName: '',
            campaignObject:  '',
            segementName: '',
            audienceName: '',
            channel : ''
        }
        $('ul.campaign-objective-options li').removeClass('active');
        $('.set-objective-block').addClass('active');
        $('.set-objective-block').removeClass('done');
        $('.campaign-details').find('.material-icons').html('');
        $('.campaign-details').find('.selected-campaign').html('');
        $('.campaign-details').slideUp();
    };


    $scope.slideChange = function(select){

    };

}]);