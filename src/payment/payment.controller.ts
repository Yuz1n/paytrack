import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('payments')
@ApiBearerAuth('access-token')
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Criar um pagamento' })
  @ApiResponse({ status: 201, description: 'Pagamento criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Listar todos os pagamentos' })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos retornada com sucesso' })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Obter um pagamento pelo ID' })
  @ApiResponse({ status: 200, description: 'Pagamento retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }
}
