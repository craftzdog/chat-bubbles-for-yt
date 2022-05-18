import React, { useCallback, useState, useRef, useEffect } from 'react'
import './bubble-input.css'

const BubbleInput = ({ onChange, onSubmit, value }) => {
  const refEditable = useRef()
  const [submitted, setSubmitted] = useState(false)

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onSubmit && onSubmit()
      e.preventDefault()
      setSubmitted(true)
      setTimeout(() => {
        refEditable.current.focus()
        refEditable.current.innerText = ''
        setSubmitted(false)
      }, 10)
    }
  }
  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable
    if (elDiv) {
      elDiv.focus()
    }
  }, [refEditable])

  useEffect(handleBlur, [handleBlur])

  return (
    <div
      ref={refEditable}
      className={`bubble input ${value.length === 0 ? 'empty' : ''} ${
        submitted ? 'submitted' : ''
      }`}
      contentEditable
      spellCheck="false"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onInput={e => onChange(e.target.innerText)}
    />
  )
}

export default BubbleInput
