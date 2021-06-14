import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { GetMovieDto } from './dto/GetMovieDto';

export class MovieCreationLimiter {
  static readonly limit = 5;

  checkRemainingLimits(movies: GetMovieDto[]): void {
    let remainingMoviesToAdd = MovieCreationLimiter.limit;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    movies.forEach((movie) => {
      console.log(movie.added.getMonth(), 'added');
      if (
        movie.added.getMonth() === currentMonth &&
        movie.added.getFullYear() === currentYear
      ) {
        remainingMoviesToAdd--;
      }
      if (remainingMoviesToAdd === 0)
        throw new ForbiddenException('Reached the month limit');
    });
  }
}
