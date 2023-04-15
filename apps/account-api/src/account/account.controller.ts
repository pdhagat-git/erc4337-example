import { Controller, Post, Body } from '@nestjs/common'
import { AccountService } from './account.service'
import { UserOpsDTO } from './models/account.dto'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/broadcast')
  broadcastTxn(@Body() ops: UserOpsDTO) {
    return this.accountService.broadcastTransaction(ops)
  }
}
