import type { ComponentProps } from "react";

export function Input(props: ComponentProps<"input">) {
	return (
		<input
			{...props}
			className={`flex flex-row justify-center items-center w-full px-4 py-4 gap-2 border border-gray-300 rounded-lg placeholder-gray-400 text-md-custom text-gray-600 focus:border-blue-base focus:ring-1 focus:ring-blue-base focus:outline-none ${props.className ?? ""}`}
		></input>
	);
}
