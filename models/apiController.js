var dbConnect = require('../models/dbconnection'); //reference of dbconnection.js

var APIsData={  
        userLogin: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){                            
                connection.query("select * from user_login where email_id=? and password=?",[paramsData.email_id, paramsData.password], function(err, results) {
                    if(err) { 
                       console.log(err); 
                       callback(true, err); 
                       return; 
                    }
                    callback(false, results);
                    connection.release();
                });
            });
        },
        getCampaign:function(callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from master_compaign_objective left join objective on master_compaign_objective.obj_Id = objective.objective_id",callback);
                connection.release();
            });
        },

        // cpmpaign chanel section start
        getChannel:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from channel where user_id = ? order by channel_id asc",[paramsData], callback);
                connection.release();
            });
        },

        getViewChannel:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from channel where channel_id = ?",[paramsData], callback);
                connection.release();
            });
        },

        getChannelTypeList:function(callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from channel_type_list",callback);
                connection.release();
            });
        },

        getChannelID:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from channel where channel_name= ?",[paramsData] ,callback);
                connection.release();
            });
        },

        postChannel: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("insert into channel set?", paramsData, callback);
                connection.release();
            });
        },

        getChannelId: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from channel where channelAccessToken= ?",[paramsData] ,callback);
                connection.release();
            });
        },
        
        editChanel: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("update channel set? where channel_id=?", [paramsData , paramsData.channel_id], callback);
                connection.release();
            });
        },
        deleteChanel: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("delete from channel where channel_id=?", [paramsData.channel_id], callback);
                connection.release();
            });
        },
        // cpmpaign chanel section release


        // cpmpaign audience segement section start
        getAudienceSegementData:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from new_segement where channel_id=?",[paramsData], callback);
                connection.release();
            });
        },
        getAudienceSegementById:function(id, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from new_segement where seg_id=?",[id],callback);
                connection.release();
            });
        },
        insertAudienceSegementData:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("INSERT INTO new_segement set? ", paramsData  ,callback);
                connection.release();
            });
        },
        deleteAudienceSegementData:function(id, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("delete from new_segement where seg_id=?", [id], callback);
                connection.release();
            });
        },
        updateAudienceSegementData:function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("update new_segement set ? where seg_id=?",[paramsData , paramsData.seg_id], callback);
                connection.release();
            });
        },
        addNewCampaign: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("insert into campaign set? ", paramsData, callback)
                connection.release();
            });
        },
        getCustomSegmentsFields: function(callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from custom_new_segments_form", callback)
                connection.release();
            });
        },
        getCustomFormData: function(paramsData, callback){
             dbConnect.getConnection(function(err, connection){
                connection.query("call get_custom_new_segments_form(?)",paramsData, callback);
                connection.release();
            });
        },

        getLoactionSection: function(paramsData, callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("call get_loaction_section(?, ?)",[paramsData.param, paramsData.param_code], callback);
                connection.release();
            });
        },

        getDeviceModel : function(callback){
            dbConnect.getConnection(function(err, connection){
                connection.query("select * from device_namev", callback);
                connection.release();
            });
        },
        // cpmpaign audience segement section release
};
module.exports= APIsData;1