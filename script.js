const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

  addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

// Smart masonry layout optimizer for project grids
function initMasonry() {
  const grids = document.querySelectorAll('.projects__grid')
  const rowHeight = 10 // Base row height in pixels
  const minWideContentLength = 200 // Characters threshold for wide boxes
  const minWideStackItems = 5 // Stack items threshold for wide boxes
  
  grids.forEach(grid => {
    const items = Array.from(grid.querySelectorAll('.project'))
    
    // First pass: Determine optimal column span based on content
    items.forEach(item => {
      // Reset spans
      item.style.gridColumn = 'span 1'
      item.style.gridRowEnd = 'span 1'
      
      // Analyze content
      const description = item.querySelector('.project__description')
      const stack = item.querySelector('.project__stack')
      const descriptionLength = description ? description.textContent.length : 0
      const stackItemCount = stack ? stack.querySelectorAll('.project__stack-item').length : 0
      const totalContent = descriptionLength + (stackItemCount * 20) // Rough estimate
      
      // Determine if box should be wide (2 columns) or narrow (1 column)
      // Wide boxes for: long descriptions, many stack items, or overall large content
      const shouldBeWide = descriptionLength > minWideContentLength || 
                          stackItemCount >= minWideStackItems ||
                          totalContent > 350
      
      // Set column span
      if (shouldBeWide) {
        item.style.gridColumn = 'span 2'
      } else {
        item.style.gridColumn = 'span 1'
      }
    })
    
    // Second pass: Calculate row spans based on actual rendered height
    items.forEach(item => {
      // Temporarily set to measure
      const currentColumnSpan = item.style.gridColumn || 'span 1'
      item.style.gridColumn = currentColumnSpan
      
      // Force a reflow to get accurate height
      void item.offsetHeight
      
      // Calculate the height of the item
      const itemHeight = item.offsetHeight
      
      // Calculate how many rows this item should span
      const rowSpan = Math.ceil((itemHeight + 16) / rowHeight) // +16 for gap
      
      // Set the row span
      item.style.gridRowEnd = `span ${rowSpan}`
    })
  })
}

// Initialize masonry on page load
window.addEventListener('load', initMasonry)

// Recalculate on window resize
let resizeTimer
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(initMasonry, 250)
})