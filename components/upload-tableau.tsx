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

  // Load the Tableau JS API script dynamically
  const loadTableauScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('tableau-api')) {
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
    } else {
      console.error('Tableau object not found on window or script not loaded.')
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
    if (vizInstanceRef.current) {
      const containerDiv = vizRef.current
      const options = {
        width: containerDiv?.offsetWidth ?? 0,
        height: calculateVizHeight(containerDiv?.offsetWidth ?? 0),
      }
      vizInstanceRef.current.dispose() // Dispose of the old viz
      vizInstanceRef.current = new window.tableau.Viz(containerDiv!, 'https://public.tableau.com/views/CourseProjectCourtStatistics2023/Dashboard1', options)
    }
  }

  // Effect to load Tableau script and initialize the viz
  useEffect(() => {
    loadTableauScript().then(() => {
      initializeViz()
    })
    window.addEventListener('resize', resizeViz)
    
    // Cleanup on unmount
    return () => {
      if (vizInstanceRef.current) {
        vizInstanceRef.current.dispose()
      }
      window.removeEventListener('resize', resizeViz)
    }
  }, [isScriptLoaded])

  return <div ref={vizRef} style={{ width: '100%', height: '100%' }} />
}
