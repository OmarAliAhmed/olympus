const User = require("../models/user");
module.exports = function () {
    return (req, res, next) => {
        User.findUserById(req.user._id, (err, user) => {
            if (err) {
                throw new err;
            }
            if (!user) {
                res.json({sucess: false, msg: "there's no such user !"})
            } else {
                if(user.admin) {
                    next();
                } else {
                res.json({sucess: false, msg: "You  are not authenticated to do this action !"})

                }
            }
        })
    }
}
