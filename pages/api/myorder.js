import Order from '../../models/Order';
import connectDb from '../../middleware/mongoose';
import jsonwebtoken from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
        const token = req.body.token;
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let orders = await Order.find({ email: data.email })
        res.status(200).json({ orders: orders })
    } catch (error) {
        console.log("Some error accured");
    }
}

export default connectDb(handler);