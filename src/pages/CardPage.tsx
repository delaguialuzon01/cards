import { useParams, Link, Navigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { employees, COMPANY } from '../data/employees'
import Avatar from '../components/Avatar'
import ShareButtons from '../components/ShareButtons'

const BASE_URL = import.meta.env.VITE_BASE_URL ?? window.location.origin

export default function CardPage() {
  const { slug } = useParams<{ slug: string }>()
  const emp = employees.find((e) => e.slug === slug)
  if (!emp) return <Navigate to="/" replace />

  const cardUrl = `${BASE_URL}/cards/${emp.slug}`

  return (
    <div className="min-h-dvh bg-brand-cream flex flex-col">

      <div className="px-5 pt-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-brand-muted font-medium">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Equipo
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-4 pb-10 w-full max-w-sm mx-auto gap-3">

        {/* Carte principale */}
        <div className="w-full bg-white rounded-2xl border border-brand-border overflow-hidden">
          <div className="bg-brand-dark px-6 pt-8 pb-6 flex flex-col items-center text-center">
            <img
              src={COMPANY.logo} alt={COMPANY.name}
              className="h-7 mb-7 opacity-90" style={{ filter: 'invert(1)' }}
            />
            <Avatar
              photo={emp.photo}
              initials={emp.initials}
              className="w-24 h-24 rounded-full border-2 border-white/20 text-3xl mb-4"
            />
            <h1 className="font-serif text-2xl font-semibold text-white leading-tight mb-1.5">
              {emp.name}
            </h1>
            <p className="text-[11px] text-brand-accent font-medium tracking-[0.1em] uppercase">
              {emp.title}
            </p>
          </div>

          <div className="px-6 py-2">
            {emp.phone && (
              <ContactRow href={`tel:${emp.phone.replace(/\s/g, '')}`} icon={<IconPhone />}>
                {emp.phone}
              </ContactRow>
            )}
            {emp.email && (
              <ContactRow href={`mailto:${emp.email}`} icon={<IconMail />}>
                {emp.email}
              </ContactRow>
            )}
            {emp.website && (
              <ContactRow href={emp.website} icon={<IconWeb />} last>
                {emp.website.replace('https://', '')}
              </ContactRow>
            )}
          </div>
        </div>

        {/* Partage */}
        <div className="w-full bg-white rounded-2xl border border-brand-border p-5">
          <p className="text-[10px] text-brand-muted tracking-[0.1em] uppercase font-medium mb-3">
            Compartir tarjeta
          </p>
          <ShareButtons employee={emp} cardUrl={cardUrl} />
        </div>

        {/* QR */}
        <div className="w-full bg-white rounded-2xl border border-brand-border p-5 text-center">
          <p className="text-[10px] text-brand-muted tracking-[0.1em] uppercase font-medium mb-4">
            Código QR
          </p>
          <div className="inline-flex p-3 border border-brand-border rounded-xl">
            <QRCodeSVG
              value={cardUrl}
              size={156}
              fgColor="#2c2416"
              bgColor="#ffffff"
              level="M"
              imageSettings={{ src: COMPANY.logo, height: 26, width: 26, excavate: true }}
            />
          </div>
          <p className="text-xs text-brand-muted mt-3">
            Apunta la cámara para abrir esta tarjeta
          </p>
        </div>

        <p className="text-xs text-brand-muted text-center mt-1">
          <a href={COMPANY.website} className="text-brand-accent">{COMPANY.name}</a>
        </p>
      </div>
    </div>
  )
}

interface RowProps {
  href:      string
  icon:      React.ReactNode
  children:  React.ReactNode
  last?:     boolean
}

function ContactRow({ href, icon, children, last }: RowProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className={`flex items-center gap-3.5 py-3.5 ${last ? '' : 'border-b border-brand-border'} active:opacity-60 transition-opacity`}
    >
      <span className="w-9 h-9 rounded-xl bg-brand-cream border border-brand-border flex items-center justify-center text-brand-accent flex-shrink-0">
        {icon}
      </span>
      <span className="text-sm text-brand-dark truncate flex-1">{children}</span>
      <svg className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </a>
  )
}

function IconPhone() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>
}
function IconMail() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
}
function IconWeb() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
}