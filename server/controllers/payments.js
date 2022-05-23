const Order = require('../models/order')
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const instance = new Razorpay({
	key_id: 'rzp_test_PnqF9iLcofwZZo',
	key_secret: 'k1d6mFsnOzMf9UCuMsXwD7n4'
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
	const secret = 'k1d6mFsnOzMf9UCuMsXwD7n4'
    console.log(secret)
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
        console.log('request is wrong')
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
        // res.status(400).send('Invalid signature');
	}
	res.json({ status: 'ok' })
}

//READ ORDER
exports.read = (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    Order.find({userId:userId}).exec((err, orderr) => {
        if (err || !orderr) {
            return res.status(400).json({
                error: 'Order not found'
            });
        }
        console.log(orderr)
        res.json(orderr);
    });
};

//READ ORDER
exports.readAll = (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    Order.find({}).exec((err, orderr) => {
        if (err || !orderr) {
            return res.status(400).json({
                error: 'Order not found'
            });
        }
        console.log(orderr)
        res.json(orderr);
    });
};