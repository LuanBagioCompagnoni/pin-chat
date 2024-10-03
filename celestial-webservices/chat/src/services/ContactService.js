export default class ContactService {

    async getUsersContacts(){
    const response = await fetch (`${process.env.API_AUTH_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(!response.ok){
            return []
        }
        return await response.json();
    }

}