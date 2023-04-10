function onload(){
    includeHTML()
    setTimeout(HideDiv, 1000)
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