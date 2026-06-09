import React from 'react'
import ReactDOM from 'react-dom/client'
import { RadialOrbitalTimelineDemo } from './components/ui/radial-orbital-timeline-demo'
import './index.css'

console.log('Orbital Timeline: Mounting script starting...');

const rootElement = document.getElementById('radial-orbital-timeline-root')
if (rootElement) {
  console.log('Orbital Timeline: Root element found, mounting...');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div className="dark">
        <RadialOrbitalTimelineDemo />
      </div>
    </React.StrictMode>,
  )
  console.log('Orbital Timeline: Mount command sent.');
} else {
  console.error('Orbital Timeline: ERROR - Root element not found!');
}
