import '@fastify/mongodb'
import { FastifyMongoObject } from '@fastify/mongodb'

declare module '@fastify/mongodb' {
  interface FastifyMongoDb {
    collection(arg0: string): import('mongodb').Collection<import('bson').Document>
    mongo: FastifyMongoObject
  }
}
