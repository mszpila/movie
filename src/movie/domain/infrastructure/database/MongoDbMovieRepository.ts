import * as mongo from 'mongodb';
import { MovieRepository } from '../../IMovieRepository';
import { MovieQueryRepository } from '../../IMovieQueryRepository';
import { InjectCollection } from 'nest-mongodb';
import { Movie } from '../../Movie';
import { GetMovieDto } from '../../dto/GetMovieDto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { fromEntityToBJSON, fromBJSONToGetMovieDto } from './MongoDbMapper';

interface Obj {
  [key: string]: any;
}

@Injectable()
export class MongoDbMovieRepository
  implements MovieRepository, MovieQueryRepository
{
  constructor(
    @InjectCollection('movies') private readonly repository: mongo.Collection,
  ) {}

  async save(movie: Movie): Promise<void> {
    if (!movie) {
      throw new BadRequestException('Movie must be provided');
    }
    await this.repository.insertOne(fromEntityToBJSON(movie));
  }

  async findAll(): Promise<GetMovieDto[]> {
    const foundMovies = await this.repository.find().toArray();
    return foundMovies.map((movie) => fromBJSONToGetMovieDto(movie));
  }
  async find(obj: Obj): Promise<GetMovieDto[]> {
    const foundMovies = await this.repository
      .find(obj)
      .skip(0)
      .limit(5)
      .toArray();
    return foundMovies.map((movie) => fromBJSONToGetMovieDto(movie));
  }
  async exists(title: string): Promise<boolean> {
    return Boolean(await this.repository.findOne({ title }));
  }
}
