import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { CreateTaskDto } from 'src/dto/task.entity';
import { TaskService } from 'src/task.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private taskService: TaskService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'docs.nestjs.com'),
    ]);
  }

  @Get('/:id')
  findTask(@Param('id') id: string): Promise<string> {
    return this.taskService.findTask(id);
  }

  @Post('createTask')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<string> {
    return this.taskService.createTask(createTaskDto);
  }
}
