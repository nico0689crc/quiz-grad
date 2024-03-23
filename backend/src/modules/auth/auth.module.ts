import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Services } from 'src/core/constants';
import { LocalStrategy } from 'src/core/strategies/local-strategy';
import { SessionSerializer } from 'src/core/serializers/session-serializer';
import { UsersModule } from '../users/users.module';
import { EmailModule } from 'src/core/email/email.module';

@Module({
  imports: [UsersModule, EmailModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
