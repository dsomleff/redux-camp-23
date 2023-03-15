import { configureStore, createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
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
    }
});

const store = configureStore({
    reducer: {
        songs: songSlice.reducer
    }
});

export { store };
export const { addSong } = songSlice.actions;
export const { removeSong } = songSlice.actions;
