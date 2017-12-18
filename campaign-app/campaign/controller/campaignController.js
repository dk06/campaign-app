
app.controller('CampaignController',['$scope','$q','campaignFactory','campaignChannelFactory','audienceFactory','$window','$timeout', function($scope, $q, campaignFactory, campaignChannelFactory, audienceFactory, $window, $timeout ) {

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
   

    init();
    function init() {
        if ($window.localStorage.accessToken) {
            return campaignFactory.getCategories().then(function(response, status) {
                $scope.obj = response;
                $scope.example20model = []; 
                $scope.example20data = [ { id: 1, label: "David", age: 23 }, { id: 2, label: "Jhon", age: 24 }, { id: 3, label: "Danny", age: 26 } ]; $scope.example20settings = { searchField: 'age', enableSearch: true };

      //           $scope.resultsWithInfo = [{
      //   name: "Baseline",
      //   id: "something_unique1",
      //   idx: 1,
      //   eui: 100
      // }, {
      //   name: "Alt1",
      //   id: "something_unique2",
      //   idx: 2,
      //   eui: 90
      // }, {
      //   name: "Alt2",
      //   id: "something_unique3",
      //   idx: 3,
      //   eui: 80
      // }, {
      //   name: "Alt3",
      //   id: "something_unique4",
      //   idx: 4,
      //   eui: 75
      // }, {
      //   name: "Alt4",
      //   id: "something_unique5",
      //   idx: 5,
      //   eui: 60
      // }];
      
      // $scope.selected_baselines = [];
      // $scope.selected_baseline_settings = {
      //   template: '<b style="color: black;">{{option.name}}</b>',
      //   searchField: 'name',
      //   enableSearch: true,
      //   selectionLimit: 4,
      //   selectedToTop: true // Doesn't work
      // };
      
      $scope.selected_baselines_customTexts = {buttonDefaultText: 'Select Users'};

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
                    // $scope.country_type = segement.country_type;
                    // $scope.state_type = segement.state_type;
                    // $scope.city_type = segement.city_type;
                    // $scope.getCustomSegmentsFields();
                    // $scope.selectCustomSegement(segement);
                    // $('.audience-section').removeClass('content-active');
                    // $('.create-audience-section').addClass('content-active');
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

    $scope.languageObj = [];
    $scope.languageChangedValue = function(language, index, languageStatus){
        $scope.language_name = [];
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
                $scope.language_name = $scope.language_name + value.language + ','
            }
        });
        
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
        $scope.income_Type = [];
        angular.forEach(income_apiRef, function(value, key){
            if ($scope.incomeObj[key] == true) {
                $scope.income_Type = $scope.income_Type + value.income_name + ','
            }
         });
    };
    $scope.deviceObj = [];
    $scope.deviceChangedValue = function(device, index , deviceStatus, select_type){
        $scope.deviceSelect = select_type;
        if (select_type == 'Mobile') {            
            $scope.getDeviceModel(select_type);
        }else{
            
        }
        
        if (deviceStatus) {
            if ($scope.deviceObj[index] == device[index]) {
                $scope.deviceObj[index] = true;
            }
        }else{
            if ($scope.deviceObj[index] == device[index]) {
                $scope.deviceObj[index] = false;
            }
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
        $scope.affinity_catagery_type = [];
        angular.forEach(affinity_catagery_apiRef, function(value, key){
            if ($scope.affinityObj[key] == true) {
                $scope.affinity_catagery_type = $scope.affinity_catagery_type + value.category_name + ','
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
        $scope.market_segment_type = [];
        angular.forEach(market_segment_apiRef, function(value, key){
            if ($scope.marketSegmentObj[key] == true) {
                $scope.market_segment_type = $scope.market_segment_type + value.seg_category_name + ','
            }
         });
    };

    $scope.IAB_Obj = [];
    $scope.IABChangedValue = function(iab,index, iabStatus){
        // $scope.IAB_Obj.push(iab);
        // if (iabStatus) {
        //     if ($scope.IAB == undefined) {
        //         $scope.IAB = IAB;
        //         $scope.IAB_Name = IAB_Name;
        //     }else{
        //         $scope.IAB = $scope.IAB + ',' + IAB + ',';
        //         $scope.IAB_Name = $scope.IAB_Name + ',' + IAB_Name + ',';
        //     }
        // }else{
        //     $scope.IAB = $scope.IAB + ',' + '';
        // }
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
        $scope.IAB_Name_type = [];
        angular.forEach(IAB_apiRef, function(value, key){
            if ($scope.IAB_Obj[key] == true) {
                $scope.IAB_Name_type = $scope.IAB_Name_type + value.category_name + ','
            }
         });
    };

    $scope.stateSection = true;
    $scope.citySection = true;
    $scope.zipSection = true;

    $scope.selectLocationType = function(selectType){
        $scope.LoactionType = selectType;
        if (selectType == 'Inclusion') {
            $scope.checkInclusion = true;
            $scope.checkExclustion= false;
        }else{
            $scope.checkInclusion = false;
            $scope.checkExclustion= true;
        }
    };

    var countyObj = [];
    $scope.selectAllCountry = function(countryStatus){ 
        $scope.country_api_ref = $scope.countyData;
        $scope.countyCount = 0;
        if (countryStatus) {
            $scope.countyType = 'All County';
            $scope.stateType = '';
            $scope.cityType = '';
            $scope.stateSection = false;
            $scope.citySection = false;
            $scope.zipSection = false;            
            $scope.country_api_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.country_api_ref.length; i++){
                    if($scope.country_api_ref[i].country_id == e.country_id){
                        countyObj[index] = true;
                        $scope.location_type = 'Multipal Loaction';
                        break;
                    }
                }
                countyObj[index] = countyObj[index] || false;
            });
        }else{
                // $scope.countyType = 
                // $scope.stateType = '';
                // $scope.cityType = '';
                countyDataEmpty();
                $scope.country_api_ref.map(function(e, index){
                $scope.countyObj = [];  
                countyObj[index] = false;
                $scope.location_type = 'Custom Loaction';
                $scope.stateSection = true;
                $scope.citySection = true;
                $scope.zipSection = true;
            });
        }
        $scope.countyObj = countyObj;
    };
    
    $scope.country_type = '';
    $scope.countyCount = 0;
    $scope.countyObj = [];
    $scope.selectCountry = function(country_code, status, index, country){
        $scope.countyTypeObj = [];
        $scope.checkboxCounty = false;
        if (status) {            
            if ($scope.countyObj[index] == country[index]) {
                $scope.countyObj[index] = true;
            }
        }else{            
            if ($scope.countyObj[index] == country[index]) {
                $scope.countyObj[index] = false;
            }
        }

        angular.forEach($scope.countyData, function(value, index){
            if ($scope.countyObj[index] == true) {
                if ($scope.countyTypeObj.length == 0) {
                    $scope.countyTypeObj = value.country_codes;
                    $scope.countyType = value.country_names;
                    $scope.getState(value.country_codes);

                    $scope.stateSection = true;
                    $scope.citySection = true;
                    $scope.zipSection = true;
                    $scope.location_type = 'Single City';
                }else{
                    $scope.countyTypeObj = $scope.countyTypeObj  + ',' + value.country_codes;
                    $scope.countyType = $scope.countyType +',' + value.country_names;
                    $scope.stateSection = false;
                    $scope.citySection = false;
                    $scope.zipSection = false;
                    $scope.location_type = 'Multipal City';
                }
            }
        });

        $scope.country_type = $scope.countyTypeObj;
    };

    var stateObj = [];
    $scope.selectAllState = function(stateStatus){
        $scope.stateCount = 0;
        $scope.state_ref_api = $scope.stateData;
        if (stateStatus) {
            $scope.stateType = 'All State';
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
                // $scope.stateType = '';
                // $scope.cityType = '';
                
            });
        }
        $scope.stateObj = stateObj;
    };

    $scope.state_type = '';
    $scope.stateCount = 0;
    $scope.stateObj = [];
    $scope.selectState = function(state_type, status,index, state){
        $scope.stateTypeObj = [];
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
            }
        });

        $scope.state_type = $scope.stateTypeObj;
    };

    var cityObj = [];
    $scope.selectAllCity = function(cityStatus){
        $scope.city_api_ref = $scope.cityData;
        if (cityStatus) { 
            $scope.cityType = 'All City';
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
    $scope.selectCity = function(city, index, city_obj){
        $scope.cityTypeObj= [];
        if (true) {
            if (cityObj[index] == city[index]) {
                cityObj[index] = true;
            }
        }else{
            if (cityObj[index] == city[index]) {
                cityObj[index] = true;
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
            }
        });

        $scope.city_type = $scope.cityTypeObj;
        $scope.location_type = 'Custom Loaction';
        //$scope.citySelect = city;
    };

    $scope.loactionFiledsRemove = function(){
        $scope.countyType = '';
        $scope.stateType = '';
        $scope.cityType = '';
        $scope.LoactionType = '';
        $scope.countyObj = [];
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
    };

    function countyDataEmpty(){
        $scope.countyType = '';
        $scope.stateType = '';
        $scope.cityType = '';
        $scope.LoactionType = '';
        $scope.country_type = '';
        $scope.state_type = '';
        $scope.city_type = '';
        $scope.countyObj = [];
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
                
                $scope.age_type = $scope.age_type + value.age_id + ',' ;
            }
         });

        var gender_apiRef = $scope.customSegementForm.gender;
        $scope.gender_type = [];
         angular.forEach(gender_apiRef, function(value, key){
            if ($scope.genderGroup[key] == true) {
                //$scope.gender_type.push({'gender_type' : value.gender});
                $scope.gender_type = $scope.gender_type + value.gender_id + ','
            }
         });

        var language_apiRef = $scope.customSegementForm.language;
        $scope.language = [];
        angular.forEach(language_apiRef, function(value, key){
            if ($scope.languageObj[key] == true) {
                $scope.language = $scope.language + value.lag_id + ','
            }
         });

        var income_apiRef = $scope.customSegementForm.incomeDetails;
        $scope.income = [];
        angular.forEach(income_apiRef, function(value, key){
            if ($scope.incomeObj[key] == true) {
                $scope.income = $scope.income + value.income_id + ','
            }
         });

        var device_apiRef = $scope.technologyData;
        $scope.device = [];
        angular.forEach(device_apiRef, function(value, key){
            if ($scope.deviceObj[key] == true) {
                $scope.device = $scope.device + value.device_id + ','
            }
         });

        var deviceModel_apiRef = $scope.devioceModel;
        $scope.deviceModel = [];
        angular.forEach(deviceModel_apiRef, function(value, key){
            if ($scope.deviceModelObj[key] == true) {
                $scope.deviceModel = $scope.deviceModel + value.Id + ','
            }
         });

        if ($scope.selectChan === 'Adwords' || $scope.selectChan === 'DBM') {
            var affinity_catagery_apiRef = $scope.customSegementForm.affinityCategory;
            $scope.affinity_catagery = [];
            angular.forEach(affinity_catagery_apiRef, function(value, key){
                if ($scope.affinityObj[key] == true) {
                    $scope.affinity_catagery = $scope.affinity_catagery + value.Seg_category_id + ','
                }
             });

            if (true) {}
            var market_segment_apiRef = $scope.customSegementForm.marketSegment;
            $scope.market_segment = [];
            angular.forEach(market_segment_apiRef, function(value, key){
                if ($scope.marketSegmentObj[key] == true) {
                    $scope.market_segment = $scope.market_segment + value.Seg_category_id + ','
                }
             });
        }else{
            $scope.affinity_catagery = '';
            $scope.market_segment = '';
        }

        if ($scope.selectChan == 'Lightning') {
            var IAB_apiRef = $scope.customSegementForm.IAB;
            $scope.IAB = [];
            angular.forEach(IAB_apiRef, function(value, key){
                if ($scope.IAB_Obj[key] == true) {
                    $scope.IAB = $scope.IAB + value.seg_id + ','
                }
             });
        }else{
            $scope.IAB = '';
        }



        if (count >= 7 && $scope.country_type && $scope.state_type && $scope.city_type && $scope.device_type && $scope.language || $scope.affinity_catagery || $scope.market_segment && $scope.IAB && $scope.income && $scope.device || $scope.deviceModel) {
            $scope.savedAudienceSegementFields(segment, $scope.chanelId);
        }else{
            swal('All fields are Mandatory!');
        }
    };

    $scope.savedAudienceSegementFields = function(segment, chanelId){
         var count = Object.keys(segment).length;
        if (count >= 7 && $scope.country_type && $scope.state_type && $scope.city_type && $scope.device_type && $scope.language || $scope.affinity_catagery || $scope.market_segment && $scope.IAB && $scope.income && $scope.device || $scope.deviceModel) {
            if($scope.chanelId){
                var chanelId = $scope.chanelId;
            }else{
                var chanelId = chanelId;
            }

            var segementData = {};
                segementData = segment;
                //segementData.chanelId = chanelId;
                segementData.segment_type = $scope.selectChan;
                segementData.income = $scope.income;
                segementData.device_type = $scope.device;
                segementData.age_type = $scope.age_type;
                segementData.gender_type = $scope.gender_type;
                segementData.affinity_catagery = $scope.affinity_catagery;
                segementData.language = $scope.language;
                segementData.market_segment = $scope.market_segment;
                segementData.IAB = $scope.IAB;
                segementData.device_type = $scope.device_type;
                segementData.Model = $scope.deviceModel;
                segementData.country_type = $scope.country_type;
                segementData.state_type = $scope.state_type;
                segementData.city_type = $scope.city_type;
                segementData.location_type = $scope.location_type;
                $scope.segmentDataList = segementData;
            return audienceFactory.postAudienceSegement(segementData).then(function(response, status){
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
        }
    };

    $scope.cancelAudienceSegement = function(){
        $scope.privateSection = false;
        $('.create-audience-section').removeClass('content-active');
        $('.audience-section').addClass('content-active');
        $scope.getAudienceSegement();
        $scope.ageGroup = [];
        $scope. genderGroup = [];
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
            $scope.getCustomReach();
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

    var ageGroup = [];
    var genderGroup = [];
    var languageObj = [];
    var incomeObj = [];
    var deviceObj = [];
    var deviceModelObj = [];
    var affinityObj = [];
    var marketSegmentObj = [];
    var IAB_Obj = [];

    $scope.selectCustomSegement = function(segementList){       
        $scope.getTechnology();
        $scope.getDeviceModel('Mobile');
        if ($scope.selectChan == 'Adwords' || $scope.selectChan == 'DBM') {
            var iab_split = segementList.IAB.split(',');
            var market_api_responce = [];
            var affinity_api_responce = [];

            $scope.affinity_ref = $scope.customSegem.affinityCategory;
            $scope.marketSeg_ref = $scope.customSegem.marketSegment;

            angular.forEach(iab_split, function(value){
                if (value) {
                    var categoryType = 'market';
                    return audienceFactory.getCustomSegementChanges($scope.selectChan, value, categoryType).then(function(response, status) {
                        market_api_responce.push(response);

                        $scope.market_segment_type = '';
                        $scope.marketSeg_ref.map(function(e, index){ 
                            for(let i =0 ; i < market_api_responce.length; i++){
                                if(market_api_responce[i].id == e.Seg_category_id){
                                    marketSegmentObj[index] = true;
                                    $scope.market_segment_type = $scope.market_segment_type + e.seg_category_name + ','
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
                    return audienceFactory.getCustomSegementChanges($scope.selectChan, value, categoryType).then(function(response, status) {
                       affinity_api_responce.push(response);                       
                       
                        $scope.affinity_catagery_type = '';
                        $scope.affinity_ref.map(function(e, index){
                            for(let i =0 ; i < affinity_api_responce.length; i++){
                                if(affinity_api_responce[i].id == e.Seg_category_id){
                                    affinityObj[index] = true;
                                    $scope.affinity_catagery_type = $scope.affinity_catagery_type + e.category_name + ','
                                    break;
                                }
                            }
                            affinityObj[index] = affinityObj[index] || false;
                        });
                    });
                }
            });
        }else{
            var iab_split = segementList.IAB.split(',');

            $scope.IAB_ref = $scope.customSegem.IAB;
            $scope.IAB_Name_type = '';
            $scope.IAB_ref.map(function(e, index){ 
                for(let i =0 ; i < iab_split.length; i++){
                    if(iab_split[i] == e.seg_id){
                        IAB_Obj[index] = true;
                        $scope.IAB = '';
                        $scope.IAB = $scope.IAB + e.seg_id + ',';

                        $scope.IAB_Name_type = $scope.IAB_Name_type + e.category_name + ','
                        break;
                    }
                }
                IAB_Obj[index] = IAB_Obj[index] || false;
            });
        }

        var age_split = segementList.age_type.split(',');
        var gender_split = segementList.gender_type.split(',');
        var language_split = segementList.language.split(',');
        var income_split = segementList.income.split(',');
        var device_split = segementList.device_type.split(',');
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
        $scope.device_ref = $scope.technologyData;
        $scope.device_model_ref = $scope.devioceModel;

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
                    $scope.language_name = $scope.language_name + e.language + ','
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
                    $scope.income_Type = $scope.income_Type + e.income_name + ','
                    break;
                }
            }
            incomeObj[index] = incomeObj[index] || false;
        });
        
        $scope.device = '';
        $scope.device_ref.map(function(e, index){
            for(let i =0 ; i < device_split.length; i++){
                if(device_split[i] == e.device_id){
                    deviceObj[index] = true;
                    $scope.device = $scope.device + e.device_id + ','
                    break;
                }
            }
            deviceObj[index] = deviceObj[index] || false;
        });

        $scope.deviceModel = '';
        if (segementList.Model) {
            $scope.device_model_ref.map(function(e, index){
                for(let i =0 ; i < devicr_model_split.length; i++){
                    if(income_split[i] == e.Id){
                        deviceModelObj[index] = true;
                        $scope.deviceModel = $scope.deviceModel + e.Id + ','
                        break;
                    }
                }
                deviceModelObj[index] = deviceModelObj[index] || false;
            });
        }

        $scope.channel = {
            operating_system : segementList.operating_system,
            operating_sys_version : segementList.operating_sys_version,
            browser : segementList.browser,
            browser_version : segementList.browser_version,
            screen_resulation : segementList.screen_resulation,
            segement_name : segementList.segement_name,
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

    };

    $scope.getTargetingSummary = function(){
        var channel = $scope.channelList;
        var channel_type = $scope.selectChan;
        return audienceFactory.getTargetingSummary(channel, channel_type).then(function(response, status) {
            //$scope.customSegementForm = response;

            if (channel_type == 'Adwords' || channel_type == 'DBM') {
                getMarket(channel, channel_type, response.apiResponce);
                getAffinity(channel, channel_type, response.apiResponce);   
            }
            

            $scope.channel = {
                language : response.language[0].language,
                income : response.incomeDetails[0].income

            }
            $scope.technologyData = response.technologyData;
            $scope.devioceModel = response.mobiledeviceobj;
            
            $scope.countySelect = response.locations[0].country_names;
                      
            $scope.stateData = response.locations;
            $scope.cityData = response.locations;
            $scope.api_responce = response;
            $scope.getPrivateReach();            

            $scope.ageGroup_ref = $scope.customSegem.ageGroup;

            $scope.genderGroup_ref = $scope.customSegem.gender;

            $scope.language_ref = $scope.customSegem.language;

            $scope.income_ref = $scope.customSegem.incomeDetails; 

            $scope.affinity_ref = $scope.marketDataList;

            $scope.marketSeg_ref = $scope.marketDataList;           

            if (channel_type == 'Lightning') {
                $scope.IAB_ref = $scope.customSegem.IAB;
            }

            $scope.ageGroup_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.api_responce.ageGroup.length; i++){
                    if($scope.api_responce.ageGroup[i].age == e.age){
                        ageGroup[index] = true;
                        break;
                    }
                }

                ageGroup[index] = ageGroup[index] || false;
            });

            $scope.genderGroup_ref.map(function(e, index){  
                for(let i =0 ; i < $scope.api_responce.gender.length; i++){
                    if($scope.api_responce.gender[i].gender == e.gender){
                        genderGroup[index] = true;
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
                        $scope.language_name = $scope.language_name + e.language + ','
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
                        $scope.income_Type = $scope.income_Type + e.income_name + ','
                        break;
                    }
                }
                incomeObj[index] = incomeObj[index] || false;
            });

            if (channel_type == 'Lightning') {
                $scope.IAB_Name_type = '';
                $scope.IAB_ref.map(function(e, index){
                    for(let i =0 ; i < $scope.api_responce.IAB.length; i++){
                        if($scope.api_responce.IAB[i].category_name == e.category_name){
                            IAB_Obj[index] = true;
                            $scope.IAB = '';
                            $scope.IAB = $scope.IAB + e.seg_id + ',';

                            $scope.IAB_Name_type = $scope.IAB_Name_type + e.category_name + ','
                            break;
                        }
                    }
                    IAB_Obj[index] = IAB_Obj[index] || false;
                });
            }

            if (channel_type == 'Adwords' || channel_type == 'DBM') {
                $scope.market_segment_type = '';
                $scope.marketSeg_ref.map(function(e, index){ 
                    for(let i =0 ; i < $scope.marketDataList.length; i++){
                        if($scope.marketDataList[i].id == e.Seg_category_id){
                            marketSegmentObj[index] = true;
                            $scope.market_segment_type = $scope.market_segment_type + e.seg_category_name + ','
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
                            $scope.affinity_catagery_type = $scope.affinity_catagery_type + e.category_name + ','
                            break;
                        }
                    }
                    affinityObj[index] = affinityObj[index] || false;
                });
            }

            $scope.ageGroup = ageGroup;
            $scope.genderGroup = genderGroup;
            $scope.languageObj = languageObj;
            $scope.incomeObj = incomeObj;
            $scope.affinityObj = affinityObj;
            $scope.marketSegmentObj = marketSegmentObj;
            $scope.IAB_Obj = IAB_Obj;
        });
    };

    function getMarket(channel, channel_type, response){        
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
        return audienceFactory.getChannelPortedCategories(channel, channel_type, $scope.marketData).then(function(response, status) {
                $scope.marketDataList = response;
            });
    };

    function getAffinity(channel, channel_type, response){
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
        return audienceFactory.getChannelPortedCategories(channel, channel_type, $scope.affinityDataLlist, categoryType).then(function(response, status) {
                $scope.affinityDataLlist = response;
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