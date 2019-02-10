export function bindModel<T>(model: T | any) {
  return (name: keyof T, label: string) => {
    const defaultValue = model ? model[name] : ''
    return {name, label, defaultValue}
  }
}
