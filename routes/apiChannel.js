var express = require('express');
var router = express.Router();
var apiControllerRequest = require('../models/apiController');

router.get('/getCampaignChannel', function(req,res){
    apiControllerRequest.getChannel(function(err,rows){
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
router.post('/addNewChannel', function(req,res){
    var channelId = {}
    if (req.body.params.channelData.adverType) {
        var channel ={
            channel_name : req.body.params.channelData.adverType,
            create_date : req.body.params.create_date,
            update_date : req.body.params.update_date,
            user_id : req.body.params.userId,
            status : req.body.params.status
        }
        apiControllerRequest.postChannel(channel, function(err,rows){
            if(err)
            {
            res.json(err);
            }
            else
            {
            //res.json(rows);
                apiControllerRequest.getChannelID(req.body.params.channelData.adverType , function(err,rows){
                    if(err)
                    {
                    res.json(err);
                    }
                    else
                    {
                        channelId = rows[0].channel_id;
                        if (req.body.params.channelData.segementName) {
                            var segement ={
                                user_id : req.body.params.userId,
                                channel_id : parseInt(channelId),
                                segement_name : req.body.params.channelData.segementName,
                                //segment_form_data : req.body.params.segment_form_data,
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
                                    res.json(channelId);
                                }
                            });
                        }
                    }
                });

                
            }
        });
    }
    // else if (req.body.params.channelData.segementName) {
    //         // var segement ={
    //         //     user_id : req.body.params.userId,
    //         //     segement_name : req.body.params.channelData.segementName,
    //         //     //segment_form_data : req.body.params.segment_form_data,
    //         //     create_date : req.body.params.create_date,
    //         //     update_date : req.body.params.update_date,
    //         //     status : req.body.params.status,
    //         // }
    //         // apiControllerRequest.insertAudienceSegementData(segement,function(err,rows){
    //         //     if(err)
    //         //     {
    //         //         res.json({
    //         //                 data : [],
    //         //                 code: 500,
    //         //                 status: false,
    //         //                 message: "API Not Successful"});
    //         //     }
    //         //     else{
    //         //         res.json(req.body);
    //         //     }
    //         // });
    //         apiControllerRequest.getChannelID(req.body.params.channelData.adverType , function(err,rows){
    //                 if(err)
    //                 {
    //                 res.json(err);
    //                 }
    //                 else
    //                 {
    //                     channelId = rows[0].channel_id;
    //                     if (req.body.params.channelData.segementName) {
    //                         var segement ={
    //                             user_id : req.body.params.userId,
    //                             channel_id : parseInt(channelId),
    //                             segement_name : req.body.params.channelData.segementName,
    //                             //segment_form_data : req.body.params.segment_form_data,
    //                             create_date : req.body.params.create_date,
    //                             update_date : req.body.params.update_date,
    //                             status : req.body.params.status
    //                         }
    //                         apiControllerRequest.insertAudienceSegementData(segement,function(err,rows){
    //                             if(err)
    //                             {
    //                                 res.json({
    //                                         data : [],
    //                                         code: 500,
    //                                         status: false,
    //                                         message: "API Not Successful"});
    //                             }
    //                             else{
    //                                 res.json(req.body);
    //                             }
    //                         });
    //                     }
    //                 }
    //             });
    //     }
});

router.post('/editCampaignChannel', function(req,res){
    var chanelUpdate ={
        channel_id : req.body.params.channel_id,
        channel_name : req.body.params.channel_name,
        update_date : req.body.params.update_date
    }
    apiControllerRequest.editChanel(chanelUpdate, function(err, rows){
        if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
    });
});

router.post('/deleteCampaignChannel',function(req,res){
    //var chanelID = req.body.params.channel_id;
    apiControllerRequest.deleteChanel(req.body.params ,function(err, rows){
        if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
    });
});

module.exports = router;