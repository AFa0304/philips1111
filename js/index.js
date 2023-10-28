$(function () {
    const sameHeight1_list = document.querySelectorAll(".same-height1")
    const sameHeight2_list = document.querySelectorAll(".same-height2")
    setSameHeight(sameHeight1_list)
    setSameHeight(sameHeight2_list)

    window.addEventListener("resize", function () {
        setSameHeight(sameHeight1_list)
        setSameHeight(sameHeight2_list)
    })

    const swiper = new Swiper('.swiper', {
        loop: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
})

function setSameHeight(doms) {
    doms.forEach(element => {
        element.style.height = 'auto';
    });

    setTimeout(() => {
        // 初始化變數以存儲最大高度
        let maxHeight = 0;

        // 計算最大高度
        doms.forEach(element => {
            const elementHeight = element.clientHeight;
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        });

        // 將所有元素設為相同的最大高度
        doms.forEach(element => {
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

    doms.forEach(element => {
        const elementImages = element.getElementsByTagName('img');
        Array.prototype.push.apply(images, elementImages);
    });

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('load', function () {
            console.log("ok");
            loadedImageCount++;

            // 檢查是否所有圖片都已經加載完成
            if (loadedImageCount === images.length) {
                // 所有圖片都已經加載完成，執行高度調整程式碼
                doms.forEach(element => {
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

        doms.forEach(element => {
            const elementHeight = element.clientHeight;
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        });
        doms.forEach(element => {
            element.style.height = `${maxHeight}px`;
        });
    }
}