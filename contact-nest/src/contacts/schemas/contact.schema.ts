import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop()
  name: string;

  @Prop()
  number: string;

  @Prop()
  date: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

// export const ContactSchema = new mongoose.Schema({
//    name: String,
//    number: String,
//    date: String,
//  });
 