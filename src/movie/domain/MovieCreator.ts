import { v4 as uuid } from 'uuid';
import { FetchedMovieDetailsDto } from './dto/FetchedMovieDetailsDto';
import { Movie } from './Movie';

export class MovieCreator {
  async create(
    fetchedMovieDetails: FetchedMovieDetailsDto,
    userId: number,
  ): Promise<Movie> {
    const { title, released, genre, director } = fetchedMovieDetails;
    const id = uuid();
    return new Movie(
      id,
      title,
      new Date(released),
      genre,
      director,
      userId,
      new Date(),
    );
  }
}
