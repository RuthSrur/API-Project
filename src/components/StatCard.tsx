interface StatCardProps {
  label: string
  value: number
  variant?: 'alive' | 'dead' | 'unknown'
  percent?: number
  isSmall?: boolean
}

export default function StatCard({ label, value, variant, percent, isSmall }: StatCardProps) {
  return (
    <div className={`stat-card ${variant ? `stat-card-${variant}` : ''} ${isSmall ? 'stat-card-small' : ''}`}>
      <p className="stat-label">{label}</p>
      <p className={`stat-value ${isSmall ? 'stat-value-small' : ''}`}>{value}</p>
      {percent !== undefined && <p className="stat-percent">{percent}%</p>}
    </div>
  )
}
