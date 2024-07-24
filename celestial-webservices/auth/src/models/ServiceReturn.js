class ServiceResponse{
    constructor(status = 200, data = null){
        this.success = true;
        console.log(status, status < 200 || status > 299)
        if(status < 200 && status > 299) this.success = false;
        this.status = status
        this.data = data
    }
}

export default ServiceResponse