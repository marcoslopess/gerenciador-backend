import { Module } from '@nestjs/common'
import { CalculationsController } from './calculations.controller'
import { FinancialRecordService } from 'src/financial-record/financial-record.service'

@Module({
  imports: [],
  controllers: [CalculationsController],
  providers: [FinancialRecordService],
})
export class CalculationsModule {}
