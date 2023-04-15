import { IsString, IsEmail, IsOptional } from 'class-validator'

export class UserOpsDTO {
  @IsString()
  sender: string

  @IsString()
  nonce: string

  @IsString()
  initCode: string

  @IsString()
  callData: string

  @IsString()
  callGasLimit: string

  @IsString()
  verificationGasLimit: string

  @IsString()
  maxFeePerGas: string

  @IsString()
  maxPriorityFeePerGas: string

  @IsString()
  paymasterAndData: string

  @IsString()
  preVerificationGas: string

  @IsString()
  signature: string
}
