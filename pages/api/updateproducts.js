import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const  handler = async(req, res)=>{
    try {
     
    if(req.method == 'POST'){
        for(let i = 0; i < req.body.length; i++){
         await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
    }
    res.status(200).json({sucess : "sucess"})
    }
    else{
        res.status(400).json({ error : "Some error accured" })
    }
       
} catch (error) {
      console.log("Some error accred");  
}
}

export default connectDb(handler);