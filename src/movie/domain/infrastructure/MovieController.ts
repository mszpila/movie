import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  AuthRequest,
  JwtAuthGuard,
  JwtUserDto,
  RoleGuard,
  Roles,
  UserRole,
} from '../../../authentication/api_endpoints_guards';
import { GetMovieDto } from '../dto/GetMovieDto';
import { MovieFacade } from '../MovieFacade';

@Controller()
export class MovieController {
  constructor(private movieFacade: MovieFacade) {}

  @Get('movies')
  getMovies(): Promise<GetMovieDto[]> {
    return this.movieFacade.findAllMovies();
  }

  @Post('movies')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.BASIC)
  async addMovieLimited(
    @Body('title') title: string,
    @Req() req: AuthRequest<JwtUserDto>,
  ): Promise<void> {
    if (req.user.role === 'basic') {
      const movies = await this.movieFacade.findMoviesByAuthorId(
        +req.user.userId,
      );
      console.log(movies, 'movies');
      this.movieFacade.checkMonthlyLimit(movies);
    }
    await this.movieFacade.addMovie(title, +req.user.userId);
  }

  // @Post('movies')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.PREMIUM)
  // async addMovie(
  //   @Body('title') title: string,
  //   @Req() req: AuthRequest<JwtUserDto>,
  // ): Promise<void> {
  //   console.log(req.user, 'premium user');
  //   await this.movieFacade.addMovie(title, +req.user.userId);
  // }
}
