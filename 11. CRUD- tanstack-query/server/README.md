# School Management

Please check the: [API Design](./API%20Design.md)

## API Caching with Redis

This project demonstrates API caching implementation using Redis to improve application performance and reduce database load.

### What is API Caching?

API caching is a technique that stores frequently requested data in a high-speed data storage layer (Redis) to reduce response times and minimize expensive database operations.

### Benefits of API Caching

1. **Improved Performance**: Significantly faster response times for cached data
2. **Reduced Database Load**: Fewer database queries reduce server strain
3. **Better Scalability**: Handle more concurrent users with same resources
4. **Cost Optimization**: Reduced computational resources and database costs
5. **Enhanced User Experience**: Faster page loads and API responses
6. **Reliability**: Fallback mechanism when database is temporarily unavailable

### Caching Architecture

```
Client Request → NestJS App → Cache Check → Redis Cache
                     ↓              ↓
                 Database    ←  Cache Miss
                     ↓
                Cache Store → Redis Cache
```

## Global Caching Setup

### 1. Dependencies Installation

```bash
npm install @nestjs/cache-manager cache-manager @keyv/redis cacheable
```

### 2. Environment Configuration

Add Redis configuration to your `.env` file:

```env
# Redis configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_USERNAME=username

# Redis URL format
REDIS_URL=redis://username:your_redis_password@localhost:6379
```

### 3. Global Cache Module Setup

Configure cache module globally in `app.module.ts`:

```typescript
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';

@Module({
  imports: [
    // Global cache configuration
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true, // Makes cache available globally
      useFactory: (configService: ConfigService) => {
        return {
          stores: [
            // Memory cache for fast local access
            new Keyv({
              store: new CacheableMemory({ ttl: 30000, lruSize: 5000 }),
            }),
            // Redis cache for persistent storage
            createKeyv(configService.getOrThrow<string>('REDIS_URL')),
          ],
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor, // Global cache interceptor
    },
  ],
})
export class AppModule {}
```

### 4. Docker Redis Setup

Start Redis using Docker Compose:

```yaml
redis:
  image: redis:8.0-alpine
  container_name: redis-cache
  restart: unless-stopped
  command: ["redis-server", "--requirepass", "${REDIS_PASSWORD}"]
  ports:
    - "6379:6379"
  volumes:
    - redis-data:/data
  networks:
    - app-network
```

## Cache Implementation Strategies

### 1. Automatic Caching with Interceptors

Use `@UseInterceptors(CacheInterceptor)` on controllers or methods:

```typescript
@Controller('students')
@UseInterceptors(CacheInterceptor)
export class StudentsController {
  @Get()
  @CacheTTL(60) // Cache for 60 seconds
  findAll() {
    return this.studentsService.findAll();
  }
}
```

### 2. Manual Cache Operations

Inject `CACHE_MANAGER` for custom cache operations:

```typescript
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheMeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: any, ttl?: number) {
    await this.cacheManager.set(key, value, ttl);
  }

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async delete(key: string) {
    await this.cacheManager.del(key);
  }
}
```

## Testing Cache Operations

### Using the Cache-Me Resource

This project includes a dedicated `/cache` endpoint for testing cache operations:

#### 1. Set Cache Entry

```http
POST http://localhost:8000/cache
Content-Type: application/json

{
  "key": "user_123",
  "value": "John Doe Profile Data",
  "ttl": 300
}
```

#### 2. Get Cache Entry

```http
GET http://localhost:8000/cache/user_123
```

#### 3. Delete Cache Entry

```http
DELETE http://localhost:8000/cache/user_123
```

### Testing with Real APIs

Test caching on existing endpoints:

```http
# First request - hits database (slower)
GET http://localhost:8000/students

# Second request - hits cache (faster)
GET http://localhost:8000/students
```

### Cache Headers Verification

Check response headers to verify caching:

```
X-Cache: HIT    # Response from cache
X-Cache: MISS   # Response from database
Cache-Control: max-age=60
```

## Cache Strategies

### 1. Cache-Aside (Lazy Loading)

```typescript
async findStudent(id: number) {
  const cacheKey = `student:${id}`;
  
  // Try cache first
  let student = await this.cacheManager.get(cacheKey);
  
  if (!student) {
    // Cache miss - fetch from database
    student = await this.studentRepository.findOne({ where: { id } });
    
    // Store in cache
    await this.cacheManager.set(cacheKey, student, 300);
  }
  
  return student;
}
```

### 2. Write-Through Cache

```typescript
async createStudent(data: CreateStudentDto) {
  // Save to database
  const student = await this.studentRepository.save(data);
  
  // Immediately cache the new data
  const cacheKey = `student:${student.id}`;
  await this.cacheManager.set(cacheKey, student, 300);
  
  return student;
}
```

### 3. Cache Invalidation

```typescript
async updateStudent(id: number, data: UpdateStudentDto) {
  // Update database
  const student = await this.studentRepository.update(id, data);
  
  // Invalidate cache
  await this.cacheManager.del(`student:${id}`);
  await this.cacheManager.del('students:all');
  
  return student;
}
```

## Best Practices

1. **Set Appropriate TTL**: Balance between data freshness and performance
2. **Cache Key Naming**: Use descriptive, hierarchical keys (`user:123`, `posts:user:123`)
3. **Cache Invalidation**: Clear related cache entries on data updates
4. **Monitor Cache Hit Ratio**: Aim for 80%+ hit rate
5. **Handle Cache Failures**: Always have fallback to database
6. **Use Cache Layers**: Memory + Redis for optimal performance
7. **Avoid Caching Sensitive Data**: Never cache passwords or personal information

## Monitoring and Debugging

### 1. Enable Debug Logging

```typescript
// In app.module.ts
CacheModule.registerAsync({
  useFactory: () => ({
    // ... other config
    logger: true, // Enable cache logging
  }),
})
```

### 2. Cache Metrics

Monitor cache performance:
- Hit ratio
- Response times
- Memory usage
- Cache size

### 3. Redis CLI Commands

```bash
# Connect to Redis
redis-cli -h localhost -p 6379 -a your_redis_password

# Check all keys
KEYS *

# Get cache entry
GET "cache:student:123"

# Check TTL
TTL "cache:student:123"

# Clear all cache
FLUSHALL
```

## Getting Started

1. **Start Redis**: `docker-compose up -d redis`
2. **Install Dependencies**: `npm install`
3. **Run Application**: `npm run start:dev`
4. **Test Caching**: Use the `/cache` endpoints in `app.http`
5. **Monitor Performance**: Check response times before/after caching

## Cache Configuration Options

```typescript
CacheModule.register({
  ttl: 60,          // Default TTL in seconds
  max: 100,         // Maximum number of items in cache
  isGlobal: true,   // Make cache available globally
})
```
