const { tokenValidator } = require("../utils/token");

const authVerify = async function(req,res,next) {
	const { jwt } = req.cookies;
	const valid = await tokenValidator(jwt);
	if (valid) { 
		next();
	 } else {
		 res.send("Authentication Failed / Access denied...");
	 }
}

module.exports.authVerify = authVerify;