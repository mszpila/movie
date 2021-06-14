import { Movie } from './Movie';

export interface MovieRepository {
  save(movie: Movie): Promise<Movie>;
}
