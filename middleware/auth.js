const jwt = require("jsonwebtoken");
const jwtSecret = 'dd5f127913bbe2f89b41e4ab9bdb9b3696420e7ae5da224014c5739f6d1565eaa984ee';
exports.adminAuth = (req,res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorised"});
            }   else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorised"});
                }   else {
                    next();
                }
            }
        });
    }   else {
        return res
            .status(401)
            .json({ message: "Not authorised, token not available"});
    }
};

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorised" });
            }   else {
                if (decodedToken.role !== "user") {
                    return res.status(401).json({ message: "Not authorised" });
                }   else {
                    next();
                }
            }
        });
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
};