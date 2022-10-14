import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

type Area = 'm' | 'i' | 'g' | 'a'
type Method = 'post' | 'get' | 'patch' | 'delete'
type MinLevelRequired = 'r' | 'w' | 'a'

interface Body {
  user: {
    permissions: Array<string>
  }
}
function hasAccess(area: Area, minLevelRequired: MinLevelRequired, userPermissions) {
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

export function checkAuthorisation(
  request: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
  area: Area,
  method: Method
) {
  if (hasAccess(area, areaMinAccess[area][method], request.user.permissions)) {
    done()
  } else {
    const response: ErrorResponse = { message: 'unauthorised' }
    reply.code(401).send(response)
  }
}
