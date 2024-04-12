import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { FinancialRecordService } from './financial-record.service'
import { FinancialRecord } from './financial-record.entity'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('Registro Financeiro')
@Controller('financial-record')
export class FinancialRecordController {
  constructor(
    private readonly financialRecordService: FinancialRecordService,
  ) {}
  @ApiQuery({ name: 'month', required: true, type: 'number' })
  @ApiQuery({ name: 'openingBalance', required: true, type: 'string' })
  @Get()
  async findAll(
    @Query('month') month = 0,
    @Query('openingBalance') openingBalance = '0',
  ): Promise<FinancialRecord[]> {
    return this.financialRecordService.findAll(month, openingBalance)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FinancialRecord> {
    return this.financialRecordService.findOne(id)
  }

  @Post()
  async create(
    @Body() financialRecord: FinancialRecord,
  ): Promise<FinancialRecord> {
    return this.financialRecordService.create(financialRecord)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: FinancialRecord,
  ): Promise<FinancialRecord> {
    return this.financialRecordService.update(id, data)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.financialRecordService.remove(id)
  }
}
