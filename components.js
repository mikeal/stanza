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

/* storage interfaces */

const loadcar = (carcid) => {}
const getBlock = cid => {
}

/* media vector interfaces */


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

class MediaLine extends Tonic {
  render () {
    return this.html`
      <div>
        ${ this.render_line() }
      </div>
    `
  }
}

class NewPageLine extends MediaLine {
  render_line () {
    return this.html`
      <h1>New Page</h1>
    `
  }
}

class MarkedLine extends Tonic {
  click (e) {
    if (!this.props.editor) {
      const self = this
      this.reRender(props => ({ ...props, editor: true })).then(() => {
        const elem = self.querySelector('blockquote')
        elem.focus()
      })
    }
  }
  render_rendered () {
    const string = this.props.markdown
    return this.html(marked.parse(string))
  }
  render_editor () {
    const string = this.props.markdown
    return this.html`<blockquote contenteditable="true">${string}</blockquote>`
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
  render () {
    let content
    if (this.props.content === 'empty') {
      content = [this.html`<marked-line markdown="# Title"></marked-line>`]
    } else {
      throw new Error('Not Implemented')
    }
    return this.html`<mv-page>${ content.map(c => {
        return this.html`<mv-row width="100%"> ${ c } </mv-row>`
      })
    }</mv-page>`

  }
}

Tonic.add(MyPage)
Tonic.add(MyPages)
Tonic.add(MediaLine)
Tonic.add(NewPageLine)
Tonic.add(MarkedLine)
Tonic.add(MediaVectorPage)
