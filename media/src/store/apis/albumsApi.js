import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
        };
    }
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
