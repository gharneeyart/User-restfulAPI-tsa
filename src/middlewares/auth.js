import jwt from 'jsonwebtoken';

export const isLoggedIn = async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({success: false, message:"Invalid token or No token provided"})
    }

    // Extract the token 
    const token = authHeader.split(" ")[1]; // split helps split the token from where there is space.. it then returns the token in array format.. this [1] select the token

    // verify the token
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                return res.status(403).json({success: false, message:"Invalid token"})
            } else {
                req.user = decoded;
                console.log({decoded});
                next();
            } 
        })
    } else{
        res.status(401).json({success: false, message:"You are not authorized"})
    }
}