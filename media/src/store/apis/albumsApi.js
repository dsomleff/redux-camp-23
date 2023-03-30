import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
    // key to store all state related to this API in a main redux store
    reducerPath: 'albums',
    //fetchBaseQuery config func, wrapper around basic fetch
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            //fetchAlbums will be the name of generated hook
            fetchAlbums: builder.query({
                providesTags: ['Album'],
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
                invalidatesTags: ['Album'],
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
        };
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
