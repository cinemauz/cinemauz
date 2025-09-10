import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { config } from 'src/config/env.config'; // sizning config faylingiz

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  onModuleInit() {
    this.redis = new Redis({
      host: config.REDIS.HOST || '127.0.0.1',
      port: config.REDIS.PORT || 6432,
      password: config.REDIS.PASSWORD || undefined,
    });
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }

  async setRedis(key: string, value: string, expireSeconds: number = 300) {
    await this.redis.set(key, value, 'EX', expireSeconds);
  }

  async getRedis(key: string) {
    return await this.redis.get(key);
  }

  async delRedis(key: string) {
    return await this.redis.del(key);
  }
}
