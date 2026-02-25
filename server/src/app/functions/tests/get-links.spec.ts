import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-upload'
import { getLinks } from '../get-links'

describe('get links', () => {
  it('should be able to get the links', async () => {
    const shortcode = randomUUID().slice(0, 6)

    const upload1 = await makeUpload({ shortcode: `${shortcode}1` })
    const upload2 = await makeUpload({ shortcode: `${shortcode}2` })
    const upload3 = await makeUpload({ shortcode: `${shortcode}3` })
    const upload4 = await makeUpload({ shortcode: `${shortcode}4` })
    const upload5 = await makeUpload({ shortcode: `${shortcode}5` })

    const sut = await getLinks({
      searchQuery: shortcode,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id }),
    ])
  })

  it('should be able to get paginated links', async () => {
    const shortcode = randomUUID().slice(0, 6)

    const upload1 = await makeUpload({ shortcode: `${shortcode}1` })
    const upload2 = await makeUpload({ shortcode: `${shortcode}2` })
    const upload3 = await makeUpload({ shortcode: `${shortcode}3` })
    const upload4 = await makeUpload({ shortcode: `${shortcode}4` })
    const upload5 = await makeUpload({ shortcode: `${shortcode}5` })

    let sut = await getLinks({
      searchQuery: shortcode,
      page: 1,
      pageSize: 3,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
    ])

    sut = await getLinks({
      searchQuery: shortcode,
      page: 2,
      pageSize: 3,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id }),
    ])
  })

  it('should be able to get sorted links', async () => {
    const shortcode = randomUUID().slice(0, 6)

    const upload1 = await makeUpload({
      shortcode: `${shortcode}1`,
      createdAt: new Date(),
    })

    const upload2 = await makeUpload({
      shortcode: `${shortcode}2`,
      createdAt: dayjs().subtract(1, 'days').toDate(),
    })

    const upload3 = await makeUpload({
      shortcode: `${shortcode}3`,
      createdAt: dayjs().subtract(2, 'days').toDate(),
    })

    const upload4 = await makeUpload({
      shortcode: `${shortcode}4`,
      createdAt: dayjs().subtract(3, 'days').toDate(),
    })

    const upload5 = await makeUpload({
      shortcode: `${shortcode}5`,
      createdAt: dayjs().subtract(4, 'days').toDate(),
    })

    let sut = await getLinks({
      searchQuery: shortcode,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: upload1.id }),
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload5.id }),
    ])

    sut = await getLinks({
      searchQuery: shortcode,
      sortBy: 'createdAt',
      sortDirection: 'asc',
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id }),
    ])
  })
})
