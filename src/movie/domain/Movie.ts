import { GetMovieDto } from './dto/GetMovieDto';

export class Movie {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly released: Date,
    readonly genre: string,
    readonly director: string,
    readonly authorId: number,
    readonly added: Date,
  ) {}

  toDto(): GetMovieDto {
    return {
      id: this.id,
      title: this.title,
      released: this.released,
      genre: this.genre,
      director: this.director,
      authorId: this.authorId,
      added: this.added,
    };
  }
}
