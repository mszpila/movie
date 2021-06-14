import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FetchedMovieDetailsDto } from 'src/movie/domain/dto/FetchedMovieDetailsDto';
import { MovieDetailsService } from '../../IMovieDetailsService';

@Injectable()
export class OMDbMovieDetailsService implements MovieDetailsService {
  constructor(
    private httpService: HttpService,
    readonly configService: ConfigService,
  ) {}
  async getMovieDetails(inputTitle: string): Promise<FetchedMovieDetailsDto> {
    const response = await this.httpService
      .get(
        `http://www.omdbapi.com/?apikey=${this.configService.get<string>(
          'OMDB_API_KEY',
        )}&t=${encodeURIComponent(inputTitle)}`,
      )
      .toPromise();

    if (response.data.Error) {
      throw new HttpException(response.data.Error, HttpStatus.NOT_FOUND);
    }

    const { Title, Released, Genre, Director } = response.data;
    return {
      title: Title,
      released: Released,
      genre: Genre,
      director: Director,
    };
  }
}
