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
      script.src = 'https://public.tableau.com/javascripts/api/tableau-2.9.2.min.js' // Updated version
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
      const vizUrl = 'https://public.tableau.com/views/CourseProjectCourtStatistics2023/Dashboard1?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link'
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
        // Check if Tableau.Viz is a valid constructor
        if (window.tableau.Viz) {
          vizInstanceRef.current = new window.tableau.Viz(containerDiv, vizUrl, options)
        } else {
          console.error('Tableau.Viz is not available.')
        }
      } catch (error) {
        console.error('Error initializing Tableau Viz:', error)
      }
    } else {
      console.error('Tableau script is not loaded or object not found.')
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

  // Load the Tableau script when the component is mounted
  useEffect(() => {
    loadTableauScript().then(initializeViz).catch((error) => console.error(error))
  }, [isScriptLoaded]) // This effect should run when script is loaded

  return (
    <div
      ref={vizRef}
      style={{ width: '100%', height: '600px' }} // Ensure there's a container with a defined height/width
    >
      {/* Tableau viz will be embedded here */}
    </div>
  )
}
