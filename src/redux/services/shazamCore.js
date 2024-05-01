import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "f585108fcdmshf27f7ae64152da8p19e3c9jsnae1a6ffae5d1"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/v1/charts/world?country_code=FR",
      transformResponse: (response) => {
        return response.map((song) => ({
          ...song,
          title: song.attributes.name, // Normalize song title
          subtitle: song.attributes.artistName,
          images: {
            coverart: song.attributes.artwork.url,
          },
          key: song.id,
        }));
      },
    }),
    getArtist: builder.query({
      query: (artist_id) => ({
        url: `/v2/artists/details?artist_id=${artist_id}`,
        params: {
          artist_id: artist_id,
        },
      }),
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/v2/tracks/details?track_id=${songid}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetArtistQuery,
  useGetSongDetailsQuery,
} = shazamCoreApi;
