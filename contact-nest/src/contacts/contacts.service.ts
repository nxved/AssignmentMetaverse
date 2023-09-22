import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';


@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async storeContact(name: string, number: string, date: string) {
    const contact = new this.contactModel({
      name,
      number,
      date,
    });
    await contact.save();
    return contact;
  }
}
