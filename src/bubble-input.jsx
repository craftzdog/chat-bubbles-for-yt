import React, { useCallback, useState } from 'react'
import './bubble-input.css'
import ContentEditable from './content-editable'

const BubbleInput = ({ onChange, onSubmit, value }) => {
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback(
    e => {
      onChange && onChange(e.target.value)
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
          setSubmitted(false)
        }, 10)
      }
    },
    [onSubmit]
  )

  return (
    <div
      className={`bubble input ${value.length === 0 ? 'empty' : ''} ${
        submitted ? 'submitted' : ''
      }`}
    >
      <ContentEditable
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
    </div>
  )
}

export default BubbleInput
