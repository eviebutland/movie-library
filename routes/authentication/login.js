export async function authLogin(request, reply) {
  const userCollection = this.mongo.db.collection('users')
  const user = await userCollection.findOne({ email: request.body.username })

  if (user) {
    console.log('user exists', user)
    // check the password matches
    if (request.body.password !== user.password) {
      reply.code(400).send({ message: 'Password is incorrect' })
      return
    }

    // Could set user document active: true and set to false when they logout?
    const signature = this.jwt.sign({ ...user })
    reply.code(200).send({ message: `Successful login, ${user.name}`, code: signature })
  } else {
    reply.code(400).send({ message: 'User does not exist, please create an account' })
  }
}
