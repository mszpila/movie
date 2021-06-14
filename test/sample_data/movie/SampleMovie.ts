import { GetMovieDto } from '../../../src/movie/domain/dto/GetMovieDto';

const SAMPLE_MOVIE_MAP: GetMovieDto = {
  id: '900f5943-af00-445d-b67e-c7646166dbc9',
  title: '',
  released: new Date(),
  genre: '',
  director: '',
  authorId: '',
  added: new Date(),
};

export class SampleMovie {
  static create(properties = {}): GetMovieDto {
    const sample = Object.assign({}, SAMPLE_MOVIE_MAP, properties);
    return {
      id: sample.id,
      title: sample.title,
      released: sample.released as Date,
      genre: sample.genre,
      director: sample.director,
      authorId: sample.authorId,
      added: sample.added as Date,
    };
  }

  // static sampleNewUser(properties = {}): CreateUserDto {
  //   const sample = Object.assign({}, SAMPLE_USER_MAP, properties);
  //   return userMapper.map(sample, CreateUserDto, UserSnapshot);
  // }

  // static sampleGetUser(user: UserSnapshot): GetUserDto {
  //   return userMapper.map(user, GetUserDto, UserSnapshot);
  // }
}
