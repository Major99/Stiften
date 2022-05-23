const Organisation = require('../models/organisation');



exports.create = (req, res) => {

};


exports.read = (req, res) => {
    const orgId = req.params.id;
    console.log(userId);
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        console.log(user)
        res.json(user);
    });
};

//READ ORDER
exports.readAll = (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    User.find({role:'subscriber'}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Users not found'
            });
        }
        console.log(user)
        res.json(user);
    });
};

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};
