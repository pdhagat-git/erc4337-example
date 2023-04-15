import { IsNotEmpty, IsOptional } from 'class-validator'

export class ResponseDTO {
  @IsNotEmpty()
  success = true

  @IsNotEmpty()
  message = ''

  @IsOptional()
  error?: string

  data: any
}
