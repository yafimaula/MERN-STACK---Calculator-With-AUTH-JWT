const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const JWT_SERCRET = "*/.12harryp0tt3rth3de4thlyholl0ws/{}590][832536shdasahbc%"



const mongoUrl = "mongodb://yafimaula:yafi5498@ac-elcdmxq-shard-00-00.treolyn.mongodb.net:27017,ac-elcdmxq-shard-00-01.treolyn.mongodb.net:27017,ac-elcdmxq-shard-00-02.treolyn.mongodb.net:27017/?ssl=true&replicaSet=atlas-14lrkf-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set('strictQuery', true);

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => { console.log("Connected to database"); })
    .catch(e => console.log(e))

require("./userDetails")
require("./loginDetails")


const User = mongoose.model("UserInfo");
const Login = mongoose.model("LoginInfo");


app.post("/register", async (req, res) => {
    const { fname, lname, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ error: "User Exist" })
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword
        })
        res.send({ status: "ok" });

    } catch (error) {
        res.send({ status: "error" });
    }
})


app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.send({ error: "User Not Found" })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SERCRET, {
            expiresIn: 100000000,
        });

        if (res.status(201)) {
            await Login.create({
                email
            })
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ status: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });

})

app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SERCRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == 'token expired') {
            return res.send({ status: "error", data: "token expired" });
        }
        const useremail = user.email;
        Login.findOne({ email: useremail }).then((data) => {
            res.send({ status: "ok", data: data });
        }).catch((error) => {
            res.send({ status: "error", data: error });
        });

    } catch (error) {
        res.send({ status: "error" });
    }
})

app.post("/logout", async (req, res) => {
    
    try {
        const { id } = req.body;
        const result = await Login.updateOne({ _id: id }, { $set: { logouttime: moment(new Date()).format("MM-DD-YYYY, h:mm:ss a") } });
        console.log(result);
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
})




app.listen(5000, () => {
    console.log('Server Started');
});
