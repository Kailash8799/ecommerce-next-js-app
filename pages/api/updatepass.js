import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
   
    if (req.method == 'POST') {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);

            if (req.body.email === user.email && req.body.cupassword === originalText) {
                if (req.body.password === req.body.cpassword) {
                    let npass = req.body.password
                    let user = await User.findOneAndUpdate({ email: req.body.email }, { password: CryptoJS.AES.encrypt(npass, process.env.AES_SECRET).toString() })
                    res.status(200).json({ success: true })
                    return;
                }
                else {
                    res.status(400).json({ success: false, error: "New password will be not match with conform password" })
                    return;
                }
            }
            else {
                res.status(400).json({ success: false, error: "Current password will be wrong" })
                return;
            }
        }
        else {
            res.status(404).json({ success: false, error: "User not found" })
            return;
        }
    }
    else {
        res.status(400).json({ success: false, error: "Some error accured" })
    }
} catch (error) {
    console.log("Some error accred");    
}
}

export default connectDb(handler);