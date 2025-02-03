
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../reducers/projectsReducer';






const store = configureStore({
    reducer:{
        projectReducer:projectReducer
    }
})

export default store