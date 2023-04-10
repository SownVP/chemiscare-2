const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let user;
handleDarkMode();
setCss();
if(screen.width <= 1000){
    $('.nav_main').style.display = "none";
}
window.addEventListener("resize", ()=>{
    if(screen.width <= 1000){
        $('.nav_main').style.display = "none";
    }else{
        $('.nav_main').style.display = "block";
    }
})
function getData(){
    fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(
            ([data]) =>{
                user = data;
                start();
            }
        )
}
getData();

function start(){
    addEvent();
    
    setData();
}
start();
function setData(){
    $('.user_menu_userName').innerText = user.name;
    $('.user_menu_userSchool').innerText = '@' + user.school;
}
function addEvent(){
    $('.change_theme_mode_btn').onclick = ()=>{
        if($('body').classList.contains('darkmode')){
            handleLightMode();
        }else{
            handleDarkMode();
        }
    }
    $$('.nav_item').forEach(item =>{
        item.onclick = ()=>{
            $('.nav_item_wrapper').style.top = `${item.offsetTop}px`;
            $('.nav_item.active').classList.remove('active');
            item.classList.add('active');
        }
    })
    $('.user_menu_wrapper').onclick = ()=>{
        if($('.user_menu').classList.contains('hidden')){
            handleOpen($('.user_menu'), 'block');
        }else{
            handleClose($('.user_menu'), 'block');
        }
    }
    $('.tutorial_open_btn').onclick = (e)=>{
        if($('.tutorial_start_wrapper').classList.contains('hidden')){
            handleOpen($('.tutorial_start_wrapper'), 'flex');
            handleClose($('.tutorial_open_btn'), 'block');
        }
    }
    $('.tutorial_start_close_btn').onclick = (e)=>{
        if($('.tutorial_start_wrapper').classList.contains('flex')){
            handleClose($('.tutorial_start_wrapper'), 'flex');
            handleOpen($('.tutorial_open_btn'), 'block');
        }
    }
    $('.nav_open_btn').onclick = ()=>{
        handleOpen($('.nav_onTablet'), 'block');
    }
    $('.nav_close_btn').onclick = ()=>{
        handleClose($('.nav_onTablet'), 'block');
    }
}
function handleDarkMode(){
    $('body').classList.add('darkmode');
    $('.theme_mode_dark').style.color ='#fde047';
    $('.change_theme_mode_btn').style.borderColor = '#e8e8e8';
    $('.search_bar').onfocus = ()=>{
        $('.search_bar_wrapper').style.borderColor = '#e8e8e8';
    }
    $('.search_bar').onblur = ()=>{
        $('.search_bar_wrapper').style.borderColor = '#ccc';
    }
}
function handleLightMode(){
    $('body').classList.remove('darkmode');
    $('.theme_mode_dark').style.color ='#1a1a1a';
    $('.change_theme_mode_btn').style.borderColor = '#333';
    $('.search_bar').onfocus = ()=>{
        $('.search_bar_wrapper').style.borderColor = '#333';
    }
    $('.search_bar').onblur = ()=>{
        $('.search_bar_wrapper').style.borderColor = '#e8e8e8';
    }
}
function handleOpen(elm, status){
    elm.classList.remove('hidden');
    elm.classList.add(status);
}
function handleClose(elm, status){
    elm.classList.remove(status);
    elm.classList.add('hidden');
}
function setCss(){
    $('.nav_item_wrapper').style.top = `${$('.nav_item.active').offsetTop}px`;
    $('.tutorial_open_btn').style.transform = `translateX(${($('.tutorial_open_btn').clientWidth - $('.tutorial_open_btn').clientHeight) / 2}px)`;
}