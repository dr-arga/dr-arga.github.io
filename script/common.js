function developing(bo){
    if(bo){
        Elem("mainFrame").setAttribute("w3-include-html", "/html/dashboard.html");
    }
}

var klinikAPI = "https://script.google.com/macros/s/AKfycbyzJ2kU3ZZXryLNrBFo0jiw-rgdM-R_WIrudW9o7wbrZruBTbfKDsuc3WNQIm9mTJrk/exec"
var database = {
    color:{
        html: {
            basecolor:{1:"rgb(18, 18, 83)" , 2:"brown"},
            baseColorActive:{1:"rgb(34, 34, 140)" , 2:"rgb(198, 57, 57)"}
        }
    }
}
function spinner(bo) {
    if (bo) {
      Elem("loader").classList.remove("d-none");
    } else if (!bo) {
      Elem("loader").classList.add("d-none");
    }
}
function Elem(id) {
    return document.getElementById(id);
}
async function includeHTML(elem){
    // console.log(elem)
    var z = elem.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            let response = await fetch(file)
            elmnt.innerHTML = await response.text()
        }
    }
}
