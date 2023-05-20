import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
import jsonwebtoken from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const token = req.body.token;
            const data = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            let user = await User.findOneAndUpdate({ email: data.email }, { address: req.body.address, pincode: req.body.pincode, phone: req.body.phone, name: req.body.name })
            res.status(200).json({ sucess: true })
        }
        else {
            res.status(400).json({ error: "Some error accured", sucess: false });
        }
    } catch (error) {
        console.log("Some error accured");
    }
}

export default connectDb(handler);