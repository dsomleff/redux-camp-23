import { createApi } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
  // key to store all state related to this API in a main redux store
  reducerPath: 'albums',
});
