import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function makeUpload(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const result = await db
    .insert(schema.links)
    .values({
      url: faker.internet.url(),
      shortcode: 'test',
      ...overrides,
    })
    .returning()

  return result[0]
}
