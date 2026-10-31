import StatCard from '../components/StatCard'
import { countByStatus, countBySpecies } from '../utils/characters'
import { Character } from '../types'

interface StatsPageProps {
  characters: Character[]
  loading: boolean
  error: string | null
}

export default function StatsPage({ characters, loading, error }: StatsPageProps) {
  const statusCounts = countByStatus(characters)
  const speciesCounts = countBySpecies(characters)
  const totalCount = characters.length

  return (
    <main className="app">
      {loading && <p>Loading statistics...</p>}
      {error && <p className="error-message">Failed to load data. Please try again.</p>}
      {!loading && !error && (
        <div className="stats-page-container">
          <h2 className="stats-section-title">Statistics</h2>

          <section className="stats-section">
            <h3 className="stats-subsection-heading">Total Characters</h3>
            <div className="stats-grid">
              <StatCard key="total" label="Total" value={totalCount} />
            </div>
          </section>

          <section className="stats-section">
            <h3 className="stats-subsection-heading">By Status</h3>
            <div className="stats-grid">
              <StatCard key="alive" label="Alive" value={statusCounts.Alive} />
              <StatCard key="dead" label="Dead" value={statusCounts.Dead} />
              <StatCard key="unknown" label="Unknown" value={statusCounts.unknown} />
            </div>
          </section>

          <section>
            <h3 className="stats-subsection-heading">By Species</h3>
            <div className="stats-grid">
              {Object.entries(speciesCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([species, count]) => (
                  <StatCard key={species} label={species} value={count} />
                ))}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
