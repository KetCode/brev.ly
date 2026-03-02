import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-upload'
import { deleteLinkByShortcode } from '../delete-link-by-shortcode'

describe('delete link by shortcode', () => {
  it('should be able to delete link', async () => {
    const shortcode = randomUUID().slice(0, 6)

    await makeUpload({
      url: 'https://example.com',
      shortcode,
    })

    const sut = await deleteLinkByShortcode({ shortcode })

    expect(isRight(sut)).toBe(true)

    const link = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortcode, shortcode))
      .limit(1)
    expect(link.length).toBe(0)
  })

  it('should return InvalidLink error when shortcode not found', async () => {
    const nonExistentShortcode = randomUUID()

    const sut = await deleteLinkByShortcode({ shortcode: nonExistentShortcode })

    expect(isRight(sut)).toBe(false)
  })
})
