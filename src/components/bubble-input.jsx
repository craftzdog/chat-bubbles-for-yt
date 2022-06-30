import React, { useCallback, useState, useRef, useEffect } from 'react'

const BubbleInput = ({ onChange, onSubmit, value }) => {
  const refEditable = useRef()
  const [submitted, setSubmitted] = useState(false)

  const handleKeyDown = e => {
    const { isComposing } = e.nativeEvent
    if (e.key === 'Enter' && !isComposing) {
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
