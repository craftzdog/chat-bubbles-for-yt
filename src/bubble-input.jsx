import React, { useCallback, useState, useRef, useEffect } from 'react'
import './bubble-input.css'
import ContentEditable from './content-editable'
import playAudio from './playAudio'

const BubbleInput = ({ onChange, onSubmit, value }) => {
  const refEditable = useRef()
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback(
    e => {
      onChange && onChange(e.target.value), playAudio(e.target.value, "alphabet")
      
    },
    [onChange]
  )
  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        onSubmit && onSubmit()
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
          window.document.querySelector('.bubble.input > div').focus()
          setSubmitted(false)
        }, 10)
      }
    },
    [onSubmit]
  )
  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable
    if (elDiv) {
      elDiv.focus()
    }
  }, [refEditable])

  useEffect(() => handleBlur(), [handleBlur])

  return (
    <div
      className={`bubble input ${value.length === 0 ? 'empty' : ''} ${
        submitted ? 'submitted' : ''
      }`}
    >
      <ContentEditable
        ref={refEditable}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        value={value}
      />
    </div>
  )
}

export default BubbleInput
