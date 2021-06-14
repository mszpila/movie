import { BadRequestException } from '@nestjs/common';
import { GetMovieDto } from './dto/GetMovieDto';
import { MovieCreator } from './MovieCreator';
import { MovieDetailsService } from './IMovieDetailsService';
import { MovieQueryRepository } from './IMovieQueryRepository';
import { MovieRepository } from './IMovieRepository';
import { MovieCreationLimiter } from './MovieCreationLimiter';
import { Movie } from './Movie';

export class MovieFacade {
  constructor(
    private movieRepository: MovieRepository,
    private movieQueryRepository: MovieQueryRepository,
    private movieDetailsService: MovieDetailsService,
    private creator: MovieCreator,
    private limiter: MovieCreationLimiter,
  ) {}

  async addMovie(title: string, userId: number): Promise<Movie> {
    const fetchedMovieDetails = await this.movieDetailsService.getMovieDetails(
      title,
    );
    if (await this.movieQueryRepository.exists(fetchedMovieDetails.title))
      throw new BadRequestException('Movie already exists');
    const movie = await this.creator.create(fetchedMovieDetails, userId);
    return await this.movieRepository.save(movie);
  }

  async findAllMovies(): Promise<GetMovieDto[]> {
    return this.movieQueryRepository.findAll();
  }

  async findMoviesByAuthorId(authorId: number): Promise<GetMovieDto[]> {
    return this.movieQueryRepository.find({ authorId });
  }

  checkMonthlyLimit(movies: GetMovieDto[]): void {
    this.limiter.checkRemainingLimits(movies);
  }
}
