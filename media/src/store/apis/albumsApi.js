import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({
    // key to store all state related to this API in a main redux store
    reducerPath: 'albums',
    //fetchBaseQuery config func, wrapper around basic fetch
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            // REMOVE FOR PRODUCTION
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder) {
        return {
            //fetchAlbums will be the name of generated hook
            fetchAlbums: builder.query({
                // One way to define the tags
                // providesTags: (result, error, user) => {
                //     return [{ type: 'Album', id: user.id }];
                // },
                // Another way to define the tags
                providesTags: (result, error, user) => {
                    const tags = result.map((album) => {
                        return { type: 'Album', id: album.id };
                    });
                    tags.push({ type: 'UsersAlbums', id: user.id });
                    return tags;
                },
                // useFetchAlbumsQuery(user) <=> query: (user)
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                },
            }),
            addAlbum: builder.mutation({
                // First tag variation
                // invalidatesTags: (result, error, user) => {
                //     return [{ type: 'Album', id: user.id }];
                // },
                // Second tag variation
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersAlbums', id: user.id }];
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        },
                    };
                },
            }),
            removeAlbum: builder.mutation({
                // First tag variation
                // invalidatesTags: (result, error, album) => {
                //     return [{ type: 'Album', id: album.userId }];
                // },
                // Second tag variation
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                },
            }),
        };
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
