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
    
    // Reset all items first
    items.forEach(item => {
      item.style.gridColumn = ''
      item.style.gridRow = ''
      item.style.gridRowEnd = ''
    })
    
    // First pass: Set column spans based on content analysis
    items.forEach(item => {
      const description = item.querySelector('.project__description')
      const stack = item.querySelector('.project__stack')
      const descriptionLength = description ? description.textContent.trim().length : 0
      const stackItemCount = stack ? stack.querySelectorAll('.project__stack-item').length : 0
      const totalContent = descriptionLength + (stackItemCount * 20)
      
      // Determine if box should be wide (2 columns) or narrow (1 column)
      const shouldBeWide = descriptionLength > minWideContentLength || 
                          stackItemCount >= minWideStackItems ||
                          totalContent > 350
      
      if (shouldBeWide) {
        item.style.gridColumn = 'span 2'
      } else {
        item.style.gridColumn = 'span 1'
      }
    })
    
    // Force reflow
    void grid.offsetHeight
    
    // Second pass: Calculate and set row spans based on actual height
    items.forEach(item => {
      const itemHeight = item.offsetHeight
      const gap = 16 // 1em gap
      const rowSpan = Math.max(1, Math.ceil((itemHeight + gap) / rowHeight))
      item.style.gridRowEnd = `span ${rowSpan}`
    })
  })
}

// Initialize masonry - try multiple times to ensure it works
function runMasonry() {
  initMasonry()
  // Run again after a short delay to catch any late-loading content
  setTimeout(initMasonry, 100)
}

// Initialize on DOM ready and on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runMasonry)
} else {
  runMasonry()
}

window.addEventListener('load', runMasonry)

// Recalculate on window resize
let resizeTimer
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(initMasonry, 250)
})