import Tonic from '@socketsupply/tonic'
import bundle from '@socketsupply/components'
import * as MarkedComponents from './marked.js'
import * as ObjectComponents from './objects.js'
import * as MediaVectorComponents from './media-vector.js'
import * as MyComponents from './my.js'

bundle(Tonic)

/* components */

class NewLine extends Tonic {
  run_command (command) {
    const offset = command.indexOf(' ')
    const name = command.slice(1, offset === -1 ? command.length : offset)
    const elem = this.html`<${name}-line command=${command}></${name}-line>`
    this.props.addrow(elem)

    // after success, clear command
    this.querySelector('blockquote').textContent = ''
  }
  keypress (e) {
    if (e.charCode === 13 && !e.shiftKey) {
      const markdown = this.querySelector('blockquote').textContent
      if (markdown.startsWith('/')) {
        return this.run_command(markdown)
      } else {
        this.props.addrow(this.html`<marked-line markdown=${markdown}></marked_line>`)
        this.querySelector('blockquote').textContent = ''
      }
    }
  }
  render () {
    return this.html`
      <blockquote class="markdown-editor" contenteditable="true"></blockquote>`
  }
}

const vals = Object.values

const components = [
  ...vals(MyComponents),
  ...vals(ObjectComponents),
  ...vals(MarkedComponents),
  ...vals(MediaVectorComponents),
  NewLine
]

components.forEach(c => Tonic.add(c))

export default components
