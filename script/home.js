function antrianNav(elem){
    var w = document.querySelector("body").offsetWidth
    if(w < 993 && document.querySelector(".home-antrian-container").classList.contains("notFull")){
        homeFS(true)
    }
    else {
        document.querySelectorAll(".antrian-nav-btn").forEach((p)=>{
            p.classList.remove('active');
            var j = p.getAttribute('for');
            Elem("antrian-nav-" + j).classList.remove('active')
        })
        elem.classList.add("active")
        Elem("antrian-nav-" + elem.getAttribute('for')).classList.add('active')
    }
    

}
function homeSearchFilterReset(){
    document.querySelectorAll(".home-search-filter").forEach((p)=>{
        p.value = ""
    })
}
function homeFS(bo){
    console.log(bo)
    if(bo){document.querySelector(".home-antrian-container").classList.remove('notFull')}
    else {document.querySelector(".home-antrian-container").classList.add('notFull')}
}

