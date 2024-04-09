import { Module } from '@nestjs/common'
import { FinancialRecordService } from './financial-record.service'
import { FinancialRecordController } from './financial-record.controller'

@Module({
  imports: [],
  controllers: [FinancialRecordController],
  providers: [FinancialRecordService],
})
export class FinancialRecordModule {}
