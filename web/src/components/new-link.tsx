import { Button } from './ui/button'

export function NewLink() {
  return (
    <div className="flex flex-col p-6 lg:p-8 gap-5 lg:gap-6 bg-gray-100 rounded-lg w-full lg:w-95">
      <span className="flex items-center font-bold text-xl text-gray-600">
        Novo link
      </span>

      <div className="flex flex-col justify-end items-start gap-4 w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="text-xs">LINK ORIGINAL</span>
          <input
            className="flex flex-row justify-center items-center w-full px-4 py-3.75 gap-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm text-gray-600 focus:border-blue-base focus:ring-1 focus:ring-blue-base focus:outline-none"
            placeholder="www.exemplo.com.br"
          ></input>
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <span className="text-xs">LINK ENCURTADO</span>
          <input
            className="flex flex-row justify-center items-center w-full px-4 py-4 gap-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm text-gray-600 focus:border-blue-base focus:ring-1 focus:ring-blue-base focus:outline-none"
            placeholder="brev.ly/"
          ></input>
        </div>
      </div>

      <Button className="w-full">Salvar link</Button>
    </div>
  )
}
