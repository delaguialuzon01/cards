import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { employees, COMPANY } from '../data/employees'
import Avatar from '../components/Avatar'

const BASE_URL = import.meta.env.VITE_BASE_URL ?? window.location.origin

export default function Home() {
  return (
    <div className="min-h-dvh bg-brand-cream">

      <header className="bg-white border-b border-brand-border px-5 pt-8 pb-6 text-center">
        <img src={COMPANY.logo} alt={COMPANY.name} className="h-8 mx-auto mb-4" />
        <p className="font-serif text-xs text-brand-muted tracking-[0.14em] uppercase">
          Nuestro equipo
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {employees.map((emp) => {
          const cardUrl = `${BASE_URL}/cards/${emp.slug}`
          return (
            <Link key={emp.slug} to={`/cards/${emp.slug}`} className="block group">
              <div className="bg-white rounded-2xl border border-brand-border overflow-hidden transition-shadow group-active:shadow-md">

                <div className="h-1.5 bg-brand-accent" />

                <div className="p-5">
                  <div className="flex gap-4 items-start mb-4">
                    <Avatar
                      photo={emp.photo}
                      initials={emp.initials}
                      className="w-16 h-16 rounded-full border-2 border-brand-border text-xl flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-lg font-semibold text-brand-dark leading-tight mb-1">
                        {emp.name}
                      </p>
                      <p className="text-[11px] text-brand-accent font-medium tracking-[0.07em] uppercase mb-2">
                        {emp.title}
                      </p>
                      {emp.phone && <p className="text-xs text-brand-muted truncate">{emp.phone}</p>}
                      {emp.email && <p className="text-xs text-brand-muted truncate">{emp.email}</p>}
                    </div>
                  </div>

                  <div className="border-t border-brand-border mb-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-brand-muted tracking-[0.07em] uppercase mb-1">
                        Escanear para guardar
                      </p>
                      <p className="text-[11px] text-brand-accent font-medium">Ver tarjeta →</p>
                    </div>
                    <div className="p-1.5 border border-brand-border rounded-lg bg-white">
                      <QRCodeSVG value={cardUrl} size={68} fgColor="#2c2416" bgColor="#ffffff" level="M" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </main>

      <footer className="text-center py-8 text-xs text-brand-muted">
        <a href={COMPANY.website} className="text-brand-accent">
          {COMPANY.website.replace('https://', '')}
        </a>
      </footer>
    </div>
  )
}