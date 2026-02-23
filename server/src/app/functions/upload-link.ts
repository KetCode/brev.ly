import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { generateBase62 } from '@/app/lib/generate-base62'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { DuplicatedShortcode } from './errors/duplicated-shortcode'
import { ShortcodeGenerationFailed } from './errors/shortcode-generation-failed'

const uploadLinkInput = z.object({
  url: z.url().describe('The original URL to be shortened'),
  shortcode: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Shortcode can only contain letters, numbers, underscores, and hyphens'
    )
    .optional()
    .describe('Optional custom shortcode for the shortened link'),
})

type UploadLinkInput = z.input<typeof uploadLinkInput>

export async function uploadLink(
  input: UploadLinkInput
): Promise<
  Either<DuplicatedShortcode | ShortcodeGenerationFailed, { id: string }>
> {
  const { url, shortcode } = uploadLinkInput.parse(input)

  if (shortcode) {
    const exists = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortcode, shortcode))
      .limit(1)

    if (exists.length > 0) {
      return makeLeft(new DuplicatedShortcode())
    }

    const link = await db
      .insert(schema.links)
      .values({
        url,
        shortcode,
      })
      .returning()

    return makeRight({
      id: link[0].id,
      shortcode,
    })
  }

  let attempts = 0
  const maxAttempts = 10

  while (attempts < maxAttempts) {
    const generatedShortcode = generateBase62()

    const exists = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortcode, generatedShortcode))
      .limit(1)

    if (exists.length === 0) {
      const link = await db
        .insert(schema.links)
        .values({
          url,
          shortcode: generatedShortcode,
        })
        .returning()

      return makeRight({
        id: link[0].id,
        shortcode: generatedShortcode,
      })
    }

    attempts++
  }

  return makeLeft(new ShortcodeGenerationFailed())
}
