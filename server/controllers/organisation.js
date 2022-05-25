const Organisations = require('../models/organisation');




exports.read = (req, res) => {
    const orgId = req.params.id;
    console.log(orgId);
};

//READ ORDER
exports.readAll = (req, res) => {
    
    Organisations.find().exec((err, org) => {
        if (err || !org) {
            return res.status(400).json({
                error: 'Organisations not found'
            });
        }
        console.log(org)
        res.json(org);
    });
};

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

};



exports.create = (req, res) => {
    const {e}=req.body
    console.log(e)
    if(e){
        const {name,rating,number,location,description,social,gmap,website,email,address}=e
        const newOrg= new Organisations({name,rating,number,location,description,social,gmap,website,email,address});
        newOrg.save((err,success)=>{
            if(err){
                console.log(`Error in saving organisation in database: ${err}`)
                return res.status(400).json({
                error: err
                });
            }
            res.json({
                message: "New organisation added successfully !"
            })
        })
    }
    else{
        return res.json({
        message: 'something went wrong'
        })
    }
};
