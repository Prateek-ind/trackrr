
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