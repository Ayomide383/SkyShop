import React from 'react'

const Categories = () => {
  return (
    <div className="bg-slate-100 rounded-lg flex flex-col items-center justify-between p-3 w-35 h-35">

      {/* Image */}
      <div className="flex items-center justify-center w-full h-24">
        <img
          className="w-full h-full object-contain"
          src="./1.png"
          alt="Category"
        />
      </div>

      {/* Category Name */}
      <h2 className="font-medium">
        Categories
      </h2>

    </div>
  )
}

export default Categories