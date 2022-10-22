import { FastifyReply, FastifyRequest, HookHandlerDoneFunction, RouteGenericInterface } from 'fastify'

type Area = 'm' | 'i' | 'g' | 'a'
type Method = 'post' | 'get' | 'patch' | 'delete'
type MinLevelRequired = string | 'r' | 'w' | 'a'

interface Ranking {
  [key: string]: number
}
interface Body {
  permissions: Array<string>
}

function hasAccess(area: Area, minLevelRequired: MinLevelRequired, userPermissions: Array<string>) {
  const ranking: Ranking = {
    r: 1,
    w: 2,
    a: 3
  }

  const currentArea: string | undefined = userPermissions.find((permission: string): boolean => {
    return permission.includes(`${area}:`)
  })

  const minRankingRequired: number = ranking[`${minLevelRequired}`]
  let currentPermissionRanking: number = 0

  if (currentArea) {
    const split: string = currentArea?.split(':')[1] ?? 'r'
    currentPermissionRanking = ranking[split]
  }

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
    post: 'a',
    get: 'a',
    patch: 'a',
    delete: 'a'
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
  request: FastifyRequest<{ Body?: Body } | RouteGenericInterface>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
  area: Area,
  method: Method
) {
  const minLevelRequired: MinLevelRequired = areaMinAccess[area][method]

  const userPermissions: Array<string> = request.user.permissions
  if (hasAccess(area, minLevelRequired, userPermissions)) {
    done()
  } else {
    const response: ErrorResponse = { message: 'unauthorised' }
    reply.code(401).send(response)
  }
}
