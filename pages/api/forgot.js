import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
import Forgot from '../../models/Forgot';
var jwt = require('jsonwebtoken');
import CryptoJS from 'crypto-js';
import nodemailer from 'nodemailer';

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
        if (req.body.sendMail) {
            let userinfo = await User.findOne({ email: req.body.email })
            if (userinfo) {
                await Forgot.findOneAndDelete({email: req.body.email});
                let token = jwt.sign({ success: true, userid: userinfo._id, email: req.body.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
                let a = new Forgot({
                    userid: userinfo._id,
                    email: userinfo.email,
                    token: token
                })
                await a.save()
            let email = `We have sent you this email in response to your request to reset your password on Codeswear.com

            To reset your password, please follow the link below:
            http://localhost:3000/forget?token=${token}

            We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and update your password `
            // --------------------------------
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'kailashrajput8799@gmail.com',
                  pass: 'jishlslhiezxenqr'
                }
              });
              var mailOptions = {
                from: 'kailashrajput8799@gmail.com',
                to: req.body.email,
                subject: 'Forgot Password',
                text: email
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            // ---------------------------------
                res.status(200).json({ success: true })
            }
            else {
                res.status(404).json({ success: false, error: "User Not Found" })
            }
        }
        else {
            let userf = await Forgot.findOne({ token: req.body.qtoken })
            if (userf) {
                    let npass = req.body.npassword
                    let user = await User.findOneAndUpdate({ email: userf.email}, { password: CryptoJS.AES.encrypt(npass, process.env.AES_SECRET).toString() })
                    await Forgot.findOneAndDelete({email: userf.email});
                    res.status(200).json({ success: true })
                    return;
            }
            else {
                res.status(404).json({ success: false, error: "Token will be not valid" })
                return;
            }
        }
    }
    else {
        res.status(400).json({ success: false, error: "Some error accured" });
        return;
    }
    
  } catch (error) {
    console.log("Some error accured");
  }
}

export default connectDb(handler);