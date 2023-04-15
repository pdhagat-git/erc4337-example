import { Module } from '@nestjs/common'
import { CommonModule } from '../common/common.module'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [CommonModule, AccountModule],
})
export class AppModule {}
