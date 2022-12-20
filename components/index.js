import Tonic from '@socketsupply/tonic'
import bundle from '@socketsupply/components'

bundle(Tonic)

const fixture = {
  shortname: 'mikeal',
  fullname: 'Mikeal Rogers',
  displayname: '@mikeal',
  pages: [
    { name: 'public', title: 'Public', content: 'empty' }
  ]
}

const global_save = component => {
  console.log({ save: component })
}

/* components */

class MyPage extends Tonic {
  render () {
    return this.html`
      <h1>${fixture.displayname}</h1>
      <my-pages></my-pages>
    `
  }
}

class MyPages extends Tonic {
  render () {
    return this.html`
      <tonic-tabs id="my-pages-tabs" selected="tab-panel-public">
      ${ fixture.pages.map(page => this.html`
        <tonic-tab
         id="${page.name}"
         for="tab-panel-${page.name}">
          ${page.title}
        </tonic-tab>
        <tonic-tab-panel id="tab-panel-${page.name}">
          <media-vector-page content=${page.content}></media-vector-page>
        </tonic-tab-panel>
        `)
      }
      </tonic-tabs>
    `
  }
}

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

class MediaVectorPage extends Tonic {
  save (component) {
    global_save(component)
  }
  render () {
    const self = this
    let content
    if (this.props.content === 'empty') {
      content = [ this.html`<marked-line save=${this.save} markdown="# Title"></marked-line>`]
    } else {
      content = this.props.content
    }
    this.props.content = content
    const addRow = r => {
      console.log({r})
      content.push(r)
      return this.reRender(props => ({ ...props, content }))
    }
    return this.html`<mv-page>${ content.map(c => {
        return this.html`<mv-row width="100%"> ${ c } </mv-row>`
      })
    }
      <mv-row width="100%"><p class="endpage">±</p></mv-row>
      <mv-row width="100%"><new-line addrow=${addRow}></new-line></mv-row>
    </mv-page>`

  }
}

Tonic.add(MyPage)
Tonic.add(MyPages)
Tonic.add(NewLine)
Tonic.add(MarkedLine)
Tonic.add(ObjectLine)
Tonic.add(MediaVectorPage)
