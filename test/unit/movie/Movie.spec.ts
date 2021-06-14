import * as mockdate from 'mockdate';
import { BasicUser, PremiumUser } from '../../sample_data/user/SampleUser';
import { movieFacade } from './helpers/moduleInit';

mockdate.set(new Date('5/1/2021'));

test('should add movie to database', async () => {
  const movie = await movieFacade.addMovie('star wars', BasicUser.id);
  expect(await movieFacade.findMoviesByAuthorId(BasicUser.id)).toContainEqual(
    movie,
  );
});

test('should throw exception when add the same movie', async () => {
  await expect(
    movieFacade.addMovie('star wars', BasicUser.id),
  ).rejects.toThrowError('Movie already exists');
});

test('should throw exception when movie is not found in service', async () => {
  await expect(
    movieFacade.addMovie('fsfsfsd', BasicUser.id),
  ).rejects.toThrowError('Movie not found');
});

test('should limit the basic user', async () => {
  // given
  const titles = ['godfather', 'pinokio', 'rick and morty', 'django', 'error'];
  // when
  for (const title of titles) {
    const movies = await movieFacade.findMoviesByAuthorId(BasicUser.id);
    if (title === 'error')
      return expect(() => movieFacade.checkMonthlyLimit(movies)).toThrowError(
        'Reached the month limit',
      );
    movieFacade.checkMonthlyLimit(movies);
    await movieFacade.addMovie(title, BasicUser.id);
  }
});

test('should unlock limit for the basic user', async () => {
  // given
  const movies = await movieFacade.findMoviesByAuthorId(BasicUser.id);
  expect(() => movieFacade.checkMonthlyLimit(movies)).toThrowError(
    'Reached the month limit',
  );
  mockdate.set(new Date('6/1/2021'));
  // when try add 6th movie
  expect(() => movieFacade.checkMonthlyLimit(movies)).not.toThrowError(
    'Reached the month limit',
  );
  const movie = await movieFacade.addMovie('us', BasicUser.id);
  expect(await movieFacade.findAllMovies()).toContainEqual(movie);
});

// test('should unlimit premium users', async () => {
//   const premiumMovies = [];
//   premiumMovies.push(
//     await movieFacade.addMovie('pulp fiction', PremiumUser.id),
//   );
//   premiumMovies.push(await movieFacade.addMovie('family guy', PremiumUser.id));
//   premiumMovies.push(await movieFacade.addMovie('drive', PremiumUser.id));
//   premiumMovies.push(await movieFacade.addMovie('marvel', PremiumUser.id));
//   premiumMovies.push(await movieFacade.addMovie('spider-man', PremiumUser.id));
//   premiumMovies.push(await movieFacade.addMovie('x-men', PremiumUser.id));
//   expect(await movieFacade.findAllMovies()).toEqual(
//     expect.arrayContaining(premiumMovies),
//   );
// });
