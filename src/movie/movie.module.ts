import { HttpModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoModule } from 'nest-mongodb';
import { MovieDetailsService } from './domain/IMovieDetailsService';
import { MovieQueryRepository } from './domain/IMovieQueryRepository';
import { MovieRepository } from './domain/IMovieRepository';
import { MongoDbMovieRepository } from './domain/infrastructure/database/MongoDbMovieRepository';
import { MovieController } from './domain/infrastructure/MovieController';
import { OMDbMovieDetailsService } from './domain/infrastructure/services/OMDbMovieDetailsService';
import { MovieConfiguration } from './domain/MovieConfiguration';
import { MovieFacade } from './domain/MovieFacade';

const FacadeConfig = {
  provide: MovieFacade,
  useFactory: (
    movieDetailsService: MovieDetailsService,
    movieRepository: MovieRepository,
    movieQueryRepository: MovieQueryRepository,
  ) => {
    return new MovieConfiguration().userFacade(
      movieDetailsService,
      movieRepository,
      movieQueryRepository,
    );
  },
  inject: [
    OMDbMovieDetailsService,
    MongoDbMovieRepository,
    MongoDbMovieRepository,
  ],
};

@Module({
  imports: [MongoModule.forFeature(['movies']), HttpModule],
  controllers: [MovieController],
  providers: [
    OMDbMovieDetailsService,
    MongoDbMovieRepository,
    FacadeConfig,
    ConfigService,
  ],
  exports: [MovieFacade],
})
export class MovieModule {}
