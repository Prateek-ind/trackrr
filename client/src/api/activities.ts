const BASE_URL = "http://localhost:3000/api"

export const getActivities = async()=>{
    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: "GET",
            credentials: "include"
        })

        if(!response.ok){
            const error = await response.json()
            throw new Error(error.message || "Fetching activites failed")
        }
        const data = await response.json()
        
        return data
    } catch (error) {
        if(error instanceof Error){
      throw new Error(error.message, {cause: error})
    }
    }
}