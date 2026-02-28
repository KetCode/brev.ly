import { type SubmitEvent, useState } from 'react'
import { api } from '../lib/axios'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function NewLink() {
  const [url, setURl] = useState('')
  const [shortcode, setShortcode] = useState('')

  async function createLink(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!url.trim()) {
      return
    }

    await api.post('/links', {
      url,
      shortcode,
    })

    setURl('')
    setShortcode('')
  }

  return (
    <form onSubmit={createLink}>
      <div className="flex flex-col p-6 lg:p-8 gap-5 lg:gap-6 bg-gray-100 rounded-lg w-full lg:w-95">
        <span className="flex items-center font-bold text-lg-custom text-gray-600">
          Novo link
        </span>

        <div className="flex flex-col justify-end items-start gap-4 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="text-xs-custom">LINK ORIGINAL</span>

            <Input
              placeholder="www.exemplo.com.br"
              type="url"
              name="url"
              value={url}
              onChange={event => setURl(event.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <span className="text-xs-custom">LINK ENCURTADO</span>

            <Input
              name="shortcode"
              value={shortcode}
              prefix="brev.ly/"
              onChange={event => setShortcode(event.target.value)}
            />
          </div>
        </div>

        <Button className="w-full">Salvar link</Button>
      </div>
    </form>
  )
}
