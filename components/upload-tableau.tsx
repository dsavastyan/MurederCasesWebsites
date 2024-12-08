'use client';

import React, { useEffect } from 'react';

const TableauEmbed: React.FC = () => {
  useEffect(() => {
    // Dynamically load the Tableau JS API script
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Tableau Viz once the script has loaded
      const vizDiv = document.getElementById('tableauViz') as HTMLDivElement;
      if (vizDiv) {
        const options = {
          width: '100%',
          height: '100%',
          hideTabs: true,
          hideToolbar: false,
        };
        const vizUrl = 'https://public.tableau.com/views/CourseProjectCourtStatistics2023/Dashboard1';
        
        new window.tableau.Viz(vizDiv, vizUrl, options);
      }
    };

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Tableau Dashboard Example</h1>
      {/* Tableau Embed Container */}
      <div
        id="tableauViz"
        style={{ width: '100%', height: '600px', position: 'relative' }}
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
    </div>
  );
};

export default TableauEmbed;
