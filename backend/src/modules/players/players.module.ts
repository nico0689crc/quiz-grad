import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/core/constants';
import { Player } from './entities/players.entity';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [
    {
      provide: Services.PLAYER,
      useClass: PlayersService,
    },
  ],
})
export class PlayersModule {}
