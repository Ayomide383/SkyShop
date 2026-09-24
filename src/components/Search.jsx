import React from 'react'
import { Search} from 'lucide-react'

const SearchBox = () => {
  return (
    <div className="flex flex-1  max-w-md px-2 py-1 border-2 border-sky-600 rounded space-x-4">
      <label htmlFor="Search"><Search /></label>

      <input
        type="text"
        name="Search"
        id="Search"
        placeholder="Search products..."
        className="focus:outline-0 font-light w-full"
      />
    </div>
  )
}

export default SearchBox