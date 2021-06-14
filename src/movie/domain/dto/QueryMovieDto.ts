export class QueryMovieDto {
  readonly id: string;
  readonly title: string;
  readonly released: string;
  readonly genre: string;
  readonly director: string;
  readonly authorId: number;
  readonly added: Date;
  readonly offset: string;
  readonly limit: string;
  readonly sort: string;
}
