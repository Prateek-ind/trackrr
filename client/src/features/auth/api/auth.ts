import  { type LoginAuthType, type RegisterAuthType } from "../types/auth.types"

const url = import.meta.env.VITE_BACKEND_URL

export const loginUser = async(loginData: LoginAuthType)=>{
    try {
        console.log(url)
        const res = await fetch(`${url}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        if(!res.ok){
            const error = await res.json()
            throw new Error(error.message || "Login failed")
        }

        const data = await res.json()

        return data

    } catch (error) {
    if(error instanceof Error)
    throw new Error(error.message || "Something went wrong",{
        cause: error
    })
  }
}

export const registerUser = async(registerData: RegisterAuthType)=>{
    try {
        const res = await fetch(`${url}/api/auth/register`, {
            method: "POST",
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        if(!res.ok){
            const error = await res.json()
            throw new Error(error.message || "Registration failed")
        }

        const data = await res.json()

        return data

    } catch (error) {
    console.log(error)
    throw new Error("Something went wrong",{
        cause: error
    })
  }
}

export const logoutUser = async()=>{
    try {
        const res = await fetch(`${url}/api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        if(!res.ok){
            throw new Error("Logout failed")
        }

        const data = await res.json()

        return data

    } catch (error) {
    console.log(error)
    throw new Error("Something went wrong",{
        cause: error
    })
  }
}