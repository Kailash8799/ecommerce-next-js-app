import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
import jsonwebtoken from 'jsonwebtoken';

const handler = async (req, res) => {
    try {
    if (req.method === 'POST') {
        const token = req.body.token;
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let user = await User.find({ email: data.email })
        if(user){
            res.status(200).json({ user, sucess:true })
            return;
        }
        else{
            res.status(200).json({ sucess:false })
            return;
        }
    }
    else{
        res.status(400).json({error:"Some error accured"});
    } 
        
} catch (error) {
        console.log("Some error accured"); 
}
}

export default connectDb(handler);