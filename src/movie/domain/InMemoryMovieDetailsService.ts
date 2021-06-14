import { HttpException, HttpStatus } from '@nestjs/common';
import { FetchedMovieDetailsDto } from './dto/FetchedMovieDetailsDto';
import { MovieDetailsService } from './IMovieDetailsService';

export class InMemoryMovieDetailsService implements MovieDetailsService {
  private map: Map<string, FetchedMovieDetailsDto> = new Map<
    string,
    FetchedMovieDetailsDto
  >();

  async getMovieDetails(userInput: string): Promise<FetchedMovieDetailsDto> {
    if (this.map.has(userInput)) return this.map.get(userInput);
    else throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  addMovie(searchKey: string, movieInfo: FetchedMovieDetailsDto): void {
    this.map.set(searchKey, movieInfo);
  }
}
