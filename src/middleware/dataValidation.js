export const validateSchema = (schema) => (request, response, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    return response.status(400).json({ error })
  }
}
