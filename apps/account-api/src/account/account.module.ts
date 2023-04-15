import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { RPCService } from '../rpc/rpc.service'
import { RPCModule } from '../rpc/rpc.module'

@Module({
  imports: [RPCModule],
  controllers: [AccountController],
  providers: [AccountService, RPCService],
  exports: [AccountService],
})
export class AccountModule {}
