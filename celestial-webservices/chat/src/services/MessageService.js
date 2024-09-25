import Message from '../models/Message.js';
import ServiceResponse from "../models/ServiceResponse.js";

export default class MessageService {
    static async list(serviceId){
        console.log("serviceId", serviceId);
        const messages = await Message.find({serviceId: serviceId});
        return ServiceResponse(200, messages);
    }
}