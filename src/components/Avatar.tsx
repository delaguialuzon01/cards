import { useState } from 'react'

interface Props {
  photo:     string | null
  initials:  string
  className?: string
}

export default function Avatar({ photo, initials, className = '' }: Props) {
  const [error, setError] = useState(false)

  if (photo && !error) {
    return (
      <img
        src={photo}
        alt={initials}
        onError={() => setError(true)}
        className={`object-cover ${className}`}
      />
    )
  }

  return (
    <div className={`flex items-center justify-center bg-brand-accent text-white font-serif font-medium tracking-wider ${className}`}>
      {initials}
    </div>
  )
}