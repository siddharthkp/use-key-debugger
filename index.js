import React, { useState, useEffect } from 'react'

const symbolKeys = {
  ArrowRight: '▶',
  ArrowLeft: '◀',
  ArrowUp: '▲',
  ArrowDown: '▼'
}

const useKeyDebugger = () => {
  const [key, setKey] = useState(null)

  function callback(event = {}) {
    setKey(symbolKeys[event.key] || event.key)
  }

  function reset() {
    setKey(null)
  }

  useEffect(
    function() {
      window.addEventListener('keydown', callback)
      const timeout = window.setTimeout(reset, 500)

      return function cleanup() {
        window.clearTimeout(timeout)
        return window.removeEventListener('keydown', callback)
      }
    },
    [key]
  )

  return function(props) {
    if (key)
      return (
        <div style={styles} {...props}>
          {key}
        </div>
      )
    else return null
  }
}

export default useKeyDebugger

const styles = {
  position: 'fixed',
  top: '30px',
  right: '30px',
  minHeight: '50px',
  minWidth: '50px',
  padding: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  background: '#777',
  opacity: 0.4,
  fontSize: '28px',
  borderRadius: '5px'
}
