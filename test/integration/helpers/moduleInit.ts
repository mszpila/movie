import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { MongoModule } from 'nest-mongodb';
import { MovieModule } from '../../../src/movie/movie.module';
import { envFilePath } from '../../../config/envFilePath';
import { validationSchema } from '../../../config/validationSchema';
import { AuthenticationModule } from '../../../src/authentication/authentication.module';

const moduleInitialization = async () => {
  return await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath,
        validationSchema,
      }),
      MongoModule.forRootAsync({
        useFactory: (config: ConfigService) => ({
          uri: config.get<string>('DB_URI_TEST'),
          dbName: config.get<string>('DB_NAME_TEST'),
          clientOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
        }),
        inject: [ConfigService],
      }),
      AuthenticationModule,
      MovieModule,
    ],
  }).compile();
};

export { moduleInitialization };
