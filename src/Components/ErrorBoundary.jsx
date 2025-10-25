import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()
  console.log("Error :",error)
  return (
    <div>
      <p style={{color:"red"}}>{error.message}</p>
    </div>
  )
}

export default ErrorBoundary