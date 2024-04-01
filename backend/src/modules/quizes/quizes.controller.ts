import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Inject, HttpStatus } from '@nestjs/common';
import { CreateQuizeDto } from './dto/create-quize.dto';
import { UpdateQuizeDto } from './dto/update-quize.dto';
import { TransformInterceptor } from 'src/core/interceptors/transform-interceptor';
import { AuthenticatedGuard } from 'src/core/guards/authenticated-guard';
import { AuthenticatedRequest } from '../auth/interfaces/auth';
import { Routes, Services } from 'src/core/constants';
import { IQuizService } from './interfaces';
import { MessageEntityResponse } from 'src/core/types/common';
import { Quize } from './entities/quize.entity';
import { plainToClass } from 'class-transformer';

@UseInterceptors(TransformInterceptor)
@Controller(Routes.QUIZES)
export class QuizesController {
  constructor(@Inject(Services.QUIZ) private quizesService: IQuizService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  async create(@Body() createQuizeDto: CreateQuizeDto, @Req() req: AuthenticatedRequest): Promise<MessageEntityResponse<Quize>> {
    const quiz = await this.quizesService.create(createQuizeDto, req.user);

    return {
      message: 'Congratulations! Your quiz is now live, awaiting eager minds to embark on a delightful adventure of learning and fun!',
      statusCode: HttpStatus.CREATED,
      result: plainToClass(Quize, quiz),
    };
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  async findAll(@Req() req: AuthenticatedRequest): Promise<MessageEntityResponse<Quize[]>> {
    const quizes = await this.quizesService.findAll(req.user);

    return {
      statusCode: HttpStatus.OK,
      result: plainToClass(Quize, quizes),
    };
  }

  @Get('run-seeds')
  @UseGuards(AuthenticatedGuard)
  runSeeds(@Req() req: AuthenticatedRequest) {
    return this.quizesService.runSeeds(req.user);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<MessageEntityResponse<Quize>> {
    const quiz = await this.quizesService.findOne({
      relations: ['questions', 'questions.answers'],
      where: {
        uuid,
      },
    });

    return {
      result: plainToClass(Quize, quiz),
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':uuid')
  @UseGuards(AuthenticatedGuard)
  async update(
    @Param('uuid') uuid: string,
    @Body() updateQuizeDto: UpdateQuizeDto,
    @Req() req: AuthenticatedRequest
  ): Promise<MessageEntityResponse<void>> {
    this.quizesService.update(uuid, updateQuizeDto, req.user);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  @Delete(':uuid')
  @UseGuards(AuthenticatedGuard)
  async remove(@Param('uuid') uuid: string, @Req() req: AuthenticatedRequest): Promise<MessageEntityResponse<void>> {
    this.quizesService.remove(uuid, req.user);

    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
