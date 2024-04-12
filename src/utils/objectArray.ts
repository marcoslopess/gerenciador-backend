import { listFormPayment } from './options'
import { getFormPayment } from './strings'

const chartMap = (records: any, typeValue: string) => {
  return records.reduce((acc, record) => {
    const { category, value, typeFinance, formPayment } = record
    if (typeFinance === typeValue) {
      acc[category] = acc[category] || 0
      acc[category] += value
    }

    if (record.type === 'ESSENCIAL') {
      acc.essential = acc.essential || 0
      acc.essential += value
    }
    if (record.type === 'NAO_ESSENCIAL') {
      acc.nonessential = acc.nonessential || 0
      acc.nonessential += value
    }

    acc[formPayment] = acc[formPayment] || 0
    acc[formPayment] += value

    return acc
  }, {})
}

export const objectChart = (records: any, type: string, chart: any) => {
  Object.entries(chartMap(records, type)).forEach(
    ([category, totalValue]: any) => {
      if (type === '' || type === null) {
        if (type === '' && category === 'essential') {
          chart.data[0].value = totalValue.toFixed(2)
        }
        if (type === '' && category === 'nonessential') {
          chart.data[1].value = totalValue.toFixed(2)
        }
        if (
          type === null &&
          category !== '' &&
          listFormPayment.filter((x) => x.value === category).length > 0
        ) {
          chart.data.push({
            value: totalValue.toFixed(2),
            name: getFormPayment(category),
          })
        }
      } else {
        chart.labels.push(category)
        chart.data.push(totalValue.toFixed(2))
      }
    },
  )

  return chart
}
