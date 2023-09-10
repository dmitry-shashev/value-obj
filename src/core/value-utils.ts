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
