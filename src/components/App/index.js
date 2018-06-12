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
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.setState({
            page: this.state.page + 1
          })
        }
      })
    }

    getNewStories().then(ids => {
      this.setState({ ids })
    })
  }

  render() {
    const { ids, page } = this.state
    const { items } = this.props
    const endOfList = items * page > ids.length

    return (
      <ul className="app">
        <h1>Quick HN Reader</h1>
        {ids.slice(0, page * items).map(id => <Story key={id} id={id} />)}
        {endOfList && <h4>End of the List</h4>}
      </ul>
    )
  }
}
