import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerController, TeamController } from './controllers';
import { TrainerService, TeamService, PokeApiService } from './services';
import { Trainer, Team, TeamPokemon } from './entities';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres12',
    database: process.env.DB_NAME || 'pokemon_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
    }
  ),
  TypeOrmModule.forFeature([Trainer, Team, TeamPokemon]),
],
    controllers: [AppController, TrainerController, TeamController],
    providers: [AppService, TeamService, TrainerService, PokeApiService],
})
export class AppModule {}