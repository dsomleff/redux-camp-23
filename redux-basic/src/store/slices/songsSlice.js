import {createSlice} from '@reduxjs/toolkit';
import {reset} from "../actions";

const songsSlice = createSlice({
    name: "songs",
    initialState: [],
    reducers: {
        addSong(state, action) {
            state.push(action.payload);
        },
        removeSong(state, action) {
            // action.payload === string, the song to remove
            const index = state.indexOf(action.payload);
            state.splice(index, 1);
        }
    },
    // watch for action from another slice
    extraReducers(builder) {
        builder.addCase(reset, () => {
            return [];
        })
    }
});

export const {addSong, removeSong} = songsSlice.actions;
export const songsReducer = songsSlice.reducer;