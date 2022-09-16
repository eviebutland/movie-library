// create a new user
// set up permissions

// user who:
// 1. can only view
// 2. can do all (create/read/update/delete)
// 3. partial access (movies + genre collection: (create/read/update/delete), view only: actors)

export async function createUser(request, reply) {
  // check they don't exist in DB already
  const userCollection = this.mongo.db.collection('users')

  const matchingUser = await userCollection.findOne({ email: request.body.email })

  console.log(matchingUser)
  if (matchingUser) {
    reply.code(400).send({ message: `User with email: ${request.body.email} already exists` })
  } else {
    // create a new user
  }
}
