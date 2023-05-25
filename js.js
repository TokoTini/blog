let headings = document.querySelector('#npy-blog').querySelectorAll('h2,h3')
let ul = document.querySelector('#anchor');
let blog = document.getElementById('#npy-blog');
const anchor = document.querySelector('#anchor');

// sommaire
// sommaire
// sommaire
// sommaire
// sommaire
// sommaire
// sommaire
Array.prototype.forEach.call(headings, function(heading) {
    let title = heading.textContent;
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', `#${heading.id}`);
    if(heading.tagName == 'H2'){
      a.style.fontWeight = "700";
    }
    a.textContent = title;
    li.appendChild(a);
    ul.appendChild(li);
})



gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

Array.prototype.forEach.call(headings, function(heading){
    let a = document.querySelector(`a[href="#${heading.id}"]`)
    let li = a.parentNode;
    let parent = li.parentNode;
    gsap.to('#npy-blog',{
      scrollTrigger: {
        trigger: heading,
        start: "50% 50%",
        end: "top 50%",
        scrub: true, // add this line to enable user-initiated scrolling
        // toggleClass: { className: "active", targets: li },
        onEnter: () => {
          li.classList.toggle('active');
          const liRect = li.getBoundingClientRect();
          const containerRect = parent.getBoundingClientRect();
          const midpoint = liRect.top + liRect.height / 2;
          const containerMidpoint = containerRect.top + containerRect.height / 2;
          if (midpoint > containerMidpoint) {
            const scrollBy = midpoint - containerMidpoint + li.offsetHeight / 2;
            parent.scrollBy({
              top: scrollBy,
              behavior: 'smooth'
            })
          }
        },
        onEnterBack: () => {
          li.classList.remove('active');
          const liRect = li.getBoundingClientRect();
          const containerRect = parent.getBoundingClientRect();
          const midpoint = liRect.top + liRect.height / 2;
          const containerMidpoint = containerRect.top + containerRect.height / 2;
          if (midpoint < containerMidpoint) {
            const scrollBy = containerMidpoint - midpoint - li.offsetHeight / 2;
            parent.scrollBy({
              top: -scrollBy,
              behavior: 'smooth'
            })
          }
        },

      //  markers: {
      //   startColor: 'red',
      //   endColor: 'blue',
      //   fontSize: '1.75rem',
      // },
      }
    })
  });
  

    gsap.to('#anchor',{
      scrollTrigger: {
        trigger: 'main',
        start: "0 0",
        end: "bottom bottom",
        toggleClass: { className: "active", targets: anchor },
        onEnter: () => {
          var anchor = document.querySelector('#anchor')
          let container = anchor.parentNode;
          console.log(container.offsetWidth)
          anchor.classList.add('active');
          anchor.style.width = container.offsetWidth +"px";
        },
        onLeave: () => {
          anchor.classList.remove('active');
        },

      //  markers: {
      //   startColor: 'red',
      //   endColor: 'blue',
      //   fontSize: '1.75rem',
      // },
      }
    })

    gsap.to('#anchor',{
      scrollTrigger: {
        trigger: 'main',
        start: "bottom bottom",
        end: "bottom bottom",
        onEnter: () => {
          var anchor = document.querySelector('#anchor')
          let container = anchor.parentNode;

          anchor.classList.add('absolute');
          anchor.style.width = container.offsetWidth +"px";
        },
        onEnterBack: () => {
          anchor.classList.remove('absolute');
        },

      //  markers: {
      //   startColor: 'green',
      //   endColor: 'purple',
      //   fontSize: '1.75rem',
      // },
      }
    })



// Add click event listener to all anchor tags
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    // Get the target element to scroll to
    const target = document.querySelector(this.getAttribute('href'));

    // Scroll to the target element using ScrollToPlugin
    gsap.to(window, {
      scrollTo: { y: target},
      duration: 1, // set the duration to 1 second
    });
  });
});

  // page scroll indicator
let scrollbar = document.getElementById('scrollbar');

  window.onscroll = () => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    scrollbar.style.width = scrolled + "%";
  }


// carousel container arrows
// carousel container arrows
// carousel container arrows
// carousel container arrows
// carousel container arrows

let leftBtn = document.querySelector('.left');
let rightBtn = document.querySelector('.right');
let carousel = document.querySelector('.carousel');

rightBtn.addEventListener('click', (event) => {
  carousel.scrollBy({
      left: 300,
      behavior: 'smooth'
  })
})
leftBtn.addEventListener('click', (event) => {
  carousel.scrollBy({
      left: -300,
      behavior: 'smooth'
  })
})


// image modal
// image modal 
// image modal 
// image modal 
// image modal 
// image modal 
// image modal 
// image modal 
// image modal 
// image modal 
let imgContainer = document.getElementById('gallery-container');
let imgDiv = imgContainer.querySelectorAll('div');
let imgs = imgContainer.querySelectorAll('img');
let modal = document.getElementById('img-modal');
let closeModalBtn = document.querySelector('.close-modal');
let otherImgsDiv = document.querySelector('.modal-img-cont');


let other = document.querySelector('.other-images');
let modalImage = document.querySelector('.main-img img')

modalImage.addEventListener('click', (e) => {
  e.stopPropagation();
})

other.addEventListener('click', (e) => {
  e.stopPropagation();
})



  imgs.forEach((img, index) => {
    // add every image in other-images container
    let div = document.createElement('div');
    let image = document.createElement('img');
    image.setAttribute('src', img.src);
    div.append(image);
    otherImgsDiv.append(div);
    // add event listener to each image in #gallery-container
    img.addEventListener('click', () => {
      // update current image index to match the clicked image index
      currentImageIndex = index;
      // display image in modal
      modal.querySelector('.main-img img').src = img.src;
      // find same image in other-images container and give active class to its parent div
      let otherImages = document.querySelectorAll('.modal-img-cont div img');
      otherImages.forEach((otherImg, otherIndex) => {
        otherImg.addEventListener('click', () => {
          currentImageIndex = otherIndex;
          scrollIntoView();
        });
        let parent = otherImg.parentNode;
        if (otherImg.src == img.src) {
          parent.classList.add('active');
        } else {
          parent.classList.remove('active');
        }
      });
      // open modal while clicking on image
      modal.classList.add('active');
      document.body.classList.add('disabled');
      scrollIntoView();
    });
  });

let modalImages = document.querySelectorAll('.modal-img-cont div img');
let otherDivs = document.querySelectorAll('.modal-img-cont div');

// function to display the current image
function scrollIntoView() {
  otherDivs.forEach(div => {
    div.classList.remove('active');
  });
  const currentImage = modalImages[currentImageIndex];
  modal.querySelector('.main-img img').src = currentImage.src;
  let parent = currentImage.closest('div');
  parent.classList.add('active');
  let contWidth = otherImgsDiv.offsetWidth;
  gsap.to('.modal-img-cont', {
    scrollTo: { x: parent, offsetX: contWidth/2 - parent.offsetWidth / 2},// set the duration to 1 second
    duration: .3,
  });
}

// add event listener to each image in other-images container
// let otherImages = document.querySelectorAll('.modal-img-cont div img');
modalImages.forEach((otherImg, index) => {
  otherImg.addEventListener('click', () => {
    // update current image index to match the clicked image index
    currentImageIndex = index;
    // display image in modal
    modal.querySelector('.main-img img').src = otherImg.src;
    // remove active class from other-images container
    modalImages.forEach(img => {
      img.parentNode.classList.remove('active');
    });
    // add active class to clicked image's parent div
    otherImg.parentNode.classList.add('active');
  });
});

let btnLeft = document.querySelector('.btnLeft');
let btnRight = document.querySelector('.btnRight');

// add event listeners to the buttons
btnRight.addEventListener('click', () => {
  currentImageIndex++;
  if (currentImageIndex >= modalImages.length) {
    currentImageIndex = 0;
  }
  scrollIntoView();
});

btnLeft.addEventListener('click', () => {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = modalImages.length - 1;
  }
  scrollIntoView();
});

// touch events for mobile devices
var touchStartX = 0;
var touchEndX = 0;

modalImage.addEventListener('touchstart', function(event) {
  if (event.touches.length === 1) { // check for single touch point
    touchStartX = event.touches[0].clientX;
  }
}, false);

modalImage.addEventListener('touchend', function(event) {
  if (event.changedTouches.length === 1) { // check for single touch point
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  }
}, false);

function handleSwipe() {
  if (touchEndX < touchStartX) {
    currentImageIndex++;
    if (currentImageIndex >= modalImages.length) {
      currentImageIndex = 0;
    }
    scrollIntoView();
  } else if (touchEndX > touchStartX) {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = modalImages.length - 1;
    }
    scrollIntoView();

  } else {
    // No swipe
  }
}


// close modal
closeModalBtn.addEventListener('click', closeModal);

function closeModal(){
  document.body.classList.remove('disabled');
  modal.classList.remove('active');

  otherDivs.forEach(div => {
    div.classList.remove('active');
  })
}


// popup container
// popup container
// popup container
// popup container
// popup container
// popup container
// popup container
// popup container
// popup container

let popUp = document.getElementById('popup-container');


gsap.to('#npy-blog',{
  scrollTrigger: {
      trigger: '#npy-blog',
      start: "50% 50%",
      // end: "55% 50%",
      scrub: true,
      onEnter: () => {
          popUp.classList.add('active')
      },
      onLeaveBack: () => {
          popUp.classList.remove('active')
      },
    // markers: {
    //   startColor: 'red',
    //   endColor: 'blue',
    //   fontSize: '1.75rem',
    // },
  }
})


let closePopUp = document.querySelector('.close-popup');
closePopUp.addEventListener('click', () => {
  popUp.classList.remove('active')
})



// share article
// share article
// share article
// share article
// share article
// share article
// share article
// share article
// share article

let shareLink = document.querySelector('.copy input');
let btnCopy = document.querySelector('.btn-copy');
shareLink.value = window.location.href

btnCopy.addEventListener('click', copyText);

function copyText(){
  shareLink.select();
  shareLink.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(shareLink.value);
}


let partagerBtn = document.querySelector('.partager');
let shareModal = document.getElementById('share-article')
let closeShareModal = document.querySelector('.closeShare');

partagerBtn.addEventListener('click', () => {
  shareModal.classList.add('active');
})

closeShareModal.addEventListener('click', () => {
  shareModal.classList.remove('active');
})






imgs.forEach(img => {
  img.addEventListener('mousemove', function(e){
    img.style.cursor = 'url(res/search-outline.svg) 12 12, auto';
  });
});


