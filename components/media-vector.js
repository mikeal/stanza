import Tonic from '@socketsupply/tonic'

const global_save = component => {
  console.log({ save: component })
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

export { MediaVectorPage }
