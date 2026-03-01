import { useEffect, useState } from 'react'
import { LinkList } from '../components/link-list'
import { Logo } from '../components/logo'
import { NewLink } from '../components/new-link'
import { api } from '../lib/axios'

interface Link {
  id: string
  url: string
  shortcode?: string | null
  accessCount: number
}

export function Index() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    api
      .get('/links')
      .then(response => setLinks(response.data.links))
      .finally(() => setLoading(false))
  }, [])

  function addLink(newLink: Link) {
    setLinks(prev => [newLink, ...prev])
  }

  return (
    <main className="flex justify-center overflow-x-hidden min-h-dvh ">
      <div className="w-full max-w-236 px-3 lg:px-4 py-10">
        <div className="flex justify-center lg:justify-start">
          <Logo />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start mt-6 lg:mt-8">
          <div className="w-full max-w-95 mx-auto lg:mx-0 lg:shrink-0">
            <NewLink onAdd={addLink} setCreating={setCreating} />
          </div>
          <div className="w-full max-w-95 lg:max-w-140 mx-auto lg:mx-0">
            <LinkList
              links={links}
              setLinks={setLinks}
              loading={loading}
              creating={creating}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
