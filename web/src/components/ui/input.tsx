import type { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  prefix?: string
}

export function Input({ prefix, className, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-md-custom select-none pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        {...props}
        className={` ${prefix ? 'pl-16' : ''} w-full px-4 py-4 gap-2 border border-gray-300 rounded-lg placeholder-gray-400 text-md-custom text-gray-600 focus:border-blue-base focus:ring-1 focus:ring-blue-base focus:outline-none ${className ?? ''}`}
      ></input>
    </div>
  )
}
