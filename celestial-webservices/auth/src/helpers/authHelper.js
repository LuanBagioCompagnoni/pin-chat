import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'


async function hashPassword(password, salt = 10){
    return await bcryptjs.hash(password, salt);
}

async function comparePasswords(password,hashedPassword){
    return await bcryptjs.compare(password, hashedPassword);
}

async function generateJWT(id, email){
    return jwt.sign({ id: id, user: email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
}

export { hashPassword, comparePasswords, generateJWT}
