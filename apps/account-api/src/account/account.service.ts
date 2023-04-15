import { Injectable } from '@nestjs/common'
import { UserOperationStruct } from '@account-abstraction/contracts'
import { RPCService } from '../rpc/rpc.service'

@Injectable()
export class AccountService {
  constructor(private readonly rpcService: RPCService) {}

  async broadcastTransaction(
    ops: UserOperationStruct,
  ): Promise<{ userOpHash: string; txnHash: string }> {
    try {
      const userOpHash = await this.rpcService.sendToBundler(ops)
      const txnHash = await this.rpcService.getUserOpReceipt(userOpHash)
      return { userOpHash, txnHash }
    } catch (error) {
      throw Error('Something went wrong: ' + error.message)
    }
  }
}
