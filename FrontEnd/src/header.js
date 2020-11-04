
function changeHeaderClass() {
  if (window.pageYOffset > 1) {
    header.classList.add('header-background')
  } else {
    header.classList.remove('header-background')
  }
}

export default changeHeaderClass;
