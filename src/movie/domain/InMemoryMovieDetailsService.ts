import { FetchedMovieDetailsDto } from './dto/FetchedMovieDetailsDto';
import { MovieDetailsService } from './IMovieDetailsService';

export class InMemoryMovieDetailsService implements MovieDetailsService {
  async getMovieDetails(userInput: string): Promise<FetchedMovieDetailsDto> {
    if (userInput === 'star wars')
      return {
        title: 'Star Wars: Episode IV - A New Hope',
        released: '25 May 1977',
        genre: 'Action, Adventure, Fantasy, Sci-Fi',
        director: 'George Lucas',
      };
  }
}
