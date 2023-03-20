import { Injectable } from '@nestjs/common';
import { InvalidQueryHandlerException } from '@nestjs/cqrs';
import { NotFoundError } from '@prisma/client/runtime';
import { CreateTaskDto, Tasks } from './dto/task.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findTask(id: string): Promise<string> {
    const found = await this.prisma.task1.findFirst();

    if (!found) {
      throw new InvalidQueryHandlerException();
    }
    console.log('found ' + found);

    return found.id;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<string> {
    const task = this.prisma.task1.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: 'OPEN',
      },
    });

    console.log('done...creation of Task ' + task);
    return 'task';
  }
}
