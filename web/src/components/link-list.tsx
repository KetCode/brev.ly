import { DownloadIcon, Loader } from 'lucide-react'
import link from '../assets/link.svg'
import { api } from '../lib/axios'
import { exportLink } from '../utils/export-links'
import { LinkItem } from './link-item'
import { Button } from './ui/button'

interface Link {
  id: string
  url: string
  shortcode?: string | null
  accessCount: number
}

interface LinkListProps {
  links: Link[]
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>
  loading: boolean
  creating: boolean
}

export function LinkList({
  links,
  setLinks,
  loading,
  creating,
}: LinkListProps) {
  async function handleDelete(id: string) {
    if (!id) {
      return
    }

    await api.delete(`/links/${id}`, {
      data: {},
    })
    setLinks(prev => prev.filter(link => link.id !== id))
  }

  async function handleAccess(id: string) {
    setLinks(prev =>
      prev.map(link =>
        link.id === id ? { ...link, accessCount: link.accessCount + 1 } : link
      )
    )
  }

  return (
    <div className="relative flex flex-col p-6 md:p-8 gap-4 lg:gap-5 bg-gray-100 rounded-lg w-full md:w-auto overflow-hidden">
      {(loading || creating) && (
        <div className="absolute top-0 left-0 h-0.5 w-40 bg-linear-to-r from-transparent via-blue-base to-transparent animate-border" />
      )}
      <div className="flex flex-row w-full justify-between items-center gap-2">
        <span className="flex items-center font-bold text-lg-custom text-gray-600">
          Meus links
        </span>

        <Button
          className="flex flex-row justify-center items-center px-2 py-2 gap-1.5"
          size="icon"
          variant="secondary"
          onClick={() => exportLink()}
          disabled={!links.length}
        >
          <DownloadIcon className="size-4" />
          Baixar CSV
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-start gap-3 lg:gap-4 w-full">
          <div className="h-0.5 w-full border-gray-200 border-t" />
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center gap-3">
              <Loader className="size-8 animate-spin text-gray-500" />
              <span className="flex items-center text-center uppercase text-xs-custom text-gray-500">
                carregando links...
              </span>
            </div>
          </div>
        </div>
      ) : !links.length ? (
        <div className="flex flex-col items-start gap-3 lg:gap-4 w-full">
          <div className="h-0.5 w-full border-gray-200 border-t" />
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center gap-3">
              <img src={link} alt="link logo" />
              <span className="flex items-center text-center uppercase text-xs-custom text-gray-500">
                ainda não existem links cadastrados
              </span>
            </div>
          </div>
        </div>
      ) : (
        links.map(link => {
          return (
            <LinkItem
              key={link.id}
              id={link.id}
              url={link.url}
              shortcode={link.shortcode ?? null}
              accessCount={link.accessCount}
              onDelete={handleDelete}
              onAccess={handleAccess}
            />
          )
        })
      )}
    </div>
  )
}
