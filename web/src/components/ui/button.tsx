import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'text-sm disabled:opacity-50 disabled:pointer-events-none',

  variants: {
    size: {
      default: 'px-4 py-3.5',
      icon: 'px-2 py-2',
    },
    variant: {
      primary: 'bg-[#2C46B1] hover:bg-[#2C4091] text-white rounded-lg',
      secondary:
        'bg-gray-200 text-gray-500 text-xs font-semibold rounded-sm border border-transparent hover:border-[#2C46B1]',
    },
  },

  defaultVariants: {
    size: 'default',
    variant: 'primary',
  },
})

export function Button({
  size,
  variant,
  className,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={buttonVariants({ size, variant, className })}
      {...props}
    />
  )
}
