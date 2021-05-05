// const winston = require('winston');

// module.exports = function(err, req, res, next){
//     winston.error(err.message, err);

   
//     res.status(500).send('Something failed.');

// }


module.exports = function(error,req,res,next){
    res.status(error.status || 500);
    return res.json({
        error:error.message
    })
}