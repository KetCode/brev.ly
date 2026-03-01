import { AlertTriangleIcon } from 'lucide-react'
import { type SyntheticEvent, useState } from 'react'
import { api } from '../lib/axios'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface NewLinkProps {
  onAdd: (link: {
    id: string
    url: string
    shortcode?: string | null
    accessCount: number
  }) => void
}

export function NewLink({ onAdd }: NewLinkProps) {
  const [url, setURL] = useState('')
  const [shortcode, setShortcode] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<{ url?: string }>({})

  const validate = () => {
    const newErrors: { url?: string } = {}

    if (!url.trim()) {
      newErrors.url = 'Informe uma url válida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function createLink(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validate()) return

    setIsSaving(true)

    await api
      .post('/links', {
        url,
        shortcode,
      })
      .then(response => {
        onAdd({ id: response.data.id, url, shortcode, accessCount: 0 })

        setURL('')
        setShortcode('')
        setErrors({})
      })
      .finally(() => setIsSaving(false))
  }

  return (
    <form onSubmit={createLink}>
      <div className="flex flex-col p-6 lg:p-8 gap-5 lg:gap-6 bg-gray-100 rounded-lg w-full lg:w-95">
        <span className="flex items-center font-bold text-lg-custom text-gray-600">
          Novo link
        </span>

        <div className="flex flex-col justify-end items-start gap-4 w-full">
          <div className="flex flex-col items-start gap-2 w-full group/url">
            <span
              className={`text-xs-custom ${errors.url ? 'text-danger font-bold' : 'group-focus-within/url:text-blue-base group-focus-within/url:font-bold'}`}
            >
              LINK ORIGINAL
            </span>

            <Input
              placeholder="www.exemplo.com.br"
              type="url"
              name="url"
              value={url}
              className={`${errors.url ? '!border-danger ring-1 ring-danger focus:border-danger focus:ring-danger' : 'border-gray-300'}`}
              onChange={event => {
                setURL(event.target.value)

                if (errors.url) {
                  const isValid = /^https?:\/\//i.test(event.target.value)

                  if (isValid) {
                    setErrors(prev => ({ ...prev, url: undefined }))
                  }
                }
              }}
            />

            {errors.url && (
              <div className="flex flex-row items-center gap-2 text-danger">
                <AlertTriangleIcon size={16} />
                <p className="text-gray-500 text-sm-custom self-stretch">
                  {errors.url}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 w-full group/shortcode">
            <span className="text-xs-custom group-focus-within/shortcode:text-blue-base group-focus-within/shortcode:font-bold">
              LINK ENCURTADO
            </span>

            <Input
              name="shortcode"
              value={shortcode}
              prefix="brev.ly/"
              onChange={event => setShortcode(event.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSaving}>
          Salvar link
        </Button>
      </div>
    </form>
  )
}
