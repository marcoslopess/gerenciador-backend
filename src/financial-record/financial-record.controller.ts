import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { FinancialRecordService } from './financial-record.service'
import { FinancialRecord } from './financial-record.entity'

@Controller('financial-record')
export class FinancialRecordController {
  constructor(
    private readonly financialRecordService: FinancialRecordService,
  ) {}

  @Get()
  async findAll(): Promise<FinancialRecord[]> {
    return this.financialRecordService.findAll()
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
