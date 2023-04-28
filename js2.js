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



gsap.registerPlugin(ScrollTrigger);

Array.prototype.forEach.call(headings, function(heading){
    let a = document.querySelector(`a[href="#${heading.id}"]`)
    let li = a.parentNode;
    let parent = li.parentNode;
    gsap.to('#npy-blog',{
      scrollTrigger: {
        trigger: heading,
        start: "top 50%",
        scrub: true, // add this line to enable user-initiated scrolling
        onEnter: () => {
          li.classList.add('active');
          if(li.offsetTop > parent.offsetHeight/2){
            parent.scrollBy({
                top: li.offsetHeight - 10,
                behavior: 'smooth'
            })
          }
        },
        onLeaveBack: () => {
            li.classList.remove('active');
            parent.scrollBy({
                top: - li.offsetHeight,
                behavior: 'smooth'
            })
        },
      }
    })
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


gsap.to('#npy-blog', {
    scrollTrigger: {
      scrub: true,
      trigger: '#npy-blog',
      start: "bottom 100%",
      onEnter: () => {
        let anchor = document.querySelector('#anchor');
        anchor.classList.add('fix-bottom');
      },
      onLeaveBack: () => {
          console.log('leave back')
        anchor.classList.remove('fix-bottom');
      },
    //   markers: {
    //     startColor: 'red',
    //     endColor: 'blue',
    //     fontSize: '1.75rem',
    //   },
    }
  });


