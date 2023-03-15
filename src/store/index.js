import { configureStore, createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: [],
    reducers: {
        addMovie(state, action) {
            state.push(action.payload);
        },
        removeMovie(state, action) {
            const index = state.indexOf(action.payload);
            state.splice(index, 1);
        }
    }
});

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
        songs: songSlice.reducer,
        movies: movieSlice.reducer
    }
});

export { store };
export const { addSong } = songSlice.actions;
export const { removeSong } = songSlice.actions;
export const { addMovie } = movieSlice.actions;
export const { removeMovie } = movieSlice.actions;
