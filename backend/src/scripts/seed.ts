import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';
import { TasksService } from '../tasks/tasks.service';

enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const taskService = app.get(TasksService);

  console.log('Seeding database with tasks...');

  for (let i = 0; i < 100; i++) {
    await taskService.createNewTask({
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      status: faker.helpers.arrayElement([
        TaskStatus.PENDING,
        TaskStatus.IN_PROGRESS,
        TaskStatus.COMPLETED,
      ]),
    });
  }

  console.log('Database seeding complete.');
  await app.close();
}

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
