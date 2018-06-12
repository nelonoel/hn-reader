import React, { Component } from "react"
import Story from "../Story"
import "./index.css"
import { getNewStories } from "../../api"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      ids: [],
      isFetchingIDs: true,
      loadedStories: 0
    }
  }

  componentWillMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.loadMore()
        }
      })
    }

    getNewStories().then(ids => {
      this.setState({ ids, isFetchingIDs: false })
    })
  }

  loadMore() {
    this.setState({
      page: this.state.page + 1
    })
  }

  storyLoaded() {
    this.setState({
      loadedStories: this.state.loadedStories + 1
    })
  }

  render() {
    const { ids, page, isFetchingIDs, loadedStories } = this.state
    const { items } = this.props
    const mountedItems = items * page
    const endOfList = !isFetchingIDs && mountedItems > ids.length
    const isLoading = !endOfList && mountedItems !== loadedStories

    return (
      <ul className="app">
				<h1>HN</h1>
        {ids
          .slice(0, page * items)
          .map(id => (
            <Story key={id} id={id} storyLoaded={this.storyLoaded.bind(this)} />
          ))}
        {endOfList && <h4>The End</h4>}
        {isLoading ? (
          <h4>Loading..</h4>
        ) : (
          <h4>
            <a onClick={this.loadMore.bind(this)}>Load more</a>
          </h4>
        )}
      </ul>
    )
  }
}
