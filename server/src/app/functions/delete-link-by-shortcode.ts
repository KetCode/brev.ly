import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { InvalidLink } from './errors/invalid-link'

const deleteLinkByShortcodeInput = z.object({
  shortcode: z.string(),
})

type DeleteLinkByShortcodeInput = z.input<typeof deleteLinkByShortcodeInput>

export async function deleteLinkByShortcode(
  input: DeleteLinkByShortcodeInput
): Promise<Either<InvalidLink, null>> {
  const { shortcode } = deleteLinkByShortcodeInput.parse(input)

  const deleted = await db
    .delete(schema.links)
    .where(eq(schema.links.shortcode, shortcode))
    .returning()

  if (!deleted.length) {
    return makeLeft(new InvalidLink())
  }

  return makeRight(null)
}
