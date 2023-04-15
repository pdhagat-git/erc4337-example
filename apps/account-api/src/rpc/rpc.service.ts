import { Injectable } from '@nestjs/common'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ConfigService } from '../common/config/config.service'
import { HttpRpcClient } from '@account-abstraction/sdk/dist/src/HttpRpcClient'
import {
  UserOperationStruct,
  EntryPoint__factory,
  EntryPoint,
} from '@account-abstraction/contracts'
import { constants } from 'ethers'

@Injectable()
export class RPCService {
  readonly provider: JsonRpcProvider

  readonly httpRpcClient: HttpRpcClient

  private readonly entryPointView: EntryPoint

  constructor(private readonly configService: ConfigService) {
    this.provider = new JsonRpcProvider(
      this.configService.get('provider.rpcUrl'),
    )

    const entryPointAddress = this.configService.get('provider.entrypoint')

    this.httpRpcClient = new HttpRpcClient(
      this.configService.get('provider.bundlerUrl'),
      entryPointAddress,
      this.configService.get('provider.chainId'),
    )

    this.entryPointView = EntryPoint__factory.connect(
      entryPointAddress,
      this.provider,
    ).connect(constants.AddressZero)
  }

  async sendToBundler(ops: UserOperationStruct) {
    return await this.httpRpcClient.sendUserOpToBundler(ops)
  }

  async getUserOpReceipt(userOpHash: string, timeout = 30000, interval = 5000) {
    const endtime = Date.now() + timeout
    while (Date.now() < endtime) {
      const currentBlock = await this.provider.getBlockNumber()
      const events = await this.entryPointView.queryFilter(
        this.entryPointView.filters.UserOperationEvent(userOpHash),
        currentBlock - 10000,
        currentBlock,
      )
      if (events.length > 0) {
        return events[0].transactionHash
      }
      await new Promise((resolve) => setTimeout(resolve, interval))
    }
    return null
  }
}
