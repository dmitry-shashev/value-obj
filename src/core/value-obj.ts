import { IValue } from './IValue'

export type ValueCallback = (newValue: IValue | undefined) => void
export type ValueArrProducer = () => Array<IValue>
export type ValuePredicate = (newValue: IValue | undefined) => boolean
