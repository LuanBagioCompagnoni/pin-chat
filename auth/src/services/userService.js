import User from "../models/User.js"

export default class userService {
    static async create(user){
        try {
            const { email, password } = user;
            if(User.find({email})){
                return { success: false, message: "User alread exists!"}
            }
            if(user){
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ email, password: hashedPassword, ...otherDetails });
                const document = await newUser.save()
                return { success: true, data: document};
            }
        } catch (error) {
            return { success: false, message: `Error creating user: ${error.message}`, status: 500}
        }
    }
}