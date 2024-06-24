import { IsString, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ description: 'Nome da conta' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tipo de conta (corrente ou poupança)' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['corrente', 'poupanca'], {
    message: 'accountType must be either corrente or poupanca',
  })
  accountType: string;

  @ApiProperty({ description: 'Saldo inicial da conta' })
  @IsNumber()
  @Min(0)
  initialBalance: number;
}
