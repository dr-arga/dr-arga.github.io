function onload(){
    includeHTML(document.querySelector("body"))
    HideDiv()
    console.log("Asas")
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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}