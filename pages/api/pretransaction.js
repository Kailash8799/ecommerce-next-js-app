const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    try { 
        if (req.method === 'POST') {
            // initiate in order correspondind to order id
    
            let totalprice = 0;
            for (let item in req.body.cart) {
                let product = await Product.findOne({ slug: item })
                totalprice = totalprice + (product.price * req.body.cart[item].qty);
                if(product.availableQty < req.body.cart[item].qty){
                    res.status(200).json({ sucess: "error",error : "Some items in your cart went out of stock. Please try again"})
                    return;
                }
            }
            if(req.body.phone.length != 10){
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
                })
                await order.save();
    
                var paytmParams = {};
    
                paytmParams.body = {
                    "requestType": "Payment",
                    "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
                    "websiteName": "YOUR_WEBSITE_NAME",
                    "orderId": req.body.oid,
                    "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
                    "txnAmount": {
                        "value": req.body.subtotal,
                        "currency": "INR",
                    },
                    "userInfo": {
                        "custId": req.body.email,
                    },
                };
    
                /*
                * Generate checksum by parameters we have in body
                * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
                */
                const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY)
    
                paytmParams.head = {
                    "signature": checksum
                };
    
                var post_data = JSON.stringify(paytmParams);
    
                const requestaync = () => {
                    return new Promise((resolve, reject) => {
                        var options = {
    
    
                            hostname: 'securegw.paytm.in',
    
                            port: 443,
                            path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': post_data.length
                            }
                        };
    
                        var response = "";
                        var post_req = https.request(options, function (post_res) {
                            post_res.on('data', function (chunk) {
                                response += chunk;
                            });
    
                            post_res.on('end', function () {
                                console.log('Response: ', response);
                                resolve(JSON.parse(response).body)
                            });
                        });
    
                        post_req.write(post_data);
                        post_req.end();
                    })
                }
    
                let myr = await requestaync()
                res.status(200).json(myr)
    
            }
            else{
                res.status(200).json({ sucess: "error",error : "The price of some items in your cart have changed. Please try again"})
                return;
            }
        }
        else{
            console.log("Some error accured");
        }
    } catch (error) {
        console.log("Some error accured");
    }
}


export default connectDb(handler);