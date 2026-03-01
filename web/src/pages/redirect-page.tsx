import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Redirect } from '../components/redirect'
import { api } from '../lib/axios'
import { NotFound } from './not-found'

interface Link {
  id: string
  url: string
  shortcode?: string | null
  accessCount: number
}

export function RedirectPage() {
  const { shortcode } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'not_found'>(
    'loading'
  )

  useEffect(() => {
    async function fetch() {
      if (!shortcode) {
        navigate('*', { replace: true })
        return
      }
      const response = await api.get('/links')
      const links: Link[] = response.data.links

      const link = links.find(
        l => l.shortcode?.toLowerCase() === shortcode.toLowerCase()
      )

      if (!link) {
        setStatus('not_found')
        return
      }

      const timer = setTimeout(() => {
        window.location.href = `http://localhost:3333/${link.shortcode}`
      }, 1000)
      return () => clearTimeout(timer)
    }

    fetch()
  }, [shortcode, navigate])

  if (status === 'not_found') {
    return <NotFound />
  }

  return <Redirect />
}
