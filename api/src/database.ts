import {createConnection, getConnectionOptions} from 'typeorm'

export async function connect() {
  const options = await getConnectionOptions()
  return createConnection(options)
}
