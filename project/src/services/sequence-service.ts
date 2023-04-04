import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetSequenceWordsRequest,
  GetWordsRequest,
  IWord,
  SequenceWord,
  Word,
} from "../interfaces/word";
import { API_BASE_URL, CUSTOM_API_BASE_URL } from "../config";
import { ServerRoutes } from "../enums/server-routes";
import { HTTPMethods } from "../enums/http-methods";
import { RootState } from "../store/store";
import {
  CreateSequence,
  CreateSequenceRequest,
  GetSequenceRequest,
  Sequence,
} from "../interfaces/sequence";

export const sequenceService = createApi({
  reducerPath: "sequence",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token: string = (getState() as RootState).authState.auth
        ?.token as string;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getSequenceWords: build.mutation<SequenceWord[], GetSequenceWordsRequest>({
      query: (params: GetSequenceWordsRequest) => ({
        url: ServerRoutes.sequenceWords,
        method: HTTPMethods.GET,
        params,
      }),
    }),

    createSequence: build.mutation<CreateSequence[], CreateSequenceRequest>({
      query: (obj: CreateSequenceRequest) => ({
        url: `${ServerRoutes.getCreateSequence}/${obj.userId}`,
        method: HTTPMethods.POST,
        body: obj.words,
      }),
    }),

    getSequences: build.mutation<Sequence[], GetSequenceRequest>({
      query: (params: GetSequenceRequest) => ({
        url: `${ServerRoutes.getCreateSequence}/${params.userId}`,
        method: HTTPMethods.GET,
      }),
    }),
  }),
});

export const {
  useGetSequenceWordsMutation,
  useCreateSequenceMutation,
  useGetSequencesMutation,
} = sequenceService;
