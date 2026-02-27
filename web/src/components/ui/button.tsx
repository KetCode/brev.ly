import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "text-md-custom disabled:opacity-50 disabled:pointer-events-none",

	variants: {
		size: {
			default: "px-4 py-3.5",
			icon: "px-2 py-2",
		},
		variant: {
			primary: "bg-blue-base hover:bg-blue-dark text-white rounded-lg",
			secondary:
				"bg-gray-200 text-gray-500 text-sm-custom font-semibold rounded-sm border border-transparent hover:border-blue-base",
		},
	},

	defaultVariants: {
		size: "default",
		variant: "primary",
	},
});

export function Button({
	size,
	variant,
	className,
	...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
	return (
		<button
			className={buttonVariants({ size, variant, className })}
			{...props}
		/>
	);
}
