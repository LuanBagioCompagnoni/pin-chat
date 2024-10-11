import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'


async function hashPassword(password, salt = 10){
    return await bcryptjs.hash(password, salt);
}

async function comparePasswords(password,hashedPassword){
    return await bcryptjs.compare(password, hashedPassword);
}

async function generateJWT(user){
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
}

async function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

export { hashPassword, comparePasswords, generateJWT, verifyToken}
