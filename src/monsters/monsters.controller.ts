import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { QueryPaginationDto } from 'src/shared/dto/query-pagination.dto';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMonsterDto: CreateMonsterDto) {
    //req.hosts
    return this.monstersService.create(createMonsterDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() queryParams: QueryPaginationDto) {
    return this.monstersService.findAll(queryParams.limit, queryParams.skip);
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: string) {
    return this.monstersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monstersService.update(id, updateMonsterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('id') id: string) {
    return this.monstersService.remove(id);
  }
}
