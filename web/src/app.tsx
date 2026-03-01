import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Index } from './pages'
import { NotFound } from './pages/not-found'
import { RedirectPage } from './pages/redirect-page'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
