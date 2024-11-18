import { ImageType } from "@/types/data";
import {
  createApi,
  defaultSerializeQueryArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

type ImageQuery = {
  key: string;
  search: string;
  page: number;
};
export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pixabay.com/api/" }),
  endpoints: (builder) => ({
    getImages: builder.query<ImageType[], ImageQuery>({
      query: ({ key, search, page }) =>
        `?key=${key}&q=${search}&page=${page}&per_page=3&safesearch=true&editors_choice=true`,
      transformResponse: (response: any) => response.hits,
      // serializeQueryArgs: ({ endpointDefinition, endpointName, queryArgs }) => {
      //   const { search } = queryArgs;
      //   defaultSerializeQueryArgs({
      //     endpointName,
      //     queryArgs: { search },
      //     endpointDefinition,
      //   });
      // },
      serializeQueryArgs: ({ endpointName, queryArgs, endpointDefinition }) => {
        const { page } = queryArgs;
        return defaultSerializeQueryArgs({
          endpointName,
          queryArgs: { page },
          endpointDefinition,
        });
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      merge: (currentCache, newItems) => {
        return [...currentCache, ...newItems];
      },
    }),
  }),
});

export const { useGetImagesQuery } = imageApi;
