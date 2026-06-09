import type { User } from "@/types/user.types"

const BASE_URL = "http://localhost:3000/api"

export const fetchUser = async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/user/profile`, {
            method: "GET",
            credentials: "include"
        })

        if(!response.ok){
            const error = await response.json()
            throw new Error(error)
        }

        const data = await response.json()
        return data
    }catch(error){
        if(error instanceof Error)
            throw new Error(error.message, {cause: error})
    }
}

export const updateProfile = async(formData: User)=>{
    try {
        const response = await fetch(`${BASE_URL}/user/profile`, {
            method: "PATCH",
            headers:  {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials: "include"
        })

        const data = await response.json()
        return data
    } catch (error) {
          if(error instanceof Error)
            throw new Error(error.message, {cause: error})
    }
}