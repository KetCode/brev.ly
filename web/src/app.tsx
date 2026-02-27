import { LinkList } from "./components/link-list";
import { Logo } from "./components/logo";
import { NewLink } from "./components/new-link";

export function App() {
	return (
		<main className="flex justify-center overflow-x-hidden min-h-dvh ">
			<div className="w-full max-w-236 px-3 lg:px-4 py-10">
				<div className="flex justify-center lg:justify-start">
					<Logo />
				</div>

				<div className="flex flex-col lg:flex-row gap-6 items-start mt-6 lg:mt-8">
					<div className="w-full max-w-95 mx-auto lg:mx-0 lg:shrink-0">
						<NewLink />
					</div>
					<div className="w-full max-w-95 lg:max-w-140 mx-auto lg:mx-0">
						<LinkList />
					</div>
				</div>
			</div>
		</main>
	);
}
