'use client'

import React, { useEffect, useRef, useState } from 'react'

// Define the shape of the Tableau Viz instance
interface TableauViz {
  dispose: () => void
  refreshDataAsync: () => Promise<void>
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

  // Function to load the Tableau JS API script
  const loadTableauScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.tableau && window.tableau.Viz) {
        setIsScriptLoaded(true) // Tableau script is already loaded
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
    if (vizRef.current && window.tableau && isScriptLoaded) {
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

  // Handle effect for loading the Tableau script and initializing the Viz
  useEffect(() => {
    loadTableauScript()
      .then(() => {
        initializeViz()
      })
      .catch((error) => {
        console.error('Error loading Tableau script:', error)
      })

    // Cleanup when the component is unmounted
    return () => {
      if (vizInstanceRef.current) {
        vizInstanceRef.current.dispose()
      }
    }
  }, [isScriptLoaded]) // Dependency array to run after script loads

  return (
    <div>
      <div ref={vizRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  )
}
