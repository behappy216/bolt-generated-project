import { NextResponse } from 'next/server'
    import db from '../../db'

    export async function GET() {
      try {
        // Test database connection
        const testQuery = db.prepare('SELECT name FROM sqlite_master WHERE type="table"')
        const tables = testQuery.all()
        
        return NextResponse.json({
          status: 'running',
          database: {
            connected: true,
            tables: tables.map(t => t.name)
          }
        })
      } catch (error) {
        return NextResponse.json(
          { 
            status: 'error',
            error: error.message 
          },
          { status: 500 }
        )
      }
    }
