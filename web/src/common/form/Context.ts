type DefaultModel<T> = T | null
type SetModelPart<T> = (k: keyof T, v: string | null) => void

type FormContext<T> = [DefaultModel<T>, SetModelPart<T>]
export default FormContext
