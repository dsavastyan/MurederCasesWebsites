'use client'

import React, { useEffect, useRef } from 'react'

export function TableauEmbed() {
  const vizRef = useRef<HTMLDivElement>(null)
  const vizInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically load the Tableau JS API script
    const script = document.createElement('script')
    script.src = 'https://public.tableau.com/javascripts/api/tableau-2.min.js' // Corrected URL
    script.async = true
    script.onload = () => {
      console.log('Tableau script loaded successfully.')

      if (vizRef.current && (window as any).tableau) {
        const options = {
          width: '100%',
          height: '600px',
          hideTabs: true,
          hideToolbar: false,
        }
        const vizUrl = 'https://public.tableau.com/views/CourseProjectCourtStatistics2023/Dashboard1?:embed=y&:display_count=y&:origin=viz_share_link'

        try {
          vizInstanceRef.current = new (window as any).tableau.Viz(vizRef.current, vizUrl, options)
          console.log('Tableau Viz initialized successfully.')
        } catch (error) {
          console.error('Error initializing Tableau Viz:', error)
        }
      } else {
        console.error('Tableau object not found on window.')
      }
    }

    script.onerror = () => {
      console.error('Failed to load Tableau script.')
    }

    document.body.appendChild(script)

    // Cleanup the script and viz when the component unmounts
    return () => {
      if (vizInstanceRef.current) {
        vizInstanceRef.current.dispose()
        console.log('Tableau Viz disposed.')
      }
      document.body.removeChild(script)
      console.log('Tableau script removed.')
    }
  }, [])

  return (
    <div className="container">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-lg text-center transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau Dashboard</h2>
        {/* Tableau Embed Container */}
        <div
          ref={vizRef}
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
