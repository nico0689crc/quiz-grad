import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Req, UseInterceptors, HttpStatus } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Routes, Services } from 'src/core/constants';
import { IQuestionService } from './interfaces';
import { AuthenticatedGuard } from 'src/core/guards/authenticated-guard';
import { AuthenticatedRequest } from '../auth/interfaces/auth';
import { TransformInterceptor } from 'src/core/interceptors/transform-interceptor';
import { plainToClass } from 'class-transformer';
import { Question } from './entities/question.entity';

@UseInterceptors(TransformInterceptor)
@Controller(Routes.QUESTION)
export class QuestionsController {
  constructor(@Inject(Services.QUESTION) private questionsService: IQuestionService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: AuthenticatedRequest) {
    return this.questionsService.create(createQuestionDto, req.user);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    const question = this.questionsService.findOne({ where: { uuid }, relations: ['answers'] });

    return {
      result: plainToClass(Question, question),
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':uuid')
  @UseGuards(AuthenticatedGuard)
  update(@Param('uuid') uuid: string, @Body() updateQuestionDto: UpdateQuestionDto, @Req() req: AuthenticatedRequest) {
    return this.questionsService.update(uuid, updateQuestionDto, req.user);
  }

  @Delete(':uuid')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('uuid') uuid: string, @Req() req: AuthenticatedRequest) {
    return this.questionsService.remove(uuid, req.user);
  }
}
