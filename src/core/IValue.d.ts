export class IValue<T = unknown> {
  readonly value?: string
  readonly checked?: boolean
  readonly placeholder?: string
  readonly label?: string
  readonly name?: string
  readonly description?: string
  readonly id?: string | number
  readonly disabled?: boolean
  readonly required?: boolean
  readonly order?: number
  readonly color?: string
  readonly extraValue?: string
  readonly extraLabel?: string
  readonly extraColor?: string
  readonly style?: CSSProperties
  // for recursive data
  readonly options?: Array<IValue>
  // for extra data
  readonly data?: T
}
