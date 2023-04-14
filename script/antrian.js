function antrianNav(elem){
    document.querySelectorAll(".antrian-nav-btn").forEach((p)=>{
        p.classList.remove('active');
        var j = p.getAttribute('for');
        Elem("antrian-nav-" + j).classList.remove('active')
    })
    elem.classList.add("active")
    Elem("antrian-nav-" + elem.getAttribute('for')).classList.add('active')
}