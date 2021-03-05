const intersect = {
  inserted(el, { value }) {
    if (isIntersectionObserver(value)) {
      value.observe(el)
    }
  },
  update(el, { value, oldValue }) {
    if (value === oldValue) {
      return
    }

    if (isIntersectionObserver(oldValue)) {
      oldValue.unobserve(el)
      oldValue = undefined
    }

    if (isIntersectionObserver(value)) {
      value.observe(el)
    }
  },
  unbind(el, { value }) {
    if (isIntersectionObserver(value)) {
      value.unobserve(el)
      value = undefined
    }
  },
}

function isIntersectionObserver(value) {
  return value instanceof IntersectionObserver
}

export default intersect
