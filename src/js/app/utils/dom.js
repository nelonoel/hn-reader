export function toggle(el, flag) {
	el.style.display = flag ? '' : 'none'
}

export function append(container, el) {
	container.appendChild(el, container.firstChild)
}

export function replace(el, str) {
	el.outerHTML = str
}
