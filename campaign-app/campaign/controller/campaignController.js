
app.controller('CampaignController',['$scope','$rootScope','$q','campaignFactory','campaignChannelFactory','audienceFactory','$window','$timeout','$filter','$location','loaderEvent', function($scope,$rootScope, $q, campaignFactory, campaignChannelFactory, audienceFactory, $window, $timeout, $filter,$location, loaderEvent ) {

    $scope.headingTitle = 'App Start';
    $scope.SelectChannelName = '';
    $scope.customSegementForm = {}
    $scope.countySelect = 'Select County';
    $scope.stateSelect = 'Select State';
    $scope.citySelect = 'Select City';
    $scope.deviceSelect = 'Select Device';
    $scope.deviceModelSelect = 'Select Model';
    $scope.languageSelect = 'language';
    $scope.incomeSelect = 'Income';
    $scope.affinitySelect = 'Affinity';
    $scope.marketSegmentSelect = 'In Market';
    $scope.IABSelect = 'IAB';
    $scope.gender_type = '';
    $scope.age_type = '';
    $scope.income_Type = '';
    $scope.device_type_get = '';
    $scope.deviceId = '';
    $scope.editCheck = false;

    $scope.age_name = '';
    $scope.gender_name = '';
    $scope.language_name = '';
    $scope.device_type_get = '';
    $scope.countryType = '';
    $scope.stateType = '';
    $scope.cityType = '';
    $scope.income_Type = '';                
    $scope.affinity_catagery_type = '';
    $scope.market_segment_type = '';
    $scope.IAB_Name_type = '';
    $scope.facebook_Name_type = '';
    $scope.operatingSys_Name_type = '';
    $scope.browser_name_type = '';
    $scope.screen_Name_type = '';
    $scope.device_model_get = '';

    $scope.cityTypeObj = '';
    $scope.stateTypeObj = '';
    $scope.countryTypeObj = '';
    $scope.language = '';

    init();
    function init() {
        if ($window.localStorage.accessToken) {
            loaderEvent.loaderActivate();

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
                loaderEvent.loaderDeactivate();
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

    $scope.selectCampaignObject = function(campaign){
        if (!campaign) {
            swal('Please Enter Campaign Name!');
        }
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
        loaderEvent.loaderActivate();                
        return campaignChannelFactory.getChannelType().then(function(response, status) {
            $scope.channelType = response;
            loaderEvent.loaderDeactivate();
            if (!$rootScope.newCampaignObjectSection) {
                $('.campaign-section').removeClass('content-active');
                $('.set-objective-block').removeClass('active');
                $('.set-objective-block').addClass('done');
                $('.configure-channels-block').addClass('active');
                $('.configure-channels-section').addClass('content-active');
                $scope.getCampaignChanel();
                $scope.getAudienceSegementByID($rootScope.channelScopeSet.segment_id);
                var dk = {};
                dk.channelType = $rootScope.channelScopeSet.channel_name;
                dk.channelBudget = $rootScope.channelScopeSet.channel_Budget;
                dk.target = $rootScope.channelScopeSet.target;
                dk.kpi = $rootScope.channelScopeSet.kpi;
                dk.channel_id = $rootScope.channelScopeSet.channel_id;
                dk.segementName = $rootScope.channelScopeSet.segment_name;
                $scope.channelList = dk;
                $scope.channelScope = $rootScope.channelScopeSet.channel_type;
                $scope.selectChan = $rootScope.channelScopeSet.channel_type;
                $scope.channelData.channel = $rootScope.channelScopeSet.channel_name;
                $scope.campaignName = $rootScope.channelScopeSet.campaign_name;
                $scope.campaign_object = $rootScope.channelScopeSet.campaign_object;
                $scope.channelData.campaignName = $rootScope.channelScopeSet.campaign_name;
            }
        });
    };

    $scope.createNewChannel = function(selectType){
        $scope.SelectChannelName = selectType;
        $scope.accessTocken = '';
        swal({
          title: 'Link '+ selectType + ' with Cuberoot account ',
          //text: "Can You add new Channel!",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(function (result) {
          if (result.value) {
            $scope.SelectChannelName = selectType;
            $scope.newTabeOpen(selectType);
          }
        })
    };

    $scope.newTabeOpen = function(selectType){
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
        //$("#myModal").modal();
        $('.overlay').css('display', 'block');
    };

    $scope.editSelectChennelId = function(channel, channelName){
        $scope.selectScope = channelName;
        // $scope.editChanelId = channel.channel_id;
        // $scope.channel.channelNameUpdate = channel.channel_name;
        // $scope.channel.accessTockenUpdate = channel.channelAccessToken;
        $scope.campaignViewChennel = channel;
        //$scope.getChannelType();
    };

    $scope.getCampaignNameAndId = function(accessTocken){
        $scope.channelSection = false;
        $('.overlay').css('display', 'none');
        var params = {
            channelName : $scope.SelectChannelName,
            channelAccessToken : accessTocken
        }
        $scope.accessToken = accessTocken;
        loaderEvent.loaderActivate();
        return campaignChannelFactory.getCampaignNameAndId(params).then(function(response, status) {
            $scope.campaignNameAndId = response.campaigns;
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.getChannelByID = function(campaignId){        
        var params = {
            channelName : $scope.SelectChannelName,
            channelAccessToken : $scope.accessToken,
            campaign_id : campaignId
        }
        loaderEvent.loaderActivate();
        return campaignChannelFactory.getChannelByID(params).then(function(response, status) {
            $scope.campaignChennel = [response.campaignChannelData];
            $scope.scriptTag = response.scriptTag;
            $scope.channelSection = true;
            loaderEvent.loaderDeactivate();
        });
    };

    // $scope.addNewChannel = function(accessTocken){
    //     $('.overlay').css('display', 'none');
    //     var params = {
    //         channelName : $scope.SelectChannelName,
    //         channelAccessToken : accessTocken,
    //         editChanelId : $scope.editChanelId
    //     }
    //     $scope.accessTocken = accessTocken;
    //     return campaignChannelFactory.getChannelData(params).then(function(response, status) {
    //         $scope.campaignChennel = [response.campaignChannelData];
    //         $scope.channelName = $scope.SelectChannelName;
    //         $scope.scriptTag = response.scriptTag;
    //         //$scope.getCampaignChanel();
    //     });
    // };

    $scope.updateChannel = function(channel){
        var params = {
            campaignId : $scope.campaignId, 
            channelName : channel.channelNameUpdate,
            editChanelId : $scope.editChanelId,
            channelAccessToken : channel.accessTockenUpdate
        }
        loaderEvent.loaderActivate();
        return campaignChannelFactory.getChannelData(params).then(function(response, status) {
            $scope.channelType = response;
            //alert(response.scriptTag.tag);
            swal({
              title: 'Please copy this script',
              text: response.scriptTag.tag});
            $scope.getCampaignChanel();
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.viewChannel = function(params , channelName){
        $scope.selectScope = channelName;
        loaderEvent.loaderActivate();
        return campaignChannelFactory.viewCampaignChanel(params).then(function(response, status) {
            $scope.campaignViewChennel = response;
            loaderEvent.loaderDeactivate();
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
            loaderEvent.loaderActivate();
            var channelObj = {};
                channelObj.channel_id = Channel.channel_id;
                channelObj.status = 'false';
            return campaignChannelFactory.deleteCampaignChennel(channelObj).then(function(response,status){
                swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                $scope.getCampaignChanel();
                loaderEvent.loaderDeactivate();
            });
          }
        })
    };

    //audienc segement section start

    $scope.getAudienceSegement = function(){
        loaderEvent.loaderActivate();
        return audienceFactory.getAudienceSegement().then(function(response, status){
            $scope.audienceSegementData = response;
            $scope.segmentDataList = response; 
            loaderEvent.loaderDeactivate();           
        })
    };

    $scope.selectAudienceSeg = function(segement){
        if (segement.segment_type == $scope.selectChan) {
            $scope.segementId = segement.seg_id;
            $scope.segementName = segement.segement_name;
        }else{
            swal({
                  title: 'Segement type did not match',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Update'
                }).then(function (result) {
                    if (result.value) {
                        if ($scope.selectChan == 'Adwords' || $scope.selectChan == 'DBM') {
                        loaderEvent.loaderActivate();                    
                        return audienceFactory.updateSegementType(segement, $scope.selectChan , segement.seg_id).then(function(response, status){
                            $scope.getAudienceSegement();
                            loaderEvent.loaderDeactivate();
                        });
                    }else{
                        swal({
                            title: 'Segment type can not changed!',
                            type: 'warning'
                        });
                    }
                }
            })
        }
    };

    $scope.savedCampaignChannel = function(){        
        if ($scope.channelData.channel == '')
        {
            if($scope.scriptTag && $scope.channelList)
            {
                if (!$scope.chanelId) {
                    $scope.newChannelCreate();
                }
            }
            else if ($scope.chanelId) 
            {
                $scope.channelScriptTag = true;
                $scope.getAudienceSegement();
                $scope.channelScope = $scope.selectChan;
            }
            else
            {
                swal('Select channel');
            }
       }else{
            if ($scope.channelScope == $scope.selectChan) {
                $scope.finalCampaignList();
                $('.configure-channels-block').removeClass('active');
                $('.configure-channels-section').removeClass('content-active');
                $('.audience-section').removeClass('content-active');
                $('.activate-campaign-section').addClass('content-active');
                $('.activate-campaign-block').addClass('active');
            }else{
                $scope.channelData.campaignName = '';
                $scope.segementId = '';
                $scope.channelScriptTag = true;
                $scope.getAudienceSegement();
                $scope.channelScope = $scope.selectChan;
            }
       }   
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

    $scope.ageGroup=[];
    $scope.ageGroupChangedValue=function(item, index, ageStatus){
        //$scope.ageGroup.push(item);
        if (ageStatus) {
            $scope.ageGroup[index] = true;
        }else{
            $scope.ageGroup[index] = false;
        }
        var age_apiRef = $scope.customSegementForm.ageGroup;
        $scope.age_type = '';
        $scope.age_name = '';
         angular.forEach(age_apiRef, function(value, key){
            if ($scope.ageGroup[key] == true) {
                if ($scope.age_type == '') {
                    $scope.age_type = value.age_id;
                    $scope.age_name = value.age;
                }else{
                     $scope.age_type = $scope.age_type + ',' + value.age_id;
                     $scope.age_name = $scope.age_name + ',' + value.age;
                }
            }
         });
         getPrivateSpecificReach();
        
    };

    $scope.genderGroup=[];
    $scope.genderChangedValue=function(item, index, genderStatus){
        //$scope.genderGroup.push(item);
        if (genderStatus) {
            $scope.genderGroup[index] = true;
        }else{
            $scope.genderGroup[index] = false;
        }
        var gender_apiRef = $scope.customSegementForm.gender;
            $scope.gender_type = '';
            $scope.gender_name = '';
             angular.forEach(gender_apiRef, function(value, key){
                if ($scope.genderGroup[key] == true) {
                    if ($scope.gender_type == '') {
                        $scope.gender_type = value.gender_id;
                        $scope.gender_name = value.gender;
                    }else{
                        $scope.gender_type = $scope.gender_type + ',' + value.gender_id;
                        $scope.gender_name = $scope.gender_name + ',' + value.gender;
                    }
                }
             });
             getPrivateSpecificReach();
    };

    $scope.languageObj = [];
    $scope.languageChangedValue = function(language, index, languageStatus){
        $scope.language_name = '';
        $scope.language = ''
        var language_apiRef = $scope.customSegementForm.language;
        if (languageStatus) {
            if ($scope.languageObj[index] == language[index]) {
                $scope.languageObj[index] = true;
            }
        }else{
            if ($scope.languageObj[index] == language[index]) {
                $scope.languageObj[index] = false;
            }
        }
        angular.forEach(language_apiRef, function(value, key){
            if ($scope.languageObj[key] == true) {
                if ($scope.language_name == '') {
                    $scope.language_name = value.language;
                    $scope.language = value.lang_id;
                }else{
                    $scope.language_name = $scope.language_name +','+ value.language;
                    $scope.language = $scope.language + ',' + value.lag_id;
                }
            }
        });
        getPrivateSpecificReach();
        
    };

    $scope.incomeObj = [];
    $scope.incomeChangedValue = function(income, index , incomeStatus){
        if (incomeStatus) {
            if ($scope.incomeObj[index] == income[index]) {
                $scope.incomeObj[index] = true;
            }
        }else{
            if ($scope.incomeObj[index] == income[index]) {
                $scope.incomeObj[index] = false;
            }
        }
        var income_apiRef = $scope.customSegementForm.incomeDetails;
        $scope.income_Type = '';
        angular.forEach(income_apiRef, function(value, key){
            if ($scope.incomeObj[key] == true) {
                if ($scope.income_Type == '') {
                    $scope.income_Type = value.income_name;
                }else{
                    $scope.income_Type = $scope.income_Type + ',' + value.income_name;
                }
            }
         });
        getPrivateSpecificReach();
    };
    $scope.deviceObj = [];
    $scope.deviceModel = true;
    $scope.deviceChangedValue = function(device, index , deviceStatus, select_type){
        if (deviceStatus) {
            if ($scope.deviceObj[index] == device[index]) {
                $scope.deviceObj[index] = true;
            }
        }else{
            if ($scope.deviceObj[index] == device[index]) {
                $scope.deviceObj[index] = false;
            }
        }
        $scope.device_type_get = '';
        $scope.deviceId = '';
        var device_apiRef = $scope.technologyData.deviceType;
        angular.forEach(device_apiRef, function(value, key){
            if ($scope.deviceObj[key] == true) {
                if ($scope.device_type_get == '') {
                    $scope.device_type_get = value.device_type;
                    $scope.deviceId = value.device_Id;
                }else{
                    $scope.device_type_get = $scope.device_type_get +','+ value.device_type;
                    $scope.deviceId = $scope.deviceId +','+ value.device_Id;
                }
            }
        });
        getPrivateSpecificReach();
        if ($scope.deviceObj[1] == true) {
            $scope.getDeviceModel(select_type);
            $scope.deviceModel = false;
            $scope.deviceSelect = 'Select Device';
        }else{
            $scope.deviceSelect = 'Select Device';
            $scope.deviceModel = true;
        }
    };

    function getPrivateSpecificReach(){
        if ($scope.privateSection) {
            var reach = [];
            loaderEvent.loaderActivate();
            return audienceFactory.getPrivateReachSpecific($scope.gender_type, $scope.age_type, $scope.income_Type, $scope.deviceId,$scope.cityTypeObj ,$scope.stateTypeObj ,$scope.countryTypeObj, $scope.language).then(function(response, status) {
                reach.push(response[0].reach);
                $scope.privateReach = response[0].reach;
                loaderEvent.loaderDeactivate();
            });
        }
    };

    if ($scope.deviceSelect != 'Mobile') {
        $scope.deviceModelObj = [];
        $scope.deviceModelChangedValue = function(deviceModel, index , deviceModelStatus){
            if (deviceModelStatus) {
                if ($scope.deviceModelObj[index] == deviceModel[index]) {
                    $scope.deviceModelObj[index] = true;
                }
            }else{
                if ($scope.deviceModelObj[index] == deviceModel[index]) {
                    $scope.deviceModelObj[index] = false;
                }
            }
            $scope.device_model_get = '';
            var device_model_apiRef = $scope.devioceModel;
            angular.forEach(device_model_apiRef, function(value, key){
                if ($scope.deviceModelObj[key] == true) {
                    if ($scope.device_model_get == '') {
                        $scope.device_model_get = value.Model;
                    }else{
                        $scope.device_model_get = $scope.device_model_get +','+ value.Model;
                    }
                }
            });
            getPrivateSpecificReach();
        };
    }

    $scope.affinityObj = [];
    $scope.affinityChangedValue = function(affintity,index,affintityStatus){        
        if (affintityStatus) {
            if ($scope.affinityObj[index] == affintity[index]) {
                $scope.affinityObj[index] = true;
            }
        }else{
            if ($scope.affinityObj[index] == affintity[index]) {
                $scope.affinityObj[index] = false;
            }
        }
        var affinity_catagery_apiRef = $scope.customSegementForm.affinityCategory;
        $scope.affinity_catagery_type = '';
        angular.forEach(affinity_catagery_apiRef, function(value, key){
            if ($scope.affinityObj[key] == true) {
                if ($scope.affinity_catagery_type == '') {
                    $scope.affinity_catagery_type = value.category_name;
                }else{
                    $scope.affinity_catagery_type = $scope.affinity_catagery_type + ',' + value.category_name;
                }
            }
         });
    };

    $scope.marketSegmentObj = [];
    $scope.marketSegmentChangedValue = function(market,index, marketStatus){
        if (marketStatus) {
            if ($scope.marketSegmentObj[index] == market[index]) {
                $scope.marketSegmentObj[index] = true;
            }
        }else{
            if ($scope.marketSegmentObj[index] == market[index]) {
                $scope.marketSegmentObj[index] = false;
            }
        }
        var market_segment_apiRef = $scope.customSegementForm.marketSegment;
        $scope.market_segment_type = '';
        angular.forEach(market_segment_apiRef, function(value, key){
            if ($scope.marketSegmentObj[key] == true) {
                if ($scope.market_segment_type == '') {
                    $scope.market_segment_type = value.seg_category_name;
                }else{
                    $scope.market_segment_type = $scope.market_segment_type + ',' + value.seg_category_name;
                }
            }
         });
    };

    $scope.IAB_Obj = [];
    $scope.IABChangedValue = function(iab,index, iabStatus){
        if (iabStatus) {
            if ($scope.IAB_Obj[index] == iab[index]) {
                $scope.IAB_Obj[index] = true;
            }
        }else{
            if ($scope.IAB_Obj[index] == iab[index]) {
                $scope.IAB_Obj[index] = false;
            }
        }
        var IAB_apiRef = $scope.customSegementForm.IAB;
        $scope.IAB_Name_type = '';
        angular.forEach(IAB_apiRef, function(value, key){
            if ($scope.IAB_Obj[key] == true) {
                if ($scope.IAB_Name_type == '') {
                    $scope.IAB_Name_type = value.category_name;
                }else{
                    $scope.IAB_Name_type = $scope.IAB_Name_type + ',' + value.category_name;
                }
            }
         });
    };

    $scope.operatingSysObj = [];
    $scope.operatingSysChangedValue = function(operatingSys,index, operatingSysStatus){
        if (operatingSysStatus) {
            if ($scope.operatingSysObj[index] == operatingSys[index]) {
                $scope.operatingSysObj[index] = true;
            }
        }else{
            if ($scope.operatingSysObj[index] == operatingSys[index]) {
                $scope.operatingSysObj[index] = false;
            }
        }
        var operatingSys_apiRef = $scope.technologyData.operatingSystem;;
        $scope.operatingSys_Name_type = '';
        $scope.operating_sys_id = '';
        angular.forEach(operatingSys_apiRef, function(value, key){
            if ($scope.operatingSysObj[key] == true) {
                if ($scope.operatingSys_Name_type == '') {
                    $scope.operatingSys_Name_type = value.operating_system_name +'-'+ value.os_version;
                    $scope.operating_sys_id = value.operating_sys_id;
                }else{
                    $scope.operatingSys_Name_type = $scope.operatingSys_Name_type + ',' + value.operating_system_name +'-'+ value.os_version;
                    $scope.operating_sys_id = $scope.operating_sys_id + ',' + value.operating_sys_id;
                }
            }
         });
        getPrivateSpecificReach();
    };

    $scope.screenResObj = [];
    $scope.screenResChangedValue = function(screen,index, screenStatus){
        if (screenStatus) {
            if ($scope.screenResObj[index] == screen[index]) {
                $scope.screenResObj[index] = true;
            }
        }else{
            if ($scope.screenResObj[index] == screen[index]) {
                $scope.screenResObj[index] = false;
            }
        }
        var screen_apiRef = $scope.technologyData.screenResoluton;;
        $scope.screen_Name_type = '';
        $scope.screen_resoluton_id = '';
        angular.forEach(screen_apiRef, function(value, key){
            if ($scope.screenResObj[key] == true) {
                if ($scope.screen_Name_type == '') {
                    $scope.screen_Name_type = value.screen_id;
                    $scope.screen_resoluton_id = value.screen_resoluton_id;
                }else{
                    $scope.screen_Name_type = $scope.screen_Name_type + ',' + value.screen_id;
                    $scope.screen_resoluton_id = $scope.screen_resoluton_id + ',' + value.screen_resoluton_id;
                }
            }
         });
        getPrivateSpecificReach();
    };

    $scope.facebook_Obj = [];
    $scope.facebookChangedValue = function(operatingSys,index, operatingSysStatus){
        if (operatingSysStatus) {
            if ($scope.facebook_Obj[index] == operatingSys[index]) {
                $scope.facebook_Obj[index] = true;
            }
        }else{
            if ($scope.facebook_Obj[index] == operatingSys[index]) {
                $scope.facebook_Obj[index] = false;
            }
        }
        var facebook_apiRef = $scope.customSegementForm.facebookDetails;;
        $scope.facebook_Name_type = '';
        $scope.fb_code = '';
        angular.forEach(facebook_apiRef, function(value, key){
            if ($scope.facebook_Obj[key] == true) {
                if ($scope.facebook_Name_type == '') {
                    $scope.facebook_Name_type = value.fb_category_name;
                    $scope.fb_code = value.fb_code;
                }else{
                    $scope.facebook_Name_type = $scope.facebook_Name_type + ',' + value.fb_category_name;
                    $scope.fb_code = $scope.fb_code + ',' + value.fb_code;
                }
            }
         });
    };

    $scope.browserSysObj = [];
    $scope.browserSysChangedValue = function(browser,index, browserStatus){
        if (browserStatus) {
            if ($scope.browserSysObj[index] == browser[index]) {
                $scope.browserSysObj[index] = true;
            }
        }else{
            if ($scope.browserSysObj[index] == browser[index]) {
                $scope.browserSysObj[index] = false;
            }
        }
        var browser_apiRef = $scope.technologyData.browserData;
        $scope.browser_version = '';
        $scope.browser_name_type = '';
        angular.forEach(browser_apiRef, function(value, key){
            if ($scope.browserSysObj[key] == true) {
                if ($scope.browser_version == '') {
                    $scope.browser_version = value.browser_code;
                    $scope.browser_name_type = value.browser_name;
                }else{
                    $scope.browser_version = $scope.browser_version + ',' + value.browser_code;
                    $scope.browser_name_type = $scope.browser_name_type + ',' + value.browser_name;
                }
            }
         });
        getPrivateSpecificReach();
    };

    $scope.stateSection = true;
    $scope.citySection = true;
    $scope.zipSection = true;
    $scope.loactionSectionDisable = true;
    $scope.LoactionType = '';
    $scope.selectLocationType = function(selectType){
        $scope.loactionSectionDisable = false;
        $scope.LoactionType = selectType;
        if (selectType == 'Inclusion') {
            $scope.checkInclusion = true;
            $scope.checkExclustion= false;
        }else{
            $scope.checkInclusion = false;
            $scope.checkExclustion= true;
        }
    };

    var countryObj = [];
    $scope.selectAllCountry = function(countryStatus){ 
        $scope.country_api_ref = $scope.countryData;
        $scope.stateData = [];
        $scope.cityData = [];
        if (countryStatus) {
            $scope.countryType = 'All County';
            $scope.country_type = 'All County';
            $scope.stateType = '';
            $scope.cityType = '';
            $scope.stateSection = false;
            $scope.citySection = false;
            $scope.zipSection = false;            
            $scope.country_api_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.country_api_ref.length; i++){
                    if($scope.country_api_ref[i].country_id == e.country_id){
                        countryObj[index] = true;
                        $scope.location_type = 'Multipal Loaction';
                        break;
                    }
                }
                countryObj[index] = countryObj[index] || false;
            });
        }else{
                countryDataEmpty();
                $scope.country_api_ref.map(function(e, index){
                $scope.countryObj = [];  
                countryObj[index] = false;
                $scope.location_type = 'Custom Loaction';
                $scope.stateSection = true;
                $scope.citySection = true;
                $scope.zipSection = true;
            });
        }
        $scope.countryObj = countryObj;
    };
    
    $scope.country_type = '';
    $scope.countyCount = 0;
    $scope.countryObj = [];
    $scope.selectCountry = function(country_code, status, index, country){
        $scope.countryTypeObj = [];
        $scope.checkboxCounty = false;
        $scope.stateData = [];
        $scope.cityData = [];
        if (status) {            
            if ($scope.countryObj[index] == country[index]) {
                $scope.countryObj[index] = true;
            }
        }else{            
            if ($scope.countryObj[index] == country[index]) {
                $scope.countryObj[index] = false;
            }
        }

        angular.forEach($scope.countryData, function(value, index){
            if ($scope.countryObj[index] == true) {
                if ($scope.countryTypeObj.length == 0) {
                    $scope.countryTypeObj = value.country_codes;
                    $scope.countryType = value.country_names;
                    $scope.getState(value.country_codes);
                    getPrivateSpecificReach();

                    $scope.stateSection = true;
                    $scope.citySection = true;
                    $scope.zipSection = true;
                    $scope.location_type = 'Single City';
                }else{
                    $scope.countryTypeObj = $scope.countryTypeObj  + ',' + value.country_codes;
                    $scope.countryType = $scope.countryType +',' + value.country_names;
                    $scope.stateSection = false;
                    $scope.citySection = false;
                    $scope.zipSection = false;
                    $scope.stateData = [];
                    $scope.location_type = 'Multipal City';
                }
            }else{
                if ($scope.countryTypeObj.length == 0) {
                    $scope.countryType = '';
                    $scope.stateType = '';
                    $scope.cityType = '';
                }
            }
        });

        $scope.country_type = $scope.countryTypeObj;
    };

    var stateObj = [];
    $scope.selectAllState = function(stateStatus){
        $scope.cityData = [];
        $scope.state_ref_api = $scope.stateData;
        if (stateStatus) {
            $scope.stateType = 'All State';
            $scope.state_type = 'All State';
            $scope.cityType = '';
            $scope.citySection = false;
            $scope.zipSection = false;            
            $scope.state_ref_api.map(function(e, index){  
                for(let i =0 ; i < $scope.state_ref_api.length; i++){
                    if($scope.state_ref_api[i].state_id == e.state_id){
                        stateObj[index] = true;
                        $scope.location_type = 'Multipal Loaction';
                        break;
                    }
                }
                stateObj[index] = stateObj[index] || false;
            });
        }else{
            stateDataEmpty();
            $scope.state_ref_api.map(function(e, index){  
                stateObj[index] = false;
                $scope.location_type = 'Custom Loaction';                
                $scope.citySection = true;
                $scope.zipSection = true;
            });
        }
        $scope.stateObj = stateObj;
    };

    $scope.state_type = '';
    $scope.stateCount = 0;
    $scope.stateObj = [];
    $scope.selectState = function(state_type, status,index, state){
        $scope.stateTypeObj = [];
        $scope.cityData = [];
        $scope.checkboxState = false;
        if (status) {
            if ($scope.stateObj[index] == state[index]) {
                $scope.stateObj[index] = true;
            }
        }else{
            if ($scope.stateObj[index] == state[index]) {
                $scope.stateObj[index] = false;
            }
        }

        angular.forEach($scope.stateData, function(value, index){
            if ($scope.stateObj[index] == true) {
                if ($scope.stateTypeObj.length == 0) {
                    $scope.stateTypeObj = value.state_code;
                    $scope.stateType = value.state_names;
                    $scope.getCity(value.state_code);
                    getPrivateSpecificReach();
                    $scope.checkboxCounty = false;
                    $scope.citySection = true;
                    $scope.zipSection = true;
                    $scope.location_type = 'Custom Loaction';
                }else{
                    $scope.stateTypeObj = $scope.stateTypeObj  + ',' + value.state_code;
                    $scope.stateType = $scope.stateType +','+ value.state_names;
                    $scope.citySection = false;
                    $scope.zipSection = false;
                    $scope.location_type = 'Custom Loaction';
                }
            }else{
                if ($scope.stateTypeObj.length == 0) {
                    $scope.stateType = '';
                    $scope.cityType = '';
                }
            }
        });

        $scope.state_type = $scope.stateTypeObj;
    };

    var cityObj = [];
    $scope.selectAllCity = function(cityStatus){
        $scope.city_api_ref = $scope.cityData;
        if (cityStatus) { 
            $scope.cityType = 'All City';
            $scope.city_type = 'All City';
            $scope.zipSection = false;           
            $scope.city_api_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.city_api_ref.length; i++){
                    if($scope.city_api_ref[i].city_id == e.city_id){
                        cityObj[index] = true;
                        $scope.location_type = 'Multipal Loaction';
                        break;
                    }
                }
                cityObj[index] = cityObj[index] || false;
            });
        }else{            
            $scope.city_api_ref.map(function(e, index){  
                cityObj[index] = false;
                $scope.location_type = 'Custom Loaction';
                $scope.zipSection = true;
            });
            cityDataEmpty();
        }
        $scope.cityObj = cityObj;
    };

    $scope.city_type = '';
    $scope.cityObj= [];
    $scope.selectCity = function(city, index, city_obj, cityStatus){
        $scope.cityTypeObj= [];
        if (cityStatus) {
            if (cityObj[index] == city[index]) {
                cityObj[index] = true;
            }
        }else{
            if (cityObj[index] == city[index]) {
                cityObj[index] = false;
            }
        }

        angular.forEach($scope.cityData, function(value, index){
            if ($scope.cityObj[index] == true) {
                if ($scope.cityTypeObj.length == 0) {
                    $scope.cityTypeObj = value.city_id;
                    $scope.cityType = value.city_names;
                }else{
                    $scope.cityTypeObj = $scope.cityTypeObj  + ',' + value.city_id;
                    $scope.cityType = $scope.cityType +','+ value.city_names;
                    $scope.checkboxCity = false;
                }
            }else{
                if ($scope.cityTypeObj.length == 0) {
                    $scope.cityType = '';
                }
            }
        });
        getPrivateSpecificReach();

        $scope.city_type = $scope.cityTypeObj;
        $scope.location_type = 'Custom Loaction';
    };

    $scope.loactionFiledsRemove = function(){
        if ($scope.privateSection == false) {
            $scope.countryType = '';
            $scope.stateType = '';
            $scope.cityType = '';
            $scope.LoactionType = '';
            $scope.countryObj = [];
            $scope.stateObj = [];
            $scope.cityObj = [];
            $scope.checkInclusion = false;
            $scope.checkExclustion = false;
            $scope.checkboxCounty = false;
            $scope.checkboxState = false;
            $scope.checkboxCity = false;
            $scope.countySection = true;
            $scope.stateSection = true;
            $scope.citySection = true;
            $scope.zipSection = true;
        }else if ($scope.privateSection == true){
            $scope.countryType = '';
            $scope.stateType = '';
            $scope.cityType = '';
        }else if ($scope.customSection == true) {
            $scope.countryType = '';
            $scope.stateType = '';
            $scope.cityType = '';
        }
    };

    function countryDataEmpty(){
        $scope.countryType = '';
        $scope.stateType = '';
        $scope.cityType = '';
        $scope.LoactionType = '';
        $scope.country_type = '';
        $scope.state_type = '';
        $scope.city_type = '';
        $scope.countryObj = [];
        $scope.stateObj = [];
        $scope.cityObj = [];
    }

    function stateDataEmpty(){        
        $scope.stateType = '';
        $scope.cityType = '';        
        $scope.state_type = '';
        $scope.city_type = '';        
        $scope.stateObj = [];
        $scope.cityObj = [];
    }

    function cityDataEmpty(){
        $scope.cityType = '';
        $scope.city_type = '';
        $scope.cityObj = [];
    }

    $scope.selectDeviceType = function(device, deviceType){
        //$scope.deviceSelect = device;
        $scope.device_type = device;
        if (device == 'Mobile') {
            $scope.getDeviceModel(deviceType);
        }
    };

    $scope.selectDeviceModel = function(model){
        $scope.deviceModelSelect = model;
        $scope.Model = model;
    };

    $scope.savedAudience = function(segment){
        var count = Object.keys(segment).length;

        if (count >= 1) {
            var age_apiRef = $scope.customSegementForm.ageGroup;            

            var language_apiRef = $scope.customSegementForm.language;
            $scope.language = '';
            angular.forEach(language_apiRef, function(value, key){
                if ($scope.languageObj[key] == true) {
                    if ($scope.language == '') {
                        $scope.language = value.lag_id
                    }else{
                        $scope.language = $scope.language + ',' + value.lag_id;
                    }
                }
             });

            var income_apiRef = $scope.customSegementForm.incomeDetails;
            $scope.income = '';
            angular.forEach(income_apiRef, function(value, key){
                if ($scope.incomeObj[key] == true) {
                    if ($scope.income == '') {
                        $scope.income = value.income_id;
                    }else{
                        $scope.income = $scope.income + ',' + value.income_id;
                    }
                }
             });

            var device_apiRef = $scope.technologyData.deviceType;
            $scope.device = '';
            angular.forEach(device_apiRef, function(value, key){
                if ($scope.deviceObj[key] == true) {
                    if ($scope.device == '') {
                        $scope.device = value.device_id;
                    }else{
                        $scope.device = $scope.device + ',' + value.device_id;
                    }
                }
             });

            $scope.deviceId = $scope.device;

            var deviceModel_apiRef = $scope.devioceModel;
            if ($scope.deviceModel == true) {
                $scope.deviceModel = '';
                angular.forEach(deviceModel_apiRef, function(value, key){
                    if ($scope.deviceModelObj[key] == true) {
                        if ( $scope.deviceModel == '') {
                             $scope.deviceModel = value.Id;
                        }else{
                            $scope.deviceModel = $scope.deviceModel + ',' + value.Id;
                        }
                    }
                 });
            }else{
                $scope.deviceModel = false;
            }

            if ($scope.selectChan === 'Adwords' || $scope.selectChan === 'DBM') {
                var affinity_catagery_apiRef = $scope.customSegementForm.affinityCategory;
                $scope.affinity_catagery = '';
                angular.forEach(affinity_catagery_apiRef, function(value, key){
                    if ($scope.affinityObj[key] == true) {
                        if ($scope.affinity_catagery == '') {
                            $scope.affinity_catagery = value.Seg_category_id;;
                        }else{
                            $scope.affinity_catagery = $scope.affinity_catagery + ',' + value.Seg_category_id;
                        }
                    }
                 });

                if (true) {}
                var market_segment_apiRef = $scope.customSegementForm.marketSegment;
                $scope.market_segment = '';
                angular.forEach(market_segment_apiRef, function(value, key){
                    if ($scope.marketSegmentObj[key] == true) {
                        if ($scope.market_segment == '') {
                            $scope.market_segment = value.Seg_category_id;
                        }else{
                            $scope.market_segment = $scope.market_segment + ',' + value.Seg_category_id;
                        }
                        
                    }
                 });
            }else{
                $scope.affinity_catagery = '';
                $scope.market_segment = '';
            }

            if ($scope.selectChan == 'Lightning') {
                var IAB_apiRef = $scope.customSegementForm.IAB;
                $scope.IAB = '';
                angular.forEach(IAB_apiRef, function(value, key){
                    if ($scope.IAB_Obj[key] == true) {
                        if ($scope.IAB == '') {
                            $scope.IAB = value.seg_id;
                        }else{
                            $scope.IAB = $scope.IAB + ',' + value.seg_id;
                        }
                    }
                 });
            }else{
                $scope.IAB = '';
            }

            newSegmentFormValidation(count, segment);
        }else{
            validationAlert();
        }
    };

    function newSegmentFormValidation(count, segment){
        if (count >= 1 && $scope.LoactionType != '' && $scope.country_type != '' && $scope.device != '' && $scope.gender_type != '' &&  $scope.age_type != '' && $scope.language != '' && $scope.income != '' && $scope.screen_Name_type != '' && $scope.operatingSys_Name_type != '' && $scope.browser_version != '' ) {
            //$scope.savedAudienceSegementFields(segment, $scope.chanelId);
            if ($scope.countryObj.length <= 1) {
                if ($scope.state_type != '') {
                    if ($scope.stateObj.length <= 1) {
                        if ($scope.city_type == '') {
                            validationAlert();
                        }else{
                            var loactionSection = 'OK';
                        }
                    }else{
                        var loactionSection = 'OK';
                    }
                }else{
                    validationAlert();
                }
            }else{
                var loactionSection = 'OK';
            }

            if($scope.deviceModel == true){
                if ($scope.deviceModel == '') {
                    validationAlert();
                }else{
                    var deviceSectioinStatus = 'OK';
                }
            }else{
                var deviceSectioinStatus = 'OK';
            }

            if ($scope.selectChan == 'Adwords' || $scope.selectChan == 'DBM') {
                if ($scope.affinity_catagery_type == '') {
                    validationAlert();
                } else if ($scope.market_segment_type == '') {
                        validationAlert();
                    }else{
                        var marketSection = 'OK';
                    }
            }

            if ($scope.selectChan == 'Lightning') {
                if ($scope.IAB_Name_type == '') {
                    validationAlert();
                }else{
                    var marketSection = 'OK';
                }
            }

            if ($scope.selectChan == 'Facebook') {
                if ($scope.fb_code == '') {
                    validationAlert();
                }else{
                    var marketSection = 'OK';
                }
            }

            if (loactionSection == 'OK' && deviceSectioinStatus == 'OK' && marketSection == 'OK') {
                $scope.savedAudienceSegementFields(segment, $scope.chanelId);
            }else{
                validationAlert();
            }
        }else{
            validationAlert();
        }
    };

    function validationAlert(){
        swal('All fields are Mandatory!');
    };

    $scope.savedAudienceSegementFields = function(segment, chanelId){
        loaderEvent.loaderActivate();
        var count = Object.keys(segment).length;
        if (count >= 1 && $scope.LoactionType != '' && $scope.country_type != '' && $scope.device != '' && $scope.gender_type != '' &&  $scope.age_type != '' && $scope.language != '' && $scope.income != '' && $scope.screen_Name_type != '' && $scope.operatingSys_Name_type != '' && $scope.browser_version != '') {
            if($scope.chanelId){
                var chanelId = $scope.chanelId;
            }else{
                var chanelId = chanelId;
            }

            var segementData = {};
                segementData = segment;
                segementData.segment_type = $scope.selectChan;
                segementData.income = $scope.income;
                segementData.device_type = $scope.device;
                segementData.age_type = $scope.age_type;
                segementData.gender_type = $scope.gender_type;
                segementData.affinity_catagery = $scope.affinity_catagery;
                segementData.language = $scope.language;
                segementData.market_segment = $scope.market_segment;
                segementData.IAB = $scope.IAB;
                segementData.Model = $scope.deviceModel;
                segementData.country_type = $scope.country_type;
                segementData.state_type = $scope.state_type;
                segementData.city_type = $scope.city_type;
                segementData.location_type = $scope.LoactionType;
                segementData.operating_sys_version = $scope.operating_sys_id;
                segementData.screen_resulation = $scope.screen_resoluton_id;
                segementData.fb_code = $scope.fb_code;
                segementData.browser_version = $scope.browser_version;
                segementData.channel_id = $scope.chanelId;
                segementData.isAction = true;
                segementData.age_name = $scope.age_name;
                segementData.gender_name = $scope.gender_name;
                segementData.language_name = $scope.language_name;
                segementData.device_name = $scope.device_type_get;
                segementData.country_name = $scope.countryType;
                segementData.state_name = $scope.stateType;
                segementData.city_name = $scope.cityType;
                segementData.income_name = $scope.income_Type;                
                segementData.affinity_catagery_type = $scope.affinity_catagery_type;
                segementData.market_segment_type = $scope.market_segment_type;
                segementData.IAB_Name_type = $scope.IAB_Name_type;
                segementData.facebook_Name_type = $scope.facebook_Name_type;
                segementData.operatingSys_Name_type = $scope.operatingSys_Name_type;
                segementData.browser_name_type = $scope.browser_name_type;
                segementData.screen_Name_type = $scope.screen_Name_type;
                segementData.device_model_get = $scope.device_model_get;

                $scope.segmentDataList = segementData;
                if (!$scope.editCheck) {
                    return audienceFactory.postAudienceSegement(segementData).then(function(response, status){
                        $scope.newSegementCreateForm = false;
                        $scope.audienceSegementSection = false;
                        loaderEvent.loaderDeactivate();
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
                            $scope.getAudienceSegement();
                            $('.audience-section').removeClass('content-active');
                            $('.database-marketplace-options').removeClass('content-showcase');
                            $('.set-audience-parameters').removeClass('content-active');
                            $('.create-audience-section').addClass('content-active');
                            document.getElementById("defaultOpen").click();
                            $scope.countySelect = 'Select County';
                            $scope.stateSelect = 'Select State';
                            $scope.citySelect = 'Select City';
                            $scope.deviceSelect = 'Select Device';
                            $scope.deviceModelSelect = 'Select Model';
                            $scope.country_type = '';
                            $scope.city_type = '';
                            $scope.state_type = '';
                            $scope.device_type = '';
                            $scope.Model = '';
                            $scope.ageGroup = [];
                            $scope. genderGroup = [];
                            //$('.create-audience-section').addClass('content-showcase');
                          }
                          else{
                            $('.create-audience-section').removeClass('content-active');
                            $('.audience-section').addClass('content-active');
                            $scope.getAudienceSegement();
                            $scope.countySelect = 'Select County';
                            $scope.stateSelect = 'Select State';
                            $scope.citySelect = 'Select City';
                            $scope.deviceSelect = 'Select Device';
                            $scope.deviceModelSelect = 'Select Model';
                            $scope.country_type = '';
                            $scope.city_type = '';
                            $scope.state_type = '';
                            $scope.device_type = '';
                            $scope.Model = '';
                            $scope.ageGroup = [];
                            $scope. genderGroup = [];
                          }
                        })
                    });
                }else if ($scope.editCheck) {
                    return audienceFactory.editAudienceSegement(segementData).then(function(response, status){
                        $scope.newSegementCreateForm = false;
                        $scope.audienceSegementSection = false;
                        loaderEvent.loaderDeactivate();
                        $scope.channel = {}
                        $('.create-audience-section').removeClass('content-active');
                        $('.audience-section').addClass('content-active');
                        $scope.getAudienceSegement();
                        $scope.countySelect = 'Select County';
                        $scope.stateSelect = 'Select State';
                        $scope.citySelect = 'Select City';
                        $scope.deviceSelect = 'Select Device';
                        $scope.deviceModelSelect = 'Select Model';
                        $scope.country_type = '';
                        $scope.city_type = '';
                        $scope.state_type = '';
                        $scope.device_type = '';
                        $scope.Model = '';
                        $scope.ageGroup = [];
                        $scope. genderGroup = [];
                    });
                }
        }
    };

    $scope.cancelAudienceSegement = function(){
        $scope.privateSection = false;
        $('.set-audience-parameters').hide();
        $('.database-marketplace-options').show();
        $scope.getAudienceSegement();
        $scope.channel = {};
        $scope.ageGroup = [];
        $scope.genderGroup = [];
        $scope.countryType = '';
        $scope.stateType = '';
        $scope.cityType = '';
        $scope.operatingSys_Name_type = '';
        $scope.screen_Name_type = '';
        $scope.citySelect = 'Select City';
        $scope.stateSelect = 'Select State';
        $scope.countySelect = 'Select Country';
        $scope.channel = [];
        $scope.IAB_Obj = [];
        $scope.languageObj = [];
        $scope.affinityObj = [];
        $scope.incomeObj = [];
        $scope.marketSegmentObj = [];
        $scope.language_name = '';
        $scope.income_Type = '';
        $scope.affinity_catagery_type = '';
        $scope.market_segment_type = '';
        $scope.IAB_Name_type = '';
        $scope.facebook_Name_type = '';
        $scope.operatingSys_Name_type = '';
        $scope.screen_Name_type = '';
        $scope.device_type_get = '';
        $scope.device_model_get = '';
        $scope.browser_version = '';
    };

    $scope.getCustomSegmentsFields = function(){
        loaderEvent.loaderActivate();
        return audienceFactory.getCustomSegmentsFields().then(function(response, status){
            $scope.customFormFields = response;            
            $scope.getCustomReach();
            $scope.getDemographic();
            loaderEvent.loaderDeactivate();
        });
    };    

    $scope.getCustomFormFieldsData = function(filterDate){
        switch(filterDate){
            case 'Demographics' :
                if ($scope.privateSection) {
                    // $scope.getDemographic();
                    $scope.getTargetingSummary();
                }else{
                    $scope.getDemographic();
                }
                break;
            case 'Technology' :
                if ($scope.privateSection) {
                    // $scope.getTechnology();
                    $scope.getTargetingSummary();
                }else{
                    $scope.getTechnology();
                }
                break;            
            case 'Location sidebar' :
                if ($scope.privateSection) {
                    // $scope.getCountry();
                    $scope.getTargetingSummary();
                }else{
                    $scope.getCountry();
                }
                break;
            }
    };

    $scope.getDemographic = function(){
        $scope.technology = false;
        $scope.loaction = false;
        $scope.newChanele = false;
        loaderEvent.loaderActivate();
        return campaignFactory.getDemographic().then(function(response, status){
            $scope.demographic = true;
            $scope.customSegementForm = response;
            $scope.customSegem = response;
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.getTechnology = function(){
        $scope.demographic = false;
        $scope.loaction = false;
        $scope.newChanele = false;
        loaderEvent.loaderActivate();
        return campaignFactory.getTechnology().then(function(response,status){
            $scope.technology = true;
            $scope.technologyData = response;
            loaderEvent.loaderDeactivate();
        });
    };
   
    $scope.getDeviceModel = function(deviceType){
        if (deviceType == 'Mobile') {
            loaderEvent.loaderActivate();
            return campaignFactory.getDeviceModel().then(function(response,status){
                    $scope.devioceModel = response;
                    loaderEvent.loaderDeactivate();
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
        loaderEvent.loaderActivate();
        return campaignFactory.getCountry().then(function(response,status){
            $scope.loaction = true;
            $scope.countryData = response;
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.getState = function(countyCode){
        loaderEvent.loaderActivate();
        return campaignFactory.getState(countyCode).then(function(response,status){
            $scope.stateData = response;
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.getCity = function(stateCode){
        loaderEvent.loaderActivate();
        return campaignFactory.getCity(stateCode).then(function(response,status){
            $scope.cityData = response;
            loaderEvent.loaderDeactivate()
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

    $scope.getCampaignChanel = function(){
        $scope.channelSection = true;
        loaderEvent.loaderActivate();
        return campaignChannelFactory.getCampaignChanel().then(function(response, status) {
            $scope.campaignChennel = response;
            loaderEvent.loaderDeactivate();
        });
    };
    $scope.newChanel = function(){
        $scope.chanelId = '';
        $scope.advanceActive = true;
    };
    $scope.selectChannel = function(channel){
        if ($scope.scriptTag) {
            $scope.channelScriptTag = $scope.scriptTag;
            swal({
                title: 'Please copy this script',
                text: $scope.channelScriptTag.tag,
                confirmButtonColor: '#3085d6',            
                confirmButtonText: 'Copy to Clipboard'
            }).then(function (result) {
              if (result.value) {
                //$scope.chanelId = channel.channel_id;
                $scope.channelList = channel;
                $scope.selectChan = $scope.SelectChannelName;
              }
            });
        }else{
            $scope.channelScriptTag = channel.scriptTag;
            swal({
                title: 'Please copy this script',
                text: channel.scriptTag,
                confirmButtonColor: '#3085d6',            
                confirmButtonText: 'Copy to Clipboard'
            }).then(function (result) {
              if (result.value) {
                $scope.chanelId = channel.channel_id;
                $scope.channelList = channel;
                $scope.selectChan = channel.channelType;
              }
            });
        }     
    };

    $scope.newChannelCreate = function(){
        var channel = {}
            channel = $scope.channelList;
            channel.channelAccessToken = $scope.accessTocken;
            channel.channelName = $scope.SelectChannelName;
            channel.scriptTag = $scope.channelScriptTag.tag;
            loaderEvent.loaderActivate();
        return campaignChannelFactory.savedChannel(channel).then(function(response, status) {
            $scope.chanelId = response[0].channel_id;
            $scope.getAudienceSegement();
            $scope.scriptTag = '';
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.createNewCampaignChanel = function(ChannelObj){ 
        $scope.privateSection = false;
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

    $scope.getCustomReach = function(segementData){
        $scope.combined = [];
        loaderEvent.loaderActivate();
        angular.forEach( $scope.segmentDataList, function(value, key){
            if (value.segment_type == 'Lightning') {
            audienceFactory.getCustomReach(value).then(function(response, status) {
                $scope.combined.push({seg: value.segement_name, rea: response[0].reach});
                loaderEvent.loaderDeactivate();
                });
            }
        });
        
    };

    $scope.getPrivateReach = function(){
        var reach = [];
        loaderEvent.loaderActivate();
        return audienceFactory.getPrivateReach().then(function(response, status) {
            reach.push(response[0].reach);
            $scope.privateReach = response[0].reach;
            loaderEvent.loaderDeactivate();
        });
    };

    function getTargeting(){
        loaderEvent.loaderActivate();
        return audienceFactory.getTargetingSummary().then(function(response, status) {
            return response;
            loaderEvent.loaderDeactivate();
        });
    }

    $scope.getPrivateAudienceMarketplaceList = function(){
        loaderEvent.loaderActivate();
        return audienceFactory.getPrivateAudienceMarketplaceList().then(function(response, status) {
            $scope.privateAudienceMarketplaceList = [response];
            $scope.getPrivateReach();
            loaderEvent.loaderDeactivate();
        });
    };    

    $scope.selectPrivateSegement =function(){
        $scope.getPrivateReach();
        $scope.getDemographic();
        $scope.getCountry();
        $scope.getTechnology();
        $scope.getDeviceModel('Mobile');
        // $timeout(function () {
        //     $scope.getTargetingSummary();
        // }, 500);
        
        $scope.privateSection = true;        
    };

    var ageGroup = [];
    var genderGroup = [];
    var languageObj = [];
    var incomeObj = [];
    var deviceObj = [];
    var deviceModelObj = [];
    var affinityObj = [];
    var marketSegmentObj = [];
    var IAB_Obj = [];
    var operatingSysObj = [];
    var screenResObj = [];
    var browserSysObj = [];

    $scope.customSegment = false;
    $scope.selectCustomSegement = function(segementList){
        $scope.getDemographic();
        $scope.getTechnology();
        $scope.getDeviceModel('Mobile');
        $scope.customSegment = true;
        $scope.segmentListData = segementList;
    };

    $scope.customSection = false;
    $scope.privateSection = false;
    $scope.setSegmentFields = function(){
        $(".database-marketplace-options").hide();
        $(".set-audience-parameters").show();
        if ($scope.customSegment) {
            $scope.customSection = true;
            //$scope.customSegementSet($scope.segmentListData);
            checke_custome_Api_respomce();
        }else if ($scope.privateSection){
            $scope.getTargetingSummary();
            $scope.privateSection = true;
        }else{
            $scope.getDemographic();
        }
    };

    function checke_custome_Api_respomce(){
        if ($scope.type == 'Adwords' || $scope.type == 'DBM') {
            if($scope.customSegem && $scope.technologyData && $scope.devioceModel) {
                $scope.customSegementSet($scope.segmentListData);
                loaderEvent.loaderDeactivate();
            }else{
                $timeout(function(){
                    loaderEvent.loaderActivate();
                    checke_custome_Api_respomce();
                }, 500);
            }
        }else{
            if($scope.customSegem && $scope.technologyData && $scope.devioceModel) {
                $scope.customSegementSet($scope.segmentListData);
                loaderEvent.loaderDeactivate();
            }else{
                $timeout(function(){
                    loaderEvent.loaderActivate();
                    checke_custome_Api_respomce();
                }, 500);
            }
        }
    };

    $scope.customSegementSet = function(segementList){       
        loaderEvent.loaderActivate();
        if ($scope.selectChan == 'Adwords' || $scope.selectChan == 'DBM') {
            var iab_split = segementList.IAB.split(',');
            var market_api_responce = [];
            var affinity_api_responce = [];

            $scope.affinity_ref = $scope.customSegem.affinityCategory;
            $scope.marketSeg_ref = $scope.customSegem.marketSegment;

            angular.forEach(iab_split, function(value){
                if (value) {
                    var categoryType = 'market';
                    return audienceFactory.getCustomSegementChanges($scope.selectChan, categoryType, value).then(function(response, status) {
                        market_api_responce.push(response);

                        $scope.market_segment_type = '';
                        $scope.marketSeg_ref.map(function(e, index){ 
                            for(let i =0 ; i < market_api_responce.length; i++){
                                if(market_api_responce[i].id == e.Seg_category_id){
                                    marketSegmentObj[index] = true;
                                    if ($scope.market_segment_type == '') {
                                        $scope.market_segment_type = e.seg_category_name;
                                    }else{
                                        $scope.market_segment_type = $scope.market_segment_type + ',' + e.seg_category_name;
                                    }                                    
                                    break;
                                }
                            }
                            marketSegmentObj[index] = marketSegmentObj[index] || false;
                        });
                    });
                }
            });

            angular.forEach(iab_split, function(value){
                if (value) {
                    var categoryType = 'affinity';
                    return audienceFactory.getCustomSegementChanges($scope.selectChan,categoryType, value).then(function(response, status) {
                       affinity_api_responce.push(response);                       
                       
                        $scope.affinity_catagery_type = '';
                        $scope.affinity_ref.map(function(e, index){
                            for(let i =0 ; i < affinity_api_responce.length; i++){
                                if(affinity_api_responce[i].id == e.Seg_category_id){
                                    affinityObj[index] = true;
                                    if ($scope.affinity_catagery_type == '') {
                                        $scope.affinity_catagery_type = e.category_name;
                                    }else{
                                        $scope.affinity_catagery_type = $scope.affinity_catagery_type + ',' + e.category_name;
                                    }
                                    break;
                                }
                            }
                            affinityObj[index] = affinityObj[index] || false;
                        });
                    });
                }
            });
        }else if($scope.selectChan == 'IDB'){
            var iab_split = segementList.IAB.split(',');

            $scope.IAB_ref = $scope.customSegem.IAB;
            $scope.IAB_Name_type = '';
            $scope.IAB_ref.map(function(e, index){ 
                for(let i =0 ; i < iab_split.length; i++){
                    if(iab_split[i] == e.seg_id){
                        IAB_Obj[index] = true;
                        $scope.IAB = '';
                        $scope.IAB = $scope.IAB + e.seg_id + ',';
                        if ($scope.IAB_Name_type == '') {
                            $scope.IAB_Name_type = e.category_name;
                        }else{
                            $scope.IAB_Name_type = $scope.IAB_Name_type + ',' + e.category_name;
                        }
                        break;
                    }
                }
                IAB_Obj[index] = IAB_Obj[index] || false;
            });
        }else if ($scope.selectChan == 'Facebook') {

        }

        var age_split = segementList.age_type.split(',');
        var gender_split = segementList.gender_type.split(',');
        var language_split = segementList.language.split(',');
        var income_split = segementList.income.split(',');
        var device_split = segementList.device_type.split(',');
        var operatingSys_split = segementList.operating_sys_version.split(',');
        var screenRes_split = segementList.screen_resulation.split(',');
        var browser_split = segementList.browser_version.split(',');

        if (segementList.Model) {
            var device_model_split = segementList.Model.split(',');
        }
        if (segementList.affinity_catagery) {
            var affinity_split = segementList.affinity_catagery.split(',');
        }
        if (segementList.market_segment) {
            var market_split = segementList.market_segment.split(',');
        }

        $scope.ageGroup_ref = $scope.customSegem.ageGroup;
        $scope.genderGroup_ref = $scope.customSegem.gender;
        $scope.language_ref = $scope.customSegem.language;
        $scope.income_ref = $scope.customSegem.incomeDetails;
        $scope.device_ref = $scope.technologyData.deviceType;
        $scope.device_model_ref = $scope.devioceModel;
        $scope.operatingSys_ref = $scope.technologyData.operatingSystem;
        $scope.screenRes_ref = $scope.technologyData.screenResoluton;
        $scope.browserRes_ref = $scope.technologyData.browserData;
   

        $scope.ageGroup_ref.map(function(e, index){  
            for(let i =0 ; i < age_split.length; i++){
                if(age_split[i] == e.age_id){
                    ageGroup[index] = true;
                    break;
                }
            }

            ageGroup[index] = ageGroup[index] || false;
        });

        $scope.genderGroup_ref.map(function(e, index){  
            for(let i =0 ; i < gender_split.length; i++){
                if(gender_split[i] == e.gender_id){
                    genderGroup[index] = true;
                    break;
                }
            }
            genderGroup[index] = genderGroup[index] || false;
        });

        $scope.genderGroup_ref.map(function(e, index){  
            for(let i =0 ; i < gender_split.length; i++){
                if(gender_split[i] == e.gender_id){
                    genderGroup[index] = true;
                    break;
                }
            }
            genderGroup[index] = genderGroup[index] || false;
        });
        $scope.language_name = '';
        $scope.language_ref.map(function(e, index){
            for(let i =0 ; i < language_split.length; i++){
                if(language_split[i] == e.lag_id){
                    languageObj[index] = true;
                    if ($scope.language_name == '') {
                        $scope.language_name = e.language;
                    }else{
                        $scope.language_name = $scope.language_name + ',' + e.language;
                    }
                    break;
                }
            }
            languageObj[index] = languageObj[index] || false;
        });

        $scope.income_Type = '';
        $scope.income_ref.map(function(e, index){
            for(let i =0 ; i < income_split.length; i++){
                if(income_split[i] == e.income_id){
                    incomeObj[index] = true;
                    if ($scope.income_Type == '') {
                        $scope.income_Type = e.income_name;
                    }else{
                        $scope.income_Type = $scope.income_Type + ',' + e.income_name;
                    }
                    
                    break;
                }
            }
            incomeObj[index] = incomeObj[index] || false;
        });
        
        $scope.device = '';
        $scope.deviceSelectName = '';
        $scope.device_ref.map(function(e, index){
            for(let i =0 ; i < device_split.length; i++){
                if(device_split[i] == e.device_id){
                    deviceObj[index] = true;
                    if ($scope.device == '') {
                        $scope.device = e.device_id;
                        $scope.deviceSelectName = e.device_type;
                    }else{
                        $scope.device = $scope.device + ',' + e.device_id;
                        $scope.deviceSelectName = $scope.deviceSelectName + ',' + e.device_type;    
                    }
                    break;
                }
            }
            deviceObj[index] = deviceObj[index] || false;
        });

        $scope.deviceId = $scope.device;

        $scope.deviceModel = '';
        $scope.device_type_get = '';
        if (segementList.Model) {
            $scope.deviceModel = false;
            $scope.device_model_ref.map(function(e, index){
                for(let i =0 ; i < device_model_split.length; i++){
                    if(income_split[i] == e.Id){
                        deviceModelObj[index] = true;
                        if ($scope.deviceModel == '') {
                            $scope.deviceModel = e.Id;
                            $scope.device_type_get = e.device_type;
                        }else{
                            $scope.deviceModel = $scope.deviceModel + ',' + e.Id;
                            $scope.device_type_get = $scope.device_type_get + ',' + e.device_type; 
                        }
                        break;
                    }
                }
                deviceModelObj[index] = deviceModelObj[index] || false;
            });
        }else{
            $scope.deviceModel = true;
        }

        $scope.operatingSys_Name_type = '';
        $scope.operating_sys_id = '';
        $scope.operatingSys_ref.map(function(e, index){
            for(let i =0 ; i < operatingSys_split.length; i++){
                if(operatingSys_split[i] == e.operating_sys_id){
                    operatingSysObj[index] = true;
                    if ($scope.operatingSys_Name_type == '') {
                        $scope.operatingSys_Name_type = e.os_version;
                        $scope.operating_sys_id = e.operating_sys_id;
                    }else{
                        $scope.operatingSys_Name_type = $scope.operatingSys_Name_type + ',' + e.os_version;    
                        $scope.operating_sys_id = $scope.operating_sys_id + ',' + e.operating_sys_id;    
                    }
                    break;
                }
            }
            operatingSysObj[index] = operatingSysObj[index] || false;
        });

        $scope.screen_Name_type = '';
        $scope.screen_resoluton_id = '';
        $scope.screenRes_ref.map(function(e, index){
            for(let i =0 ; i < screenRes_split.length; i++){
                if(screenRes_split[i] == e.screen_resoluton_id){
                    screenResObj[index] = true;
                    if ($scope.screen_Name_type == '') {
                        $scope.screen_Name_type = e.screen_id;
                        $scope.screen_resoluton_id = e.screen_id;
                    }else{
                        $scope.screen_Name_type = $scope.screen_Name_type + ',' + e.screen_id;                        
                        $scope.screen_resoluton_id = $scope.screen_resoluton_id + ',' + e.screen_id;                        
                    }
                    break;
                }
            }
            screenResObj[index] = screenResObj[index] || false;
        });

        $scope.browser_version = '';
        $scope.browserRes_ref.map(function(e, index){
            for(let i =0 ; i < browser_split.length; i++){
                if(browser_split[i] == e.browser_id){
                    browserSysObj[index] = true;
                    if ($scope.browser_version == '') {
                        $scope.browser_version = e.browser_version;
                    }else{
                        $scope.browser_version = $scope.browser_version + ',' + e.browser_version;
                    }
                    break;
                }
            }
            browserSysObj[index] = browserSysObj[index] || false;
        });


        $scope.stateType = '';
        $scope.cityType = '';
        $scope.countryType = segementList.country_type;
        $scope.stateType = segementList.state_type;
        $scope.cityType = segementList.city_type;

        $scope.channel = {
            operating_system : segementList.operating_system,
            operating_sys_version : segementList.operating_sys_version,
            browser : segementList.browser,
            browser_version : segementList.browser_version,
            screen_resulation : segementList.screen_resulation,
            zipcode : segementList.zipcode
        }

        $scope.country_type = segementList.country_type;
        $scope.state_type = segementList.state_type;
        $scope.city_type = segementList.city_type;
        $scope.countySelect = segementList.country_type;
        $scope.stateSelect = segementList.state_type;
        $scope.citySelect = segementList.city_type;

        $scope.ageGroup = ageGroup;
        $scope.genderGroup = genderGroup;
        $scope.languageObj = languageObj;
        $scope.incomeObj = incomeObj;
        $scope.affinityObj = affinityObj;
        $scope.marketSegmentObj = marketSegmentObj;
        $scope.IAB_Obj = IAB_Obj;
        $scope.deviceObj = deviceObj;
        $scope.deviceModelObj = deviceModelObj;
        $scope.screenResObj = screenResObj;
        $scope.operatingSysObj = operatingSysObj;
        $scope.browserSysObj = browserSysObj;
        loaderEvent.loaderDeactivate();
    };

    $scope.getTargetingSummary = function(){
        var channel = $scope.channelList;
        var channel_type = $scope.selectChan;
        loaderEvent.loaderActivate();
        return audienceFactory.getTargetingSummary().then(function(response, status) {
            //$scope.customSegementForm = response;

            if (channel_type == 'Adwords' || channel_type == 'DBM') {
                getMarket(channel, channel_type, response.apiResponce);
                getAffinity(channel, channel_type, response.apiResponce);   
            }
            

            $scope.channel = {
                language : response.language[0].language,
                income : response.incomeDetails[0].income

            }

            $scope.api_responce = response;
            $scope.type = channel_type;
            checke_Api_respomce();            
        });
    };

    function checke_Api_respomce(){
        if ($scope.type == 'Adwords' || $scope.type == 'DBM') {
            if($scope.marketDataList && $scope.customSegem && $scope.technologyData && $scope.devioceModel && $scope.countryData) {
                setPrivateFields();
                loaderEvent.loaderDeactivate();
            }else{
                $timeout(function(){
                    loaderEvent.loaderActivate();
                    checke_Api_respomce();
                }, 500);
            }
        }else{
            if($scope.customSegem && $scope.technologyData && $scope.devioceModel && $scope.countryData) {
                setPrivateFields();
                loaderEvent.loaderDeactivate();
            }else{
                $timeout(function(){
                    loaderEvent.loaderActivate();
                    checke_Api_respomce();
                }, 500);
            }
        }
    };

    function setPrivateFields(){
        $scope.ageGroup_ref = $scope.customSegem.ageGroup;

        $scope.genderGroup_ref = $scope.customSegem.gender;

        $scope.language_ref = $scope.customSegem.language;

        $scope.income_ref = $scope.customSegem.incomeDetails; 

        $scope.affinity_ref = $scope.marketDataList;

        $scope.marketSeg_ref = $scope.marketDataList;

        $scope.country_ref = $scope.countryData;

        $scope.state_ref = $scope.stateData;

        $scope.city_ref = $scope.cityData;

        $scope.device_ref = $scope.technologyData.deviceType;

        $scope.device_model_ref = $scope.devioceModel;

        $scope.operatingSys_ref = $scope.technologyData.operatingSystem;

        if ($scope.type == 'Lightning') {
            $scope.IAB_ref = $scope.customSegem.IAB;
        }

        if ($scope.api_responce.locations.length == 0) {
            var stateCode = $scope.api_responce.locations[0].state_code;
            $scope.getState(stateCode);
            $scope.getCity(cityId);
        }

        $scope.age_type = '';
        $scope.ageGroup_ref.map(function(e, index){  
            for(let i =0 ; i < $scope.api_responce.ageGroup.length; i++){
                if($scope.api_responce.ageGroup[i].age == e.age){
                    ageGroup[index] = true;
                    if ($scope.age_type == '') {
                        $scope.age_type = e.age_id;
                    }else{
                        $scope.age_type = $scope.age_type + ',' + e.age_id;
                    }
                    break;
                }
            }

            ageGroup[index] = ageGroup[index] || false;
        });

        $scope.gender_type = '';
        $scope.genderGroup_ref.map(function(e, index){  
            for(let i =0 ; i < $scope.api_responce.gender.length; i++){
                if($scope.api_responce.gender[i].gender == e.gender){
                    genderGroup[index] = true;
                    if ($scope.gender_type == '') {
                        $scope.gender_type = e.gender_id;
                    }else{
                        $scope.gender_type = $scope.gender_type + ',' + e.gender_id;
                    }
                    break;
                }
            }
            genderGroup[index] = genderGroup[index] || false;
        });
        $scope.language_name = '';
        $scope.language_ref.map(function(e, index){ 
            for(let i =0 ; i < $scope.api_responce.language.length; i++){
                if($scope.api_responce.language[i].language == e.language){
                    languageObj[index] = true;
                    if ($scope.language_name == '') {
                        $scope.language_name = e.language;
                    }else{
                        $scope.language_name = $scope.language_name + ',' + e.language;
                    }
                    break;
                }
            }
            languageObj[index] = languageObj[index] || false;
        });
        $scope.income_Type = '';
        $scope.income_ref.map(function(e, index){
            for(let i =0 ; i < $scope.api_responce.incomeDetails.length; i++){
                if($scope.api_responce.incomeDetails[i].income_name == e.income_name){
                    incomeObj[index] = true;
                    if ($scope.income_Type == '') {
                        $scope.income_Type = e.income_name;
                    }else{
                        $scope.income_Type = $scope.income_Type + ',' + e.income_name;
                    }
                    
                    break;
                }
            }
            incomeObj[index] = incomeObj[index] || false;
        });

        if ($scope.type == 'Lightning') {
            $scope.IAB_Name_type = '';
            $scope.IAB_ref.map(function(e, index){
                for(let i =0 ; i < $scope.api_responce.IAB.length; i++){
                    if($scope.api_responce.IAB[i].category_name == e.category_name){
                        IAB_Obj[index] = true;
                        $scope.IAB = '';
                        if ($scope.IAB_Name_type == '') {
                            $scope.IAB = e.seg_id
                            $scope.IAB_Name_type = e.category_name;
                        }else{
                            $scope.IAB = $scope.IAB + ',' + e.seg_id;

                            $scope.IAB_Name_type = $scope.IAB_Name_type + ',' + e.category_name;
                        }
                        
                        break;
                    }
                }
                IAB_Obj[index] = IAB_Obj[index] || false;
            });
        }

        if ($scope.type == 'Adwords' || $scope.type == 'DBM') {
            $scope.market_segment_type = '';
            $scope.marketSeg_ref.map(function(e, index){ 
                for(let i =0 ; i < $scope.marketDataList.length; i++){
                    if($scope.marketDataList[i].id == e.Seg_category_id){
                        marketSegmentObj[index] = true;
                        if ($scope.market_segment_type == '') {
                            $scope.market_segment_type = e.seg_category_name;
                        }else{
                            $scope.market_segment_type = $scope.market_segment_type + ',' + e.seg_category_name;
                        }
                        break;
                    }
                }
                marketSegmentObj[index] = marketSegmentObj[index] || false;
            });

            $scope.affinity_catagery_type = '';
            $scope.affinity_ref.map(function(e, index){
                for(let i =0 ; i < $scope.affinityDataLlist.length; i++){
                    if($scope.affinityDataLlist[i].id == e.Seg_category_id){
                        affinityObj[index] = true;
                        if ($scope.affinity_catagery_type == '') {
                            $scope.affinity_catagery_type = e.category_name;
                        }else{
                            $scope.affinity_catagery_type = $scope.affinity_catagery_type + ',' + e.category_name;
                        }
                        break;
                    }
                }
                affinityObj[index] = affinityObj[index] || false;
            });
        }

        $scope.countryTypeObj = '';
        $scope.countryType = '';
        $scope.country_type = '';
        $scope.country_ref.map(function(e, index){  
            for(let i =0 ; i < $scope.api_responce.locations.length; i++){
                if($scope.api_responce.locations[i].country_codes == e.country_codes){
                    countryObj[index] = true;
                    if ($scope.countryTypeObj == '') {
                        $scope.countryTypeObj = e.country_codes;
                        $scope.countryType = e.country_names;
                        $scope.country_type = e.country_codes;
                    }else{
                        $scope.countryTypeObj = $scope.countryTypeObj  + ',' + e.country_code;
                        $scope.countryType = $scope.countryType +','+ e.country_names;
                        $scope.country_type =  $scope.country_type + ',' + e.country_code;
                    }

                    break;
                }
            }

            countryObj[index] = countryObj[index] || false;
        });

        // if ($scope.api_responce.locations.length == 0) {
        //     $scope.stateTypeObj = '';
        //     $scope.stateType = '';
        //     $scope.state_ref.map(function(e, index){  
        //         for(let i =0 ; i < $scope.api_responce.locations.length; i++){
        //             if($scope.api_responce.locations[i].state_code == e.state_code){
        //                 stateObj[index] = true;
        //                 if ($scope.stateTypeObj == '') {
        //                     $scope.stateTypeObj =  e.state_code;
        //                     $scope.stateType = e.state_names;
        //                 }else{
        //                     $scope.stateTypeObj = $scope.stateTypeObj  + ',' + e.state_code;
        //                     $scope.stateType = $scope.stateType +','+ e.state_names;
        //                 }
        //                 break;
        //             }
        //         }

        //         stateObj[index] = stateObj[index] || false;
        //     });

        //     $scope.city_ref.map(function(e, index){  
        //         for(let i =0 ; i < $scope.api_responce.locations.length; i++){
        //             if($scope.api_responce.locations[i].city_id == e.city_id){
        //                 cityObj[index] = true;
        //                 if ($scope.cityTypeObj == '') {
        //                     $scope.cityTypeObj = e.city_id;
        //                     $scope.cityType = e.city_names;
        //                 }else{
        //                     $scope.cityTypeObj = $scope.cityTypeObj  + ',' + e.city_id;
        //                     $scope.cityType = $scope.cityType +','+ e.city_names;
        //                 }
        //                 break;
        //             }
        //         }

        //         cityObj[index] = cityObj[index] || false;
        //     });
        // }
        $scope.LoactionType = 'Inclusion';
        $scope.stateType = '';
        $scope.cityType = '';
        $scope.city_type = '';
        $scope.state_type = '';
        angular.forEach($scope.api_responce.locations,function(value){
            if ($scope.stateType == '') {
                $scope.stateType = value.state_names;
                $scope.cityType = value.city_names;
                $scope.city_type = value.cityId;
                $scope.state_type = value.stateId;
            }else{
                $scope.stateType = $scope.stateType + ',' + value.state_names;
                $scope.cityType = $scope.cityType + ',' + value.city_names;
                $scope.city_type = $scope.city_type + ','+ value.cityId;
                $scope.state_type = $scope.state_type +','+ value.stateId;
            }
        })
        $scope.device_type_get = '';
        $scope.deviceId = '';
        $scope.device_ref.map(function(e, index){  
            for(let i =0 ; i < $scope.api_responce.technologyData.length; i++){
                if($scope.api_responce.technologyData[i].device_Id == e.device_id){
                    deviceObj[index] = true;
                    if ($scope.device_type_get == '') {
                        $scope.device_type_get = e.device_type;
                        $scope.deviceId =  e.device_id
                    }else{
                        $scope.device_type_get = $scope.device_type_get + ',' + e.device_type;
                        $scope.deviceId = $scope.deviceId + ',' + e.device_id;
                    }
                    break;
                }
            }

            deviceObj[index] = deviceObj[index] || false;
        });

        $scope.device_model_get = '';
        if ($scope.api_responce.mobiledeviceobj.length != 0) {
            $scope.deviceModel = false;
            $scope.device_model_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.api_responce.mobiledeviceobj.length; i++){
                    if($scope.api_responce.mobiledeviceobj[i].model_Id == e.Id){
                        deviceModelObj[index] = true;
                        if ($scope.device_model_get == '') {
                            $scope.device_model_get = e.Model;
                        }else{
                            $scope.device_model_get = $scope.device_model_get + ',' + e.Model;
                        }
                        break;
                    }
                }

                deviceModelObj[index] = deviceModelObj[index] || false;
            });
        }

        $scope.operatingSys_Name_type = '';
        $scope.operating_sys_id = '';
        $scope.operatingSys_ref.map(function(e, index){  
            for(let i =0 ; i < $scope.api_responce.operatingsystem.length; i++){
                if($scope.api_responce.operatingsystem[i].operating_sys_id == e.operating_sys_id){
                    operatingSysObj[index] = true;
                    if ($scope.operatingSys_Name_type == '') {
                        $scope.operatingSys_Name_type = e.os_version;
                        $scope.operating_sys_id = e.operating_sys_id;
                    }else{
                        $scope.operatingSys_Name_type = $scope.operatingSys_Name_type + ',' + e.os_version;
                        $scope.operating_sys_id = $scope.operating_sys_id + ',' + e.operating_sys_id;
                    }
                    break;
                }
            }

            operatingSysObj[index] = operatingSysObj[index] || false;
        });

        $scope.ageGroup = ageGroup;
        $scope.genderGroup = genderGroup;
        $scope.languageObj = languageObj;
        $scope.incomeObj = incomeObj;
        $scope.affinityObj = affinityObj;
        $scope.marketSegmentObj = marketSegmentObj;
        $scope.IAB_Obj = IAB_Obj;
        $scope.countryObj = countryObj;
        $scope.stateObj = stateObj;
        $scope.cityObj = cityObj;
        $scope.deviceObj = deviceObj;
        $scope.deviceModelObj = deviceModelObj;
        $scope.screenResObj = screenResObj;
        $scope.operatingSysObj = operatingSysObj;

        loaderEvent.loaderDeactivate();
    };

    function getMarket(channel, channel_type, response){        
        loaderEvent.loaderActivate();
        $scope.marketData = '';
        var response_data = response.audiencesegmentobj;
        angular.forEach(response_data, function(value){
            $scope.marketData = $scope.marketData + value.id + ',';
        });

        angular.forEach(response_data, function(value){
            angular.forEach(value.subcategory, function(value){
                $scope.marketData = $scope.marketData + value.id + ',';
            });
        });

        var categoryType = 'market';
        return audienceFactory.getChannelPortedCategories(channel_type, categoryType, $scope.marketData).then(function(response, status) {
                $scope.marketDataList = response;                
            });
    };

    function getAffinity(channel, channel_type, response){
        loaderEvent.loaderActivate();
        $scope.affinityDataLlist = '';
        var response_data = response.audiencesegmentobj;
        angular.forEach(response_data, function(value, key){
            $scope.affinityDataLlist = $scope.affinityDataLlist + value.id + ',';            
        });

        angular.forEach(response_data, function(value, key){
            angular.forEach(value.subcategory, function(value, key){
               $scope.affinityDataLlist = $scope.affinityDataLlist + value.id + ',';
            });
        });
        var categoryType = 'affinity';
        return audienceFactory.getChannelPortedCategories(channel_type, categoryType, $scope.affinityDataLlist).then(function(response, status) {
                $scope.affinityDataLlist = response;                
            });
    };

    $scope.slideChange = function(select){

    };

    $scope.cancelCreateNewSegment = function(){
        $('.create-audience-section').removeClass('content-active');
        $('.audience-section').addClass('content-active');
    };

    $scope.actionsActivity = function(filterType, segementData){
        $scope.segmentName = filterType;
        $scope.segementData = segementData;
        switch(filterType){
            case 'View Details':
                $scope.getAudienceSegementByID(segementData.seg_id);
                break;
            case 'Refresh Audiences':
                $scope.getAudienceSegement();
                break;
            case 'Edit Segment':
                $scope.editCheck = true;
                segmentEditAndCopy();
                break;
            case 'Duplicate Segment':
                $scope.editCheck = false;
                segmentEditAndCopy();
                break;
            case 'Delete Segment':
                $scope.deleteAudienceSegement(segementData);
                break;
        }
    };

    function segmentEditAndCopy(){
        var segementData = $scope.segementData;
        if ($scope.segmentName == 'Edit Segment'|| $scope.segmentName == 'Duplicate Segment') {
            $scope.getAudienceSegementByID(segementData.seg_id);
            $scope.type = $scope.selectChan;
            $scope.segmentListData = segementData;
            $scope.getCustomSegmentsFields();
            $scope.getDemographic();
            $scope.getTechnology();
            $scope.getDeviceModel('Mobile');
            $('.audience-section').removeClass('content-active');
            $('.create-audience-section').addClass('content-active');
            $('.database-marketplace-options').hide();
            $('.set-audience-parameters').show();
            if ($scope.editCheck) {
                if ($scope.getSegementData) {
                    checke_custome_Api_respomce();
                }else{
                    $timeout(function() {
                        segmentEditAndCopy();
                    }, 500);
                }
            }else{
                checke_custome_Api_respomce();
            }
        }
    };

    $scope.getAudienceSegementByID = function(seg_id){
        loaderEvent.loaderActivate();
        return audienceFactory.getAudienceSegementByID(seg_id).then(function(response, status){
            $scope.getSegementData = response[0];            
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.editAudienceSegement = function(segementData){
        loaderEvent.loaderActivate();
        return audienceFactory.editAudienceSegement(segementData).then(function(response, status){
            $scope.getAudienceSegement();
            loaderEvent.loaderDeactivate();
        });
    };

    $scope.deleteAudienceSegement = function(segementData){
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
            return audienceFactory.deleteAudienceSegement(segementData).then(function(response,status){
                loaderEvent.loaderDeactivate();
                swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                $scope.getAudienceSegement();
            });
          }
        })
    };

    $scope.finalCampaignList = function(){
        var objectName = '';
        if ($scope.campaign_object) {
            objectName = $scope.campaign_object
        }else{
            objectName = document.getElementById('getCampaignObj').innerText;
        }
        
        $scope.privateSection = false;
        $scope.channelData = {
            campaignName: $scope.campaignName,
            campaignObject:  objectName,
            segementName: $scope.segementName,
            audienceName: '',
            channel : $scope.channelList
        }
    };

    $scope.saveFinalCampaign = function(){
        if ($rootScope.newCampaignObjectSection) {
            var date = $filter('date')(new Date(), 'dd/MM/yyyy');
            var params = {};
                params.campaign_name = $scope.channelData.campaignName;
                params.campaign_object =$scope.channelData.campaignObject;
                params.segment_name = $scope.channelData.segementName;
                params.channel_id = $scope.channelData.channel.channel_id;
                params.channel_type = $scope.channelData.channel.channel_name;
                params.segment_id = $scope.segementId;
                params.create_date = date;
                params.modified_date = date;
                params.isAction = true;
            return campaignFactory.saveFinalCampaign(params).then(function(response, status){
                if (response.status == 200) {
                    $scope.createNewCompaign();
                    $scope.getFinalCampaignList();
                    $('.activate-campaign-section').removeClass('content-active');
                    $('.activate-campaign-block').removeClass('active');
                    $('.activate-campaign-block').addClass('done');
                    $('.activated-campaign-section').addClass('content-active');
                }else{
                    swal('Please try Again!');
                }
            });
        }else if (!$rootScope.newCampaignObjectSection) {
            var params = {};
                params.campaign_name = $scope.channelData.campaignName;
                params.campaign_object =$scope.channelData.campaignObject;
                params.segment_name = $scope.channelData.segementName;
                params.channel_id = $scope.channelData.channel.channel_id;
                params.channel_type = $scope.channelData.channel.channelType;
                params.segment_id = $scope.segementId;
                params.campaign_id = $rootScope.channelScopeSet.campaign_id;
                params.isAction = true;

            return campaignFactory.updateFinalCampaign(params).then(function(response, status){
                if (response.status == 200) {
                    $scope.createNewCompaign();
                    $scope.getFinalCampaignList();
                    $('.activate-campaign-section').removeClass('content-active');
                    $('.activate-campaign-block').removeClass('active');
                    $location.path("/campaign");
                }else{
                    swal('Please try Again!');
                }
            });
        }
    };

    $scope.getFinalCampaignList = function(){
        return campaignFactory.getFinalCampaignList().then(function(response, status){
            $scope.campaignList = response;
        });
    };

    $scope.exportData = function(sectionContentData) {
        alasql('SELECT seg_id AS Segement_No, user_id AS User_Id, segement_name AS Segement_Name, create_date AS Create_Date, update_date AS Update_Date, age_type AS Age_Type, gender_type AS Gender_Type, language AS Language_Type, affinity_catagery AS Affinity_Category, operating_system AS Operating_System, operating_sys_version AS Operating_Version, browser AS Browser, browser_version AS Browser_Version, screen_resulation AS Screen_Resulation, device_type AS Device_Type, country_type AS Country, state_type AS State, city_type AS City, zipcode AS Zipcode, market_segment AS Market_Segement, Model AS Model, segment_type AS Segement_Type, IAB AS IAB, income AS Income, loaction AS Loaction_Type, fb_code AS Facebook_Code, isAction AS Status, age_name AS Age, gender_name AS Gende, language_name AS Language, device_name AS Device, country_name AS Country, state_name AS State, city_name AS City, income_name AS Income, affinity_catagery_type AS Affinity_Catagery, market_segment_type AS Market_Segment_Type, IAB_Name_type AS IAB_Name, facebook_Name_type AS Facebook, operatingSys_Name_type AS Operating_System, browser_name_type AS Browser_Name, screen_Name_type AS Screen, device_model_get AS Device_Mode, channel_id AS Channel_Id INTO XLSX("audience_segement.xlsx",{headers:true}) FROM ?', [sectionContentData]);
    };

    $scope.csvHeader = [
        "Segement No", 
        "User Id", 
        "Segement Name", 
        "Create Date",
        "Update Date", 
        "Age Type",
        "Gender Type",
        "Language Type",
        "Affinity Aategory",
        "Operating System",
        "Operating version",
        "browser",
        "browser Version",
        "Screen resulation",
        "Device Type",
        "Country",
        "State",
        "City",
        "zipcode",
        "Market Segement",
        "Model",
        "Segement Type",
        "IAB",
        "Income",
        "Loaction Type",
        "Facebook Code",
        "status",
        "Age",
        "Gender",
        "Language",
        "Device",
        "Country",
        "state",
        "City",
        "income",
        "affinity_catagery",
        "market_segment_type",
        "IAB_Name",
        "facebook",
        "operating_system",
        "browser_Name",
        "screen",
        "Device_mode",
        "Channel_id"
    ];

    $scope.goToDashboard = function(){
        $location.path("/campaign");
    };

}]);