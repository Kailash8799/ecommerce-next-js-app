import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  try {
  if (req.body.STATUS === 'TXN_SUCCESS') {
   let order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "PAID", paymentInfo: JSON.stringify(req.body) ,transactionId:req.body.TXNID})
    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate({ slug: slug }, {$inc:{"availableQty": -products[slug].qty}})
  }
    res.redirect(`/order?id=${order._id}`, 200)
  }
  else if (req.body.STATUS === 'PENDING') {
    let order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "PENDING", paymentInfo: JSON.stringify(req.body) ,transactionId:req.body,TXNID})

    res.redirect(`/order?id=${order._id}`, 200)
  }
  
} catch (error) {
    console.log("Some error accured");
}
}

export default connectDb(handler);