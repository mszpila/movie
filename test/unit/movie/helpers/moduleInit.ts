import { MovieConfiguration } from '../../../../src/movie/domain/MovieConfiguration';
import { MovieFacade } from '../../../../src/movie/domain/MovieFacade';
import { InMemoryMovieDetailsService } from '../../../../src/movie/domain/InMemoryMovieDetailsService';
import { SampleMovie } from '../../../sample_data/movie/SampleMovie';

const movieDetailsService = new InMemoryMovieDetailsService();
movieDetailsService.addMovie('star wars', { ...SampleMovie() });
movieDetailsService.addMovie('us', { ...SampleMovie({ title: 'Us' }) });
movieDetailsService.addMovie('godfather', {
  ...SampleMovie({ title: 'The Godfather' }),
});
movieDetailsService.addMovie('pinokio', {
  ...SampleMovie({ title: 'Pinokio' }),
});
movieDetailsService.addMovie('rick and morty', {
  ...SampleMovie({ title: 'Rick and Morty' }),
});
movieDetailsService.addMovie('django', { ...SampleMovie({ title: 'Django' }) });
movieDetailsService.addMovie('pulp fiction', {
  ...SampleMovie({ title: 'Pulp Fiction' }),
});
movieDetailsService.addMovie('family guy', {
  ...SampleMovie({ title: 'Family Guy' }),
});
movieDetailsService.addMovie('drive', { ...SampleMovie({ title: 'Drive' }) });
movieDetailsService.addMovie('marvel', { ...SampleMovie({ title: 'Marvel' }) });
movieDetailsService.addMovie('spider-man', {
  ...SampleMovie({ title: 'Spider-man' }),
});
movieDetailsService.addMovie('x-men', { ...SampleMovie({ title: 'X-men' }) });

export const movieFacade: MovieFacade = new MovieConfiguration().userFacade(
  movieDetailsService,
);
