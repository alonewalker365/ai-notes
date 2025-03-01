import React from 'react'

const StreamlitComponent = () => {
  return (
    <div className="w-full h-screen">
    <iframe
      src="http://localhost:8501"
      className="w-full h-full border-none"
    />
  </div>
  )
}

export default StreamlitComponent