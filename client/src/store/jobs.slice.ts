import type { Job, JobFormData } from '@/types/job.types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface Stats {
  total: number
  interviews: number
  offers: number
  rejections: number
  assessments: number
}

export interface JobState {
  jobs: Job[]
  stats: Stats
  loading: boolean
  error: string  | null
}

const initialState: JobState = {
  jobs: [],
  stats: {
    total: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
    assessments: 0,
  },
  loading: false,
  error: null,
}

// export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async(_, thunkAPI)=>{
//     try {
//        const data =  await getJobs()
//        return data.jobs
//     } catch (error) {
//         if(error instanceof Error){
//             return thunkAPI.rejectWithValue(error.message)
//         }
//     }
// })

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        computeStats: (state)=>{
            state.stats = {
                total: state.jobs.length,
                interviews: state.jobs.filter((j)=>j.status === "interview").length,
                offers: state.jobs.filter((j)=>j.status === "offer").length,
                rejections: state.jobs.filter((j)=>j.status === "rejected").length,
                assessments: state.jobs.filter((j)=>j.status === "assessment").length,
            }
        },
        setJobs: (state, action: PayloadAction<Job[]>)=>{
        state.jobs = action.payload
    }
    },
    
    // extraReducers: (builder)=>{
    //     builder
    //     .addCase(fetchJobs.pending, (state)=>{
    //         state.loading = true
    //         state.error = null
    //     })
    //     .addCase(fetchJobs.fulfilled, (state, action)=>{
    //         state.loading = false
    //         state.jobs = action.payload
    //     })
    //     .addCase(fetchJobs.rejected, (state, action)=>{
    //         state.loading = false
    //         state.error = action.payload as string
    //     })

    // }
})
export const {setJobs, computeStats} = jobsSlice.actions
export default jobsSlice.reducer