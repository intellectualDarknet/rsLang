import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../config";
import { ServerRoutes } from "../enums/server-routes";
import { HTTPMethods } from "../enums/http-methods";
import { RootState } from "../store/store";

import {
  ILearnWord,
  LearnWordsRequest,
  RepeatWordsRequest,
  UpdateLearnWordRequest,
} from "../interfaces/learn-words";

export const learnWordsService = createApi({
  reducerPath: "learnWords",
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
    createWord: build.mutation<ILearnWord, LearnWordsRequest>({
      query: (obj: LearnWordsRequest) => ({
        url: `${ServerRoutes.learnWords}/${obj.userId}`,
        method: HTTPMethods.POST,
        body: obj.word,
      }),
    }),

    updateWord: build.mutation<ILearnWord, UpdateLearnWordRequest>({
      query: (obj: UpdateLearnWordRequest) => ({
        url: `${ServerRoutes.learnWords}/${obj.userId}/${obj.wordId}`,
        method: HTTPMethods.PUT,
        body: obj.word,
      }),
    }),

    getWordsToRepeat: build.mutation<ILearnWord[], RepeatWordsRequest>({
      query: (obj: RepeatWordsRequest) => ({
        url: `${ServerRoutes.learnWords}/${obj.userId}/repeat`,
        method: HTTPMethods.POST,
        body: obj.word,
      }),
    }),

    getWordsToLearn: build.mutation<ILearnWord[], LearnWordsRequest>({
      query: (obj: LearnWordsRequest) => ({
        url: `${ServerRoutes.learnWords}/${obj.userId}/learn`,
        method: HTTPMethods.POST,
        body: obj.word,
      }),
    }),
  }),
});

export const {
  useCreateWordMutation,
  useUpdateWordMutation,
  useGetWordsToRepeatMutation,
  useGetWordsToLearnMutation,
} = learnWordsService;
