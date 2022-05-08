import * as React from 'react'

class ContentEditable extends React.Component {
  constructor(props) {
    super(props)

    this.refElement = React.createRef()
  }

  render() {
    return (
      <div
        ref={this.refElement}
        onInput={this.emitChange}
        onBlur={this.onBlur}
        onKeyDown={this.emitKeyDown}
        contentEditable
        spellCheck="false"
      ></div>
    )
  }

  shouldComponentUpdate(nextProps) {
    const { current: div } = this.refElement

    return nextProps.value !== div.textContent
  }

  componentDidUpdate() {
    const { current: div } = this.refElement

    if (div.textContent !== this.props.value) {
      div.textContent = this.props.value
    }
  }

  componentDidMount() {
    this.focus()
  }

  emitChange = () => {
    const { current: div } = this.refElement
    const value = div.textContent

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

  focus = () => {
    setTimeout(() => {
      this.refElement.current.focus()
    }, 0)
  }

  onBlur = () => {
    this.focus()
  }
}

export default ContentEditable
