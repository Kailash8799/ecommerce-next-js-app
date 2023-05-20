import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);

                if (req.body.email === user.email && req.body.password === originalText) {
                    var token = jwt.sign({ success: true, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "10d" });
                    res.status(200).json({ success: true, token, "email": req.body.email })
                }
                else {
                    res.status(400).json({ success: false, error: "Invalid credentials" })
                }
            }
            else {
                res.status(404).json({ success: false, error: "Invalid credentials" })
            }
        }
        else {
            res.status(400).json({ error: "Some error accured" })
        }
    } catch (error) {
        console.log("Some error accured");
    }
}

export default connectDb(handler);