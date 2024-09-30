import {ValidationError} from "ErrorHandler-Package";


export default class BaseClass {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        this.validate(data);
        const document = new this.model(data);
        return await document.save();
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async updateById(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async getByParam(param, value) {
        return await this.model.find({ [param]: value });
    }

    validate(data) {
        if (!data) throw new ValidationError("Um ou mais dados fornecidos estão incorretos!");
    }
}
