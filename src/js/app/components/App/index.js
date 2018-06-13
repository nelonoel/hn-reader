import { toggle } from "../../utils/dom"
import { getNewStories } from "../../api"
import Story from "../Story"

const App = {
	ids: [],
	items: 10,
	page: 0,
	loadMoreButton: document.getElementById("load-more"),
	loadingIndicator: document.getElementById("loading")
}

App.isEndOfList = () => {
	document.querySelectorAll(".story").length === App.ids.length
}

App.toggleLoadingIndicators = flag => {
	let isLoading =
		typeof flag !== "undefined"
			? flag
			: document.querySelectorAll(".placeholder").length > 0

	if (App.isEndOfList()) {
		App.loadingIndicator.innerText = "The End"
		toggle(App.loadingIndicator, true)
	} else {
		toggle(App.loadMoreButton, !isLoading)
		toggle(App.loadingIndicator, isLoading)
	}
}

App.loadStories = () => {
	const start = App.page * App.items
	const end = ++App.page * App.items
	App.ids.slice(start, end).map(Story.fetch)
}

App.init = () => {
	const isBottom = () =>
		window.requestAnimationFrame(() => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				App.loadStories()
			}
		})

	window.addEventListener("scroll", isBottom)
	App.loadMoreButton.addEventListener("click", App.loadStories)

	getNewStories().then(ids => {
		App.ids = ids
		App.loadStories()
	})
}

export default App
