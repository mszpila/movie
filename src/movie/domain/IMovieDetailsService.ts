import { FetchedMovieDetailsDto } from './dto/FetchedMovieDetailsDto';

export interface MovieDetailsService {
  getMovieDetails(title: string): Promise<FetchedMovieDetailsDto>;
}
