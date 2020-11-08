import "reflect-metadata";
import { createConnection } from "typeorm";
import { DDTLogger } from '../helpers'


export default async () => {
    DDTLogger.log('connecting to db')
    await createConnection()
    DDTLogger.log('DB IS READY.')
}