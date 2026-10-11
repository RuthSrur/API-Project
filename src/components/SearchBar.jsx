export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="חפש דמות..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
