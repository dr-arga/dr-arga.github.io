function onload(){
    includeHTML(document.querySelector("body"))
    HideDiv()
}
function HideDiv(){
    console.log("Hiding hidden-element....")
    var j = document.querySelectorAll("#hidden-div > div")
    var nJ = 0
    while(nJ < j.length){
        j[nJ].classList.add("d-none")
    nJ++
    }
}