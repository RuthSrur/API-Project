import { ChangeEvent } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search characters..."
      value={value}
      onChange={handleChange}
    />
  )
}
