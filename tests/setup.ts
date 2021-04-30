import { dbConfig } from '../src/config/db'

beforeAll(async () => {
  await dbConfig.sync()
})

beforeEach(async () => {
  await dbConfig.truncate()
})
