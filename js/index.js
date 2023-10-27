$(function () {
    const sameHeight1_list = document.querySelectorAll(".same-height1")
    const sameHeight2_list = document.querySelectorAll(".same-height2")
    setSameHeight(sameHeight1_list)
    setSameHeight(sameHeight2_list)

    window.addEventListener("resize", function(){
        setSameHeight(sameHeight1_list)
        setSameHeight(sameHeight2_list)
    })
})

function setSameHeight(doms){
    let maxHeight = 0;

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