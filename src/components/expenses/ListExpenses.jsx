import { useEffect, useState } from 'react'
import Filter from '../Filter'
import Expense from './Expense'

function ListExpenses({ expenses, setExpenses, setExpenseEdit }) {
  const [filtered, setFiltered] = useState([])
  const [filter, setFilter] = useState('')
  const isExpense = expenses.length > 0
  const isFiltered = filtered.length > 0

  useEffect(() => {
    if (filter.trim() !== '') {
      setFiltered(expenses.filter((e) => e.category === filter))
    }
  }, [filter])

  return (
    <>
      {expenses.length > 0 && <Filter filter={filter} setFilter={setFilter} />}
      <div className="listado-gastos contenedor">
        {!filter ? (
          <>
            <h2>{isExpense ? 'Gastos' : 'Aún no hay gastos'}</h2>
            {expenses.map((expense) => (
              <Expense
                key={expense.id}
                expense={expense}
                setExpenses={setExpenses}
                setExpenseEdit={setExpenseEdit}
              />
            ))}
          </>
        ) : (
          <>
            <h2>
              {isFiltered ? 'Gastos encontrados' : 'Ningún gasto encontrado'}
            </h2>
            {filtered.map((expense) => (
              <Expense
                key={expense.id}
                expense={expense}
                setExpenses={setExpenses}
                setExpenseEdit={setExpenseEdit}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default ListExpenses
