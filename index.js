import React, { useState, useEffect } from 'react'

const symbolKeys = {
  ArrowRight: '▶',
  ArrowLeft: '◀',
  ArrowUp: '▲',
  ArrowDown: '▼'
}

const styles = {
  minHeight: '50px',
  minWidth: '50px',
  marginRight: '10px',
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
const wrapperStyle = {
  position: 'fixed',
  top: '30px',
  right: '30px',
  display: 'flex'
}
const useKeyDebugger = () => {
  const [key, setKey] = useState([])

  function onKeyDown(event = {}) {
    const tempkey = JSON.parse(JSON.stringify(key))
    const currentKey = symbolKeys[event.key] || event.key
    if (!event.repeat) {
      tempkey.push(currentKey)
      setKey(tempkey)
    }
  }

  function onKeyUp(event = {}) {
    let tempkey = JSON.parse(JSON.stringify(key))
    const currentKey = symbolKeys[event.key] || event.key
    tempkey = tempkey.filter(val => val !== currentKey)
    setKey(tempkey)
  }

  function reset() {
    setKey([])
  }

  useEffect(
    function() {
      window.addEventListener('keydown', onKeyDown)
      const timeout = window.setTimeout(reset, 500)

      return function cleanup() {
        window.clearTimeout(timeout)
        return window.removeEventListener('keydown', onKeyDown)
      }
    },
    [key.length]
  )

  useEffect(
    function() {
      window.addEventListener('keyup', onKeyUp)
      return function cleanup() {
        return window.removeEventListener('keyup', onKeyUp)
      }
    },
    [key.length]
  )

  return function(props) {
    return key.length ? (
      <div style={wrapperStyle}>
        {key.map((k, index) => {
          return (
            <div style={styles} {...props} key={k}>
              {k}
            </div>
          )
        })}
      </div>
    ) : null
  }
}

export default useKeyDebugger
