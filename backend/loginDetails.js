const mongoose = require('mongoose');
const moment = require('moment');

var logintime = function(){
    var d = new Date();
    var formattedDate = moment(d).format("MM-DD-YYYY, h:mm:ss a");
    return formattedDate;
};

const LoginDetailsSchema = new mongoose.Schema(
    {
        email: String,
        logintime: {
            type: String,
            default: logintime
        },
        logouttime: {
            type: String,
            default:null
        },
    },
    {
        collection: "LoginInfo"
    }
);

mongoose.model("LoginInfo", LoginDetailsSchema);