import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { DuplicatedShortcode } from '../errors/duplicated-shortcode'
import { uploadLink } from '../upload-link'

describe('upload link', () => {
  it('should be able to upload a link', async () => {
    const shortcode = randomUUID().slice(0, 6)

    const sut = await uploadLink({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      shortcode: shortcode,
    })

    expect(isRight(sut)).toBe(true)

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortcode, shortcode))
    expect(result).toHaveLength(1)
  })

  it('should not be able to upload the same shortcode', async () => {
    const shortcode = 'test'

    const sut = await uploadLink({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      shortcode: shortcode,
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(DuplicatedShortcode)

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortcode, shortcode))
    expect(result).toHaveLength(1)
  })

  it('should generate shortcode when empty string provided', async () => {
    const sut = await uploadLink({
      url: 'https://google.com',
    })

    expect(isRight(sut)).toBe(true)

    const id = (unwrapEither(sut) as { id: string }).id

    const link = await db
      .select({ shortcode: schema.links.shortcode })
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1)
    expect(link[0].shortcode).not.toBe('')
    expect(link[0].shortcode).toMatch(/^[a-zA-Z0-9]{6,}$/)
  })
})
