var klinikAPI = "https://script.google.com/macros/s/AKfycbyzJ2kU3ZZXryLNrBFo0jiw-rgdM-R_WIrudW9o7wbrZruBTbfKDsuc3WNQIm9mTJrk/exec"
var database = {
    color:{
        html: {
            basecolor:{1:"rgb(18, 18, 83)" , 2:"purple"},
            baseColorActive:{1:"rgb(34, 34, 140)" , 2:"rgb(197, 39, 197)"}
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
async function includeHTMLSingle(target){
    let response = await fetch(target.getAttribute("w3-include-html"))
    target.innerHTML = await response.text()
}
async function includeHTML(parent){
    var z = parent.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            file = elmnt.getAttribute("w3-include-html");
            if (file) {
                let response = await fetch(file)
                elmnt.innerHTML = await response.text()
            }
    }
}
function reMasking(elem, type){
    if(type == "noRM"){
        var maskOptions = {
            mask: '00-a-0000',
            prepare: function (str) {
                return str.toUpperCase();
              }
        };
        IMask(elem, maskOptions);
    }
    if(type == "upperCase"){
        var text = elem.value
        elem.value = text.toString().toUpperCase()
    }
}
