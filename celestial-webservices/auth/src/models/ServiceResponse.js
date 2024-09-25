class ServiceResponse{
    constructor(status = 200, data = null){
        this.success = true;
        if(status < 200 || status > 299) this.success = false;
        this.status = status
        this.data = data
    }
}

export default ServiceResponse