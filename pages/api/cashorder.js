import Order from '../../models/Order';
import connectDb from '../../middleware/mongoose';
import Product from '../../models/Product';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            let totalprice = 0;
            for (let item in req.body.cart) {
                let product = await Product.findOne({ slug: item })
                totalprice = totalprice + (product.price * req.body.cart[item].qty);
                if(product.availableQty < req.body.cart[item].qty){
                    res.status(200).json({ sucess: "error",error : "Some items in your cart went out of stock. Please try again"})
                    return;
                }
            }
            if(!Number.isInteger(Number(req.body.phone))){
                res.status(200).json({ sucess: "error",error : "Enter a valid phone number"})
                return;
            }
            if (totalprice === req.body.subtotal) {
                let order = new Order({
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    orderId: req.body.oid,
                    address: req.body.address + " " + req.body.pincode + " " + req.body.dis + " " + req.body.state,
                    amount: req.body.subtotal,
                    products: req.body.cart,
                    paymentInfo: 'Cash On Delivery',
                    status: 'COD'
                })
                await order.save();
                let ord = await Order.findOne({ orderId: req.body.oid })
                let products = ord.products;
                for (let slug in products) {
                  await Product.findOneAndUpdate({ slug: slug }, {$inc:{"availableQty": -products[slug].qty}})
                }
                res.status(200).json({ sucess: "sucess", _id: ord._id })
                return;
            }
            else {
                res.status(200).json({ sucess: "error" ,error : "The price of some items in your cart have changed. Please try again"})
            }
        }
        else {
            res.status(400).json({ error: "Some error accured" })
        }
    } catch (error) {
        console.log({ error: "some error accured" });
    }
}

export default connectDb(handler);