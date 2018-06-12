import React, { Component } from "react"
import Story from "../Story"
import "./index.css"
import { getNewStories } from "../../api"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      ids: []
    }
  }

  componentWillMount() {
    const _this = this
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          _this.setState({
            page: _this.state.page + 1
          })
        }
      }
    }

    getNewStories().then(ids => {
      this.setState({ ids })
    })
  }

  render() {
    const { ids, page } = this.state
    const { items } = this.props

    return (
      <ul className="app">
        <h1>Quick HN Reader</h1>
        {ids.slice(0, page * items).map(id => <Story key={id} id={id} />)}
      </ul>
    )
  }
}
