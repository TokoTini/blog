let divs = document.querySelector('#blog').getElementsByTagName('div')
let ul = document.querySelector('#anchor');
console.log(divs)
gsap.registerPlugin(ScrollTrigger);


Array.prototype.forEach.call(divs, function(div) {
    let aName = div.querySelector('h1').textContent;
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', `#${div.id}`);
    a.textContent = aName;
    li.appendChild(a);
    ul.appendChild(li);
})


Array.prototype.forEach.call(divs, function(div){
    let blog = document.getElementById('#blog')
    let a = document.querySelector(`a[href="#${div.id}"]`)
    let li = a.parentNode;
    gsap.to(blog,{
        scrollTrigger: {
            trigger: div,
            start: "top 30%",
            end: "bottom 30%",
            // toggleClass: { className: "active", targets: li },
            onEnter: () => {
                li.classList.toggle('active');
            },
            onLeaveBack: () => {
                li.classList.toggle('active');
            },
            markers: {
                startColor: 'red',
                endColor: "blue",
                fontSize: '1.75rem',
            },
        }
    })
})

document.body.addEventListener('scroll', () => {
    console.log(window.height)
})


