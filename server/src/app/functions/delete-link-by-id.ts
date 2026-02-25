import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { InvalidLink } from './errors/invalid-link'

const deleteLinkByIdInput = z.object({
  id: z.string(),
})

type DeleteLinkByIdInput = z.input<typeof deleteLinkByIdInput>

export async function deleteLinkById(
  input: DeleteLinkByIdInput
): Promise<Either<InvalidLink, null>> {
  const { id } = deleteLinkByIdInput.parse(input)

  const deleted = await db
    .delete(schema.links)
    .where(eq(schema.links.id, id))
    .returning()

  if (!deleted.length) {
    return makeLeft(new InvalidLink())
  }

  return makeRight(null)
}
