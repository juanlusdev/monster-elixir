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
  UseGuards,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { MonstersService } from '../application/monsters.service';
import { CreateMonsterDto } from '../domain/dto/create-monster.dto';
import { UpdateMonsterDto } from '../domain/dto/update-monster.dto';
import { QueryPaginationDto } from 'src/shared/dto/query-pagination.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CACHE_MANAGER, Cache, CacheInterceptor } from '@nestjs/cache-manager';

@Controller('monsters')
@UseInterceptors(CacheInterceptor)
export class MonstersController {
  constructor(
    private readonly monstersService: MonstersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    //req.hosts
    return this.monstersService.create(createMonsterDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() queryParams: QueryPaginationDto) {
    return this.monstersService.findAll(
      queryParams.limit,
      queryParams.skip,
      queryParams.showDeleted,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findOne(@Param('id') id: string) {
    return this.monstersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMonsterDto: UpdateMonsterDto,
  ) {
    return this.monstersService.update(id, updateMonsterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.monstersService.remove(id);
  }
}
