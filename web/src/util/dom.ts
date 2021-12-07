
export const hasClass = (el:any, className:any) => {
    if (el.classList) {
        return el.classList.contains(className)
    }
    return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className)
}

export const addClass = (el:any, className:any) => {
    if (!hasClass(el, className)) {
        if (el.classList) {
            el.classList.add(className)
        } else {
            el.className += ` ${className}`
        }
    }
}

export const removeClass = (el:any, className:any) => {
    if (el.classList) el.classList.remove(className)
    else
        el.className = el.className.replace(
            new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'),
            ' '
        )
}