import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
import jsonwebtoken from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const token = req.body.token;
            const data = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            let userinfo = await User.find({ email: data.email })
            const { address, name, email, pincode, phone } = userinfo[0];
            res.status(200).json({ sucess: true, address, name, email, pincode, phone })
        }
        else {
            res.status(400).json({ sucess: false, error: "Some error accured" });
        }

    } catch (error) {
        console.log("Some error accured");
    }
}

export default connectDb(handler);