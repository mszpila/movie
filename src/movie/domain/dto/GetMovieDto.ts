export class GetMovieDto {
  readonly id: string;
  readonly title: string;
  readonly released: Date;
  readonly genre: string;
  readonly director: string;
  readonly authorId: number;
  readonly added: Date;
}
