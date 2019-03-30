import {DateTime} from 'luxon'

type ModelValue = string | number | DateTime | null | undefined
type DefaultModel<T> = T | null
type SetModelPart<T> = (key: keyof T, value: ModelValue) => void

type FormContext<T> = [DefaultModel<T>, SetModelPart<T>]
export default FormContext
