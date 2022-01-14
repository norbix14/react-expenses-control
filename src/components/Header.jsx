import BudgetControl from './BudgetControl'
import BudgetForm from './BudgetForm'

function Header({ budget, expenses, setBudget, setExpenses }) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {budget > 0 ? (
        <BudgetControl
          budget={budget}
          expenses={expenses}
          setBudget={setBudget}
          setExpenses={setExpenses}
        />
      ) : (
        <BudgetForm setBudget={setBudget} />
      )}
    </header>
  )
}

export default Header
