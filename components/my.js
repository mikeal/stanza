import Tonic from '@socketsupply/tonic'
import bundle from '@socketsupply/components'

bundle(Tonic)

class MyPage extends Tonic {
  render () {
    return this.html`
      <h1>${this.props.displayname}</h1>
      <my-pages pages=${this.props.pages}></my-pages>
    `
  }
}

class MyPages extends Tonic {
  render () {
    return this.html`<media-vector-page content='empty'></media-vector-page>`
    /*
    return this.html`
      <tonic-tabs id="my-pages-tabs" selected="tab-panel-public">
      ${ this.props.pages.map(page => this.html`
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
    */
  }
}

class MyWorkbench extends Tonic {
  render () {
    const pages = [
      { name: 'public', title: 'Public', content: 'empty' }
    ]
    return this.html`<my-page displayname="@mikeal" pages=${pages}></my-page>`
  }
}

export { MyPage, MyPages, MyWorkbench }
