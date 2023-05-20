import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const { password } = req.body;
            let p = new User({
                name: req.body.name,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString(),
            })
            await p.save();
            res.status(200).json({ sucess: "sucess" })
        }
        else {
            res.status(400).json({ error: "Some error accured" })
        }
    } catch (error) {
        console.log("Some error accured");
    }
}

export default connectDb(handler);