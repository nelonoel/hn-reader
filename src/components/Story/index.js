import React, { Component } from "react"
import "./index.css"
import { getItem } from "../../api"

export default class Story extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      author: "",
      url: ""
    }
  }

  componentWillMount() {
    const { id } = this.props
    getItem(id).then(story => {
      if ("title" in story) {
        this.setState(story)
      }
    })
  }

  render() {
    const { title, author, url } = this.state
    const story = (
      <li className="story">
        <a href={url} target="blank">
          {title}
        </a>{" "}
        <br />
        {author}
      </li>
    )

    // Rendering an empty div maintains the order
    return title.length > 0 ? story : <div />
  }
}
