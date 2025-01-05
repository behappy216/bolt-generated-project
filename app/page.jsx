'use client'
    
    import { useState, useEffect } from 'react'
    
    export default function Home() {
      const [status, setStatus] = useState('checking...')
      const [dbStatus, setDbStatus] = useState(null)
    
      useEffect(() => {
        const checkStatus = async () => {
          try {
            const response = await fetch('/api/status')
            const data = await response.json()
            setStatus(data.status)
            setDbStatus(data.database)
          } catch (error) {
            setStatus('error')
          }
        }
        
        checkStatus()
      }, [])
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">RSS Subscription Tool</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">System Status</h2>
            <div className="space-y-2">
              <p>Application: <span className="font-medium">{status}</span></p>
              {dbStatus && (
                <>
                  <p>Database: <span className="font-medium">Connected</span></p>
                  <p>Tables: <span className="font-medium">{dbStatus.tables.join(', ')}</span></p>
                </>
              )}
            </div>
          </div>
          
          {/* Rest of your form and UI */}
        </div>
      )
    }
