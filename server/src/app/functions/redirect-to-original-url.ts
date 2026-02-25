import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { InvalidLink } from './errors/invalid-link'

const redirectToOriginalUrlInput = z.object({
  shortcode: z.string(),
})

type RedirectToOriginalUrlInput = z.input<typeof redirectToOriginalUrlInput>

export async function redirectToOriginalUrl(
  input: RedirectToOriginalUrlInput
): Promise<Either<InvalidLink, string>> {
  const { shortcode } = redirectToOriginalUrlInput.parse(input)

  const link = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortcode, shortcode))
    .limit(1)

  if (!link || link.length === 0) {
    return makeLeft(new InvalidLink())
  }

  await db
    .update(schema.links)
    .set({ accessCount: sql`${schema.links.accessCount} + 1` })
    .where(eq(schema.links.shortcode, shortcode))

  return makeRight(link[0].url)
}
