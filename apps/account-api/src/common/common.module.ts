import { Global, Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module'

@Global()
@Module({
  imports: [ConfigModule],
  exports: [ConfigModule],
})
export class CommonModule {}
