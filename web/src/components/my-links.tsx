import { Copy, DownloadIcon, Trash2 } from 'lucide-react'
import { Button } from './ui/button'

export function MyLink() {
  return (
    <div className="flex flex-col p-6 md:p-8 gap-4 lg:gap-5 bg-gray-100 rounded-lg w-full md:w-auto">
      <div className="flex flex-row w-full justify-between items-center gap-2">
        <span className="flex items-center font-bold text-xl text-gray-600">
          Meus links
        </span>

        <Button
          className="flex flex-row justify-center items-center px-2 py-2 gap-1.5"
          size="icon"
          variant="secondary"
        >
          <DownloadIcon className="size-4" />
          Baixar CSV
        </Button>
      </div>

      <div className="flex flex-col items-start gap-3 lg:gap-4 w-full">
        <div className="h-0.5 w-full border-gray-200 border-t" />

        <div className="flex flex-row items-center gap-4 w-full">
          <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
            <span className="font-semibold text-blue-base text-sm truncate">
              brev.ly/Portfolio-Dev
            </span>
            <span className="text-xs text-gray-500 truncate">
              devsite.portfolio.com.br/devname-123456
            </span>
          </div>

          <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
            30 acessos
          </span>

          <div className="flex flex-row items-center gap-1 shrink-0">
            <Button
              size="icon"
              variant="secondary"
              className="px-[0.437rem] py-[0.437rem]"
            >
              <Copy className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="px-[0.437rem] py-[0.437rem]"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
