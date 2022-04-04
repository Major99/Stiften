const Order = require('../models/order')
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const instance = new Razorpay({
	key_id: 'rzp_test_Zd5zdtFpzQk07Q',
	key_secret: 'gw5a0hiNF6SBcSm0J5nNzzxq'
});

//CREATE ORDER
exports.createOrder =  async (req, res) => {
    const { orgId, order_amount, userId } = req.body

    const newOrder = new Order({
        userId,
        orgId,
        order_amount
    })
    
   await newOrder.save((err, result) => {
        if(err){
            return res.status(400).json({
            message: "Failed to save an order in the database"
            })
        }
 
        var options = {
            amount: order_amount*100,
            currency: "INR",
            receipt: uuidv4(),
            payment_capture: '1'
            };
 
        instance.orders.create(options, function(err, order) {
            if(err){
            return res.status(400).json({
                error: "Failed to create order"
            })
            }
            Order.findByIdAndUpdate(result._id,{order_id: order.id}, { new: true })
                .exec((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: err
                    })
                }
                console.log(order,result)
                return res.status(200).json({
                    order_id: order.id,
                    res: "ok",
                    message: "Order created successfully"
                    })
                });
        })
    })
}


// VERIFICATION
 module.exports.paymentVerification =  async (req,res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
}

