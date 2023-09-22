import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
  ContactsModule],
})
export class AppModule {}
