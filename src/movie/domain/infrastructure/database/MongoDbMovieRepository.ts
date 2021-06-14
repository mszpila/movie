import * as mongo from 'mongodb';
import { MovieRepository } from '../../IMovieRepository';
import { MovieQueryRepository } from '../../IMovieQueryRepository';
import { InjectCollection } from 'nest-mongodb';
import { Movie } from '../../Movie';
import { GetMovieDto } from '../../dto/GetMovieDto';
import { BadRequestException, Injectable } from '@nestjs/common';

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
    await this.repository.insertOne(movie.toDto());
  }

  async findAll(): Promise<GetMovieDto[]> {
    return await this.repository.find().toArray();
  }
  async find(obj: Obj): Promise<GetMovieDto[]> {
    return await this.repository.find(obj).limit(5).toArray();
  }
  async exists(title: string): Promise<boolean> {
    return Boolean(await this.repository.findOne({ title }));
  }
}
