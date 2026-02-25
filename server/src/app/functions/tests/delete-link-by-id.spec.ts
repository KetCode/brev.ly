import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-upload'
import { deleteLinkById } from '../delete-link-by-id'

describe('delete link by id', () => {
  it('should be able to delete link when ID exists', async () => {
    const shortcode = randomUUID().slice(0, 6)

    const upload = await makeUpload({
      url: 'https://example.com',
      shortcode,
    })

    const sut = await deleteLinkById({ id: upload.id })

    expect(isRight(sut)).toBe(true)

    const link = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, upload.id))
      .limit(1)
    expect(link.length).toBe(0)
  })

  it('should return InvalidLink error when id not found', async () => {
    const nonExistentId = randomUUID()

    const sut = await deleteLinkById({ id: nonExistentId })

    expect(isRight(sut)).toBe(false)
  })
})
