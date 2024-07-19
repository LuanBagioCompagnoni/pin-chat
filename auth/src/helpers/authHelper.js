export default class authHelper{

    static async hashPassword(password, salt = 10){
        return await bcrypt.hash(password, salt);
    }

    static async comparePasswords(password,hashedPassword){
        return await bcrypt.compare(password, hashedPassword);
    }
}