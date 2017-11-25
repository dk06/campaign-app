app.factory('cuberootService', function($http) {
  return {
    async: function() {
      return $http.get('http://205.147.101.67:8080/marketingv1/getChannelCampaignId?channel_type=facebook&access_token=aaasssdff', function(res){
        return res;
      });  //1. this returns promise
    }
  };
});