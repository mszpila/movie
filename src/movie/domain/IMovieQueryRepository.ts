import { GetMovieDto } from './dto/GetMovieDto';

interface Obj {
  [key: string]: any;
}

export interface MovieQueryRepository {
  findAll(): Promise<GetMovieDto[]>;
  find(obj: Obj): Promise<GetMovieDto[]>;
  exists(title: string): Promise<boolean>;
}
