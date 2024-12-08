'use client'

import React, { useEffect } from 'react'

export function TableauEmbed() {
  useEffect(() => {
    // Dynamically load the Tableau JS API script
    const script = document.createElement('script')
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Initialize Tableau Viz once the script has loaded
      const vizDiv = document.getElementById('tableauViz') as HTMLDivElement
      if (vizDiv && (window as any).tableau) {
        const options = {
          width: '100%',
          height: '600px',
          hideTabs: true,
          hideToolbar: false,
        }
        const vizUrl = 'https://public.tableau.com/views/CourseProjectCourtStatistics2023/Dashboard1'

        new (window as any).tableau.Viz(vizDiv, vizUrl, options)
      }
    }

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="container">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-lg text-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau Dashboard</h2>
        {/* Tableau Embed Container */}
        <div
          id="tableauViz"
          style={{ width: '100%', height: '600px', position: 'relative' }}
          className="mb-6"
        >
          <noscript>
            <a href="#">
              <img
                alt="Dashboard 1"
                src="https://public.tableau.com/static/images/Co/CourseProjectCourtStatistics2023/Dashboard1/1_rss.png"
                style={{ border: 'none' }}
              />
            </a>
          </noscript>
        </div>
        <div className="mt-5 text-sm text-gray-500">© 2024 Your Website</div>
      </div>
    </div>
  )
}

export default TableauEmbed
