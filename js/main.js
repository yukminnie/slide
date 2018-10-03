let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFateSlides()
$slides.css({
	transform: 'translateX(-400px)'
})
bindEvents()

function bindEvents() {
	$('#buttonWrapper').on('click', 'button', function(e) {
		let $button = $(e.currentTarget)
		let index = $button.index()
		goToSlide(index)

	})
}
$(prev).on('click', function() {
	goToSlide(current - 1)
})
$(next).on('click', function() {
	goToSlide(current + 1)
})

let timer = setInterval(function() {
	goToSlide(current + 1)
}, 2000)

$('.container').on('mouseenter', function() {
	clearInterval(timer)
}).on('mouseleave', function() {
	timer = setInterval(function() {
		goToSlide(current + 1)
	}, 2000)
})



function goToSlide(index) {
	if (index > $buttons.length - 1) {
		index = 0
	} else if (index < 0) {
		index = $buttons.length - 1
	}
	console.log('current', 'index')
	console.log(current, index)
	if (current === $buttons.length - 1 && index === 0) {
		$slides.css({
				transform: `translateX(${-($buttons.length + 1) * 400}px)`
			})
			.one('transitionend', function() {
				$slides.hide().offset()
				$slides.css({
						transform: `translateX(${-(index+1)*400}px)`
					})
					.show()
			})
	} else if (current === 0 && index === $buttons.length - 1) {
		$slides.css({
				transform: `translateX(0px)`
			})
			.one('transitionend', function() {
				$slides.hide().offset()
				$slides.css({
						transform: `translateX(${-(index+1)*400}px)`
					})
					.show()
			})
	} else {
		$slides.css({
			transform: `translateX(${- (index+1)*400}px)`
		})
	}
	current = index
}

function makeFateSlides() {
	let $firstCopy = $images.eq(0).clone(true)
	let $lastCopy = $images.eq($images.length - 1).clone(true)
	$slides.prepend($lastCopy)
	$slides.append($firstCopy)
}
