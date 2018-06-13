import  { append, replace } from '../../utils/dom'
import { getItem } from "../../api"
import App from "../App"

const Story = {
	container: document.getElementById("app")
}

Story.render = (placeholder, data) => {
	const { url, title, author } = data

	replace(placeholder, `
		<li class="story">
			<a href="${url}" target="blank" rel="noopener noreferrer">${title}</a>
			<br />${author}
		</li>
	`)

	App.toggleLoadingIndicators()
}

Story.mount = id => {
	App.toggleLoadingIndicators(true)
	const placeholder = document.createElement("div")
	placeholder.setAttribute("id", id)
	placeholder.setAttribute("class", "placeholder")
	append(Story.container, placeholder)
}

Story.fetch = id => {
	Story.mount(id)
	getItem(id).then(story => {
		if (story && "title" in story) {
			Story.render(document.getElementById(id), story)
		}
	})
}

export default Story
