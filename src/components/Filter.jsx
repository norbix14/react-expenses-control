function Filter({ filter, setFilter }) {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="expenses">Filtrar gastos</label>
          <select
            name="category"
            id="expenses"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">
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
      </form>
    </div>
  )
}

export default Filter
