import { Copy, Trash2 } from 'lucide-react'
import { Button } from './ui/button'

type LinkItemProps = {
  id: string
  url: string
  shortcode: string | null
  accessCount: number
  onDelete: (id: string) => void
  onAccess: (id: string) => void
}

export function LinkItem({
  id,
  url,
  shortcode,
  accessCount,
  onDelete,
  onAccess,
}: LinkItemProps) {
  function copyShortUrl(shortcode: string | null) {
    if (!shortcode) {
      return
    }

    navigator.clipboard.writeText(`http://localhost:5173/${shortcode}`)
  }

  return (
    <div className="flex flex-col items-start gap-3 lg:gap-4 w-full">
      <div className="h-0.5 w-full border-gray-200 border-t" />

      <div className="flex flex-row items-center gap-4 w-full">
        <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
          <a
            href={`/${shortcode}`}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-blue-base text-md-custom truncate"
            onClick={() => onAccess(id)}
          >
            brev.ly/{shortcode}
          </a>
          <span className="text-sm-custom text-gray-500 truncate">{url}</span>
        </div>

        <span className="text-sm-custom text-gray-500 whitespace-nowrap shrink-0">
          {accessCount} acessos
        </span>

        <div className="flex flex-row items-center gap-1 shrink-0">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => copyShortUrl(shortcode)}
            className="px-[0.437rem] py-[0.437rem]"
          >
            <Copy className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onDelete(id)}
            className="px-[0.437rem] py-[0.437rem]"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
