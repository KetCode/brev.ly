import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Index } from './pages'
import { NotFound } from './pages/not-found'
import { RedirectPage } from './pages/redirect-page'

export function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" duration={4000} richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
