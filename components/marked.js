import Tonic from '@socketsupply/tonic'

class MarkedLine extends Tonic {
  keypress (e) {
    if (e.charCode === 13 && !e.shiftKey) {
      const markdown = this.querySelector('blockquote').textContent
      const self = this
      this.reRender(props => ({ ...props, markdown, editor: false })).then(() => {
        self.props.save(self)
      })
    }
  }
  click (e) {
    if (!this.props.editor) {
      const self = this
      this.reRender(props => ({ ...props, editor: true })).then(() => {
        const elem = self.querySelector('blockquote')
        elem.focus()

        var range = document.createRange()
        range.selectNodeContents(elem)
        var sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      })
    }
  }
  render_rendered () {
    let string = this.props.markdown
    if (typeof string === 'function') string = string()
    return this.html(marked.parse(string))
  }
  render_editor () {
    let string = this.props.markdown
    if (typeof string === 'function') string = string()
    return this.html`
      <blockquote class="markdown-editor" contenteditable="true">${string}</blockquote>`
  }
  render () {
    if (this.props.editor) {
      return this.render_editor()
    } else {
      return this.render_rendered()
    }
  }
}

export { MarkedLine }
