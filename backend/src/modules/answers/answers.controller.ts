import { Controller, Post, Body, Patch, Param, Delete, UseInterceptors, Inject, Req, UseGuards } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { TransformInterceptor } from 'src/core/interceptors/transform-interceptor';
import { Routes, Services } from 'src/core/constants';
import { IAnswerService } from './interfaces';
import { AuthenticatedGuard } from 'src/core/guards/authenticated-guard';
import { AuthenticatedRequest } from '../auth/interfaces/auth';

@UseInterceptors(TransformInterceptor)
@Controller(Routes.ANSWER)
export class AnswersController {
  constructor(@Inject(Services.ANSWER) private answersService: IAnswerService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@Body() createAnswerDto: CreateAnswerDto, @Req() req: AuthenticatedRequest) {
    return this.answersService.create(createAnswerDto, req.user);
  }

  @Patch(':uuid')
  @UseGuards(AuthenticatedGuard)
  update(@Param('uuid') uuid: string, @Body() updateAnswerDto: UpdateAnswerDto, @Req() req: AuthenticatedRequest) {
    return this.answersService.update(uuid, updateAnswerDto, req.user);
  }

  @Delete(':uuid')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('uuid') uuid: string, @Req() req: AuthenticatedRequest) {
    return this.answersService.remove(uuid, req.user);
  }
}
