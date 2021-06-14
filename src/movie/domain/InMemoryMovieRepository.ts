import { MovieRepository } from './IMovieRepository';
import { MovieQueryRepository } from './IMovieQueryRepository';
import { BadRequestException } from '@nestjs/common';
import { GetMovieDto } from './dto/GetMovieDto';
import { Movie } from './Movie';
import { QueryMovieDto } from './dto/QueryMovieDto';

export class InMemoryMovieRepository
  implements MovieRepository, MovieQueryRepository
{
  private map: Map<string, Movie> = new Map<string, Movie>();

  async save(user: Movie): Promise<void> {
    if (!user) {
      throw new BadRequestException('User cannot be null');
    }
    this.map.set(user.id, user);
  }

  async exists(title: string): Promise<boolean> {
    if (this.map.get(title)) return true;
    return false;
  }

  async findAll(): Promise<GetMovieDto[]> {
    return this.mapToArray();
  }

  async find(queryObject: QueryMovieDto): Promise<GetMovieDto[]> {
    let movies: GetMovieDto[] = this.mapToArray();
    if (queryObject.authorId)
      movies = await this.findByAuthorId(queryObject.authorId, movies);
    return movies.splice(+queryObject.offset || 0, +queryObject.limit || 5);
  }

  private async findByAuthorId(
    authorId: string,
    movies: GetMovieDto[],
  ): Promise<GetMovieDto[]> {
    return movies.filter((movie) => movie.authorId === authorId);
  }

  private mapToArray = (): GetMovieDto[] => {
    const movies: GetMovieDto[] = [];
    this.map.forEach((movie) => {
      movies.push(movie.toDto());
    });
    return movies;
  };

  // async findById(id: string): Promise<User> {
  //   const user = this.map.get(id);
  //   if (!user) {
  //     // throw new NotFoundException('User not found');
  //     return null;
  //   }
  //   return user;
  // }

  // async update(user: User): Promise<boolean> {
  //   this.map.set(user.toSnapShot().id, user);
  //   return true;
  // }

  // async delete(id: string): Promise<boolean> {
  //   this.map.delete(id);
  //   return true;
  // }

  // async find(query: FindUserDto): Promise<GetUserDto[]> {
  //   const users = this.mapToArray();
  //   const usersFiltered = this.findFilter(users, query);
  //   this.findSort(usersFiltered, query);
  //   const userPage = this.findPage(usersFiltered, query);
  //   return userMapper.mapArray(userPage, GetUserDto, UserSnapshot);
  // }

  // async findByEmail(email: string): Promise<User> {
  //   const users: User[] = this.mapToEntityArray();
  //   const userFound = users.filter(
  //     (user: User) => user.getEmail() === email,
  //   )[0];
  //   if (!userFound) {
  //     // throw new NotFoundException('Wrong credentials');
  //     return null;
  //   }
  //   return userFound;
  // }

  // private mapToEntityArray = (): User[] => {
  //   const users: User[] = [];
  //   this.map.forEach((user) => {
  //     users.push(user);
  //   });
  //   return users;
  // };

  // private findFilter = (
  //   users: UserSnapshot[],
  //   query: FindUserDto,
  // ): UserSnapshot[] => {
  //   return users.filter((user: UserSnapshot) => {
  //     if (
  //       user.firstName.toLowerCase().includes(query.name || '') ||
  //       user.lastName.toLowerCase().includes(query.name || '')
  //     ) {
  //       return !query.isVerified || user.isVerified;
  //     }
  //     return false;
  //   });
  // };

  // private findSort = (
  //   users: UserSnapshot[],
  //   query: FindUserDto,
  // ): UserSnapshot[] => {
  //   switch (query.sort) {
  //     case 'fnd':
  //       return users
  //         .sort((a: UserSnapshot, b: UserSnapshot) =>
  //           a.firstName.localeCompare(b.firstName),
  //         )
  //         .reverse();
  //     case 'lna':
  //       return users.sort((a: UserSnapshot, b: UserSnapshot) =>
  //         a.lastName.localeCompare(b.lastName),
  //       );
  //     case 'lnd':
  //       return users
  //         .sort((a: UserSnapshot, b: UserSnapshot) =>
  //           a.lastName.localeCompare(b.lastName),
  //         )
  //         .reverse();
  //     default:
  //       return users.sort((a: UserSnapshot, b: UserSnapshot) =>
  //         a.firstName.localeCompare(b.firstName),
  //       );
  //   }
  // };

  // private findPage = (
  //   users: UserSnapshot[],
  //   query: FindUserDto,
  // ): UserSnapshot[] => {
  //   return users.slice(query.offset || 0, query.limit || 20);
  // };

  // private alreadyExists = (email: string): boolean => {
  //   const users = this.mapToEntityArray();
  //   return users.some((user: User) => user.toSnapShot().email === email);
  // };
}
