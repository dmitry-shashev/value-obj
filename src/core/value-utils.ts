import { IValue } from './IValue'

export function vuSetForAll<
  KeyType extends keyof IValue,
  ValueType extends IValue[KeyType],
>(arr: Array<IValue>, fieldName: KeyType, value: ValueType): Array<IValue> {
  const result: Array<IValue> = []
  for (const elem of arr) {
    const elemToAdd: IValue = {
      ...elem,
      [fieldName]: value,
      options: elem.options
        ? vuSetForAll(elem.options, fieldName, value)
        : elem.options,
      // avoid "exactOptionalPropertyTypes"
    } as unknown as IValue
    result.push(elemToAdd)
  }
  return result
}

export function vuRemoveFromArr<ValueType extends IValue>(
  elem: ValueType,
  arr: ReadonlyArray<ValueType>,
  compareByField: keyof ValueType = 'value'
): Array<ValueType> {
  return arr.filter((v) => v[compareByField] !== elem[compareByField])
}

export function vuFilterByString<ValueType extends IValue>(
  value: string | null | undefined,
  arr: ReadonlyArray<ValueType>,
  field: keyof ValueType = 'label'
): Array<ValueType> {
  const searchValue = String(value ?? '')
    .trim()
    .toLowerCase()
  if (!searchValue) {
    return [...arr]
  }

  return arr.filter((v) => {
    const valueToCheck = String(v[field] || '')
      .trim()
      .toLowerCase()
    return valueToCheck.includes(searchValue)
  })
}
