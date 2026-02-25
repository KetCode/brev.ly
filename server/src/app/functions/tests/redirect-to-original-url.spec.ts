import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-upload'
import { redirectToOriginalUrl } from '../redirect-to-original-url'

describe('redirect to original url', () => {
  it('should be able to return original url when shortcode exists', async () => {
    const shortcode = randomUUID().slice(0, 6)

    await makeUpload({
      url: 'https://example.com',
      shortcode,
    })

    const sut = await redirectToOriginalUrl({ shortcode })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toBe('https://example.com')
  })

  it('should return InvalidLink error when shortcode not found', async () => {
    const shortcode = randomUUID().slice(0, 6)

    const sut = await redirectToOriginalUrl({ shortcode })

    expect(isRight(sut)).toBe(false)
  })

  it('should increment accessCount after redirect', async () => {
    const shortcode = randomUUID().slice(0, 6)

    await makeUpload({
      url: 'https://example.com',
      shortcode,
    })

    await redirectToOriginalUrl({ shortcode })

    const link = await db
      .select({ accessCount: schema.links.accessCount })
      .from(schema.links)
      .where(eq(schema.links.shortcode, shortcode))
      .limit(1)

    expect(link[0].accessCount).toBe(1)
  })

  it('should increment accessCount multiple times correctly', async () => {
    const shortcode = randomUUID().slice(0, 6)

    await makeUpload({
      url: 'https://example.com',
      shortcode,
    })

    await redirectToOriginalUrl({ shortcode })
    await redirectToOriginalUrl({ shortcode })
    await redirectToOriginalUrl({ shortcode })

    const link = await db
      .select({ accessCount: schema.links.accessCount })
      .from(schema.links)
      .where(eq(schema.links.shortcode, shortcode))
      .limit(1)

    expect(link[0].accessCount).toBe(3)
  })
})
