export async function getListAllMovies(request, reply) {
  request.log.info('Some info about the current request')
  return { hello: 'World!' }
}
