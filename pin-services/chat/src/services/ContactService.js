export default class ContactService {

    async getUsersContacts(token){
        const response = await fetch (`${process.env.API_AUTH_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

        if(!response.ok){
            console.log(await response.json())
            return []
        }
        return await response.json();
    }

    async updateStatus(userId, online, token){
        const response = await fetch (`${process.env.API_AUTH_URL}/users/updateStatus/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ online })
        })

        if(!response.ok){
            console.log(await response.json())
            return []
        }
        return await response.json();
    }

}