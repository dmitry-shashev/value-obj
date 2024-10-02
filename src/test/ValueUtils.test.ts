import { ValueArrProducer } from '../core/value-obj'
import {
  vuFilterByString,
  vuRemoveFromArr,
  vuSetForAll,
} from '../core/value-utils'
import { describe, it } from 'node:test'
import assert from 'node:assert'

describe('ValueUtils', () => {
  it('vuSetForAll', () => {
    const data = getData()

    const checkAllValues = (value: string): void => {
      assert.equal(result[0]?.value, value)
      assert.equal(result[1]?.value, value)
      assert.equal(result[2]?.value, value)
      assert.equal(result[1]?.options?.[0]?.value, value)
      assert.equal(result[1]?.options?.[1]?.value, value)
      assert.equal(result[1]?.options?.[1]?.options?.[0]?.value, value)
      assert.equal(result[1]?.options?.[1]?.options?.[1]?.value, value)
    }

    const newValue1 = 'rain'
    let result = vuSetForAll(data, 'value', newValue1)
    checkAllValues(newValue1)

    const newValue2 = 'monday'
    result = vuSetForAll(data, 'value', newValue2)
    checkAllValues(newValue2)

    const newLabel = 'ratata'
    result = vuSetForAll(data, 'label', newLabel)
    assert.equal(result[0]?.label, newLabel)
    assert.equal(result[1]?.options?.[1]?.label, newLabel)
    assert.equal(result[1]?.options?.[1]?.options?.[0]?.label, newLabel)

    assert.deepEqual(data, getData())
  })

  it('vuRemoveFromArr', () => {
    const data = getData()

    assert.deepEqual(vuRemoveFromArr({}, data), getData())
    assert.deepEqual(vuRemoveFromArr({ checked: true }, data), getData())

    let result = vuRemoveFromArr({ value: '2' }, data)
    assert.deepEqual(result, [
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
    assert.deepEqual(result, [
      {
        label: 'Three',
        value: '3',
      },
    ])
    result = vuRemoveFromArr({ value: '1' }, result)
    assert.deepEqual(result, [
      {
        label: 'Three',
        value: '3',
      },
    ])
    result = vuRemoveFromArr({ value: '3' }, result)
    assert.deepEqual(result, [])

    result = vuRemoveFromArr({ label: 'Two' }, data, 'label')
    assert.deepEqual(result, [
      {
        label: 'One',
        value: '1',
      },
      {
        label: 'Three',
        value: '3',
      },
    ])

    assert.deepEqual(data, getData())
  })

  it('vuFilterByString', () => {
    const data = getData()

    assert.deepEqual(vuFilterByString(null, data), getData())
    assert.deepEqual(vuFilterByString(undefined, data), getData())
    assert.deepEqual(vuFilterByString('', data), getData())
    assert.deepEqual(vuFilterByString('  ', data), getData())

    assert.deepEqual(vuFilterByString('O', data), [data[0], data[1]])
    assert.deepEqual(vuFilterByString('t', data), [data[1], data[2]])
    assert.deepEqual(vuFilterByString('w', data), [data[1]])
    assert.deepEqual(vuFilterByString('123', data), [])

    assert.deepEqual(vuFilterByString('3', data, 'value'), [data[2]])

    assert.deepEqual(data, getData())
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
