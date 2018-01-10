'use strict';
angular.module('MyApp').factory('sharedMain', [
    function () {
       
        var sharedMain = { 
            startDate: '',
            endDate: '',
            campaign_id : '',
            dateRange : '',
            campaign_name : '',
            colors: [
                "#04b1fb",
                "#ee4035",
                "#7bc040",                
                "#f15d0e",
                "#81d8fd",
                "#f37b72",
                "#b0d98c",                
                "#f79e6e",
                "#b4e7fd",
                "#f9bdb9",
                "#c9e6b3",
                "#ffffcc",
                "#f9be9f",
                "#965251", "#0ED348", "#00b3ca", "#F79647", "#2C4D76", "#FF6600","#FCD202","#B0DE09",
                "#0D8ECF","#2A0CD0","#CD0D74","#CC0000","#00CC00","#0000CC","#DDDDDD","#999999","#333333",
                "#990000", '#2196F3', '#F44336', '#4CAF50', '#FF5722', '#00BCD4', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
                '#03A9F4', '#009688', '#8BC34A', '#FF9800', '#795548', '#777', '#607D8B',  '#E3F2FD', '#E1F5FE', '#E0F2F1']
        };
        return sharedMain;
    }]);