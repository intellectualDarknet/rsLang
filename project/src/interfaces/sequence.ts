export interface CreateSequence {
  userId: string;
  words: string[];
}

export class CreateSequenceResponse {
  public word: string;
}

export class CreateSequenceRequest {
  public userId: string;
  public words: string[];
}

export class GetSequenceRequest {
  public userId: string;
}

export class Sequence {
  public userId: string;
  public date: Date;
  public words: string[];
}
