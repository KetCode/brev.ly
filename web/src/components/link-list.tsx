import { DownloadIcon } from "lucide-react";
import { LinkItem } from "./link-item";
import { Button } from "./ui/button";

export function LinkList() {
	return (
		<div className="flex flex-col p-6 md:p-8 gap-4 lg:gap-5 bg-gray-100 rounded-lg w-full md:w-auto">
			<div className="flex flex-row w-full justify-between items-center gap-2">
				<span className="flex items-center font-bold text-lg-custom text-gray-600">
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

			<LinkItem />
			<LinkItem />
			<LinkItem />
			<LinkItem />
			<LinkItem />
			<LinkItem />
		</div>
	);
}
