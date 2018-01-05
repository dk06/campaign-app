var dbConnect = require('../models/dbconnection'); //reference of dbconnection.js

var APIsData={  
        userLogin: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from user_login where email_id=? and password=?",[paramsData.email_id, paramsData.password], function(err, results) {
                        if(err) { 
                           console.log(err); 
                           callback(true, err); 
                           return; 
                        }
                        callback(false, results);
                        connection.release();
                    });
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        getCampaign:function(callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from master_compaign_objective left join objective on master_compaign_objective.obj_Id = objective.objective_id",callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        // cpmpaign chanel section start
        getChannel:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from channel where user_id = ? order by channel_id asc",[paramsData], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getViewChannel:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from channel where channel_id = ?",[paramsData], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getChannelTypeList:function(callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from channel_type_list",callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getChannelID:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from channel where channel_name= ?",[paramsData] ,callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        postChannel: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("insert into channel set?", paramsData, callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getChannelId: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from channel where channelAccessToken= ?",[paramsData] ,callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        
        editChanel: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("update channel set? where channel_id=?", [paramsData , paramsData.channel_id], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        deleteChanel: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("delete from channel where channel_id=?", [paramsData.channel_id], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        // cpmpaign chanel section release


        // cpmpaign audience segement section start
        getAudienceSegementData:function(callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from new_segement where isAction=?", [1], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        updateSegementType:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("update new_segement set ? where seg_id=?", [paramsData , paramsData.seg_id], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getAudienceSegmentById:function(id, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from new_segement where seg_id=? and isAction=?",[id, 1],callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        insertAudienceSegementData:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("INSERT INTO new_segement set? ", paramsData  ,callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        deleteAudienceSegementData:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("update new_segement set ? where seg_id=?",[paramsData , paramsData.seg_id], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        updateAudienceSegementData:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("update new_segement set ? where seg_id=?",[paramsData , paramsData.seg_id], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        addNewCampaign: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("insert into campaign set? ", paramsData, callback)
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        getCustomSegmentsFields: function(callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from custom_new_segments_form", callback)
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        getCustomFormData: function(paramsData, callback){
             dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("call get_custom_new_segments_form(?)",paramsData, callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getLoactionSection: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("call get_loaction_section(?, ?)",[paramsData.param, paramsData.param_code], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getDeviceModel : function(callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from device_namev", callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        saveFinalCampaignObj: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("insert into final_campaign_list set?", paramsData, callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        updateFinalCampaign: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("update final_campaign_list set? where campaign_id=?", [paramsData, paramsData.campaign_id], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        getFinalCampaign : function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("select * from final_campaign_list f join channel c on f.channel_id = c.channel_id where c.user_id=? and isAction=?",[paramsData, 1], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },

        deleteCampaignBySelectId : function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                if (!err) {
                    connection.query("update final_campaign_list set? where campaign_id=?",[paramsData, paramsData.campaign_id], callback);
                    connection.release();
                }else{
                    callback(true, err); 
                    return;
                }
            });
        },
        // cpmpaign audience segement section release
};
module.exports= APIsData;1