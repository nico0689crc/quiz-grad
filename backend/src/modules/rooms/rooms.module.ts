import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/core/constants';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { Quize } from '../quizes/entities/quize.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Quize])],
  providers: [
    {
      provide: Services.ROOM,
      useClass: RoomsService,
    },
  ],
})
export class RoomsModule {}
