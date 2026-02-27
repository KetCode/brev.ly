import logo from '../assets/logo.svg'

export function Logo() {
  return (
    <div className="w-24 h-6 mb-3 md:mb-5">
      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
    </div>
  )
}
