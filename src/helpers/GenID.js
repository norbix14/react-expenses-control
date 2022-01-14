export const randomId = (len = 36) => {
  const random = Math.random().toString(len).substring(2)
  const date = Date.now().toString(len)
  return `${random}${date}`
}
