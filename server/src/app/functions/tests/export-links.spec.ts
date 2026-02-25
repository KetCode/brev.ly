import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-upload'
import { exportLinks } from '../export-links'

describe('export links', () => {
  it('should be able to export links', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'https://example.com/file.csv',
        }
      })

    const shortcode = randomUUID().slice(0, 6)

    const upload1 = await makeUpload({ shortcode: `${shortcode}1` })
    const upload2 = await makeUpload({ shortcode: `${shortcode}2` })
    const upload3 = await makeUpload({ shortcode: `${shortcode}3` })
    const upload4 = await makeUpload({ shortcode: `${shortcode}4` })
    const upload5 = await makeUpload({ shortcode: `${shortcode}5` })

    const sut = await exportLinks({
      searchQuery: shortcode,
    })

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      reportUrl: 'https://example.com/file.csv',
    })

    console.log(csvAsArray)

    expect(csvAsArray).toEqual([
      ['ID', 'URL', 'Shortcode', 'Access count', 'Uploaded at'],
      [
        upload1.id,
        upload1.url,
        upload1.shortcode,
        upload1.accessCount.toString(),
        expect.any(String),
      ],
      [
        upload2.id,
        upload2.url,
        upload2.shortcode,
        upload2.accessCount.toString(),
        expect.any(String),
      ],
      [
        upload3.id,
        upload3.url,
        upload3.shortcode,
        upload3.accessCount.toString(),
        expect.any(String),
      ],
      [
        upload4.id,
        upload4.url,
        upload4.shortcode,
        upload4.accessCount.toString(),
        expect.any(String),
      ],
      [
        upload5.id,
        upload5.url,
        upload5.shortcode,
        upload5.accessCount.toString(),
        expect.any(String),
      ],
    ])
  })
})
