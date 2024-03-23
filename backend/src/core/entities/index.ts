import { Session } from 'src/modules/sessions/session.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Quize } from 'src/modules/quizes/entities/quize.entity';
import { Answer } from 'src/modules/answers/entities/answer.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { Player } from 'src/modules/players/entities/players.entity';
import { RoomQuestion } from 'src/modules/room-questions/entities/room-questions.entity';
import { RoomQuestionAnswer } from 'src/modules/room-question-answers/entities/room-question-answers.entity';

const entities = [User, Session, Quize, Answer, Question, Room, Player, RoomQuestion, RoomQuestionAnswer];

export default entities;

export { User, Session, Quize, Answer, Question, Room, Player, RoomQuestion, RoomQuestionAnswer };
