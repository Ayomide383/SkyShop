import React, { useState } from 'react'
import SearchBox from './Search.jsx'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b-2 border-sky-600 px-4">

      <header className="bg-white py-2.5">

        
        <div className="flex items-center justify-between">

          
          <div className="text-2xl italic font-extrabold text-sky-600">
            NewLogo
          </div>

        
          <div className="hidden md:block">
            <SearchBox />
          </div>

          
          <nav className="hidden md:flex space-x-4">
            <a href="/" className="font-light italic hover:text-sky-600">
              Home
            </a>

            <a href="#" className="font-light italic hover:text-sky-600">
              Shop
            </a>

            <a href="#" className="font-light italic hover:text-sky-600">
              Categories
            </a>
            <a href="#" className="font-light italic hover:text-sky-600">
              Deals
            </a>
            <a href="#" className="font-light italic hover:text-sky-600">
              About Us
            </a>
          </nav>

    <div className="hidden md:flex items-center gap-4">
  <User className="cursor-pointer" />
  <ShoppingCart className="cursor-pointer" />
</div>

          
         <button
  type="button"
  className="md:hidden cursor-pointer"
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? <X /> : <Menu />}
</button>

        </div>

        
        <div className="mt-3 md:hidden">
          <SearchBox />
        </div>

      </header>

      
      {isOpen && (
        <div className="md:hidden">

          <nav className="flex flex-col items-center space-y-4 border-t-2 border-sky-200 py-6">

            <a href="/" className="font-light italic hover:text-sky-600">
              Home
            </a>

            <a href="#" className="font-light italic hover:text-sky-600">
              Shop
            </a>

            <a href="#" className="font-light italic hover:text-sky-600">
              Categories
            </a>

          </nav>

        </div>
      )}

    </div>
  )
}

export default Navbar