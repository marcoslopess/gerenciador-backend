import { Controller, Get, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { FinancialRecordService } from 'src/financial-record/financial-record.service'

@ApiTags('Calculos')
@Controller('calculations')
export class CalculationsController {
  constructor(
    private readonly financialRecordService: FinancialRecordService,
  ) {}
  @ApiQuery({ name: 'month', required: true, type: 'number' })
  @Get('financial-charts')
  async findAllValues(@Query('month') month = 0): Promise<any> {
    return this.financialRecordService.findAllFinancialCharts(month)
  }
}
