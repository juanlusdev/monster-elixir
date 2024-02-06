export class Monster {
  // In this entity we can use ValueObjects
  // or set Domain requirements for each param
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  description: string;
  nationality: string[];
  image: string;
  gold: number;
  speed: number;
  health: number;
  secretNotes: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}
