'use strict';

const role = (capability) => {
    return function(req,res,next){
        if(!req.user.capabilities.includes(capability)){
            res.status(401).json({
                message: 'access denied'
            })
        } else {
            next()
        }
    }
}

module.exports = role