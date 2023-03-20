import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { TaskService } from './task.service';

@Module({
  imports: [HealthModule, TerminusModule, HttpModule],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService, UserService, TaskService],
})
export class AppModule {}
