import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoModule } from 'nest-mongodb';
import { envFilePath, validationSchema } from '../config';
import { AuthenticationModule } from './authentication/authentication.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      // envFilePath: ['.env', './src/shared/authentication/.env'],
      validationSchema,
    }),
    MongoModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_URI'),
        dbName: config.get<string>('DB_NAME'),
        clientOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
    }),
    AuthenticationModule,
    MovieModule,
  ],
})
export class AppModule {}
