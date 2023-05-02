let headings = document.querySelector('#npy-blog').querySelectorAll('h2,h3')
let ul = document.querySelector('#anchor');
let blog = document.getElementById('#npy-blog');
const anchor = document.querySelector('#anchor');


Array.prototype.forEach.call(headings, function(heading) {
    let title = heading.textContent;
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', `#${heading.id}`);
    a.textContent = title.length > 65 ? title.slice(0,65)+ "..." : title;
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
  



// Add click event listener to all anchor tags
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    // Get the target element to scroll to
    const target = document.querySelector(this.getAttribute('href'));

    // Scroll to the target element using ScrollToPlugin
    gsap.to(window, {
      scrollTo: { y: target},
      duration: .2, // set the duration to 1 second
      ease: "power1.out" // set the easing function to power2.out
    });
  });
});




gsap.to('#npy-blog',{
    scrollTrigger: {
        trigger: 'aside',
        start: "top top",
        end: "bottom 100%",
        scrub: true,
        // toggleClass: { className: "active", targets: '#anchor' },
        onEnter: () => {
            anchor.classList.add('active')
        },
        onLeaveBack: () => {
            anchor.classList.remove('active')
        },

    }
})


gsap.to('#anchor', {
    scrollTrigger: {
      scrub: true,
      trigger: '#npy-blog',
      start: "bottom 100%",
      onEnter: () => {
        let anchor = document.querySelector('#anchor');
        anchor.classList.add('fix-bottom');
      },
      onLeaveBack: () => {
        anchor.classList.remove('fix-bottom');
      },
      // markers: {
      //   startColor: 'red',
      //   endColor: 'blue',
      //   fontSize: '1.75rem',
      // },
    }
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


let paragraphs = carousel.querySelectorAll('p, h4');

paragraphs.forEach(p => {
  let maxHeight = 50; // 2 lines x 16px font size x 1.5 line height
  let str = p.textContent;
  let width = p.clientWidth;
  let height = p.clientHeight;
  if (height > maxHeight) {
    while (height > maxHeight) {
      str = str.slice(0, -1);
      p.innerHTML = str + '...';
      height = p.clientHeight;
    }
  }
});