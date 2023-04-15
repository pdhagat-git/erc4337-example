import { Injectable } from '@nestjs/common'
import { config } from './app.config'

@Injectable()
export class ConfigService {
  private readonly envConfig: any

  constructor() {
    this.envConfig = config
  }

  get(key: string): any {
    return this.envConfig.get(key)
  }
}
