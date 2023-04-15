import { Module } from '@nestjs/common'
import { RPCService } from './rpc.service'

@Module({
  providers: [RPCService],
  exports: [RPCService],
})
export class RPCModule {}
