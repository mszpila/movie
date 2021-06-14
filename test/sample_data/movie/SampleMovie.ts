import { GetMovieDto } from '../../../src/movie/domain/dto/GetMovieDto';

export const SAMPLE_MOVIE_MAP = {
  // id: '900f5943-af00-445d-b67e-c7646166dbc9',
  title: 'Star Wars: Episode IV - A New Hope',
  released: '25 May 1977',
  genre: 'Action, Adventure, Fantasy, Sci-Fi',
  director: 'George Lucas',
  // authorId: 123,
  // added: new Date().toISOString(),
};

// export class SampleMovie {
//   static create(properties = {}) {
//     const sample = Object.assign({}, SAMPLE_MOVIE_MAP, properties);
//     return {
//       // id: sample.id,
//       title: sample.title,
//       released: sample.released,
//       genre: sample.genre,
//       director: sample.director,
//       // authorId: sample.authorId,
//       // added: sample.added,
//     };
//   }

//   // static sampleNewUser(properties = {}): CreateUserDto {
//   //   const sample = Object.assign({}, SAMPLE_USER_MAP, properties);
//   //   return userMapper.map(sample, CreateUserDto, UserSnapshot);
//   // }

//   // static sampleGetUser(user: UserSnapshot): GetUserDto {
//   //   return userMapper.map(user, GetUserDto, UserSnapshot);
//   // }
// }

export const SampleMovie = (properties = {}) => {
  const sample = Object.assign({}, SAMPLE_MOVIE_MAP, properties);
  return {
    title: sample.title,
    released: sample.released,
    genre: sample.genre,
    director: sample.director,
  };
};
