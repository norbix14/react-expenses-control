import { useEffect, useState } from 'react'
import { AlertMessage } from '../../helpers/Errors'
import { randomId } from '../../helpers/GenID'
import { useHandlerInputChange } from '../../hooks/useHandlerInputChange'

function FormModal({ animate, expenseEdit, setExpenses, setExpenseEdit }) {
  const initialState = {
    name: '',
    ammount: '',
    category: '',
  }
  const {
    0: values,
    1: handleChange,
    2: setValues,
    3: resetForm,
  } = useHandlerInputChange(initialState)
  const [isAdding, setIsAdding] = useState(false)
  const [expenseAdd, setExpenseAdd] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  let val
  const { name, ammount, category } = values

  const isEditing = Object.keys(expenseEdit).length > 0
  const doing = isEditing ? 'Editando...' : 'Añadiendo...'
  const done = isEditing ? 'Editar gasto' : 'Añadir gasto'

  const cleanValues = (obj) => Object.values(obj).map((v) => String(v).trim())

  const handleNewExpense = () => {
    if (isEditing) {
      setExpenseEdit({})
    }
    setExpenseAdd(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cleanValues(values).includes('')) {
      setIsAdding(false)
      setIsInvalid(true)
      return
    }
    setIsAdding(true)
    val = {
      ...values,
      ammount: Number(values.ammount),
      date: isEditing ? values.date : Date.now(),
      id: isEditing ? values.id : randomId(),
    }
    setExpenses((prev) => {
      if (isEditing) {
        return prev.map((exp) => (exp.id === val.id ? val : exp))
      } else {
        return [...prev, val]
      }
    })
    setIsInvalid(false)
    setIsAdding(false)
    setExpenseAdd(true)
    resetForm()
  }

  useEffect(() => {
    if (isEditing) {
      setValues(expenseEdit)
    }
  }, [])

  return (
    <form
      className={`formulario ${animate ? 'animar' : 'cerrar'}`}
      onSubmit={handleSubmit}
    >
      <legend>{isEditing ? 'Editar gasto' : 'Nuevo gasto'}</legend>
      {isInvalid && (
        <AlertMessage type="error">
          <p>ningún campo debe quedar vacío</p>
        </AlertMessage>
      )}
      <div className="campo">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nombre del gasto. Ej: comida"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="campo">
        <label htmlFor="ammount">Cantidad</label>
        <input
          type="number"
          name="ammount"
          id="ammount"
          placeholder="Cantidad del gasto. Ej: 300"
          value={ammount}
          onChange={handleChange}
        />
      </div>
      <div className="campo">
        <label htmlFor="category">Categoría</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleChange}
        >
          <option disabled value="">
            -- Seleccionar --
          </option>
          <option value="save">ahorro</option>
          <option value="food">comida</option>
          <option value="home">casa</option>
          <option value="hobbie">ocio</option>
          <option value="health">salud</option>
          <option value="subscription">suscripciones</option>
          <option value="others">varios</option>
        </select>
      </div>
      {expenseAdd && (
        <input type="button" value="Nuevo gasto" onClick={handleNewExpense} />
      )}
      {!expenseAdd && (
        <input
          type="submit"
          disabled={isAdding}
          value={isAdding ? doing : done}
        />
      )}
      {expenseAdd && (
        <AlertMessage type="success">
          <p>{isEditing ? 'gasto editado' : 'gasto agregado'}</p>
        </AlertMessage>
      )}
    </form>
  )
}

export default FormModal
