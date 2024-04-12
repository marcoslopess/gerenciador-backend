import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { FinancialRecord } from './financial-record.entity'
import { getStartAndEndDateByMonth } from 'src/utils/date'
import { objectChart } from 'src/utils/objectArray'
import { randomUUID } from 'node:crypto'

@Injectable()
export class FinancialRecordService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect()
  }

  async findAll(month: number, openingBalance: string): Promise<any> {
    const { startDate, endDate } = getStartAndEndDateByMonth(month)

    const values: FinancialRecord[] = await this.financialRecord.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
    let totalExpenditure: number = 0
    let totalEntries: number = 0

    values.forEach((element) => {
      if (element.typeFinance === 'SAIDA') {
        totalExpenditure += element.value
      }
      if (element.typeFinance === 'ENTRADA') {
        totalEntries += element.value
      }
    })

    const finalBalance: number =
      parseFloat(openingBalance) + totalEntries - totalExpenditure

    return {
      values,
      totalExpenditure: totalExpenditure.toFixed(2),
      totalEntries: totalEntries.toFixed(2),
      finalBalance: finalBalance.toFixed(2),
    }
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
    data.dateUpdate = new Date()
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

  //CALCULATIONS

  async findAllFinancialCharts(month: number): Promise<any> {
    const { startDate, endDate } = getStartAndEndDateByMonth(month)

    const records = await this.financialRecord.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    })

    let spendingChart = {
      data: [],
      labels: [],
      title: 'Saidas',
      type: 'bar',
      id: randomUUID(),
    }

    let inputChart = {
      data: [],
      labels: [],
      title: 'Entradas',
      type: 'bar',
      id: randomUUID(),
    }

    let expenseTypeChart = {
      data: [
        { value: 0, name: 'Essencial' },
        { value: 0, name: 'Não essencial' },
      ],
      title: 'Tipo das despesas',
      type: 'pie',
      id: randomUUID(),
    }

    let paymentMethodsChart = {
      data: [],
      title: 'Formas de pagamento',
      type: 'pie',
      id: randomUUID(),
    }

    spendingChart = objectChart(records, 'SAIDA', spendingChart)
    inputChart = objectChart(records, 'ENTRADA', inputChart)
    expenseTypeChart = objectChart(records, '', expenseTypeChart)
    paymentMethodsChart = objectChart(records, null, paymentMethodsChart)

    return [spendingChart, inputChart, expenseTypeChart, paymentMethodsChart]
  }
}
