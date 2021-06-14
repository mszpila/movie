import * as mongo from 'mongodb';
import * as request from 'supertest';
import * as mockdate from 'mockdate';
import { INestApplication } from '@nestjs/common';
import { moduleInitialization } from '../helpers/moduleInit';
import { ConfigService } from '@nestjs/config';
import { MovieFacade } from '../../../src/movie/domain/MovieFacade';
import { BasicUser, PremiumUser } from '../../sample_data/user/SampleUser';

let app: INestApplication;
let movieFacade: MovieFacade;
let config: ConfigService;

beforeAll(async () => {
  const module = await moduleInitialization();
  app = module.createNestApplication();
  await app.init();
  movieFacade = module.get(MovieFacade);
  config = module.get(ConfigService);
});

describe('Add movie', () => {
  mockdate.set(new Date('5/1/2021'));

  test('should not add a movie as a not logged in user', async () => {
    await request(app.getHttpServer())
      .post('/auth/user')
      .send({ username: 'username', password: 'password' })
      .expect(404);
    await request(app.getHttpServer()).post('/movies').expect(401);
  });

  test('should add a movie as a basic user', async () => {
    const loginRequest = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: BasicUser.username, password: BasicUser.password })
      .expect(201);

    expect(loginRequest.body.access_token).toBeDefined();
    const token = loginRequest.body.access_token;

    await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'star wars' })
      .expect(201);
  });

  test('fetch the movie', async () => {
    const movies = await request(app.getHttpServer()).get('/movies');
    expect(movies.body).toHaveLength(1);
  });

  test('should add only 5 movies per month as a basic user', async () => {
    await movieFacade.addMovie('batman', BasicUser.id);
    await movieFacade.addMovie('mandalorian', BasicUser.id);
    await movieFacade.addMovie('rick and morty', BasicUser.id);
    await movieFacade.addMovie('spider-man', BasicUser.id);

    const loginRequest = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: BasicUser.username, password: BasicUser.password });

    const token = loginRequest.body.access_token;

    await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'us' })
      .expect(403);
  });

  test('should add unlimited amount of movies per month as a premium user', async () => {
    await movieFacade.addMovie('godfather', PremiumUser.id);
    await movieFacade.addMovie('the wolf', PremiumUser.id);
    await movieFacade.addMovie('django', PremiumUser.id);
    await movieFacade.addMovie('pulp fiction', PremiumUser.id);
    await movieFacade.addMovie('family guy', PremiumUser.id);

    const loginRequest = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: PremiumUser.username, password: PremiumUser.password })
      .expect(201);

    expect(loginRequest.body.access_token).toBeDefined();
    const token = loginRequest.body.access_token;

    await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'us' })
      .expect(201);
  });

  test('should renew limit in the new month for basic user', async () => {
    let loginRequest = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: BasicUser.username, password: BasicUser.password })
      .expect(201);
    let token = loginRequest.body.access_token;

    await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'hateful' })
      .expect(403);

    mockdate.set(new Date('6/1/2021'));

    loginRequest = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: BasicUser.username, password: BasicUser.password })
      .expect(201);
    token = loginRequest.body.access_token;

    await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', 'Bearer ' + token)
      .send({ title: 'hateful' })
      .expect(201);
  });
});

afterAll(async () => {
  (
    await mongo.connect(config.get<string>('DB_URI_TEST'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  )
    .db(config.get<string>('DB_NAME_TEST'))
    .dropDatabase();
  await app.close();
});
