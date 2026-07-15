// Create server/middleware/auth.js. It reads the Authorization: Bearer <token> header, verifies the JWT with jwt.verify(), and attaches the decoded user to req.user. If token is missing or invalid, return 401.

const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!token) {
        return res.status(401).json({
            message: "No token"
        });
    }
    const parts = token.split(" ")
    try{

        const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    }catch(err){
        res.status(401).json({
            message:err
        })
    }

}

module.exports = auth;