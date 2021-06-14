import { MovieRepository } from './IMovieRepository';
import { MovieQueryRepository } from './IMovieQueryRepository';
import { BadRequestException } from '@nestjs/common';
import { GetMovieDto } from './dto/GetMovieDto';
import { Movie } from './Movie';
import { QueryMovieDto } from './dto/QueryMovieDto';

export class InMemoryMovieRepository
  implements MovieRepository, MovieQueryRepository
{
  private map: Map<string, Movie> = new Map<string, Movie>();

  async save(movie: Movie): Promise<Movie> {
    if (!movie) {
      throw new BadRequestException('Movie cannot be null');
    }
    this.map.set(movie.title, movie);
    return movie;
  }

  async exists(title: string): Promise<boolean> {
    if (this.map.has(title)) return true;
    return false;
  }

  async findAll(): Promise<GetMovieDto[]> {
    return this.mapToArray();
  }

  async find(queryObject: QueryMovieDto): Promise<GetMovieDto[]> {
    let movies: GetMovieDto[] = this.mapToArray();
    if (queryObject.authorId)
      movies = await this.findByAuthorId(queryObject.authorId, movies);
    return movies.splice(+queryObject.offset || 0, +queryObject.limit || 5);
  }

  private async findByAuthorId(
    authorId: number,
    movies: GetMovieDto[],
  ): Promise<GetMovieDto[]> {
    return movies.filter((movie) => movie.authorId === authorId);
  }

  private mapToArray = (): GetMovieDto[] => {
    const movies: GetMovieDto[] = [];
    this.map.forEach((movie) => {
      movies.push(movie.toDto());
    });
    return movies;
  };
}
