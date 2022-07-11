export function getElementsByClassName(className) {
    return Array.from(document.querySelectorAll(`.${className}`));
}
