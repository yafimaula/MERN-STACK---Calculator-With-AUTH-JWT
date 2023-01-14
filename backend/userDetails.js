const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateIndonesia = moment.tz(Date.now(), "Asia/Bangkok");

const UserDetailsSchema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        email: { type: String, unique: true },
        password: String,
        created: {
            type: Date,
            default: dateIndonesia
        },
        updated: {
            type: Date,
            default: dateIndonesia
        },
    },
    {
        collection: "UserInfo"
    }
);

mongoose.model("UserInfo", UserDetailsSchema);