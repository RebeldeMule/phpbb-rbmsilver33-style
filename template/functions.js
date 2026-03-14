// Switch light/dark theme
$(function () {
	let $switchBtn = $("#switch-theme"),
		osDarkscheme = window.matchMedia("(prefers-color-scheme: dark)"),
		$html = $("html"),
		dataAttr = "data-theme",
		light = "light",
		dark = "dark";

	$switchBtn.on("click", function (e) {
		let theme = "";

		if (osDarkscheme.matches) {
			$html.attr(dataAttr, $html.attr(dataAttr) === light ? dark : light);
			theme = $html.attr(dataAttr) === light ? light : dark;
		} else {
			$html.attr(dataAttr, $html.attr(dataAttr) === dark ? light : dark);
			theme = $html.attr(dataAttr) === dark ? dark : light;
		}
		localStorage.setItem("sideoftheforce", theme);
		e.preventDefault();
		e.stopPropagation();
	});
});

// Show/hide password
if ((typeof showPassword !== "undefined") && $("[type='password']").length) {
	let $passwordInput = $("input[type='password']"),
		showpassBtn = ('<button type="button" class="showpass-btn fa fa-eye" data-showpass></button>');

	$passwordInput.each(function () {
		$(this).after(showpassBtn);
	});

	$("[data-showpass]").on("click", function () {
		let thisPassword = $(this).prev($passwordInput),
			typeValue = thisPassword.attr("type") === "password" ? "text" : "password";

		$(this).toggleClass("fa-eye fa-eye-slash");
		thisPassword.attr("type", typeValue).toggleClass("warning");
	});
}

/* Animate scroll to top */
$(window).scroll(function () {
	if ($(this).scrollTop() > 250) {
		$(".scrolltop").fadeIn();
	} else {
		$(".scrolltop").fadeOut();
	}
});

$(".scrolltop, .top").on("click", function () {
	$("html, body").animate({ scrollTop: 0 }, "fast");
	return false;
});



/* Modal Login Window */
$(function () {
	let $loginLink = $("#modal-login-trigger"),
		$form = "#modal-login",
		$phpbbWrapper = "#darkenwrapper";

	if ($($form).length) {
		$loginLink.on("click", function (e) {
			e.preventDefault();
			$($phpbbWrapper + ", " + $form).fadeIn(300);
			$("#username").focus();
		});

		$($phpbbWrapper + ", " + $form + " .alert_close").on("click", function (e) {
			e.preventDefault();
			$($phpbbWrapper + ", " + $form).fadeOut(300);
			$loginLink.focus();
		});

		$(document).on("keydown", function (e) {
			if (e.keyCode === 27 && $($form).is(":visible")) {
				$($phpbbWrapper + ", " + $form).fadeOut(300);
				$loginLink.focus();
			}
		});
	}
});

/* Add class on body when scrolling under #page-header */
function initScrollHandler() {
	let pageHeader = $("#page-header").height();

	function addScrolledClass() {
		$("body").addClass("scrolled");
	}

	function removeScrolledClass() {
		$("body").removeClass("scrolled");
	}

	function handleScroll() {
		var nowScrollTop = $(this).scrollTop();
		if (nowScrollTop > pageHeader) {
			addScrolledClass();
		} else {
			removeScrolledClass();
		}
	}

	// Handler for scrolling
	$(window).scroll(handleScroll);

	// Handler for anchor links
	$(document).on("click", 'a[href^="#"]', function (e) {
		e.preventDefault();
		// Get the target element's offset
		const target = $(this).attr("href");

		if (target !== "#" && target !== "") {
			const offset = $(target).offset().top - 40;

			// Animate the scroll to the target element
			$("html, body").animate({ scrollTop: offset }, 500, function () {
				// After scrolling, add or remove the "scrolled" class based on the scroll position
				var nowScrollTop = $(window).scrollTop();
				if (nowScrollTop > pageHeader) {
					addScrolledClass();
				} else {
					removeScrolledClass();
				}
			});
		}
	});

	// Handler for window resize
	$(window).resize(function () {
		// Update the value of pageHeader when the window is resized and the height of #page-header changes
		pageHeader = $("#page-header").height();

		// Check if the page is already scrolled (in case of anchor link usage on page load)
		var nowScrollTop = $(window).scrollTop();
		if (nowScrollTop > pageHeader) {
			addScrolledClass();
		} else {
			removeScrolledClass();
		}
	});

	// Initially check if the page is already scrolled (in case of anchor link usage on page load)
	if ($(window).scrollTop() > pageHeader) {
		addScrolledClass();
	}
}

// Add class to current member search link (memberlist_body.html)
function getMemberSearchParam() {
	const defaultSearch = $(".member-search > strong a").first();
	const memberlistSearch = new URL(document.location).searchParams;
	const firstChar = memberlistSearch.get("first_char");

	if (firstChar) {
		const charLink = $(".member-search").find('[href*="memberlist.php?first_char=' + firstChar + '"]');
		defaultSearch.removeClass("current-search");
		charLink.addClass("current-search");
	} else {
		defaultSearch.addClass("current-search");
	}
}

// Override phpbb.toggleDropdown to support nested dropdowns
(function ($) {
	phpbb.toggleDropdown = function () {
		var $this = $(this),
			options = $this.data('dropdown-options');

		if (!options) {
			return false;
		}

		var parent = options.parent,
			visible = parent.hasClass('dropdown-visible'),
			direction;

		if (!visible) {
			// Hide other dropdown menus
			$(phpbb.dropdownHandles).each(function () {
				// Check if the current handle's container is a parent of the clicked toggle
				var container = $(this).parent();
				if ($.contains(container[0], $this[0])) {
					return; // Don't close the parent container
				}

				// Only toggle (close) if it is currently visible
				if (container.hasClass('dropdown-visible')) {
					phpbb.toggleDropdown.call(this);
				}
			});

			// Figure out direction of dropdown
			direction = options.direction;
			var verticalDirection = options.verticalDirection,
				offset = $this.offset();

			if (direction === 'auto') {
				if (($(window).width() - $this.outerWidth(true)) / 2 > offset.left) {
					direction = 'right';
				} else {
					direction = 'left';
				}
			}
			parent.toggleClass(options.leftClass, direction === 'left')
				.toggleClass(options.rightClass, direction === 'right');

			if (verticalDirection === 'auto') {
				var height = $(window).height(),
					top = offset.top - $(window).scrollTop();

				verticalDirection = (top < height * 0.7) ? 'down' : 'up';
			}
			parent.toggleClass(options.upClass, verticalDirection === 'up')
				.toggleClass(options.downClass, verticalDirection === 'down');
		}

		// Toggle visibility
		if (!visible) {
			// Force display block important when showing
			options.dropdown.show(); // Ensure jQuery shows it first
			if (options.dropdown[0]) {
				options.dropdown[0].style.setProperty('display', 'block', 'important');
			}
		} else {
			// Allow hiding normally
			options.dropdown.hide();
			// Clean up the forced style so it doesn't interfere later
			if (options.dropdown[0]) {
				options.dropdown[0].style.removeProperty('display');
			}
		}

		parent.toggleClass(options.visibleClass, !visible)
			.toggleClass('dropdown-visible', !visible);

		// Check dimensions when showing dropdown
		// !visible because variable shows state of dropdown before it was toggled
		if (!visible) {
			var windowWidth = $(window).width();

			options.dropdown.find('.dropdown-contents').each(function () {
				var $this = $(this);

				$this.css({
					marginLeft: 0,
					left: 0,
					marginRight: 0,
					maxWidth: (windowWidth - 4) + 'px'
				});

				var offset = $this.offset().left,
					width = $this.outerWidth(true);

				if (offset < 2) {
					$this.css('left', (2 - offset) + 'px');
				} else if ((offset + width + 2) > windowWidth) {
					$this.css('margin-left', (windowWidth - offset - width - 2) + 'px');
				}

				// Check whether the vertical scrollbar is present.
				$this.toggleClass('dropdown-nonscroll', this.scrollHeight === $this.innerHeight());

			});
			var freeSpace = parent.offset().left - 4;

			if (direction === 'left') {
				options.dropdown.css('margin-left', '-' + freeSpace + 'px');

				// Try to position the notification dropdown correctly in RTL-responsive mode
				if (options.dropdown.hasClass('dropdown-extended')) {
					var contentWidth,
						fullFreeSpace = freeSpace + parent.outerWidth();

					options.dropdown.find('.dropdown-contents').each(function () {
						contentWidth = parseInt($(this).outerWidth(), 10);
						$(this).css({ marginLeft: 0, left: 0 });
					});

					var maxOffset = Math.min(contentWidth, fullFreeSpace) + 'px';
					options.dropdown.css({
						width: maxOffset,
						marginLeft: -maxOffset
					});
				}
			} else {
				options.dropdown.css('margin-right', '-' + (windowWidth + freeSpace) + 'px');
			}
		}

		// Prevent event propagation
		if (arguments.length > 0) {
			try {
				var e = arguments[0];
				e.preventDefault();
				e.stopPropagation();
			} catch (error) { }
		}
		return false;
	};
})(jQuery);
