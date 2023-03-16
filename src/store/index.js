import { configureStore, createSlice, createAction } from "@reduxjs/toolkit";

export const reset = createAction('app/reset');

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
    },
    extraReducers(builder) {
        builder.addCase(reset, () => {
            return [];
        })
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
    },
    // watch for action from another slice
    extraReducers(builder) {
        builder.addCase(reset, () => {
            return [];
        })
    }
});

const store = configureStore({
    reducer: {
        songs: songSlice.reducer,
        movies: movieSlice.reducer
    }
});

export { store };
export const { addSong, removeSong } = songSlice.actions;
export const { addMovie, removeMovie } = movieSlice.actions;
