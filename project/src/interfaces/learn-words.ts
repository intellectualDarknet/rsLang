export interface ILearnWord {
  id: string;
  user_id: string;
  hierogliphs: string;
  writings: string;
  meaning: string;
  howToRemember: string;
  inRow: number;
  date_to_repeat: Date;
  sign: string;
  language: string;
}

export interface ILearnWordOpt {
  sign?: string;
  language?: string;
}

export interface IRepeatWord {
  language?: string;
  sign?: string;
  limit?: string;
}

type ICreateWord = Omit<ILearnWord, "user_id">;

export interface LearnWordResponse {
  word: ILearnWord;
}

export interface LearnWordsRequest {
  userId: string;
  word: ILearnWordOpt;
}

export interface UpdateLearnWordRequest {
  userId: string;
  wordId: string;
  word: ICreateWord;
}

export interface RepeatWordsRequest {
  userId: string;
  word?: IRepeatWord;
}
