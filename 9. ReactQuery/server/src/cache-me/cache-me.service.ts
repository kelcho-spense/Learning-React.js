import { Inject, Injectable } from '@nestjs/common';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';

import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheMeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(createCacheMeDto: CreateCacheMeDto) {
    const { key, value, ttl } = createCacheMeDto;

    try {
      // Set the value in cache with optional TTL
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000); // Convert seconds to milliseconds
      }
      await this.cacheManager.set(key, value); // Convert seconds to milliseconds

      return {
        success: true,
        message: `Cache entry created successfully`,
        data: {
          key,
          value,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async get(key: string) {
    try {
      const value = await this.cacheManager.get(key);

      if (value === undefined || value === null) {
        return {
          success: false,
          message: `Cache entry with key '${key}' not found`,
          data: null,
        };
      }

      return {
        success: true,
        message: `Cache entry retrieved successfully`,
        data: {
          key,
          value,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to retrieve cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async remove(key: string) {
    try {
      await this.cacheManager.del(key);

      return {
        success: true,
        message: `Cache entry with key '${key}' removed successfully`,
        data: { key },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to remove cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
}
