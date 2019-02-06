import React, { useState, useEffect } from 'react'

const symbolKeys = {
  ArrowRight: '▶',
  ArrowLeft: '◀',
  ArrowUp: '▲',
  ArrowDown: '▼'
}

const useKeyDebugger = () => {
  const [keys, setKeys] = useState([])

  /* keydown */
  useEffect(
    function() {
      const handleKeyDown = event => {
        setKeys(keys.concat([event.key]))
      }

      window.addEventListener('keydown', handleKeyDown)

      return function cleanup() {
        return window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [keys.length]
  )

  /* keyup with delay */
  useEffect(
    () => {
      let timeout

      const handleKeyUp = event => {
        timeout = setTimeout(() => {
          setKeys([])
        }, 1000)
      }

      window.addEventListener('keyup', handleKeyUp)

      return function cleanup() {
        window.removeEventListener('keyup', handleKeyUp)
        clearTimeout(timeout)
      }
    },
    [keys.length]
  )

  return function(props) {
    if (keys.length) {
      const list = keys.map(key => symbolKeys[key] || key).join(' ')

      return (
        <div style={styles} {...props}>
          {list}
        </div>
      )
    } else return null
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
  color: '#aaa',
  background: '#eff0f2',
  fontSize: '28px',
  borderRadius: '5px',
  borderTop: '1px solid #f5f5f5',
  boxShadow: 'inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9',
  textShadow: '0px 1px 0px #f5f5f5'
}
