# Quick HN Reader

### Goal

Create an offline-first, blazing fast HackerNews reader.

### Run locally

```
git clone git@github.com:nelonoel/hn-reader.git
cd hn-reader
npm install
npm run serve
...
INFO: Accepting connections at http://localhost:3000
```

### Notes

While I prefer the architecture and code quality of (p)react's component-based approach (declarative vs. imperative, too!), I was curious to see how much better a plain JS (_okay, ES6_ 😅) version of this app would compare in terms of performance.

Checkout the [`plain-js`](https://github.com/nelonoel/hn-reader/tree/plain-js) branch to see the source code. Continue scrolling to see the performance scores!

### Performance scores

#### Default `create-react-app` config

```
lighthouse score = 82
first meaningful paint = 3090ms
bundle size = 117kb
```

#### Switch to Preact

```
lighthouse score = 90
first meaningful paint = 2670ms
bundle size = 40kb
```

#### Polyfills removed, move CSS within `<style>` tags

```
lighthouse score = 98
first meaningful paint = 1360ms
bundle size = 26kb
```

#### Plain JS!

```
lighthouse score = 100
first meaningful paint = 620ms
bundle size = 5kb
```

### Todo

- [x] Fetch new stories
- [x] Load each story
- [x] Infinite scrolling
- [x] Manage cache for offline access
- [x] Optimize build and performance
