function hasAccess(area, minLevelRequired, userPermissions) {
  const ranking = {
    r: 1,
    w: 2,
    a: 3
  }

  const currentArea = userPermissions.find(permission => permission.includes(`${area}:`))

  const minRankingRequired = ranking[`${minLevelRequired}`]
  const currentPermissionRanking = ranking[currentArea?.split(':')[1]]

  return currentPermissionRanking >= minRankingRequired
}

// Only admins can create new users, or delete a document
const areaMinAccess = {
  m: {
    get: 'r',
    post: 'w',
    patch: 'w',
    delete: 'a'
  },
  i: {
    post: 'a'
  },
  g: {
    get: 'r',
    post: 'w',
    patch: 'w',
    delete: 'a'
  },
  a: {
    get: 'r',
    post: 'w',
    patch: 'w',
    delete: 'a'
  }
}

export function checkAuthorisation(request, reply, done, area, method) {
  if (hasAccess(area, areaMinAccess[area][method], request.user.permissions)) {
    done()
  } else {
    reply.code(401).send({ message: 'unauthorised' })
  }
}
