var dbConnect = require('../models/dbconnection'); //reference of dbconnection.js

var APIsData={
        userLogin: function(paramsData, callback){
            dbConnect.connect();
            dbConnect.query("select * from user_login where email_id=? and password=?",[paramsData.email_id, paramsData.password], function(err, results) {
                if(err) { 
                   console.log(err); 
                   callback(true); 
                   return; 
                }
                callback(false, results);
            //dbConnect.release();
        });
        },
        getCampaign:function(callback){
            dbConnect.connect();
            return dbConnect.query("select * from master_compaign_objective left join objective on master_compaign_objective.obj_Id = objective.objective_id",callback);
            dbConnect.release();
        },

        // cpmpaign chanel section start
        getChannel:function(paramsData, callback){
            return dbConnect.query("select * from channel where user_id = ? order by channel_id asc",[paramsData], callback);
            dbConnect.release();
        },

        getViewChannel:function(paramsData, callback){
            return dbConnect.query("select * from channel where channel_id = ?",[paramsData], callback);
            dbConnect.release();
        },

        getChannelTypeList:function(callback){
            return dbConnect.query("select * from channel_type_list",callback);
            dbConnect.release();
        },

        getChannelID:function(paramsData, callback){
            return dbConnect.query("select * from channel where channel_name= ?",[paramsData] ,callback);
            dbConnect.release();
        },

        postChannel: function(paramsData, callback){
            return dbConnect.query("insert into channel set?", paramsData, callback);
            dbConnect.release();
        },
        editChanel: function(paramsData, callback){
            return dbConnect.query("update channel set? where channel_id=?", [paramsData , paramsData.channel_id], callback);
            dbConnect.release();
        },
        deleteChanel: function(paramsData, callback){
            return dbConnect.query("delete from channel where channel_id=?", [paramsData.channel_id], callback);
            dbConnect.release();
        },
        // cpmpaign chanel section release


        // cpmpaign audience segement section start
        getAudienceSegementData:function(paramsData, callback){
            return dbConnect.query("select * from new_segement where channel_id=?",[paramsData], callback);
            dbConnect.release();
        },
        getAudienceSegementById:function(id, callback){
            return dbConnect.query("select * from new_segement where seg_id=?",[id],callback);
            dbConnect.release();
        },
        insertAudienceSegementData:function(paramsData, callback){
            return dbConnect.query("INSERT INTO new_segement set? ", paramsData  ,callback);
            dbConnect.release();
        },
        deleteAudienceSegementData:function(id, callback){
            return dbConnect.query("delete from new_segement where seg_id=?", [id], callback);
            dbConnect.release();
        },
        updateAudienceSegementData:function(paramsData, callback){
            return dbConnect.query("update new_segement set ? where seg_id=?",[paramsData , paramsData.seg_id], callback);
            dbConnect.release();
        },
        addNewCampaign: function(paramsData, callback){
            return dbConnect.query("insert into campaign set? ", paramsData, callback)
            dbConnect.release();
        },
        getCustomSegmentsFields: function(callback){
            return dbConnect.query("select * from custom_new_segments_form", callback)
            //dbConnect.release();
        },
        getCustomFormData: function(paramsData, callback){
            return dbConnect.query("call get_custom_new_segments_form(?)",paramsData, callback);
            //dbConnect.release();
        },

        getLoactionSection: function(paramsData, callback){
            return dbConnect.query("call get_loaction_section(?, ?)",[paramsData.param, paramsData.param_code], callback);
            //dbConnect.release();
        },
        // cpmpaign audience segement section release
};
module.exports= APIsData;