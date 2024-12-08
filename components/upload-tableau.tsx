'use client'

import React, { useEffect } from 'react';

const TableauEmbed: React.FC = () => {
  useEffect(() => {
    // Add the Tableau visualization script when the component mounts
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    document.body.appendChild(scriptElement);

    // Adjust the size of the Tableau visualization when the component mounts
    const divElement = document.getElementById('viz1733674899534');
    const vizElement = divElement?.getElementsByTagName('object')[0];
    
    if (divElement && vizElement) {
      if (divElement.offsetWidth > 800) {
        vizElement.style.width = '1366px';
        vizElement.style.height = '795px';
      } else if (divElement.offsetWidth > 500) {
        vizElement.style.width = '1366px';
        vizElement.style.height = '795px';
      } else {
        vizElement.style.width = '100%';
        vizElement.style.height = '1877px';
      }
    }
  }, []);

  return (
    <div>
      <h1>Tableau Dashboard Example</h1>
      {/* Tableau Embed Code */}
      <div className="tableauPlaceholder" id="viz1733674899534" style={{ position: 'relative' }}>
        <noscript>
          <a href="#">
            <img
              alt="Dashboard 1"
              src="https://public.tableau.com/static/images/Co/CourseProjectCourtStatistics2023/Dashboard1/1_rss.png"
              style={{ border: 'none' }}
            />
          </a>
        </noscript>
        <object className="tableauViz" style={{ display: 'none' }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="CourseProjectCourtStatistics2023/Dashboard1" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https://public.tableau.com/static/images/Co/CourseProjectCourtStatistics2023/Dashboard1/1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-GB" />
        </object>
      </div>
    </div>
  );
};

export default TableauEmbed;
