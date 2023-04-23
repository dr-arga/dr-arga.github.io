var klinikAPI = "https://script.google.com/macros/s/AKfycbyzJ2kU3ZZXryLNrBFo0jiw-rgdM-R_WIrudW9o7wbrZruBTbfKDsuc3WNQIm9mTJrk/exec"
var dbAPI = "https://script.google.com/macros/s/AKfycbyvBk0jRn8-i7LKAW9JJnagO30cyc3LchbNTGx6pwwxh-ZSh-YjzA51ShnLvM79HDJf/exec"

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
        IMask(elem, maskOptions)
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
    if(type == "telp"){
        var maskOptions = {
            mask: /^\d+$/,
        };
        IMask(elem, maskOptions)
    }

    if(type == "email"){
        var maskOptions = {
            mask: /^\S*@?\S*$/
        };
        IMask(elem, maskOptions)
    }
    if(type == "tanggal"){
        var momentFormat = 'DD-MM-YYYY';
        var momentMask = new IMask(elem, {
            mask: Date,
            pattern: 'd`-m`-00000',
        });
        if(elem.value.length >0 && elem.value.length < 10){
            if(elem.getAttribute("inputPre")){
                Elem(elem.getAttribute("inputPre")).value = ""
            }
            if(elem.getAttribute("age-output")){
                Elem(outElems[0]).value = ""
                Elem(outElems[1]).value = ""
                Elem(outElems[2]).value = ""
            }   
        }
        if(elem.value.length === 10){
            var dmy = elem.value.split("-")
            var date = new Date(dmy[2]*1, (dmy[1]*1)-1, dmy[0]*1)
            var age = dateToAge(date, new Date())
            // console.log(age)
            var outElems = elem.getAttribute("age-output").split(";") 
            Elem(outElems[0]).value = age.year
            Elem(outElems[1]).value = age.month
            Elem(outElems[2]).value = age.day
        }
        
    }
}
function noRMLeave(elem){
    var text = elem.value
    var ID = elem.id
    if(text.length < 9 && text.length > 5){
        console.log("asas")
        var num = text.substring(5)*1
        // console.log(num)
        var j = text.substring(0,5) + "0".repeat(4 - num.toString().length) + num
        console.log(j)
        elem.value = j
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
function dateToInput(date){
    var d = new Date(date)
    var mo = d.getMonth() + 1
    if(mo.toString().length === 1){mo = "0" + mo}
    var day = d.getDate()
    if(day.toString().length === 1){day = "0" + day}
    return d.getFullYear() + "-" + mo + "-" + day
}

function maskingDate(elem){
    // var value = elem.value
    function j(value){
    //   const maskDate = value => {
        let v = value.replace(/\D/g,'').slice(0, 10);
        if (v.length >= 5) {
          return `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
        }
        else if (v.length >= 3) {
          return `${v.slice(0,2)}/${v.slice(2)}`;
        }
        return v
    //   }
    }

  elem.value = j(elem.value)
}