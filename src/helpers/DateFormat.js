export const dateFormat = (date) => {
  const lang = 'es-ES'
  const opts = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }
  return new Date(date).toLocaleDateString(lang, opts)
}
