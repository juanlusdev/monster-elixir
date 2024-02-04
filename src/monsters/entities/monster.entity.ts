import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { GENDERS } from '../shared/monsters.constants';

@Schema()
export class Monster {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, enum: Object.values(GENDERS) })
  gender: string; // enum female/male/other

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  nationality: [string];

  @Prop()
  image: string;

  @Prop({ default: 0 })
  gold: number;

  @Prop({ required: true })
  speed: number;

  @Prop({ required: true })
  health: number;

  @Prop()
  secretNotes: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export type MonsterDocument = HydratedDocument<Monster>;
export const MonsterSchema = SchemaFactory.createForClass(Monster);
export type MonsterModel = Model<Monster>;
