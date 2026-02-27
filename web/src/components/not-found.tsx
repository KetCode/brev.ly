import notFound from "../assets/404.svg";

export function NotFound() {
	return (
		<div className="flex justify-center items-center w-full px-3">
			<div className="flex flex-col justify-center sm:px-12 px-5 sm:py-16 py-12 gap-6 bg-gray-100 rounded-lg w-145">
				<div className="flex justify-center">
					<img src={notFound} alt="404 error" className="w-48.5"></img>
				</div>

				<span className="font-bold text-xl-custom text-[#1F2025] flex items-center justify-center text-center">
					Link não encontrado
				</span>

				<div className="flex items-center gap-1">
					<p className="font-semibold text-md-custom text-center self-stretch text-[#4D505C]">
						O link que você está tentando acessar não existe, foi removido ou é
						uma URL inválida. Saiba mais em{" "}
						<a href="." className="text-blue-base underline">
							brev.ly
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
