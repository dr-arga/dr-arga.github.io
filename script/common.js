var klinikAPI = "https://script.google.com/macros/s/AKfycbyzJ2kU3ZZXryLNrBFo0jiw-rgdM-R_WIrudW9o7wbrZruBTbfKDsuc3WNQIm9mTJrk/exec"
var dbAPI = "https://script.google.com/macros/s/AKfycbwixBBa130qYBAYDaEBWfYv9uzA-NZq0UEckEHdNGyV-FECZbEGGS1gxSGvw12PE_NH/exec"

var database = {
    color:{
        html: {
            basecolor:{1:"rgb(18, 18, 83)" , 2:"purple"},
            baseColorActive:{1:"rgb(34, 34, 140)" , 2:"rgb(197, 39, 197)"}
        }
    }
}
var globVar = {
    shortMo : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep","Okt","Nov","Des" ]
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
    if(type == "uk"){
        var maskOptions = {
            mask: '00 mg + 0',
        };
        IMask(elem, maskOptions);
    }
}
function dateToAge(dateFirst, dateSecond){
    var res = {year:0, month:0, day:0}
    var date1 = new Date(dateFirst)
    var date2 = new Date(dateSecond)
    var dayDif = date2.getDate() - date1.getDate()
    var monthDif = date2.getMonth() - date1.getMonth()
    var yearDif = date2.getFullYear() - date1.getFullYear()
    if(dayDif < 0){
        res.day = dayDif + 30
        monthDif--
    } 
    else {
        res.day = dayDif
    }
    if(monthDif < 0){
        res.month = monthDif + 11
        yearDif--
    } else {
        res.month = monthDif
    }
    res.year = yearDif
    return res
}
function manualToTTL(day, month, year, date){
    var date1 = new Date(date)
    var year1 = date1.getFullYear() - year
    var month1 = date1.getMonth() - month
    var day1 = date1.getDate() - day

    if(day1 < 1){day1 + 30; month1--}
    if(month1 < 0){month1 + 11; year1--}
    
    ttl = new Date(year1, month1, day1)
    return ttl
}