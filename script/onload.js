function onload(){
    includeHTML(document.querySelector("body"))
    setTimeout(HideDiv, 1000)
    // setTimeout(setEvent_Navigation, 500)
    developing(false)
}
function HideDiv(){
    var j = document.querySelectorAll("#hidden-div > div")
    var nJ = 0
    while(nJ < j.length){
        j[nJ].classList.add("d-none")
    nJ++
    }
}
