import Tonic from '@socketsupply/tonic'

class ObjectLine extends Tonic {
  keypress (e) {
    const self = this
    if (e.charCode === 13 && !e.shiftKey) {
      const json = this.querySelector('blockquote').textContent
      console.log({json})
      const self = this
      this.reRender(props => ({ ...props, json, editor: false })).then(() => {
        self.props.save(self)
      })
    }
  }
  render_editor () {
    return this.html`<blockquote class="markdown-editor" contenteditable="true">${this.props.json}</blockquote>`
  }
  render () {
    if (this.props.command) {
      const cmd = this.props.command
      let json
      if (cmd.length > '/object '.length) {
        if (cmd === '/object') json = '{}'
        if (cmd === '/object ') json = '{}'
      } else {
        json = cmd.slice('/object '.length)
      }
      if (json === '') json = '{}'

      this.props.json = json
      this.props.command = null
      return this.render_editor()
    }
    if (this.props.editor) return this.render_editor()

    const str = JSON.stringify(this.props.json, null, 2)
    const markdown = () => '```json\n' + str + '\n```'
    return this.html`<marked-line markdown=${markdown}></marked-line>`
  }
}

export { ObjectLine }
