var klinikAPI = "https://script.google.com/macros/s/AKfycbyzJ2kU3ZZXryLNrBFo0jiw-rgdM-R_WIrudW9o7wbrZruBTbfKDsuc3WNQIm9mTJrk/exec"
var dbAPI = "https://script.google.com/macros/s/AKfycbxypxG_vsqLAaPdmj_n8WBaev6mii5uaeb-Q6qUJMOFzK-Ubffq3m57fQcwDEwDXyVz/exec"

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
                var outElems = elem.getAttribute("age-output").split(";")
                Elem(outElems[0]).value = ""
                Elem(outElems[1]).value = ""
                Elem(outElems[2]).value = ""
            }   
        }
        if(elem.value.length === 10){
            var dmy = elem.value.split("-")
            var date = new Date(dmy[2]*1, (dmy[1]*1)-1, dmy[0]*1)
            var mo = (dmy[1]*1).toString().length === 1 ? "0" + (dmy[1]*1) : (dmy[1]*1)
            var day = (dmy[0]*1).toString().length === 1 ? "0" + dmy[0]*1 : dmy[0]*1
            var age = dateToAge(date, new Date())
            if(elem.getAttribute("inputPre")){
                Elem(elem.getAttribute("inputPre")).value = [dmy[2]*1, mo, day].join("-")
            }
            if(elem.getAttribute("age-output")){
                var outElems = elem.getAttribute("age-output").split(";") 
                Elem(outElems[0]).value = age.year
                Elem(outElems[1]).value = age.month
                Elem(outElems[2]).value = age.day
            }
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

    if(day1 < 1){day1 += 30; month1--}
    if(month1 < 0){month1 += 12; year1--}
    
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
function dateToInputMask(date){
    var d = new Date(date)
    var mo = d.getMonth() + 1
    if(mo.toString().length === 1){mo = "0" + mo}
    var day = d.getDate()
    if(day.toString().length === 1){day = "0" + day}
    return day + "-" + mo + "-" + d.getFullYear() 
}
function datePreChange(elem){
    var ymd = elem.value.toString().split("-")
    var targetElem = Elem(elem.getAttribute("for"))
    var mo = (ymd[1]*1).toString().length === 1 ? "0" + (ymd[1]*1) : (ymd[1]*1)
    var day = (ymd[2]*1).toString().length === 1 ? "0" + ymd[2]*1 : ymd[2]*1
    targetElem.value = [day,mo,ymd[0]].join('-')
    if(targetElem.getAttribute("age-output")){
        var outElems = targetElem.getAttribute("age-output").split(";")
        var age = dateToAge(new Date(elem.value), new Date())
        Elem(outElems[0]).value = age.year
        Elem(outElems[1]).value = age.month
        Elem(outElems[2]).value = age.day
    }
    // targetElem.onchange()
}
function generateRMManual(type){
    var outputElem = type == "new" ? Elem("newReg-norm") : Elem("editPat-norm") 
    var inputElem = type == "new" ? Elem("newReg-nama") : Elem("editPat-nama")
    var namaLengkap = inputElem.value 
    if(namaLengkap == "" || namaLengkap.replace(" ","").length == 0){
        alert("Nama masih kosong"); inputElem.focus(); return
    }

    if(type=="new"){
        if(namaLengkap == "" || namaLengkap.replace(" ","").length == 0){
            outputElem.value = ""
        } else {
            outputElem.value = generateNewRM(namaLengkap)
        }
    } else {
        var oldRM = Elem("editPat-noRMBefore").value
        if(namaLengkap == "" || namaLengkap.replace(" ","").length == 0 || namaLengkap.toString().substring(0,1) == oldRM.toString().substring(3,4)){
            if(confirm("Membuat nomor RM baru berarti membuat data pasien baru.\nLanjut membuat data pasien baru dengan data yang sama?")){
                copyOldRMToNewOne()
            } else {
                return
            }
        } else {
            outputElem.value = generateNewRM(namaLengkap)
        }
    }
}
function generateNewRM(namalengkap){
    var year = new Date().getFullYear().toString().substring(2)
    var lastRM = checkingLastRM(year + "-" + namalengkap.substring(0,1).toUpperCase())
    var newRM = "0".repeat(4 - (lastRM+1).toString().length) + (lastRM+1)
    return year + "-" + namalengkap.substring(0,1).toUpperCase() + "-" + newRM
}
function autoNoRM(nama, type){
    var outputElem = type == "new" ? Elem("newReg-norm") : Elem("editPat-norm") 
    if(type=="new"){
        if(nama == "" || nama.replace(" ","").length == 0){
            outputElem.value = ""
        } else {
            outputElem.value = generateNewRM(nama)
        }
    } else {
        var oldRM = Elem("editPat-noRMBefore").value
        if(nama == "" || nama.replace(" ","").length == 0 || nama.toString().substring(0,1) == oldRM.toString().substring(3,4)){
            outputElem.value = oldRM
        } else {
            outputElem.value = generateNewRM(nama)
        }
    }
}
function checkingLastRM(value){
    var nDB = 0;
    var RMArr = [];
    var db = database.pasienDB
    var noRMList = Object.keys(db)
    while(nDB < noRMList.length){
        // var item = database.pasienDB[nDB]
        var noRM = noRMList[nDB]
        if(noRM.toString().substring(0,4) == value){
            RMArr.push(noRM.toString().substring(5)*1)
        }
        nDB++
    }
    var lastRM = 0
    if(RMArr.length > 0){
        lastRM = Math.max(...RMArr)
    }
    return lastRM
}
function setJam(elem, targetID){
    var today = new Date()
    if(elem.value == dateToInput(today)){
        if(today.getHours()<9){
            Elem(targetID).value = "Pagi"
            Elem(targetID).querySelector("option:nth-child(1)").disabled = false
            Elem(targetID).querySelector("option:nth-child(2)").disabled = false
        }
        if(today.getHours()>8 && today.getHours()<19){
            Elem(targetID).value = "Sore"
            Elem(targetID).querySelector("option:nth-child(1)").disabled = true    
        }
        if(today.getHours()>18){
            Elem(targetID).value = ""
            Elem(targetID).querySelector("option:nth-child(1)").disabled = true
            Elem(targetID).querySelector("option:nth-child(2)").disabled = true
        }
    } else {
        Elem(targetID).value = "Pagi"
        Elem(targetID).querySelector("option:nth-child(1)").disabled = false
        Elem(targetID).querySelector("option:nth-child(2)").disabled = false
    }
}
async function copyOldRMToNewOne(){
    var idTypeArr = ["nama", "ttl", "tahun", "bulan", "hari", "alamat", "telp", "email", "ayah-nama", "ayah-pekerjaan", "ibu-nama", "ibu-pekerjaan", "uk", "bbl", "pbl", "lkl"]
    var beforeVal = {}
    for(var i = 0; i< idTypeArr.length; i++){
        beforeVal[idTypeArr[i]] = Elem("editPat-" + idTypeArr[i]).value
    }
    beforeVal["gender"] = document.querySelector("[name='editpat-gender']:checked").id.toString().substring(15)
    console.log(beforeVal)
    closeEditPatient()
    if(document.querySelector("body").offsetWidth > 992){
        Elem("home-middle-container").setAttribute("w3-include-html", "/html/newRegister.html")
        await includeHTML(Elem("home-container"))
    }   
    else {
        Elem("home-modal-includes").setAttribute("w3-include-html", "/html/newRegister.html")
        await includeHTML(Elem("home-modal"))
        Elem("home-modal").classList.remove("modal-hidden")   
    }
    for(var i = 0; i< idTypeArr.length; i++){
        Elem("newReg-" + idTypeArr[i]).value = beforeVal[idTypeArr[i]]
    }
    Elem("newreg-gender-" + beforeVal.gender).checked = true
    reMasking(Elem("newReg-ttl"),'tanggal')
    generateRMManual('new')

    var today = new Date()
    var soapJam = "Pagi"
    var soapTgl = dateToInput(today)
    if(today.getHours()<9){soapJam = "Pagi"}
    if(today.getHours()>8 && today.getHours()<19){
        soapJam = "Sore"
        Elem("newReg-jamAntri").querySelector("option:nth-child(1)").disabled = true    
    }
    if(today.getHours()>18){
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1)
        soapTgl = dateToInput(tomorrow)
    }
    Elem("newReg-jamAntri").value = soapJam
    Elem("newReg-tglAntri").value = soapTgl
}