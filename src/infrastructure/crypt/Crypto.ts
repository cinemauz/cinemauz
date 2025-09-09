import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class CryptoService {
  async encrypt(data: string): Promise<string> {
    const salt = 7;
    return hash(data, salt);
  }

  async decrypt(data: string, encryptedDate: string): Promise<boolean> {
    return compare(data, encryptedDate);
  }
}
