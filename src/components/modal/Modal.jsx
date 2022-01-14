import { useState, useEffect } from 'react'
import IconCloseModal from '../../img/cerrar.svg'
import FormModal from './FormModal'

function Modal({ expenseEdit, setModal, setExpenses, setExpenseEdit }) {
  const [animate, setAnimate] = useState(false)
  const timeout = window.setTimeout
  const clear = window.clearTimeout

  let timeridAnimate

  const handleCloseModal = () => {
    setAnimate(false)
    if (Object.keys(expenseEdit).length > 0) {
      setExpenseEdit({})
    }
    timeout(() => setModal(false), 400)
  }

  useEffect(() => {
    timeridAnimate = timeout(() => setAnimate(true), 300)
    return () => {
      clear(timeridAnimate)
    }
  }, [])

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={IconCloseModal}
          alt="cerrar modal"
          title="Cerrar modal"
          onClick={handleCloseModal}
        />
      </div>
      <FormModal
        animate={animate}
        expenseEdit={expenseEdit}
        setExpenses={setExpenses}
        setExpenseEdit={setExpenseEdit}
      />
    </div>
  )
}

export default Modal
