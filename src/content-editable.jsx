import * as React from 'react'

class ContentEditable extends React.Component {
  constructor(props) {
    super(props)
    this.refElement = React.createRef()
  }
  render() {
    return (
      <div
        key={Math.random()}
        ref={this.refElement}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        onKeyDown={this.emitKeyDown}
        contentEditable
        spellCheck="false"
        dangerouslySetInnerHTML={{ __html: this.props.value }}
      ></div>
    )
  }

  shouldComponentUpdate(nextProps) {
    const { current: div } = this.refElement
    return nextProps.value !== div.innerText
  }

  emitChange = () => {
    const { current: div } = this.refElement
    let value = div.innerText
    if (this.props.onChange && value !== this.lastValue) {
      this.props.onChange({
        target: {
          value
        }
      })
    }
    this.lastValue = value
  }

  emitKeyDown = e => {
    const { onKeyDown } = this.props
    onKeyDown && onKeyDown(e)
  }
}

export default ContentEditable
