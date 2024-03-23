import { Player, RoomQuestion, RoomQuestionAnswer } from 'src/core/entities';
import { FindConditions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export type CreateRoomQuestionAnswer = {
  isCorrect: boolean;
  player: Player;
  roomQuestion: RoomQuestion;
  uuid: string;
};

export interface IRoomQuestionAnswerService {
  create({ isCorrect, player, roomQuestion, uuid }: CreateRoomQuestionAnswer): Promise<RoomQuestionAnswer>;
  update(options: FindConditions<RoomQuestionAnswer>, values: QueryDeepPartialEntity<RoomQuestionAnswer>): Promise<UpdateResult>;
}
