import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';
import { CacheMeService } from './cache-me.service';

@Controller('cache')
export class CacheMeController {
  constructor(private readonly cacheMeService: CacheMeService) {}

  @Post()
  create(@Body() createCacheMeDto: CreateCacheMeDto) {
    return this.cacheMeService.create(createCacheMeDto);
  }

  @Get(':key')
  get(@Param('key') key: string) {
    return this.cacheMeService.get(key);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.cacheMeService.remove(key);
  }
}
