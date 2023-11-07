$(function () {
    AOS.init();
    // const sameHeight1_list = document.querySelectorAll(".same-height1");
    const sameHeight2_list = document.querySelectorAll(".same-height2");
    // setSameHeight(sameHeight1_list);
    setSameHeight(sameHeight2_list);

    window.addEventListener("resize", function () {
        // setSameHeight(sameHeight1_list);
        setSameHeight(sameHeight2_list);
    });

    const swiper = new Swiper(".swiper", {
        loop: true,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    $(".nav-toggle").on("click", function () {
        $(this).toggleClass("active");
    });

    $(".nav-content nav a").on("click", function () {
        const dataID = $(this).parent()[0].getAttribute("data-id");
        let targetDOM = undefined;
        if (dataID.includes("introduction")) {
            const intrIndex = dataID.replace("introduction", "");
            targetDOM = $(`*[data-section=introduction]`)[0];
            $(`.intr-nav a[data-index=${intrIndex}]`).click();
        } else {
            targetDOM = $(`*[data-section=${dataID}]`)[0];
        }
        const elementRect = targetDOM.getBoundingClientRect();
        const offsetTop = elementRect.top;

        const targetPosition = window.scrollY + offsetTop + 2;
        $(".nav-toggle").removeClass("active");
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
        });
    });

    $(".card.video .card-header ul li a").on("click", function () {
        const currentActiveTab = $(".card.video .card-header ul li.active")[0];
        const clickTab = $(this).parent()[0];
        if (currentActiveTab === clickTab) return;

        const clickVideoID = clickTab.getAttribute("data-videoID");
        player.loadVideoById(clickVideoID);
        $(this).parent().addClass("active").siblings("li").removeClass("active");
    });

    $(".intr-nav a").on("click", function () {
        const dataIndex = $(this)[0].getAttribute("data-index");
        $(this).parent().addClass("active").siblings("li").removeClass("active");
        $(`.intr-content[data-index=${dataIndex}]`).addClass("active").siblings(".intr-content").removeClass("active");
    });

    // 監聽scroll以變更menu nav選項之active樣式
    const elements = document.querySelectorAll(".nav-section"); // 用你的DOM元素的ID替换 'your-element-id'
    let sectionNav_elements = [];
    elements.forEach((element) => {
        const dataIndex = parseInt(element.getAttribute("data-section-index"));
        const dataSection = element.getAttribute("data-section");
        sectionNav_elements.push({
            dom: element,
            section: dataSection,
            index: dataIndex,
        });
    });
    sectionNav_elements.sort((x, y) => y.index - x.index);

    handleHeaderFixed();

    let scrollTimer;
    let isScrolling = false;
    window.addEventListener("scroll", () => {
        if (!isScrolling) {
            $("header").addClass("hide");
            $(".nav-toggle").removeClass("active")
        }
        clearTimeout(scrollTimer);

        isScrolling = true;

        scrollTimer = setTimeout(() => {
            $("header").removeClass("hide");
            isScrolling = false;
        }, 1500);

        handleHeaderFixed();

        // 變更menu nav選項之active樣式
        for (let i = 0; i < sectionNav_elements.length; i++) {
            const obj = sectionNav_elements[i];
            const elementRect = obj.dom.getBoundingClientRect();
            if (elementRect.top <= 0) {
                let currentNavItem = undefined
                console.log("超出" + obj.section, currentNavItem)
                if (obj.section === "introduction") {
                    const currentIntrIndex = $(".intr-nav li.active a")[0].getAttribute("data-index")
                    currentNavItem = $(`.nav-content li[data-id=introduction${currentIntrIndex}]`);
                } else {
                    currentNavItem = $(`.nav-content li[data-id=${obj.section}]`);
                }
                currentNavItem.addClass("active").siblings("li").removeClass("active");
                break;
            }
        }
    });
});

function handleHeaderFixed() {
    // 下滑至一定高度，將header變為fixed
    const scrollTop = window.scrollY;
    if (scrollTop > 135) {
        const cardWidth = $(".card.kv").width();
        $("header").addClass("fixed");
        $("header").width(cardWidth + "px");
    } else {
        $("header").removeClass("fixed");
        $("header").width("100%");
    }
}

function setSameHeight(doms) {
    doms.forEach((element) => {
        element.style.height = "auto";
    });

    setTimeout(() => {
        // 初始化變數以存儲最大高度
        let maxHeight = 0;

        // 計算最大高度
        doms.forEach((element) => {
            const elementHeight = element.clientHeight;
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        });

        // 將所有元素設為相同的最大高度
        doms.forEach((element) => {
            element.style.height = `${maxHeight}px`;
        });
    }, 0);
}

// GPT寫法
function setSameHeight_gpt(doms) {
    // 初始化變數以存儲最大高度
    let maxHeight = 0;

    // 計數器，用於跟踪已加載的圖片數量
    let loadedImageCount = 0;

    // 監聽每個元素中的圖片的load事件
    const images = [];

    doms.forEach((element) => {
        const elementImages = element.getElementsByTagName("img");
        Array.prototype.push.apply(images, elementImages);
    });

    for (let i = 0; i < images.length; i++) {
        console.log(images[i])
        images[i].addEventListener("load", function () {
            console.log("ok");
            loadedImageCount++;

            // 檢查是否所有圖片都已經加載完成
            if (loadedImageCount === images.length) {
                // 所有圖片都已經加載完成，執行高度調整程式碼
                doms.forEach((element) => {
                    element.style.height = `${maxHeight}px`;
                });
            }
        });

        // 檢查圖片是否已經在快取中
        if (images[i].complete) {
            loadedImageCount++;
        }
    }

    // 如果沒有圖片，也執行高度調整程式碼
    if (images.length === 0) {
        doms.forEach((element) => {
            const elementHeight = element.clientHeight;
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        });
        doms.forEach((element) => {
            element.style.height = `${maxHeight}px`;
        });
    }
}

// youtube iframe
const tag = document.createElement("script");
let initVideoID = "4m2ga0gN7RU";
let player;

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "100%",
        width: "100%",
        videoId: initVideoID,
        playerVars: { autoplay: 1, muted: 1 },
        events: {
            // onReady: onPlayerReady,
            // onStateChange: onPlayerStateChange,
        },
    });
}
function onPlayerReady(event) {
    player.mute();
    event.target.playVideo();
}

// var done = false;
// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         setTimeout(stopVideo, 6000);
//         done = true;
//     }
// }
// function stopVideo() {
//     player.stopVideo();
// }
