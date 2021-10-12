import React from 'react'
export function Button({ children, className, ...rest }) {
  return (
    <button 
      type="button"

      {...rest}
    >
      {children}
    </button>
  )
}

export function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"

      {...rest}
    >
      {children}
    </button>
  )
}

