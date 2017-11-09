var express = require('express');
var router = express.Router();
var apiControllerRequest = require('../models/apiController');


router.get('/getCampaign', function(req,res){
    apiControllerRequest.getCampaign(function(err,rows){
        if(err)
        {
        res.json(err);
        }
        else
        {
        res.json({
            data : rows,
            code: 200,
            status: "Success",
            message: "API Successful"});
        }
    })
});
router.post('/addNewCampaign', function(req,res){
    apiControllerRequest.addNewCampaign(function(err,rows){
        if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
    })
});

router.get('/getDemographic', function(req,res,next){
    var ageGroupParam = 'ageGroup';
    apiControllerRequest.getCustomFormData(ageGroupParam, function(err, rows){
        if(!rows[0])
        {
            res.json({
                    data : [],
                    code: 500,
                    status: false,
                    message: "API Not Successful"});
        }
        else
        {
            var ageGroupData = rows[0]
            var genderParam = 'gender';
            apiControllerRequest.getCustomFormData(genderParam, function(err, rows){
                if(!rows[0])
                {
                    res.json({
                        data : [],
                        code: 500,
                        status: false,
                        message: "API Not Successful"});
                }
                else
                {
                    var genderData = rows[0]
                    var languageParam = 'language';
                     apiControllerRequest.getCustomFormData(languageParam, function(err,rows){
                        if(!rows[0])
                        {
                            res.json({
                                    data : [],
                                    code: 500,
                                    status: false,
                                    message: "API Not Successful"});
                        }
                        else
                        {
                            var jsnData = {
                                ageGroup : ageGroupData,
                                gender : genderData,
                                language : rows[0]
                            }
                            res.json({
                                data : jsnData,
                                code: 200,
                                status: "Success",
                                message: "API Successful"});
                        }
                    });
                }
            });
        }
    });
});

router.get('/getTechnology', function(req,res,next){
    var deviceTypeParam = 'deviceType';
    apiControllerRequest.getCustomFormData(deviceTypeParam, function(err, rows){
        if(!rows[0])
        {
            res.json({
                    data : [],
                    code: 500,
                    status: false,
                    message: "API Not Successful"});
        }
        else
        {
            res.json({
                    data : rows[0],
                    code: 200,
                    status: "Success",
                    message: "API Successful"});
            // var deviceTypeData = rows[0]
            
            // var deviceModelParam = 'deviceModelName';
            // apiControllerRequest.getCustomFormData(deviceModelParam, function(err, rows){
            //     if(!rows[0])
            //     {
            //         res.json({
            //             data : [],
            //             code: 500,
            //             status: false,
            //             message: "API Not Successful"});
            //     }
            //     else
            //     {
            //         var jsnData = {
            //                 deviceType : deviceTypeData,
            //                 deviceMode : rows[0]
            //             }
            //             res.json({
            //                     data : jsnData,
            //                     code: 200,
            //                     status: "Success",
            //                     message: "API Successful"});
            //         var operatingSystemParam = 'operatingSystem';
            //         apiControllerRequest.getCustomFormData(operatingSystemParam, function(err, rows){
            //             if(!rows[0])
            //             {
            //                 res.json({
            //                     data : [],
            //                     code: 500,
            //                     status: false,
            //                     message: "API Not Successful"});
            //             }
            //             else
            //             {
            //                 var operatingSystemData = rows[0];
            //                 var operatingSystemVersionParam = 'operatingSystemVersion';
            //                 apiControllerRequest.getCustomFormData(operatingSystemVersionParam, function(err, rows){
            //                     if(!rows[0])
            //                     {
            //                         res.json({
            //                             data : [],
            //                             code: 500,
            //                             status: false,
            //                             message: "API Not Successful"});
            //                     }
            //                     else
            //                     {
            //                         var operatingSystemVersionData = rows[0];
            //                         var browserParam = 'browser';
            //                         apiControllerRequest.getCustomFormData(browserParam, function(err, rows){
            //                             if(!rows[0])
            //                             {
            //                                 res.json({
            //                                     data : [],
            //                                     code: 500,
            //                                     status: false,
            //                                     message: "API Not Successful"});
            //                             }
            //                             else
            //                             {
            //                                 var browserData = rows[0];
            //                                 var browserVersionParam = 'browserVersion';                
            //                                 apiControllerRequest.getCustomFormData(browserVersionParam, function(err, rows){
            //                                     if(!rows[0])
            //                                     {
            //                                         res.json({
            //                                             data : [],
            //                                             code: 500,
            //                                             status: false,
            //                                             message: "API Not Successful"});
            //                                     }
            //                                     else
            //                                     {
            //                                         var browserVersionData = rows[0];
            //                                         var screenResolutonParam = 'screenResoluton';
            //                                         apiControllerRequest.getCustomFormData(screenResolutonParam, function(err, rows){
            //                                             if(!rows[0])
            //                                             {
            //                                                 res.json({
            //                                                     data : [],
            //                                                     code: 500,
            //                                                     status: false,
            //                                                     message: "API Not Successful"});
            //                                             }
            //                                             else
            //                                             {
            //                                                 var jsnData = {
            //                                                             deviceType : deviceTypeData,
            //                                                             deviceMode : deviceModelData,
            //                                                             operatingSystem : operatingSystemData,
            //                                                             operatingSystemVersion : operatingSystemVersionData,
            //                                                             browser: browserData,
            //                                                             browserVersion : browserVersionData,
            //                                                             screenResoluton : rows[0]
            //                                                         }
            //                                                         res.json({
            //                                                                 data : jsnData,
            //                                                                 code: 200,
            //                                                                 status: "Success",
            //                                                                 message: "API Successful"});                    
            //                                             }
            //                                         });               
            //                                     }
            //                                 });
            //                             }
            //                         });                   
            //                     }
            //                 });                    
            //             }
            //         });
            //     }
            // });
        }
    });
});

router.get('/getDeviceModelNam', function(req,res,next){
    var deviceModelParam = 'deviceModelName';
    apiControllerRequest.getCustomFormData(deviceModelParam, function(err, rows){
        if(!rows[0])
        {
            res.json({
                data : [],
                code: 500,
                status: false,
                message: "API Not Successful"});
        }
        else
        {            
            res.json({
                    data : rows[0],
                    code: 200,
                    status: "Success",
                    message: "API Successful"});
            
        }
    });
});

router.get('/getCountry', function(req,res,next){
    var countryParam = {
            param: 'country',
            param_code : 'xyx'
    };
    apiControllerRequest.getLoactionSection(countryParam, function(err, rows){
        if(!rows[0])
        {
            res.json({
                    data : [],
                    code: 500,
                    status: false,
                    message: "API Not Successful"});
        }
        else
        {
            res.json({
                data : rows[0],
                code: 200,
                status: "Success",
                message: "API Successful"});
        }
    });
});

router.get('/getState', function(req,res){
    var stateParam = {
            param: 'state',
            param_code : req.query.country_codes
    };
    apiControllerRequest.getLoactionSection(stateParam, function(err, rows){
        if(!rows[0])
        {
            res.json({
                data : [],
                code: 500,
                status: false,
                message: "API Not Successful"});
        }
        else
        {
            res.json({
                data : rows[0],
                code: 200,
                status: "Success",
                message: "API Successful"});
        }
    });
});

router.get('/getCity', function(req,res){
    var cityParam = {
            param : 'city',
            param_code : req.query.state_code
    };
    apiControllerRequest.getLoactionSection(cityParam, function(err, rows){
        if(!rows[0])
        {
            res.json({
                data : [],
                code: 500,
                status: false,
                message: "API Not Successful"});
        }
        else
        {
            res.json({
                data : rows[0],
                code: 200,
                status: "Success",
                message: "API Successful"});
        }
    });
});

router.get('/getZipcode', function(req,res){
    var zipcodeParam = 'zipcode';
    apiControllerRequest.getLoactionSection(zipcodeParam, function(err, rows){
        if(!rows[0])
        {
            res.json({
                data : [],
                code: 500,
                status: false,
                message: "API Not Successful"});
        }
        else
        {
            res.json({
                data : rows[0],
                code: 200,
                status: "Success",
                message: "API Successful"});
        }
    });
});



module.exports = router;