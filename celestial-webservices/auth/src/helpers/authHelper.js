import jwt from 'jsonwebtoken';


async function hashPassword(password, salt = 10){
    return await bcrypt.hash(password, salt);
}

async function comparePasswords(password,hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}

async function generateJWT(email){
    return jwt.sign({ user: email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
}

export { hashPassword, comparePasswords, generateJWT}
