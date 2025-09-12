import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { config } from 'src/config/env.config'; // sizning config faylingiz

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  onModuleInit() {
    this.redis = new Redis({
      host: config.REDIS.HOST || '127.0.0.1',
      port: config.REDIS.PORT || 6379,
      password: config.REDIS.PASSWORD || undefined,
    });
  }
  // ---------------------------- SET VALUE ----------------------------
  async setRedis(key: string, value: string, expireSeconds: number = config.REDIS.TIME) {
    await this.redis.set(key, value, 'EX', expireSeconds);
  }

  // ---------------------------- GET VALUE ----------------------------
  async getRedis(key: string) {
    return await this.redis.get(key);
  }

  // ---------------------------- DELETE VALUE ----------------------------
  async delRedis(key: string) {
    return await this.redis.del(key);
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
