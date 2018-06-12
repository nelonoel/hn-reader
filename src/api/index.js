export function getNewStories() {
  const apiURL = "https://hacker-news.firebaseio.com/v0/newstories.json"
  return fetch(apiURL).then(res => res.json())
}

export function getItem(id) {
  const apiURL = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  const storyURL = id => `https://news.ycombinator.com/item?id=${id}.json`

  return fetch(apiURL)
    .then(res => res.json())
    .then(story => {
      if ("title" in story) {
        return {
          title: story.title,
          author: story.by,
          url: "url" in story ? story.url : storyURL(story.id)
        }
      }

      return null
    })
}
