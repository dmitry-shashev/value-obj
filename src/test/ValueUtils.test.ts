import { ValueArrProducer } from '../core/value-types'
import { vuSetForAll } from '../core/value-utils'

describe('ValueUtils', () => {
  it('vuSetForAll', () => {
    const data = getData()

    const checkAllValues = (value: string): void => {
      expect(result[0]?.value).toBe(value)
      expect(result[1]?.value).toBe(value)
      expect(result[2]?.value).toBe(value)
      expect(result[1]?.options?.[0]?.value).toBe(value)
      expect(result[1]?.options?.[1]?.value).toBe(value)
      expect(result[1]?.options?.[1]?.options?.[0]?.value).toBe(value)
      expect(result[1]?.options?.[1]?.options?.[1]?.value).toBe(value)
    }

    const newValue1 = 'rain'
    let result = vuSetForAll(data, 'value', newValue1)
    checkAllValues(newValue1)

    const newValue2 = 'monday'
    result = vuSetForAll(data, 'value', newValue2)
    checkAllValues(newValue2)

    const newLabel = 'ratata'
    result = vuSetForAll(data, 'label', newLabel)
    expect(result[0]?.label).toBe(newLabel)
    expect(result[1]?.options?.[1]?.label).toBe(newLabel)
    expect(result[1]?.options?.[1]?.options?.[0]?.label).toBe(newLabel)

    expect(data).toEqual(getData())
  })
})

const getData: ValueArrProducer = () => [
  {
    label: 'One',
    value: '1',
  },
  {
    label: 'Two',
    value: '2',
    options: [
      {
        label: 'Sub 1',
        value: '21',
      },
      {
        label: 'Sub 2',
        value: '22',
        options: [
          {
            label: 'Sub Sub 1',
            value: '221',
          },

          {
            label: 'Sub Sub 2',
            value: '222',
          },
        ],
      },
    ],
  },
  {
    label: 'Three',
    value: '2',
  },
]
