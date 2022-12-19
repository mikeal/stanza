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
  render () {
    marked.parse
  }
}

class MediaVectorPage extends Tonic {
  render () {
    let content
    if (this.props.content === 'empty') {
      content = [this.html`<h1>Title</h1>`]
    } else {
      throw new Error('Not Implemented')
    }
    return this.html`<mv-page>${ content.map(c => {
        return this.html`<mv-row> ${ c } </mv-row>`
      })
    }</mv-page>`

  }
}

Tonic.add(MyPage)
Tonic.add(MyPages)
Tonic.add(MediaLine)
Tonic.add(NewPageLine)
Tonic.add(MediaVectorPage)
