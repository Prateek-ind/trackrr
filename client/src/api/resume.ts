const BASE_URL = "http://localhost:3000/api"

export const analyseResume = async (formData)=>{
    

    try {
        const response = await fetch(`${BASE_URL}/resume/analyse`, {
            method: "POST",
            body: formData,
            credentials: "include"
        }) 

        if(!response.ok){
            throw new Error("Analysis failed")
        }

        const data = await response.json()
        return data
    } catch (error: any) {
        throw new Error(error.message, {cause: error})
    }
}

export const getRoadmap = async(formData:   { skill: string; jobTitle: string; company: string }) =>{
    
    try {
        const response = await fetch(`${BASE_URL}/resume/roadmap`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials: "include"
        }) 

        if(!response.ok){
            throw new Error("Roadmap creation failed")
        }

        const data = await response.json()
        return data
    } catch (error: any) {
        throw new Error(error.message, {cause: error})
    }
}

export const generateLatex = async(formData : {
  resumeText: string
  jobTitle: string
  company: string
  jobDescription: string
  omittedSkills: string[]
})=>{
    
    try {
        const response = await fetch(`${BASE_URL}/resume/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials: "include"
        }) 

        if(!response.ok){
            throw new Error("LaTeX code generation failed failed")
        }

        const data = await response.json()
        return data
    } catch (error: any) {
        throw new Error(error.message, {cause: error})
    }
}