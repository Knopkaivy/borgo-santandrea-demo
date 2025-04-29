const variables = {
    dataSelectors: {
        beachLink: '[data-beach-link]',
        carouselLinkName: '[data-carousel-link-name]',
        languagesDropdown: '[data-languages-dropdown]',
        languagesAlternative: '[data-languages-alternative]',
        languagesChevron: '[data-languages-chevron]',
        menu: '[data-menu]',
        menuCloseBtn: '[data-menu-close]',
        menuOpenBtn: '[data-menu-open]',
        menuItem: '[data-menu-item]',
        menuBgOverlay: '[data-bg-overlay]',
        menuImage: '[data-menu-image]',
        menuSublist: '[data-menu-sublist]',
        navbar: '[data-navbar]',
        volume: '[data-volume]',
        volumeMute: '[data-volume-mute]',
        volumeMedium: '[data-volume-medium]',
    },
    classes:{
        navBarLightBG: 'navbar--light-bg',
        navBarHide: 'navbar--hide',
        navBarShow: 'navbar--show',
        languageAlternativeHide: 'navbar__languages-alternative--hide',
        languageAlternativeShow: 'navbar__languages-alternative--show',
        chevronUp: 'icon__chevron--up',
        chevronDown: 'icon__chevron--down',
        hidden: 'hidden',
        menuActive: 'is-menu-active',
        menuClosed: 'is-menu-closed',
        menuImageShowImage: 'menu__bg-image--show-image',
    },
    idSelectors: {
        navBar: '#section-navbar',
        menuImageId: '#menu-back-img-',
        menuSublistId: '#menu-list-',
    }
};
const NAVBAR_HEIGHT = 108;
const NAVBAR_STICKY_HEIGHT = 288;
const LINK_TRANSLATE_FRACTION = .5;

const navBar = document.querySelector(variables.idSelectors.navBar);
const languagesDropdown = document.querySelector(variables.dataSelectors.languagesDropdown);
const languagesAlternative = document.querySelector(variables.dataSelectors.languagesAlternative);
const languagesChevron = document.querySelector(variables.dataSelectors.languagesChevron);
const volumeButtons = document.querySelectorAll(variables.dataSelectors.volume);
const menuOpenBtn = document.querySelector(variables.dataSelectors.menuOpenBtn);
const menuCloseBtn = document.querySelector(variables.dataSelectors.menuCloseBtn);
const menuItems = document.querySelectorAll(variables.dataSelectors.menuItem);
const menuImages = document.querySelectorAll(variables.dataSelectors.menuImage);
const menuSublists = document.querySelectorAll(variables.dataSelectors.menuSublist);
const menuBgOverlay = document.querySelector(variables.dataSelectors.menuBgOverlay);
const navbar = document.querySelector(variables.dataSelectors.navbar);



let oldScroll = 0;

languagesDropdown.addEventListener('click', ()=>{
    languagesAlternative.classList.toggle(variables.classes.languageAlternativeHide);
    languagesAlternative.classList.toggle(variables.classes.languageAlternativeShow);

    languagesChevron.classList.toggle(variables.classes.chevronDown);
    languagesChevron.classList.toggle(variables.classes.chevronUp);
});

volumeButtons.forEach(volumeBtn =>{
    volumeBtn.addEventListener('click', () =>{
        volumeBtn.querySelector(variables.dataSelectors.volumeMute).classList.toggle(variables.classes.hidden);
        volumeBtn.querySelector(variables.dataSelectors.volumeMedium).classList.toggle(variables.classes.hidden);
    });
})

window.addEventListener(
    'scroll',
    (event) => {
        navbarOnScrollUpdate(event);
    }, 
    { passive: true }
);

window.addEventListener(
    "load",
    (event) => {
        /*createLinkObserver();*/
    },
    false,
  );

const navbarOnScrollUpdate = (event) =>{
    if(window.scrollY <= NAVBAR_HEIGHT) {
        navBar.classList.remove(variables.classes.navBarLightBG);
    } else if(window.scrollY > NAVBAR_HEIGHT && window.scrollY <= NAVBAR_STICKY_HEIGHT){
        navBar.classList.add(variables.classes.navBarLightBG);
    } else{
        if(oldScroll > window.scrollY){
            navBar.classList.remove(variables.classes.navBarHide);
            navBar.classList.add(variables.classes.navBarShow);
        } else{
            navBar.classList.remove(variables.classes.navBarShow);
            navBar.classList.add(variables.classes.navBarHide);
        }
    }
    oldScroll = window.scrollY;
}

const toggleMenu = () =>{
    document.body.classList.toggle(variables.classes.menuActive);
    document.querySelector(variables.dataSelectors.menu).classList.toggle(variables.classes.menuActive);
    navbar.classList.toggle(variables.classes.menuActive);
    if(navbar.classList.contains(variables.classes.menuActive)){
        navbar.classList.remove(variables.classes.menuClosed);
    } else{
        navbar.classList.add(variables.classes.menuClosed);
    }
}

const showItemImage = (event) =>{
    menuBgOverlay.style.opacity = .8;
    const itemId = event.target.id.slice(-1);
    document.querySelector(`${variables.idSelectors.menuImageId}${itemId}`).classList.add(variables.classes.menuImageShowImage);
}

const hideItemImage = (event) =>{
    menuBgOverlay.style.opacity = 1;
    menuImages.forEach(image =>{
        image.classList.remove(variables.classes.menuImageShowImage);
    });
}

const toggleItemSublist = (event) =>{
    const itemId = event.target.id.slice(-1);
    menuSublists.forEach(sublist =>{
        const sublistId = sublist.id.slice(-1);
        if(sublistId === itemId && (sublist.style.height === '0px' || sublist.style.height === '')){
            sublist.style.height = `${sublist.childElementCount * 31}px`;
        } else{
            sublist.style.height = '0px';
        }
    })
}

menuOpenBtn.addEventListener('click', toggleMenu);

menuItems.forEach(item =>{
    item.addEventListener('mouseover', event => {
        showItemImage(event);
    });
});

menuItems.forEach(item =>{
    item.addEventListener('mouseout', event => {
        hideItemImage(event);
    });
});

menuItems.forEach(item =>{
    item.addEventListener('click', event => {
        toggleItemSublist(event);
    });
});


/*const createLinkObserver = () =>{
    const linkTranslateList = document.querySelectorAll();
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    };
    
    let observer = new IntersectionObserver((entries, observer) =>{
        entries.forEach( entry => {
            const ratio = entry.intersectionRatio;
            let handler;
            if(entry.isIntersecting){
                console.log('intersection listener added');
                handler = createTranslateHandler(entry.target);
                window.addEventListener("scroll", handler);
            } else {
                console.log('intersection listener removed');
                window.removeEventListener("scroll", handler);
            }
        })
    }, options);

    linkTranslateList.forEach(target => {
        observer.observe(target);
    })
}

const createTranslateHandler = (element) =>{
    return handleElementTranslate(element);
}

const handleElementTranslate = (element) =>{
    console.log(element);
     TODO: scroll listener callback 
    const translateY = (element.scrollTop/window.innerHeight)*LINK_TRANSLATE_FRACTION*element.offsetHeight*100; 
    console.log(translateY);
    element.style.transform = `translateY(${translateY}%)`;
}*/

/* BEACH */
const swiper = new Swiper('.swiper', {
    speed: 1000,
    slidesPerGroup: 1,
    slidesPerView: 2.11,
    centeredSlides: true,
    initialSlide: 1,
    grabCursor: true,
    effect: "creative",
    breakpoints: {
    320: {
    slidesPerView: 1.3,
    creativeEffect: {
    prev: {
    shadow: false,
    translate: ["-140%", 0, -700],
    },
    next: {
    shadow: false,
    translate: ["146%", 0, -700],
    },
    },
    },
    1280: {
    slidesPerView: 2.11,
    creativeEffect: {
    prev: {
    shadow: false,
    translate: ["-140%", 0, -500],
    },
    next: {
    shadow: false,
    translate: ["146%", 0, -500],
    },
    },
    }
    },
    navigation: {
      nextEl: '.carousel-button-next',
      prevEl: '.carousel-button-prev',
    }
  });

  swiper.slideTo(1, false,false);

const carouselLinkNameUpdateOnSlideChange = () =>{
    setTimeout(()=>{
        let name;
    
        switch (swiper.activeIndex){
            case 0:
                name = 'DOCKING AT THE BORGO';
                break;
            case 1:
                name = 'MARINELLA PRIVATE BEACH';
                break;
            case 2:
                name = 'BEACH CLUB PIZZERIA & GRILL';
                break;
            default:
                break;
        }
    
        document.querySelector(variables.dataSelectors.carouselLinkName).textContent = name;
    },500)
}

const setLinkTransition = (dirA, dirB) =>{
    const link = document.querySelector(variables.dataSelectors.beachLink);
    
const linkTransition = link.animate([{ transform: `translateX(0)`, opacity: 1 }, { transform: `translateX(${dirA}rem)`, opacity: .5 },{ transform: `translateX(0)`, opacity: 0 }, { transform: `translateX(${dirB/2}rem)`, opacity: .5 }, { transform: `translateX(0)`, opacity: 1 },],     {
        fill: "forwards",
        easing: "ease-in-out",
        duration: 1000,
        iterations: 1
      },);
    linkTransition.play();
}

swiper.on('slideChange', carouselLinkNameUpdateOnSlideChange);
swiper.on('slideNextTransitionStart', function(){
    setLinkTransition(-4, 4);
});

swiper.on('slidePrevTransitionStart', function(){
    setLinkTransition(4, -4);
});