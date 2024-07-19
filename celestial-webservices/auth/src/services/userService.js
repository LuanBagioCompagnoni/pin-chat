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

    static async delete(id){
        try {
            const isDeleted = User.findByIdAndDelete(id);
            if(isDeleted){
                return { success: true }
            }else{
                return { success: false, message: `User not deleted: ${isDeleted}`, status: 404}
            }
        } catch (error) {
            return { success: false, message: error.message, status: 500}
        }
    }

    static async update(id, user){
        try {
            const isUpdated = User.findByIdAndUpdate(id, user);
            if(isUpdated){
                return { success: true, data: isUpdated }
            }else{
                return { success: false, message: `User not deleted: ${isUpdated}`, status: 404}
            }
        } catch (error) {
            return { success: false, message: error.message, status: 500}
        }
    }

    static async findById(id){
        try {
            const user = User.findById(id)
            if(user){
                return { success: true, data: user }
            }else{
                return { success: false, message: "User not found!", status: 404}
            }
        } catch (error) {
            return { success: false, message: error.message, status: 500}
        }
    }
    
    static async findByEmail(email){
        try {
            const user = User.find({email: email})
            if(user){
                return { success: true, data: user }
            }else{
                return { success: false, message: "User not found!", status: 404}
            }
        } catch (error) {
            return { success: false, message: error.message, status: 500}
        }
    }
}