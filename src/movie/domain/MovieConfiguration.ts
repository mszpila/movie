import { InMemoryMovieDetailsService } from './InMemoryMovieDetailsService';
import { InMemoryMovieRepository } from './InMemoryMovieRepository';
import { MovieCreator } from './MovieCreator';
import { MovieDetailsService } from './IMovieDetailsService';
import { MovieFacade } from './MovieFacade';
import { MovieQueryRepository } from './IMovieQueryRepository';
import { MovieRepository } from './IMovieRepository';
import { MovieCreationLimiter } from './MovieCreationLimiter';

export class MovieConfiguration {
  userFacade(
    movieServiceDetails: MovieDetailsService,
    movieRepository?: MovieRepository,
    movieQueryRepository?: MovieQueryRepository,
  ): MovieFacade {
    if (!movieRepository || !movieQueryRepository) {
      const InMemoryRepository = new InMemoryMovieRepository();
      movieQueryRepository = InMemoryRepository;
      movieRepository = InMemoryRepository;
    }
    if (!movieServiceDetails) {
      movieServiceDetails = new InMemoryMovieDetailsService();
    }
    const creator: MovieCreator = new MovieCreator();
    const limiter: MovieCreationLimiter = new MovieCreationLimiter();
    return new MovieFacade(
      movieRepository,
      movieQueryRepository,
      movieServiceDetails,
      creator,
      limiter,
    );
  }
}
