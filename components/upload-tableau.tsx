'use client'

import React, { useEffect, useRef } from 'react'

// Define the shape of the Tableau Viz instance
interface TableauViz {
  dispose: () => void
  refreshDataAsync: () => Promise<void>
  // Add other Tableau Viz methods if needed
}

declare global {
  interface Window {
    tableau: any
  }
}

export const TableauEmbed: React.FC = () => {
  const vizRef = useRef<HTMLDivElement>(null)
  const vizInstanceRef = useRef<TableauViz | null>(null)

  // Function to dynamically load the Tableau JS API
  const loadTableauScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('tableau-api')) {
        // Script already loaded
        resolve()
        return
      }

      const script = document.createElement('script')
      script.id = 'tableau-api'
      script.src = 'https://public.tableau.com/javascripts/api/tableau-2.min.js'
      script.async = true
      script.onload = () => {
        console.log('Tableau script loaded successfully.')
        resolve()
      }
      script.onerror = () => {
        console.error('Failed to load Tableau script.')
        reject(new Error('Failed to load Tableau script.'))
      }
      document.body.appendChild(script)
    })
  }

  // Function to initialize the Tableau Viz
  const initializeViz = () => {
    if (vizRef.current && window.tableau) {
      const containerDiv = vizRef.current
      const vizUrl = 'https://public.tableau.com/views/CourseProjectCourtStatistics2023/Dashboard1'
      const options = {
        width: containerDiv.offsetWidth,
        height: getVizHeight(containerDiv.offsetWidth),
        hideTabs: true,
        hideToolbar: false,
        onFirstInteractive: () => {
          console.log('Tableau Viz initialized successfully.')
        },
      }

      try {
        vizInstanceRef.current = new window.tableau.Viz(containerDiv, vizUrl, options)
      } catch (error) {
        console.error('Error initializing Tableau Viz:', error)
      }
    } else {
      console.error('Tableau object not found on window.')
    }
  }

  // Function to calculate visualization height based on width
  const getVizHeight = (width: number): number => {
    if (width > 800) {
      return 795
    } else if (width > 500) {
      return 795
    } else {
      return 1877
    }
  }

  // Function to resize the Tableau Viz
  const resizeViz = () => {
    if (vizInstanceRef.current) {
      const containerDiv = vizRef.current
      if (containerDiv) {
        const newWidth = containerDiv.offsetWidth
        const newHeight = getVizHeight(newWidth)
        vizInstanceRef.current.dispose()
        initializeViz()
      }
    }
  }

  useEffect(() => {
    let isMounted = true

    loadTableauScript()
      .then(() => {
        if (isMounted) {
          initializeViz()
        }
      })
      .catch((error) => {
        console.error(error)
      })

    // Add event listener for window resize
    window.addEventListener('resize', resizeViz)

    // Cleanup function
    return () => {
      isMounted = false
      if (vizInstanceRef.current) {
        vizInstanceRef.current.dispose()
        console.log('Tableau Viz disposed.')
      }
      window.removeEventListener('resize', resizeViz)
      const script = document.getElementById('tableau-api')
      if (script && document.body.contains(script)) {
        document.body.removeChild(script)
        console.log('Tableau script removed.')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
