'use client'

import React, { useEffect, useRef, useState } from 'react'

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
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  // Load the Tableau JS API script dynamically
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
        setIsScriptLoaded(true)
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
        height: calculateVizHeight(containerDiv.offsetWidth),
        hideTabs: true,
        hideToolbar: false,
        onFirstInteractive: () => {
          console.log('Tableau Viz initialized successfully.')
        },
      }

      try {
        // Create Tableau Viz instance
        vizInstanceRef.current = new window.tableau.Viz(containerDiv, vizUrl, options)
      } catch (error) {
        console.error('Error initializing Tableau Viz:', error)
      }
    } else {
      console.error('Tableau object not found on window.')
    }
  }

  // Calculate visualization height based on the container width
  const calculateVizHeight = (width: number): number => {
    if (width > 800) {
      return 795
    } else if (width > 500) {
      return 600
    } else {
      return 400
    }
  }

  // Function to resize the Tableau Viz
  const resizeViz = () => {
    if (vizInstanceRef.current && vizRef.current) {
      const newWidth = vizRef.current.offsetWidth
      const newHeight = calculateVizHeight(newWidth)

      // Dispose and reinitialize Viz to apply new dimensions
      vizInstanceRef.current.dispose()
      initializeViz()
    }
  }

  // Load the script and initialize the Viz once the component is mounted
  useEffect(() => {
    let isMounted = true

    loadTableauScript()
      .then(() => {
        if (isMounted && isScriptLoaded) {
          initializeViz()
        }
      })
      .catch((error) => {
        console.error(error)
      })

    // Add event listener for window resize to adjust the Viz size
    window.addEventListener('resize', resizeViz)

    // Cleanup the script and Tableau instance when the component is unmounted
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
  }, [isScriptLoaded]) // Dependency on isScriptLoaded
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
