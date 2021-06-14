import { AutoMap } from '@automapper/classes';
import { Binary } from 'bson';

export class MongoDbMovieSnapshot {
  @AutoMap()
  readonly _id: Binary;
  @AutoMap()
  readonly title: string;
  @AutoMap()
  readonly released: Date;
  @AutoMap()
  readonly genre: string;
  @AutoMap()
  readonly director: string;
  @AutoMap()
  readonly authorId: number;
  @AutoMap()
  readonly added: Date;
}
