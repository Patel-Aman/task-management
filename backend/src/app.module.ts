import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TasksModule,
    MongooseModule.forRoot(
      'mongodb://admin:173314@localhost:27017/streamhatchet?directConnection=true&authSource=admin&replicaSet=replicaset&retryWrites=true',
    ),
  ],
})
export class AppModule {}
