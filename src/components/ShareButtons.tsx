import type { Employee } from '../types'
import { COMPANY } from '../data/employees'

function buildVCard(emp: Employee): string {
  return [
    'BEGIN:VCARD', 'VERSION:3.0',
    `FN:${emp.name}`,
    `TITLE:${emp.title}`,
    `ORG:${COMPANY.name}`,
    emp.phone   ? `TEL;TYPE=CELL:${emp.phone}` : '',
    emp.email   ? `EMAIL:${emp.email}`          : '',
    emp.website ? `URL:${emp.website}`          : '',
    'END:VCARD',
  ].filter(Boolean).join('\n')
}

function downloadVCard(emp: Employee): void {
  const blob = new Blob([buildVCard(emp)], { type: 'text/vcard;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = Object.assign(document.createElement('a'), { href: url, download: `${emp.slug}.vcf` })
  a.click()
  URL.revokeObjectURL(url)
}

function shareWhatsApp(emp: Employee, cardUrl: string): void {
  const text = encodeURIComponent(
    `${emp.name} — ${emp.title}\n${COMPANY.name}\n📞 ${emp.phone}\n✉️ ${emp.email}\n🔗 ${cardUrl}`
  )
  window.open(`https://wa.me/?text=${text}`, '_blank')
}

function shareEmail(emp: Employee, cardUrl: string): void {
  const s = encodeURIComponent(`Contacto — ${emp.name} | ${COMPANY.name}`)
  const b = encodeURIComponent(
    `Hola,\n\nTe comparto mi tarjeta de contacto:\n\n${emp.name}\n${emp.title} — ${COMPANY.name}\n\nTeléfono: ${emp.phone}\nEmail: ${emp.email}\nWeb: ${emp.website}\n\nTarjeta digital: ${cardUrl}`
  )
  window.location.href = `mailto:?subject=${s}&body=${b}`
}

interface Props {
  employee: Employee
  cardUrl:  string
}

export default function ShareButtons({ employee: emp, cardUrl }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => downloadVCard(emp)}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-dark text-white text-sm font-medium tracking-wide active:opacity-80 transition-opacity"
      >
        <IconContact /> Añadir a contactos
      </button>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => shareWhatsApp(emp, cardUrl)}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-sm font-medium active:opacity-80 transition-opacity"
        >
          <IconWA /> WhatsApp
        </button>
        <button
          onClick={() => shareEmail(emp, cardUrl)}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-cream text-brand-dark text-sm font-medium border border-brand-border active:opacity-80 transition-opacity"
        >
          <IconMail /> Email
        </button>
      </div>
    </div>
  )
}

function IconContact() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
}
function IconWA() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.553 4.118 1.522 5.85L.057 23.625a.75.75 0 00.918.918l5.775-1.465A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.722 9.722 0 01-4.964-1.361l-.356-.211-3.682.934.955-3.585-.232-.371A9.722 9.722 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
}
function IconMail() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
}