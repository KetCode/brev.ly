import logoIcon from "../assets/logo-icon.svg";

export function Redirect() {
	return (
		<div className="flex justify-center items-center w-full px-3">
			<div className="flex flex-col justify-center sm:px-12 px-5 sm:py-16 py-12 gap-6 bg-gray-100 rounded-lg w-145">
				<div className="flex justify-center">
					<img src={logoIcon} alt="404 error" className="w-12 h-12"></img>
				</div>

				<span className="font-bold text-xl-custom text-[#1F2025] flex items-center justify-center text-center">
					Redirecionando...
				</span>

				<div className="flex flex-col items-center gap-1">
					<p className="font-semibold text-md-custom text-center self-stretch text-[#4D505C]">
						O link será aberto automaticamente em alguns instantes.
					</p>
					<p className="font-semibold text-md-custom text-center self-stretch text-[#4D505C]">
						Não foi redirecionado?{" "}
						<a href="." className="text-blue-base underline">
							Acesse aqui
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
