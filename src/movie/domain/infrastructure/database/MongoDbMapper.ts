import { Movie } from '../../Movie';
import { MongoDbMovieSnapshot } from './MongoDbMovieSnapshot';
import { from as stringIdToBinary } from 'uuid-mongodb';
import { GetMovieDto } from '../../dto/GetMovieDto';

export const fromEntityToBJSON = (movie: Movie): MongoDbMovieSnapshot => {
  const movieBJSON = {
    ...movie.toDto(),
    _id: stringIdToBinary(movie.id),
  };
  delete movieBJSON.id;
  return movieBJSON;
};

export const fromBJSONToGetMovieDto = (
  movieBJSON: MongoDbMovieSnapshot,
): GetMovieDto => {
  const movieDto = {
    ...movieBJSON,
    id: stringIdToBinary(movieBJSON._id).toString(),
  };
  delete movieDto._id;
  return movieDto;
};
