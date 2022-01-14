import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListExpenses from './components/expenses/ListExpenses'
import Modal from './components/modal/Modal'
import useLocalStorage from './hooks/useLocalStorage'
import IconNewExpense from './img/nuevo-gasto.svg'

function App() {
  const [budget, setBudget] = useLocalStorage('budget', 0)
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  const [expenseEdit, setExpenseEdit] = useState({})
  const [modal, setModal] = useState(false)

  const handleNewExpense = () => {
    setModal(true)
    if (Object.keys(expenseEdit).length > 0) {
      setExpenseEdit({})
    }
  }

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setModal(true)
    }
  }, [expenseEdit])

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget={budget}
        expenses={expenses}
        setBudget={setBudget}
        setExpenses={setExpenses}
      />
      {budget > 0 && (
        <>
          {modal && (
            <Modal
              expenseEdit={expenseEdit}
              setModal={setModal}
              setExpenses={setExpenses}
              setExpenseEdit={setExpenseEdit}
            />
          )}
          <main>
            <ListExpenses
              expenses={expenses}
              setExpenses={setExpenses}
              setExpenseEdit={setExpenseEdit}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              alt="nuevo gasto"
              title="Agregar un nuevo gasto"
              src={IconNewExpense}
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default App
