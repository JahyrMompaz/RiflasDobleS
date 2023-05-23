/**
* Template Name: Knight
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/knight-free-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

//Formulario de compra//
// Obtener elementos del DOM
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtns = document.getElementsByClassName('close');
const ticketQuantitySelect = document.getElementById('ticketQuantity');
const generateBtn = document.getElementById('generateBtn');
const ticketNumbersDiv = document.getElementById('ticketNumbers');
const continueBtn = document.getElementById('continueBtn');
const purchaseForm = document.getElementById('purchaseForm');
const selectedTicketsDiv = document.getElementById('selectedTickets');

// Función para mostrar el modal
function openModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

// Event Listener para abrir el modal al hacer clic en el botón
openModalBtn.addEventListener('click', openModal);

// Event Listeners para cerrar el modal al hacer clic en el botón de cierre
for (let i = 0; i < closeModalBtns.length; i++) {
  closeModalBtns[i].addEventListener('click', closeModal);
}

// Generar números de boletos aleatorios
function generateTickets() {
  ticketNumbersDiv.innerHTML = '';
  const quantity = parseInt(ticketQuantitySelect.value);

  for (let i = 0; i < quantity; i++) {
    const ticketNumber = Math.floor(Math.random() * 7000) + 1;
    const formattedTicketNumber = ticketNumber.toString().padStart(4, '0');
    const ticketNumberElement = document.createElement('p');
    ticketNumberElement.textContent = formattedTicketNumber;
    ticketNumbersDiv.appendChild(ticketNumberElement);
  }
}

// Event Listener para generar boletos al hacer clic en el botón
generateBtn.addEventListener('click', generateTickets);

// Event Listener para continuar al hacer clic en el botón
continueBtn.addEventListener('click', function() {
  closeModal(); // Cerrar el primer formulario modal
  const modal2 = document.getElementById('popup-container');
  modal2.style.display = 'block'; // Mostrar el segundo formulario modal

  // Obtener los números de boletos generados en el primer formulario
  const ticketNumbers = ticketNumbersDiv.getElementsByTagName('p');
  selectedTicketsDiv.innerHTML = '';

  // Mostrar los números de boletos generados en el segundo formulario
  for (let i = 0; i < ticketNumbers.length; i++) {
    const ticketNumber = ticketNumbers[i].textContent;
    const ticketNumberElement = document.createElement('p');
    ticketNumberElement.textContent = ticketNumber;
    selectedTicketsDiv.appendChild(ticketNumberElement);
  }
});

// Event Listener para enviar el formulario de compra
purchaseForm.addEventListener('submit', function(event) {
	event.preventDefault(); // Prevenir el envío del formulario
	// Borrar los datos del formulario
	purchaseForm.reset();
	ticketNumbersDiv.innerHTML = '';
	selectedTicketsDiv.innerHTML = '';
  
	// Cerrar el segundo formulario modal
	myModal2.style.display = "none";
  });

  var selectedButtons = [];
		var pageButtons = document.querySelectorAll('.button');
		var pageButtonsArray = Array.prototype.slice.call(pageButtons);
		var currentPage = 1;
		var rowsPerPage = 1000;
		var totalPages = Math.ceil(pageButtonsArray.length / rowsPerPage);
		function updateButtons() {
			var startIndex = (currentPage - 1) * rowsPerPage;
			var endIndex = currentPage * rowsPerPage;
			pageButtonsArray.forEach(function(button, index) {
				if (index >= startIndex && index < endIndex) {
					button.style.display = 'inline-block';
				} else {
					button.style.display = 'none';
				}
			});

			var pageButtonsHtml = '';
			for (var i = 1; i <= totalPages; i++) {
				var activeClass = '';
				if (i === currentPage) {
					activeClass = 'active';
				}
				pageButtonsHtml += '<button class="page-button ' + activeClass + '">' + i + '</button>';
			}
			document.querySelector('.page-buttons').innerHTML = pageButtonsHtml;
			document.querySelectorAll('.page-button').forEach(function(button, index) {
				button.addEventListener('click', function() {
					currentPage = index + 1;
					updateButtons();
				});
			});

			pageButtonsArray.forEach(function(button) {
				button.addEventListener('click', function() {
					if (button.classList.contains('selected')) {
						button.classList.remove('selected');
						selectedButtons.splice(selectedButtons.indexOf(button.id), 1);
					} else {
						button.classList.add('selected');
						selectedButtons.push(button.id);
					}
					updateSelected();
				});
			});
		}
		updateButtons();

		function updateSelected() {
			var selectedHtml = '';
			if (selectedButtons.length > 0) {
				selectedHtml += '<ul>';
				selectedButtons.forEach(function(buttonId) {
					selectedHtml += '<li>' + buttonId + '</li>';
				});
				selectedHtml += '</ul>';
			} else {
				selectedHtml = 'No se han seleccionado botones';
			}
			document.querySelector('#selected').innerHTML = selectedHtml;
		}

		document.querySelector('form').addEventListener('submit', function(event) {
			event.preventDefault();
			var phone = document.querySelector('#phone').value;
			var name = document.querySelector('#name').value;
			var last_name = document.querySelector('#last_name').value;
			var state = document.querySelector('#state').value;
			var formData = {
				phone: phone,
				name: name,
				last_name: last_name,
				state: state,
				buttons: selectedButtons
			};
			console.log(formData);
			alert('Los datos del formulario se han enviado correctamente.');
			location.reload();
		});

    