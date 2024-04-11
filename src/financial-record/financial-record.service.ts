import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { FinancialRecord } from './financial-record.entity'

@Injectable()
export class FinancialRecordService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect()
  }

  async findAll(): Promise<FinancialRecord[]> {
    return this.financialRecord.findMany({
      orderBy: {
        date: 'desc',
      },
    })
  }

  async findOne(id: string): Promise<FinancialRecord | null> {
    const financialRecord = this.financialRecord.findUnique({
      where: { id },
    })
    if (!financialRecord) {
      throw new NotFoundException('Registro Financeiro não encontrado')
    }
    return financialRecord
  }

  async create(data: FinancialRecord): Promise<FinancialRecord> {
    return this.financialRecord.create({ data })
  }

  async update(
    id: string,
    financialRecord: FinancialRecord,
  ): Promise<FinancialRecord> {
    await this.findOne(id)
    return this.financialRecord.update({
      where: { id },
      data: financialRecord,
    })
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id)
    await this.financialRecord.delete({
      where: { id },
    })
  }
}
