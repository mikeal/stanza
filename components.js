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
      <tonic-tabs id="my-pages-tabs">
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
      <media-line-container>
        ${ this.render_line() }
      </media-line-container>
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

class MediaVectorPage extends Tonic {
  style () {
  }
  render () {
    if (this.props.content === 'empty') {
      content = [this.html`'New page']
    } else {
      throw new Error('Not Implemented')
    }
    return this.html`<div></div>`
  }
}

Tonic.add(MyPage)
Tonic.add(MyPages)

