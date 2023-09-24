import { ValueArrProducer } from '../core/value-obj'
import {
  vuFilterByString,
  vuRemoveFromArr,
  vuSetForAll,
} from '../core/value-utils'

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

  it('vuRemoveFromArr', () => {
    const data = getData()

    expect(vuRemoveFromArr({}, data)).toEqual(getData())
    expect(vuRemoveFromArr({ checked: true }, data)).toEqual(getData())

    let result = vuRemoveFromArr({ value: '2' }, data)
    expect(result).toEqual([
      {
        label: 'One',
        value: '1',
      },
      {
        label: 'Three',
        value: '3',
      },
    ])
    result = vuRemoveFromArr({ value: '1' }, result)
    expect(result).toEqual([
      {
        label: 'Three',
        value: '3',
      },
    ])
    result = vuRemoveFromArr({ value: '1' }, result)
    expect(result).toEqual([
      {
        label: 'Three',
        value: '3',
      },
    ])
    result = vuRemoveFromArr({ value: '3' }, result)
    expect(result).toEqual([])

    result = vuRemoveFromArr({ label: 'Two' }, data, 'label')
    expect(result).toEqual([
      {
        label: 'One',
        value: '1',
      },
      {
        label: 'Three',
        value: '3',
      },
    ])

    expect(data).toEqual(getData())
  })

  it('vuFilterByString', () => {
    const data = getData()

    expect(vuFilterByString(null, data)).toEqual(getData())
    expect(vuFilterByString(undefined, data)).toEqual(getData())
    expect(vuFilterByString('', data)).toEqual(getData())
    expect(vuFilterByString('  ', data)).toEqual(getData())

    expect(vuFilterByString('O', data)).toEqual([data[0], data[1]])
    expect(vuFilterByString('t', data)).toEqual([data[1], data[2]])
    expect(vuFilterByString('w', data)).toEqual([data[1]])
    expect(vuFilterByString('123', data)).toEqual([])

    expect(vuFilterByString('3', data, 'value')).toEqual([data[2]])

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
    value: '3',
  },
]
