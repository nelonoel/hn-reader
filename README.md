# Quick HN Reader

### Goal

Create an offline-first, blazing fast HackerNews reader

### Todo

- [x] Fetch new stories
- [x] Load each story
- [x] Infinite scrolling
- [x] Manage cache for offline access
- [x] Optimize build and performance

### Perf difference

#### Default create-react-app config
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

#### Polyfills removed, move styles to <style> tags
```
lighthouse score = 98
first meaningful paint = 1360ms
bundle size = 26kb
```
