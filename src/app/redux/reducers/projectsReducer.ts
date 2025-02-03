import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    allProjects: []
}

const projectsSlice = createSlice({
    name:'Projects',
    initialState,
    reducers:{
        storeAllProjectsR: (state, {payload})=>{state.allProjects = payload},
        // updateProjectR: (state, {payload})=>{state.allProjects = payload}
    }
})

export const {storeAllProjectsR} = projectsSlice.actions;
export default projectsSlice.reducer;