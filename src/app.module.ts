import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { FinancialRecordModule } from './financial-record/financial-record.module'
import { CalculationsModule } from './calculations/calculations.module'

@Module({
  imports: [FinancialRecordModule, CalculationsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
