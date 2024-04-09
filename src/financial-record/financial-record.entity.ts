import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'

export class FinancialRecord
  implements Prisma.FinancialRecordUncheckedCreateInput
{
  @ApiProperty({
    description: 'O ID do registro financeiro',
    required: false,
  })
  id?: string

  @ApiProperty({
    description: 'O valor do registro financeiro',
    minimum: 0,
  })
  value: number

  @ApiProperty({
    description: 'A categoria do registro financeiro',
  })
  category: string

  @ApiProperty({
    description: 'A data do registro financeiro',
    type: Date,
  })
  date: Date

  @ApiProperty({
    description: 'O forma de pagamento do registro financeiro',
  })
  formPayment: string

  @ApiProperty({
    description: 'A descrição do registro financeiro',
  })
  description: string

  @ApiProperty({
    description: 'O tipo do registro financeiro',
  })
  type: string

  @ApiProperty({
    description: 'O tipo de financiamento do registro financeiro',
  })
  typeFinance: string

  @ApiProperty({
    description: 'A data de criação do registro financeiro',
    type: Date,
  })
  dateCreate: Date

  @ApiProperty({
    description: 'A data de atualização do registro financeiro',
    type: Date,
  })
  dateUpdate: Date
}
