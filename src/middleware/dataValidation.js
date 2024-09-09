export const validateSchema = (schema) => (request, response, next) => {
  try {
    schema.parse(request.body)
    next()
  } catch ({ issues }) {
    return response.status(400).json(
      issues.map((issue) => {
        return issue.message
      })
    )
  }
}
