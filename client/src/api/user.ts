import type { User } from "@/types/user.types"

const BASE_URL = import.meta.env.VITE_BACKEND_URL 

export const fetchUser = async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/api/user/profile`, {
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
        const response = await fetch(`${BASE_URL}/api/user/profile`, {
            method: "PATCH",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await response.json()
        return data
    } catch (error) {
          if(error instanceof Error)
            throw new Error(error.message, {cause: error})
    }
}