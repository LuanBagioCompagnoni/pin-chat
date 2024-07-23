class ServiceResponse{
    constructor(status = 200, data = null){
        this.success = status < 200 && status > 299 ? false : true;
        this.status = status
        this.data = data
    }
}

export default ServiceResponse