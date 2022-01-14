import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { dateFormat } from '../../helpers/DateFormat'
import IconSave from '../../img/icons/icono_ahorro.svg'
import IconFood from '../../img/icons/icono_comida.svg'
import IconHome from '../../img/icons/icono_casa.svg'
import IconHobbie from '../../img/icons/icono_ocio.svg'
import IconHealth from '../../img/icons/icono_salud.svg'
import IconSubs from '../../img/icons/icono_suscripciones.svg'
import IconOthers from '../../img/icons/icono_gastos.svg'

const icons = {
  save: IconSave,
  food: IconFood,
  home: IconHome,
  hobbie: IconHobbie,
  health: IconHealth,
  subscription: IconSubs,
  others: IconOthers,
}

function Expense({ expense, setExpenses, setExpenseEdit }) {
  const { name, ammount, category, date, id } = expense

  const handleEdit = () => setExpenseEdit(expense)

  const handleDelete = () => {
    const deleteExpense = confirm('¿Eliminar gasto?')
    if (deleteExpense) {
      setExpenses((prev) => {
        return prev.filter((exp) => exp.id !== id)
      })
    }
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={handleEdit}>Editar</SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={handleDelete}>Eliminar</SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={icons[category]} alt="icono categoria" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{dateFormat(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${ammount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense
