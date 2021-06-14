import { Binary } from 'bson';

export class MongoDbMovieSnapshot {
  readonly _id: Binary;
  readonly title: string;
  readonly released: Date;
  readonly genre: string;
  readonly director: string;
  readonly authorId: number;
  readonly added: Date;
}
