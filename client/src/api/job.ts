
import type { JobFormData } from "@/types/job.types"

const BASE_URL = "http://localhost:3000/api"

export const createJob = async (formData: JobFormData) => {

  const response = await fetch(`${BASE_URL}/job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include"
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create job")
  }

  return response.json()
}


export const getJobs = async ()=>{
  try {
    const response = await fetch(`${BASE_URL}/job/`, {
    method: "GET",
    credentials: "include"
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create job")
  }
  const data = await response.json()
  console.log(data)
  return data
  } catch (error) {
    if(error instanceof Error){
      throw new Error(error.message, {cause: error})
    }
  }
}