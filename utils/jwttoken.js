import jwt from 'jsonwebtoken';

const SignToken = async (obj)=> {
const token = await jwt.sign(obj, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
    return token
}

export default SignToken;