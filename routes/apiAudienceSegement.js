var express = require('express');
var router = express.Router();
var apiControllerRequest = require('../models/apiController');

router.get('/getAudienceSegement', function(req,res){
    apiControllerRequest.getAudienceSegementData(function(err,rows){
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
        res.send({
            data : rows,
            code: 200,
            status: "Success",
            message: "API Successful"});
        }
    })
})
// router.get('/:id?',function(req,res,next){
//     if(req.params.id){
//         apiControllerRequest.getAudienceSegementById(req.body.params.id,function(err,rows){
//         if(err)
//         {
//             res.json(err);
//         }
//         else{
//             res.json(rows);
//         }
//         });
//     }
// });
router.post('/audienceSegement',function(req,res,next){
    var segement ={
        user_id : req.body.params.userId,
        segement_name : req.body.params.segement_name,
        segment_form_data : req.body.params.segment_form_data,
        create_date : req.body.params.create_date,
        update_date : req.body.params.update_date,
        status : req.body.params.status
    }
    apiControllerRequest.insertAudienceSegementData(segement,function(err,rows){
        if(err)
        {
            res.json({
                    data : [],
                    code: 500,
                    status: false,
                    message: "API Not Successful"});
        }
        else{
            res.json(req.body);
        }
    });
});
router.post('/editAudienceSegement',function(req,res,next){
    var audienceSegement ={
        seg_id : req.body.params.seg_id,
        segement_name : req.body.params.segement_name,
        segment_form_data : req.body.params.segment_form_data
    }
    apiControllerRequest.updateAudienceSegementData(audienceSegement,function(err,rows){
        if(err)
        {
            res.json({
                    data : [],
                    code: 500,
                    status: false,
                    message: "API Not Successful"});
        }
        else
        {
            res.json(rows);
        }
    });
});
router.post('/deleteAudienceSegement',function(req,res,next){
    apiControllerRequest.deleteAudienceSegementData(req.body.params.seg_id,function(err,rows){
        if(err)
        {
            res.json({
                    data : [],
                    code: 500,
                    status: false,
                    message: "API Not Successful"});
        }
        else
        {
            res.json(rows);
        }
    });
});

router.get('/getCustomSegmentsFields',function(req,res,next){
    apiControllerRequest.getCustomSegmentsFields(function(err,rows){
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
                    data : rows,
                    code: 500,
                    status: false,
                    message: "API Successful"});
        }
    });
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
            var deviceTypeData = rows[0]
            
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
                    var deviceModelData = rows[0];
                    var operatingSystemParam = 'operatingSystem';
                    apiControllerRequest.getCustomFormData(operatingSystemParam, function(err, rows){
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
                            var operatingSystemData = rows[0];
                            var operatingSystemVersionParam = 'operatingSystemVersion';
                            apiControllerRequest.getCustomFormData(operatingSystemVersionParam, function(err, rows){
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
                                    var operatingSystemVersionData = rows[0];
                                    var browserParam = 'browser';
                                    apiControllerRequest.getCustomFormData(browserParam, function(err, rows){
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
                                            var browserData = rows[0];
                                            var browserVersionParam = 'browserVersion';                
                                            apiControllerRequest.getCustomFormData(browserVersionParam, function(err, rows){
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
                                                    var browserVersionData = rows[0];
                                                    var screenResolutonParam = 'screenResoluton';
                                                    apiControllerRequest.getCustomFormData(screenResolutonParam, function(err, rows){
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
                                                                        deviceType : deviceTypeData,
                                                                        deviceMode : deviceModelData,
                                                                        operatingSystem : operatingSystemData,
                                                                        operatingSystemVersion : operatingSystemVersionData,
                                                                        browser: browserData,
                                                                        browserVersion : browserVersionData,
                                                                        screenResoluton : rows[0]
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
                                }
                            });                    
                        }
                    });
                }
            });
        }
    });
});

router.get('/getlocation', function(req,res,next){
    var countryParam = 'country';
    apiControllerRequest.getCustomFormData(countryParam, function(err, rows){
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
            var countryData = rows[0]
            
            var stateParam = 'state';
            apiControllerRequest.getCustomFormData(stateParam, function(err, rows){
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
                    var stateData = rows[0];
                    var cityParam = 'city';
                     apiControllerRequest.getCustomFormData(cityParam, function(err, rows){
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
                            var cityData = rows[0];
                            var zipcodeParam = 'zipcode';
                            apiControllerRequest.getCustomFormData(zipcodeParam, function(err, rows){
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
                                            country : countryData,
                                            state : stateData,
                                            city : cityData,
                                            zipcode : rows[0]
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
        }
    });
});


module.exports = router;