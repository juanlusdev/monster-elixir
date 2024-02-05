export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
}
