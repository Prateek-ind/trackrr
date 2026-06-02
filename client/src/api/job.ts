
import type {  JobFormData } from "@/types/job.types"

const BASE_URL = "http://localhost:3000/api"

export const createJob = async (formData: JobFormData) => {

  const response = await fetch(`${BASE_URL}/jobs`, {
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
    const response = await fetch(`${BASE_URL}/jobs`, {
    method: "GET",
    credentials: "include"
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get all jobs")
  }
  const data = await response.json()
  return data
  } catch (error) {
    if(error instanceof Error){
      throw new Error(error.message, {cause: error})
    }
  }
}

export const getJobById = async (id: string)=>{
  try {
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "GET",
    credentials: "include"
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get this job")
  }
  const data = await response.json()
  return data.job
  } catch (error) {
    if(error instanceof Error){
      throw new Error(error.message, {cause: error})
    }
  }
}

export const updateJob = async (id: string, formData: JobFormData) => {

  const response = await fetch(`${BASE_URL}/jobs/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include"
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update job")
  }

  const data = await response.json()
  return data
}

export const deleteJobById = async (id: string)=>{
  try {
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
    credentials: "include"
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to Delete this job")
  }
  const data = await response.json()
  return data
  } catch (error) {
    if(error instanceof Error){
      throw new Error(error.message, {cause: error})
    }
  }
}

export const uploadResume = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await fetch(
    `${BASE_URL}/jobs/resume`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  if (!response.ok) {
    const text =
      await response.text();

    console.log(text);

    throw new Error(
      "Upload failed"
    );
  }

  return response.json();
};