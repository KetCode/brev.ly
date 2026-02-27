import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function NewLink() {
	return (
		<div className="flex flex-col p-6 lg:p-8 gap-5 lg:gap-6 bg-gray-100 rounded-lg w-full lg:w-95">
			<span className="flex items-center font-bold text-lg-custom text-gray-600">
				Novo link
			</span>

			<div className="flex flex-col justify-end items-start gap-4 w-full">
				<div className="flex flex-col items-start gap-2 w-full">
					<span className="text-xs-custom">LINK ORIGINAL</span>

					<Input placeholder="www.exemplo.com.br" />
				</div>

				<div className="flex flex-col items-start gap-2 w-full">
					<span className="text-xs-custom">LINK ENCURTADO</span>

					<Input placeholder="brev.ly/" />
				</div>
			</div>

			<Button className="w-full">Salvar link</Button>
		</div>
	);
}
