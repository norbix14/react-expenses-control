import { useEffect, useState } from 'react'
import { AlertMessage } from '../helpers/Errors'
import { useHandlerInputChange } from '../hooks/useHandlerInputChange'

function BudgetForm({ setBudget }) {
  const [budget, handleChange] = useHandlerInputChange({ value: 0 })
  const [invalid, setInvalid] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  let timeridBudget
  const timeout = window.setTimeout
  const clear = window.clearTimeout
  const { value } = budget

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsAdding(true)
    if (Number(value) <= 0 || value === '' || !value) {
      setInvalid(true)
      setIsAdding(false)
      return
    }
    setInvalid(false)
    timeridBudget = timeout(() => {
      setIsAdding(false)
      setBudget(Number(value))
    }, 1000)
  }

  useEffect(() => {
    return () => clear(timeridBudget)
  }, [])

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="budget">Definir presupuesto</label>
          <input
            type="number"
            id="budget"
            name="value"
            className="nuevo-presupuesto"
            placeholder="Anañir monto"
            min={0}
            value={value}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          disabled={isAdding}
          value={isAdding ? 'Añadiendo...' : 'Añadir'}
        />
        {invalid && (
          <AlertMessage type="error">
            <p>Ingresar un monto válido y mayor a 0</p>
          </AlertMessage>
        )}
      </form>
    </div>
  )
}

export default BudgetForm
