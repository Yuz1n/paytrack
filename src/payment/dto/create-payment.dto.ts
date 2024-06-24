import { IsNumber, IsNotEmpty, IsDateString, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'ID da conta associada ao pagamento' })
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @ApiProperty({ description: 'Valor do pagamento' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Data do pagamento' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Descrição do pagamento' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
