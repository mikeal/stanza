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
}

const commands = {
  'object': ObjectLine
}

class NewLine extends Tonic {
  run_command (command) {
    const name = command.slice(1, command.indexOf(' '))
    console.log({ name })
  }
  keypress (e) {
    if (e.charCode === 13 && !e.shiftKey) {
      const markdown = this.querySelector('blockquote').textContent
      if (markdown.startsWith('/')) {
        return this.run_command(markdown)
      }

      this.props.addrow(this.html`<marked-line markdown=${markdown}></marked_line>`)
      this.querySelector('blockquote').textContent = ''
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
    const string = this.props.markdown
    return this.html(marked.parse(string))
  }
  render_editor () {
    const string = this.props.markdown
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
Tonic.add(MediaVectorPage)
