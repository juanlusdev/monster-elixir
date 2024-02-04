import { Transform } from 'class-transformer';

export class QueryPaginationDto {
  @Transform(({ value }) => parseInt(value))
  limit: number;
  @Transform(({ value }) => parseInt(value))
  skip: number;
}
