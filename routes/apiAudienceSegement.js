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
                    message: "API Not Successful"});
        }
    });
});

router.get('/getCustomNewSegmentsForm', function(req,res,next){
    var ageGroupParam = 1;
    apiControllerRequest.getCustomNewSegmentsForm(ageGroupParam, function(err, rows){
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
            var genderParam = 2;
            apiControllerRequest.getCustomNewSegmentsForm(genderParam, function(err, rows){
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
                    var languageParam = 3;
                     apiControllerRequest.getCustomNewSegmentsForm(languageParam, function(err,rows){
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
            })
        }
    })
});

module.exports = router;