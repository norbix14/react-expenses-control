import { useState } from 'react'

export function useHandlerInputChange(initialState) {
  const [values, setValues] = useState(initialState)
  const reset = () => setValues(initialState)
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e
    setValues((prev) => ({ ...prev, [name]: value }))
  }
  return [values, handleChange, setValues, reset]
}
