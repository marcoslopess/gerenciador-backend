import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FinancialRecordModule } from './financial-record/financial-record.module'

@Module({
  imports: [FinancialRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
