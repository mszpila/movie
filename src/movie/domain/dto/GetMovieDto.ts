import { AutoMap } from '@automapper/classes';

export class GetMovieDto {
  @AutoMap()
  readonly id: string;
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
