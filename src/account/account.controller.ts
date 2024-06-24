import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('accounts')
@ApiBearerAuth('access-token')
@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Criar uma conta' })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @ApiOperation({ summary: 'Listar todas as contas' })
  @ApiResponse({ status: 200, description: 'Lista de contas retornada com sucesso' })
  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @ApiOperation({ summary: 'Obter uma conta pelo ID' })
  @ApiResponse({ status: 200, description: 'Conta retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountService.findOne(id);
  }

  @ApiOperation({ summary: 'Obter transações de uma conta' })
  @ApiResponse({ status: 200, description: 'Transações retornadas com sucesso' })
  @ApiResponse({ status: 404, description: 'Conta não encontrada' })
  @Get(':id/transactions')
  getTransactions(
    @Param('id') id: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.accountService.getTransactions(id, new Date(startDate), new Date(endDate));
  }
}
