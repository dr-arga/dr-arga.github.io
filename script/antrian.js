function antrianPaneTab(elem){
    var tabs = document.querySelectorAll(".home-left > .antrian-pane > .tab > div")
    tabs.forEach((p)=>{
        p.classList.remove("active")
        Elem(p.getAttribute("for")).classList.add('d-none')
    })
    elem.classList.add("active")
    Elem(elem.getAttribute("for")).classList.remove("d-none")
}