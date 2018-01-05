var express = require('express');

var router = express.Router();
var apiControllerRequest = require('../models/apiController');

router.get('/getChannelTypeList', function(req,res){
    apiControllerRequest.getChannelTypeList(function(err,rows){
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
        res.json({
            data : rows,
            code: 200,
            status: "Success",
            message: "API Successful"});
        }
    })
});

router.get('/getCampaignChannel', function(req,res){
    apiControllerRequest.getChannel(req.query.userId, function(err,rows){
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
        res.json({
                data : rows,
                code: 200,
                status: "Success",
                message: "API Successful"});
        }
    })
});

router.get('/getViewCampaignChannel', function(req,res){
    apiControllerRequest.getViewChannel(req.query.id, function(err,rows){
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
        res.json({
                data : rows,
                code: 200,
                status: "Success",
                message: "API Successful"});
        }
    })
});

router.post('/addNewChannel', function(req,res){
    // var channel ={
    //         channel_name : req.body.params.channelName,
    //         channelAccessToken : req.body.params.channelAccessToken,
    //         scriptTag : req.body.params.scriptTag,
    //         adverType : req.body.params.channelData.advertType,
    //         kpi : req.body.params.channelData.kPI,
    //         target : req.body.params.channelData.target,
    //         bid_min : req.body.params.channelData.bidmin,
    //         bid_Max : req.body.params.channelData.bidmax,
    //         channel_Budget : req.body.params.channelData.channelBudget,
    //         create_date : req.body.params.channelData.startDate,
    //         update_date : req.body.params.channelData.endDate,
    //         status : req.body.params.channelData.channelStatus,            
    //         user_id : req.body.params.userId
    //     }

    var channel ={
            channel_name : req.body.params.channelName,
            channelAccessToken : req.body.params.channelAccessToken,
            scriptTag : req.body.params.scriptTag,
            adverType : req.body.params.advertType,
            // kpi : req.body.params.kPI,
            // target : req.body.params.target,
            bid_min : req.body.params.bidmin,
            bid_Max : req.body.params.bidmax,
            channel_Budget : req.body.params.channelBudget,
            create_date : req.body.params.startDate,
            update_date : req.body.params.endDate,
            status : req.body.params.channelStatus,            
            user_id : req.body.params.userId
        }
    apiControllerRequest.postChannel(channel, function(err, rows){
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
            apiControllerRequest.getChannelId(req.body.params.channelAccessToken, function(err,rows){
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
                res.json({
                        data : rows,
                        code: 200,
                        status: "Success",
                        message: "API Successful"});
                }
            })
        }
    });
});

router.post('/editCampaignChannel', function(req,res){
    var channel ={
            channel_name : req.body.params.channelName,
            channelAccessToken : req.body.params.channelAccessToken,
            channel_id : req.body.params.editChanelId,
            scriptTag : req.body.params.scriptTag,
            adverType : req.body.params.channelData.advertType,
            kpi : req.body.params.channelData.kPI,
            target : req.body.params.channelData.target,
            bid_min : req.body.params.channelData.bidmin,
            bid_Max : req.body.params.channelData.bidmax,
            channel_Budget : req.body.params.channelData.channelBudget,
            create_date : req.body.params.channelData.startDate,
            update_date : req.body.params.channelData.endDate,
            status : req.body.params.channelData.channelStatus,            
            user_id : req.body.params.userId
        }
    apiControllerRequest.editChanel(channel, function(err, rows){
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

router.post('/deleteCampaignChannel',function(req,res){
    //var chanelID = req.body.params.channel_id;
    apiControllerRequest.editChanel(req.body.params ,function(err, rows){
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


// router.get('/getChannelData', function(req, res){
    
//     //client.get("http://205.147.101.67:8080/dashboardAPIv2/report/2/facebook/fwefwf", function (data, response) {
//     client.get(req.query.cuberootBaseUrl+ '/' + req.query.campaignId + '/' + req.query.channelName+ '/' + req.query.channelAccessToken, function (rows, err) {
//         if(!rows)
//             {
//             res.json({
//                 data : [],
//                 code: 500,
//                 status: false,
//                 message: "API Not Successful"});
//             }
//             else
//             {            
//                 var channel ={
//                         channel_name : req.query.channelName,
//                         adverType : rows.advertType,
//                         kpi : rows.kPI,
//                         target : rows.target,
//                         bid_min : rows.bidmin,
//                         bid_Max : rows.bidmax,
//                         channel_Budget : rows.channelBudget,
//                         create_date : rows.startDate,
//                         update_date : rows.endDate,
//                         user_id : req.query.userId,
//                         status : rows.channelStatus
//                     }                
//                 if (!req.query.editChanelId) {
//                     apiControllerRequest.postChannel(channel, function(err,rows){
//                         if(err)
//                         {
//                         res.json(err);
//                         }
//                         else
//                         {
//                             // var channelData = rows;
                           
//                             // //http://205.147.101.67:8080/dashboardAPIv2/report/dmp/611002
//                             // client.get(req.query.cuberootBaseUrl + '/dmp/' + req.query.campaignId , function (data, response) {
//                             //     var scriptData = data;
//                             // });
//                             // res.json({
//                             //     data : {channelData, scriptData},
//                             //     code: 200,
//                             //     status: "Success",
//                             //     message: "API Successful"});
//                             res.json({
//                                 data : rows,
//                                 code: 200,
//                                 status: "Success",
//                                 message: "API Successful"});
//                         }
//                     });
                    
//                 } else if (req.query.editChanelId) {
//                     apiControllerRequest.editChanel(channel, req.query.editChanelId, function(err, rows){
//                         if(err)
//                         {
//                         res.json(err);
//                         }
//                         else
//                         {
//                             // var channelData = rows;
                           
//                             // //http://205.147.101.67:8080/dashboardAPIv2/report/dmp/611002
//                             // client.get(req.query.cuberootBaseUrl + '/dmp/' + req.query.campaignId , function (data, response) {
//                             //     var scriptData = data;
//                             //     res.json({
//                             //     data : {channelData, scriptData},
//                             //     code: 200,
//                             //     status: "Success",
//                             //     message: "API Successful"});
//                             // });
//                             res.json({
//                                 data : rows,
//                                 code: 200,
//                                 status: "Success",
//                                 message: "API Successful"});
//                         }
//                     });
//                 }
//             }
//     });
// });


// router.post('/addNewChannel', function(req,res){
//     var channelId = {}
//     if (req.body.params.channelData.channelName) {
//         var channel ={
//             channel_name : req.body.params.channelData.channelName,
//             adverType : req.body.params.channelData.adverType,
//             kpi : req.body.params.channelData.kpi,
//             target : req.body.params.channelData.target,
//             bid_min : req.body.params.channelData.bidMinMax,
//             bid_Max : req.body.params.channelData.bidMinMax,
//             channel_Budget : req.body.params.channelData.channelBudget,
//             create_date : req.body.params.create_date,
//             update_date : req.body.params.update_date,
//             user_id : req.body.params.userId,
//             status : req.body.params.status
//         }
//         apiControllerRequest.postChannel(channel, function(err,rows){
//             if(err)
//             {
//             res.json(err);
//             }
//             else
//             {
//             //res.json(rows);
//                 apiControllerRequest.getChannelID(req.body.params.channelData.channelName , function(err,rows){
//                     if(err)
//                     {
//                     res.json(err);
//                     }
//                     else
//                     {
//                         channelId = rows[0].channel_id;
//                         if (req.body.params.channelData.segementName) {
//                             var segement ={
//                                 user_id : req.body.params.userId,
//                                 channel_id : parseInt(channelId),
//                                 segement_name : req.body.params.channelData.segementName,
//                                 //segment_form_data : req.body.params.segment_form_data,
//                                 create_date : req.body.params.create_date,
//                                 update_date : req.body.params.update_date,
//                                 status : req.body.params.status
//                             }
//                             apiControllerRequest.insertAudienceSegementData(segement,function(err,rows){
//                                 if(err)
//                                 {
//                                     res.json({
//                                             data : [],
//                                             code: 500,
//                                             status: false,
//                                             message: "API Not Successful"});
//                                 }
//                                 else{
//                                     res.json(channelId);
//                                 }
//                             });
//                         }
//                     }
//                 });

                
//             }
//         });
//     }
//     // else if (req.body.params.channelData.segementName) {
//     //         // var segement ={
//     //         //     user_id : req.body.params.userId,
//     //         //     segement_name : req.body.params.channelData.segementName,
//     //         //     //segment_form_data : req.body.params.segment_form_data,
//     //         //     create_date : req.body.params.create_date,
//     //         //     update_date : req.body.params.update_date,
//     //         //     status : req.body.params.status,
//     //         // }
//     //         // apiControllerRequest.insertAudienceSegementData(segement,function(err,rows){
//     //         //     if(err)
//     //         //     {
//     //         //         res.json({
//     //         //                 data : [],
//     //         //                 code: 500,
//     //         //                 status: false,
//     //         //                 message: "API Not Successful"});
//     //         //     }
//     //         //     else{
//     //         //         res.json(req.body);
//     //         //     }
//     //         // });
//     //         apiControllerRequest.getChannelID(req.body.params.channelData.adverType , function(err,rows){
//     //                 if(err)
//     //                 {
//     //                 res.json(err);
//     //                 }
//     //                 else
//     //                 {
//     //                     channelId = rows[0].channel_id;
//     //                     if (req.body.params.channelData.segementName) {
//     //                         var segement ={
//     //                             user_id : req.body.params.userId,
//     //                             channel_id : parseInt(channelId),
//     //                             segement_name : req.body.params.channelData.segementName,
//     //                             //segment_form_data : req.body.params.segment_form_data,
//     //                             create_date : req.body.params.create_date,
//     //                             update_date : req.body.params.update_date,
//     //                             status : req.body.params.status
//     //                         }
//     //                         apiControllerRequest.insertAudienceSegementData(segement,function(err,rows){
//     //                             if(err)
//     //                             {
//     //                                 res.json({
//     //                                         data : [],
//     //                                         code: 500,
//     //                                         status: false,
//     //                                         message: "API Not Successful"});
//     //                             }
//     //                             else{
//     //                                 res.json(req.body);
//     //                             }
//     //                         });
//     //                     }
//     //                 }
//     //             });
//     //     }
// });

module.exports = router;