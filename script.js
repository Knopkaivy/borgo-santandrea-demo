const variables = {
    dataSelectors: {
        languagesDropdown: '[data-languages-dropdown]',
        languagesAlternative: '[data-languages-alternative]',
        languagesChevron: '[data-languages-chevron]',
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
    },
    idSelectors: {
        navBar: '#section-navbar',
    }
};
const NAVBAR_HEIGHT = 108;
const NAVBAR_STICKY_HEIGHT = 288;
const LINK_TRANSLATE_FRACTION = .5;

const navBar = document.querySelector(variables.idSelectors.navBar);
const languagesDropdown = document.querySelector(variables.dataSelectors.languagesDropdown);
const languagesAlternative = document.querySelector(variables.dataSelectors.languagesAlternative);
const languagesChevron = document.querySelector(variables.dataSelectors.languagesChevron);
const volume = document.querySelector(variables.dataSelectors.volume);
const volumeMute = document.querySelector(variables.dataSelectors.volumeMute);
const volumeMedium = document.querySelector(variables.dataSelectors.volumeMedium);


let oldScroll = 0;

languagesDropdown.addEventListener('click', ()=>{
    languagesAlternative.classList.toggle(variables.classes.languageAlternativeHide);
    languagesAlternative.classList.toggle(variables.classes.languageAlternativeShow);

    languagesChevron.classList.toggle(variables.classes.chevronDown);
    languagesChevron.classList.toggle(variables.classes.chevronUp);
});

volume.addEventListener('click', () =>{
    volumeMute.classList.toggle(variables.classes.hidden);
    volumeMedium.classList.toggle(variables.classes.hidden);
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
        createLinkObserver();
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
