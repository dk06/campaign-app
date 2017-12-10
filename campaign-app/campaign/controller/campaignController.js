
app.controller('CampaignController',['$scope','$q','campaignFactory','campaignChannelFactory','audienceFactory','$window','$timeout', function($scope, $q, campaignFactory, campaignChannelFactory, audienceFactory, $window, $timeout ) {

    $scope.headingTitle = 'App Start';
    $scope.SelectChannelName = '';
    $scope.customSegementForm = {}
    $scope.countySelect = 'Select County';
    $scope.stateSelect = 'Select State';
    $scope.citySelect = 'Select City';
    $scope.deviceSelect = 'Select Device';
    $scope.deviceModelSelect = 'Select Model';
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
            // $scope.getCustomReach();
            // $scope.getPrivateAudienceMarketplaceList();
            // $scope.getTargetingSummary();           
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

    $scope.createNewChannel = function(selectType){
        swal({
          title: 'Link '+ selectType + ' with Cuberoot account ',
          //text: "Can You add new Channel!",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(function (result) {
          if (result.value) {
            $scope.SelectChannelName = '';
            $scope.accessTocken = '';
            $scope.newTabeOpen(selectType);
          }
        })
    };

    $scope.newTabeOpen = function(selectType){
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
        //$("#myModal").modal();
        $('.overlay').css('display', 'block');
    };

    $scope.editSelectChennelId = function(channel){
        $scope.editChanelId = channel.channel_id;
        $scope.channel.channelNameUpdate = channel.channel_name;
        $scope.channel.accessTockenUpdate = channel.channelAccessToken;
        $scope.getChannelType();
    };

    $scope.getCampaignNameAndId = function(accessTocken){
        $scope.channelSection = false;
        $('.overlay').css('display', 'none');
        var params = {
            channelName : $scope.SelectChannelName,
            channelAccessToken : accessTocken
        }
        $scope.accessToken = accessTocken;
        return campaignChannelFactory.getCampaignNameAndId(params).then(function(response, status) {
            $scope.campaignNameAndId = response.campaigns;
        });
    };

    $scope.getChannelByID = function(campaignId){        
        var params = {
            channelName : $scope.SelectChannelName,
            channelAccessToken : $scope.accessToken,
            campaign_id : campaignId
        }
        return campaignChannelFactory.getChannelByID(params).then(function(response, status) {
            $scope.campaignChennel = [response.campaignChannelData];
            $scope.scriptTag = response.scriptTag;
            $scope.channelSection = true;
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

    $scope.getAudienceSegement = function(){
        return audienceFactory.getAudienceSegement().then(function(response, status){
            $scope.audienceSegementData = response;
            $scope.segmentDataList = response;
            $scope.getCustomReach();
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
                    return audienceFactory.updateSegementType($scope.selectChan , segement.seg_id).then(function(response, status){
                        $scope.getAudienceSegement();
                    });
                }
            })
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

    $scope.ageGroup=[];
    $scope.ageGroupChangedValue=function(item){
        $scope.ageGroup.push(item);
    };

    $scope.genderGroup=[];
    $scope.genderChangedValue=function(item){
        $scope.genderGroup.push(item);
    };

    $scope.selectCountry = function(country, country_type){
        $scope.countySelect = country;
        $scope.country_type = country;
        $scope.getState(country_type)
    };

    $scope.selectState = function(state, state_type){
        $scope.stateSelect = state;
        $scope.state_type = state;
        $scope.getCity(state_type)
    };

    $scope.selectCity = function(city){
        $scope.city_type = city;
        $scope.citySelect = city;
    };

    $scope.selectDeviceType = function(device, deviceType){
        $scope.deviceSelect = device;
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
        var age_apiRef = $scope.customSegementForm.ageGroup;
        $scope.age_type = [];        
         angular.forEach(age_apiRef, function(value, key){
            if ($scope.ageGroup[key] == true) {
                $scope.age_type.push({'age_type' : value.age});
            }
         });

        var gender_apiRef = $scope.customSegementForm.gender;
        $scope.gender_type = [];
         angular.forEach(gender_apiRef, function(value, key){
            if ($scope.genderGroup[key] == true) {
                $scope.gender_type.push({'gender_type' : value.gender});
            }
         });

        if (count >= 8 && $scope.country_type && $scope.state_type && $scope.city_type && $scope.device_type || $scope.Model) {
            $scope.savedAudienceSegementFields(segment, $scope.chanelId);
        }else{
            swal('All fields are Mandatory!');
        }
    };

    $scope.savedAudienceSegementFields = function(segment, chanelId){
         var count = Object.keys(segment).length;
        if (count >= 8 && $scope.country_type && $scope.state_type && $scope.city_type && $scope.device_type || $scope.Model) {
            if($scope.chanelId){
                var chanelId = $scope.chanelId;
            }else{
                var chanelId = chanelId;
            }

            var segmentData = {};
                segmentData = segment;
                //segmentData.chanelId = chanelId;
                segmentData.segment_type = $scope.selectChan;
                segmentData.income = JSON.stringify(segment.income);
                segmentData.age_type = JSON.stringify($scope.age_type);
                segmentData.gender_type = JSON.stringify($scope.gender_type);
                segmentData.affinity_catagery = JSON.stringify(segment.affinity_catagery);
                segmentData.language = JSON.stringify(segment.language);
                segmentData.market_segment = JSON.stringify(segment.market_segment);
                segmentData.IAB = JSON.stringify(segment.IAB);
                segmentData.device_type = $scope.device_type;
                segmentData.Model = $scope.Model;
                segmentData.country_type = $scope.country_type;
                segmentData.state_type = $scope.state_type;
                segmentData.city_type = $scope.city_type;
                $scope.segmentDataList = segmentData;
            return audienceFactory.postAudienceSegement(segmentData).then(function(response, status){
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
                  }
                })
            });
        }
    };

    $scope.cancelAudienceSegement = function(){
        $scope.privateSection = false;
        $('.create-audience-section').removeClass('content-active');
        $('.audience-section').addClass('content-active');
        $scope.getAudienceSegement();
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
            //$scope.getTargetingSummary();
        });
    };    

    $scope.getCustomFormFieldsData = function(filterDate){
        switch(filterDate){
            case 'Demographics' :
                if ($scope.privateSection) {
                    $scope.getDemographic();
                    $scope.getTargetingSummary();
                }else{
                    $scope.getDemographic();
                }
                break;
            case 'Technology' :
                if ($scope.privateSection) {
                    $scope.getTechnology();
                    $scope.getTargetingSummary();
                }else{
                    $scope.getTechnology();
                }
                break;            
            case 'Location sidebar' :
                if ($scope.privateSection) {
                    $scope.getCountry();
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
        return campaignFactory.getDemographic().then(function(response, status){
            $scope.demographic = true;
            $scope.customSegementForm = response;
            $scope.customSegem = response;
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
            if ($scope.privateSection) {
                $scope.getTargetingSummary();
            }else{
                return campaignFactory.getDeviceModel().then(function(response,status){
                    $scope.devioceModel = response;
                });
            }
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
                $scope.getAudienceSegement();
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
        $scope.channelSection = true;
        return campaignChannelFactory.getCampaignChanel(params).then(function(response, status) {
            $scope.campaignChennel = response;
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
                confirmButtonText: 'Ok'
            }).then(function (result) {
              if (result.value) {
                //$scope.chanelId = channel.channel_id;
                $scope.channelList = channel;
                $scope.selectChan = $scope.SelectChannelName;
              }
            });
        }else{
            swal({
                title: 'Please copy this script',
                text: channel.scriptTag,
                confirmButtonColor: '#3085d6',            
                confirmButtonText: 'Ok'
            }).then(function (result) {
              if (result.value) {
                $scope.chanelId = channel.channel_id;
                $scope.channelList = channel;
                $scope.selectChan = channel.channelType;
              }
            });
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
            }
            else
            {
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

    $scope.newChannelCreate = function(){
        var channel = {}
            channel = $scope.channelList;
            channel.channelAccessToken = $scope.accessTocken;
            channel.channelName = $scope.SelectChannelName;
            channel.scriptTag = $scope.channelScriptTag.tag;
        return campaignChannelFactory.savedChannel(channel).then(function(response, status) {
            $scope.chanelId = response[0].channel_id;
            $scope.getAudienceSegement();
            $scope.scriptTag = '';
        });
    };

    // $scope.savedCampaignChannel = function(){
    //     if ($scope.channelData.channel == ''){
    //         if($scope.chanelId){
    //             $scope.getAudienceSegement($scope.chanelId); 
    //        }else{
    //             //alert('Select channel');
    //             swal('Select channel');
    //        }
    //    }else{
    //         $scope.finalCampaignList();
    //         $('.configure-channels-block').removeClass('active');
    //         $('.configure-channels-section').removeClass('content-active');
    //         $('.audience-section').removeClass('content-active');
    //         $('.activate-campaign-section').addClass('content-active');
    //         $('.activate-campaign-block').addClass('active');
    //    }   
    // };

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
    

    $scope.finalCampaignList = function(){
        $scope.privateSection = false;
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

    $scope.getCustomReach = function(segementData){
        $scope.combined = [];
        angular.forEach( $scope.segmentDataList, function(value, key){
            if (value.segment_type == 'Lightning') {
            audienceFactory.getCustomReach(value).then(function(response, status) {
                $scope.combined.push({seg: value.segement_name, rea: response[0].reach});
                
                });
            }
        });
        
    };

    $scope.getPrivateReach = function(){
        var reach = []
        angular.forEach( $scope.customSegementForm, function(value, key){
                return audienceFactory.getPrivateReach(value).then(function(response, status) {
                    reach.push(response[0].reach);
                    $scope.privateReach = response[0].reach;
                });
            });
    };

    $scope.getPrivateAudienceMarketplaceList = function(){
        return audienceFactory.getPrivateAudienceMarketplaceList().then(function(response, status) {
            $scope.privateAudienceMarketplaceList = [response];
            $scope.getPrivateReach();
        });
    };    

    $scope.selectPrivateSegement =function(){
        $scope.getTargetingSummary();
        $scope.privateSection = true;        
    };

    $scope.getTargetingSummary = function(){
        var channel = $scope.channelList;
        return audienceFactory.getTargetingSummary(channel).then(function(response, status) {
            //$scope.customSegementForm = response;
            $scope.channel = {
                language : response.language[0].language,
                income : response.incomeDetails[0].income

            }
            $scope.technologyData = response.technologyData;
            $scope.devioceModel = response.mobiledeviceobj;
            
            $scope.countySelect = response.locations[0].country_names;
            // $timeout(function () {
                    
            //     }, 1000);
            
            $scope.stateData = response.locations;
            $scope.cityData = response.locations;
            $scope.api_responce = response;
            $scope.getPrivateReach();
            var ageGroup = [];
            var genderGroup = [];

            $scope.ageGroup_ref = $scope.customSegem.ageGroup;

            $scope.genderGroup_ref = $scope.customSegem.gender;

            $scope.ageGroup_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.api_responce.ageGroup.length; i++){
                    if($scope.api_responce.ageGroup[i].age == e.age){
                        ageGroup[index] = true;
                        break;
                    }
                }

                ageGroup[index] = ageGroup[index] || false;
            })

            $scope.genderGroup_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.api_responce.gender.length; i++){
                    if($scope.api_responce.gender[i].gender == e.gender){
                        genderGroup[index] = true;
                        break;
                    }
                }

                genderGroup[index] = genderGroup[index] || false;
            })

           $scope.ageGroup = ageGroup;
           $scope.genderGroup = genderGroup;
        });
    };

    // $scope.getChannelPortedCategories = function(portedCategories){
    //     return audienceFactory.getChannelPortedCategories(portedCategories).then(function(response, status) {
    //         $scope.customSegementForm
    //     });
    // };

    $scope.slideChange = function(select){

    };

}]);