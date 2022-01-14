import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function BudgetControl({ budget, expenses, setBudget, setExpenses }) {
  const [available, setAvailable] = useState(0)
  const [spent, setSpent] = useState(0)
  const [outOfBudget, setOutOfBudget] = useState(0)
  const [graph, setGraph] = useState(0)

  const timeout = window.setTimeout
  const clear = window.clearTimeout
  let pathColor, textColor
  const dangerColor = '#dc2626'
  const warningColor = '#f6703b'
  const normalColor = '#3b82f6'

  switch (true) {
    case graph > 100:
      pathColor = textColor = dangerColor
      break
    case graph > 70:
      pathColor = textColor = warningColor
      break
    default:
      pathColor = textColor = normalColor
      break
  }

  const myStyles = {
    pathColor,
    textColor,
    trailColor: '#f5f5f5',
  }

  const formatBudget = (ammount) => {
    return ammount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  const handleReset = () => {
    const resetApp = confirm('¿Reset app?')
    if (resetApp) {
      setBudget(0)
      setExpenses([])
    }
  }

  useEffect(() => {
    let timeridGraph
    const moneySpent = expenses.reduce(
      (prev, curr) => (prev += curr.ammount),
      0
    )
    const av = budget - moneySpent
    const perc = Number((((budget - av) / budget) * 100).toFixed(2))
    if (moneySpent > budget) {
      setOutOfBudget(moneySpent - budget)
    } else {
      setOutOfBudget(0)
    }
    setSpent(moneySpent)
    setAvailable(av)
    timeridGraph = timeout(() => setGraph(perc), 1000)
    return () => clear(timeridGraph)
  }, [expenses])

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={graph}
          styles={buildStyles(myStyles)}
          text={`Gastado: ${graph}%`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button type="button" className="reset-app" onClick={handleReset}>
          reset app
        </button>
        <p>
          <span>Presupuesto:</span> {formatBudget(budget)}
        </p>
        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible:</span> {formatBudget(available)}
        </p>
        <p>
          <span>Gastado:</span> {formatBudget(spent)}
        </p>
        {outOfBudget > 0 && (
          <p className="negativo">
            <span>Sobrepasado:</span> {formatBudget(outOfBudget)}
          </p>
        )}
      </div>
    </div>
  )
}

export default BudgetControl
