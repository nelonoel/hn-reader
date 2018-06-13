# Quick HN Reader

### Goal

Create an offline-first, blazing fast HackerNews reader.

### Notes

This is an experimental build using plain JS.

### Run locally

```
git clone -b plain-js git@github.com:nelonoel/hn-reader.git hn-reader-plain
cd hn-reader-plain
npm install
npm run serve
...
INFO: Accepting connections at http://localhost:3000
```

### Perf difference

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

#### Polyfills removed, move styles to `<style>` tags

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
