
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let user;
let postData;
setCss();
localStorage.displayMode == 'dark' ? handleDarkMode() : handleLightMode();
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
function getData() {
    // fetch('http://localhost:3000/data/')
    //     .then(res => res.json())
    //     .then(
    //         (data) => {
    //             postData = data;
    //             $('body').classList.remove('loading');
    //             start();
    //         }
    //     )
    start();
}
getData();

function start() {
    addEvent();
    setData();
}
function setData() {
    // $('.user_menu_userName').innerText = user.name;
    // $('.user_menu_userSchool').innerText = '@' + user.school;
    setPost();
}
function setPost() {
    $('.listPost').innerText = '';
    postData.forEach((item) => {
        $('.listPost').insertAdjacentHTML(
            'beforeend',
            `
                <li class="my-[8px] w-[100%] rounded-[16px] p-[24px] bg-[#E0F2FE] post">
                    <div class="flex justify-between">
                        <div class="flex items-center flex-grow">
                            <div class="mr-[4px] post_author_avt">
                                <img class="w-[28px] h-[28px] object-cover rounded-[50%]"
                                    src="${item.author.avt}"
                                    alt=""
                                >
                            </div>
                            <p class="font-medium post_author_name">${item.author.name}</p>
                        </div>
                        <div class="flex items-center post_interact">
                            <i class="cursor-pointer fa-regular fa-bookmark mr-[8px] post_Reaction"></i>
                            <i class="cursor-pointer fa-solid fa-bookmark mr-[8px] text-[#d54253] post_Reaction__active"
                                style="display: none;"></i>
                            <div class="relative">
                                <i class="cursor-pointer fa-solid fa-ellipsis post_More__icon"></i>
                                <ul style="top: calc(100% + 4px);"
                                class="px-[12px] py-[10px] absolute rounded-[4px] right-0 bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer text-[#333] hidden post_More__list">
                                <li class="flex items-center">
                                    <i class="fa-solid fa-flag mr-[4px]"></i>
                                    <span class="whitespace-nowrap">Báo cáo bài viết</span>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mt-[8px] mb-[16px] flex itemPostContent">
                        <div class="mr-[24px]">
                            <p class="text-[20px] font-[700] cursor-pointer post_inf_title">${item.post.title}</p>
                            <p class="mt-[4px] leading-[1.6] text-[15px] font-light post_inf_des">${item.post.des}</p>
                        </div>
                        <img class="itemPostContent_img object-cover w-[40%] rounded-[16px] cursor-pointer ${item.post.statusImg}" src="${item.post.img}" alt="">
                    </div>
                    <div class="flex items-center">
                        <p class="opacity-[0.9] post_inf_postTime">${item.post.postTime}</p>
                        <i class="opacity-[0.9] fa-solid fa-circle text-[4px] mx-[8px] post_seperateDot"></i>
                        <p class="opacity-[0.9] post_inf_readTime">${item.post.readTime}</p>
                    </div>
                </li>
            `
        );
    })
}
function addEvent() {
    $('.change_theme_mode_btn').onclick = () => {
        if ($('body').classList.contains('darkmode')) {
            handleLightMode();
            localStorage.displayMode = 'light';
        } else {
            handleDarkMode();
        }
    }
    $$('.nav_item').forEach(item => {
        item.onclick = () => {
            $('.nav_item_wrapper').style.top = `${item.offsetTop}px`;
            $('.nav_item.active').classList.remove('active');
            item.classList.add('active');
        }
    })
    $('.user_menu_wrapper').onclick = () => {
        if ($('.user_menu').classList.contains('hidden')) {
            handleOpen($('.user_menu'), 'block');
        } else {
            handleClose($('.user_menu'), 'block');
        }
    }
    $('.nav_open_btn').onclick = ()=>{
        handleOpen($('.nav_onTablet'), 'block');
    }
    $('.nav_close_btn').onclick = ()=>{
        handleClose($('.nav_onTablet'), 'block');
    }
    $('.tutorial_open_btn').onclick = (e) => {
        if ($('.tutorial_start_wrapper').classList.contains('hidden')) {
            handleOpen($('.tutorial_start_wrapper'), 'flex');
            handleClose($('.tutorial_open_btn'), 'block');
        }
    }
    $('.tutorial_start_close_btn').onclick = (e) => {
        if ($('.tutorial_start_wrapper').classList.contains('flex')) {
            handleClose($('.tutorial_start_wrapper'), 'flex');
            handleOpen($('.tutorial_open_btn'), 'block');
        }
    }
    $('.comment_writeInput').onkeyup = ()=>{
        if($('.comment_writeInput').value != ''){
            $('.comment_sentBtn').style.backgroundColor = '#38B6FF';
            $('.comment_sentBtn').classList.add('btn');
        }else{
            $('.comment_sentBtn').style.backgroundColor = '#ccc';
            $('.comment_sentBtn').classList.remove('btn');
        }
    }
    $$('.comment_Icon__open').forEach(function (elm) {
        elm.addEventListener('click', function () {
            $('.comment_Wrapper').style.display = 'block'
        })
    })

    $('.comment_Icon__close').addEventListener('click', function () {
        $('.comment_Wrapper').style.display = 'none'
    })

    $$('.post_Reaction').forEach(function (post_Reaction, index) {
        post_Reaction.addEventListener('click', function () {
            $$('.post_Reaction__active')[index].style.display = 'inline';
            post_Reaction.style.display = 'none'
        })
    })
    $$('.post_Reaction__active').forEach(function (post_Reaction__active, index) {
        post_Reaction__active.addEventListener('click', function () {
            $$('.post_Reaction')[index].style.display = 'inline';
            post_Reaction__active.style.display = 'none'
        })
    })
}
function handleDarkMode() {
    localStorage.displayMode = 'dark';
    $('body').classList.add('darkmode');
    $('.theme_mode_dark').style.color = '#fde047';
    $('.change_theme_mode_btn').style.borderColor = '#e8e8e8';
    $('.search_bar').onfocus = () => {
        $('.search_bar_wrapper').style.borderColor = '#e8e8e8';
    }
    $('.search_bar').onblur = () => {
        $('.search_bar_wrapper').style.borderColor = '#ccc';
    }
}
function handleLightMode() {
    localStorage.displayMode = 'light';
    $('body').classList.remove('darkmode');
    $('.theme_mode_dark').style.color = '#1a1a1a';
    $('.change_theme_mode_btn').style.borderColor = '#333';
    $('.search_bar').onfocus = () => {
        $('.search_bar_wrapper').style.borderColor = '#333';
    }
    $('.search_bar').onblur = () => {
        $('.search_bar_wrapper').style.borderColor = '#e8e8e8';
    }
}
function handleOpen(elm, status) {
    elm.classList.remove('hidden');
    elm.classList.add(status);
}
function handleClose(elm, status) {
    elm.classList.remove(status);
    elm.classList.add('hidden');
}
function setCss(){
    $('.nav_item_wrapper').style.top = `${$('.nav_item.active').offsetTop}px`;
    $('.tutorial_open_btn').style.transform = `translateX(${($('.tutorial_open_btn').clientWidth - $('.tutorial_open_btn').clientHeight) / 2}px)`;
}