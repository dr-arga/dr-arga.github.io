function leftNavShow(bo){
    if(bo){
        Elem("left-nav").classList.add("left-nav-show")
    }
    else {
        Elem("left-nav").classList.remove("left-nav-show")
    }
}
function NavTo(elem){
    var name = elem.querySelector(".nav-hidden").innerHTML
    var incl = ""
    if(name == "Home"){incl = "/html/home.html"}
    if(name == "Pasien Baru"){incl = "/html/newRegister.html"}
    Elem("mainBox").setAttribute("w3-include-html", incl)
    includeHTML(Elem("central-dashboard"))
    leftNavShow(false)
    var navBtn = document.querySelectorAll(".nav-list")
    var nBtn = 0
    while(nBtn < navBtn.length){
        navBtn[nBtn].classList.remove("active")
        elem.classList.add("active")
        nBtn++
    }
}