import { createSlice } from "@reduxjs/toolkit";
import Path from "../components/Path";

export const appSlise = createSlice({
    name: 'appSlice',
    initialState: {
        count: Path(),
        slice: Path() * 10,
        data: [],
        search: []
    },
    reducers: {
        next: (state) => {
            state.count = state.count + 1
            state.slice = state.slice + 10
        },
        back: (state) => {
            state.count = state.count - 1
            state.slice = state.slice - 10
        },
        nextBtn: (state, action) => {
            state.count = state.count + action.payload
            state.slice = action.payload * 10
        },
        backBtn: (state, action) => {
            state.count = state.count - 1
            state.slice = action.payload * 10
        },
        allData: (state, action) => {
            state.data = action.payload
        },
        search: (state, action) => {
            state.search = action.payload
        }
    }
})

export const { next, back, allData, search, nextBtn, backBtn } = appSlise.actions;
export const appReducer = appSlise.reducer;