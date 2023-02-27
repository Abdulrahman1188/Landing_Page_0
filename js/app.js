/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

//make page load dynamically from start
document.addEventListener('DOMContentLoaded', navBar());
document.addEventListener('DOMContentLoaded', navBarStyle());


//create navigation menu top & activate clicked item
function navBar() {
    const section = document.getElementsByTagName('section');

    for (let i = 0 ; i < section.length ; i++){
        let list = document.createElement('li');
        let anchor = document.createElement('a');
        let sectionName = section[i].getAttribute('data-nav')
        let sectionNameAttribute = sectionName.replace(/\s/g, '').toLowerCase();

        anchor.innerText = sectionName;
        anchor.setAttribute('href', `#${sectionNameAttribute}`);
        anchor.setAttribute('id', 'link_no' + (i +1));
        list.appendChild(anchor);
        document.getElementById('navbar__list').appendChild(list);
        document.getElementById('link_no' + (i + 1)).addEventListener('click', function(){
            ScrollEvent(i +1);
            sectionActivate(i + 1);
            navActivate(i + 1);
        })
    }
}


//styling for the active states with getBoundingClientRect
// Set sections as active
window.onscroll= function() {
    document.querySelectorAll("section").forEach(function(active){
        if(
            active.getBoundingClientRect().top >= -400 &&
            active.getBoundingClientRect().top <= 150
        ){
            active.classList.add("your-active-class")
        }else{
            active.classList.remove("your-active-class")
        }
    });
};


//scroll event on click
function ScrollEvent(no) {
    let section = document.getElementById('section' + no);
    let position = section.offsetTop;
    event.preventDefault();
    window.scrollTo({
        left: 0,
        top: position,
        behavior: 'smooth'
    })
}


//Dynamic Style for Navigation Menu
function navBarStyle () {
    let anchor = document.getElementsByTagName('a');
    let styles = `
        display: flex;
        flex-direction: row;
        align-items: stretch;
        color: #000;
        text-decoration: none;
        margin: 0 0.5em 0 0.5em;
        padding: 0.7em;
        background-color: rgb(220, 220, 220);
        font-size: large;
        transform:translateX(-0.5em);
    `;

    for (i = 0; i < anchor.length; i++) {
        anchor[i].setAttribute('style', styles);
    }

    mouseOver();
}

//Dynamic Style on hover
function mouseOver () {
    let anchor = document.getElementsByTagName('a');

    for (i = 0; i < anchor.length; i++) {
        anchor[i].addEventListener('mouseenter', function (event) {
            event.target.style.backgroundColor = "rgb(123, 123, 234)";
            event.target.style.color = "#fff";
        })
        //Blue color stays in case of activation
        if (anchor[i].style.backgroundColor == "rgb(120, 123, 234)") {
            anchor[i].addEventListener('mouseout', function (event) {
                event.target.style.backgroundColor = "rgb(220, 220, 220)";
                event.target.style.color = "#000";
            })
        }
    }
}

// Activate section on click and deactivate previous one
function sectionActivate(no) {
    let activeClass = 'your-active-class';
    let activeSection = document.getElementsByClassName(activeClass)[0];
    let newActiveSection = document.getElementById('section' + no);

    activeSection.removeAttribute('class');
    newActiveSection.setAttribute('class', activeClass);
}

// Activate clicked navigation menu element
function navActivate(no) {
    let activeNav = document.getElementById('link_no' + no);
    let otherNaves = document.getElementsByTagName('a');

    for (i = 0; i <otherNaves.length; i++) {
        if (otherNaves[i].style.backgroundColor == "rgb(14, 14, 88)") {
            oldNav = otherNaves[i];
            oldNav.style.backgroundColor = "rgb(220, 220, 220)";
            oldNav.style.color = "#000";          
        }
    }

    activeNav.style.backgroundColor = "rgb(14, 14, 88)";
    activeNav.style.color = "#fff";
}
