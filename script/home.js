// var EditReservasiID = ""
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
    homeSearch(Elem("home-search-norm"))
}
function homeFS(bo){
    if(bo){document.querySelector(".home-antrian-container").classList.remove('notFull')}
    else {document.querySelector(".home-antrian-container").classList.add('notFull')}
}
function HomeReset(){
    console.log("home reset...")
    var resetInput = document.querySelectorAll(".homereset")
    var nInp = 0
    while(nInp < resetInput.length){
        if(resetInput[nInp].tagName == "DIV"){resetInput[nInp].innerHTML = "--------"}
        if(resetInput[nInp].tagName == "INPUT"){resetInput[nInp].value = ""}
        nInp++
    }
    var table = Elem("home-search-tableBody")
    table.innerHTML = ""
    homeSearchFilterReset()
    
    var today = new Date()
    var antriJam = "Pagi"
    var antriTgl = dateToInput(today)
    if(today.getHours()<9){antriJam = "Pagi"}
    if(today.getHours()>8 && today.getHours()<19){
        antriJam = "Sore"    
    }
    if(today.getHours()>18){
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1)
        antriTgl = dateToInput(tomorrow)
    } 
    Elem("antrian-date").value = antriTgl
    Elem("antrian-jam").value = antriJam
    UpdateAntrian()
    EditReservasiID = ""
}
function homeSearch(elem){
    var elemType = elem.id.substring(12)
    var table = Elem("home-search-tableBody")
    table.innerHTML = ""
    if(elemType == "norm"){
        var noRM = Elem("home-search-norm").value
        // console.log(noRM)
        Elem("home-search-nama").value = ""
        Elem("home-search-ot").value = ""
        Elem("home-search-alamat").value = ""
        var data = database.pasienDB
        var noRMArr = Object.keys(data)
        // console.log(noRMArr)
        var res = []
        var nD = 0
        while(nD < noRMArr.length){
            var include = false
            if(noRM !== "" && noRMArr[nD].toString().indexOf(noRM.toUpperCase()) > -1){include = true}
            if(include){res.push(data[noRMArr[nD]])}
            nD++        
        }
    }
    else {
        var nama = Elem("home-search-nama").value
        var ot = Elem("home-search-ot").value
        var alamat = Elem("home-search-alamat").value
        Elem("home-search-norm").value = ""
        var data = database.pasienDB
        var noRMList = Object.keys(data)
        var res = []
        var nD = 0
        if(nama =="" && ot =="" && alamat =="" ){
            res = []
        }else {            
            while(nD < noRMList.length){
                var item = data[noRMList[nD]]
                var namaInclude = true
                var otInclude = true
                var alamatInclude = true
                
                if(nama !== "" & item.namaLengkap.toUpperCase().indexOf(nama.toUpperCase()) < 0){namaInclude = false}
                var otAll = item.ayahNama+item.ibuNama
                if(ot !== "" & otAll.toUpperCase().indexOf(ot.toUpperCase()) < 0){otInclude = false}
                if(alamat !== "" & item.alamat.toUpperCase().indexOf(alamat.toUpperCase()) < 0){alamatInclude = false}
                var include = namaInclude && alamatInclude && otInclude
                if(include){res.push(item)}
                nD++        
            }
        }
    }
    var nRow = 0
    while(nRow < res.length){
        var item = res[nRow]
        var gender = ""
            if(item.gender == "Lelaki"){gender = "[L] "}
            if(item.gender == "Perempuan"){gender = "[P] "}
        var ttlText = ""
        var usiaText = ""
        if(item.ttl!==""){
            var ttlDate = new Date(item.ttl)
            ttlText = ttlDate.getDate() + " " + globVar.shortMo[ttlDate.getMonth()] + " " + ttlDate.getFullYear()
            var age = dateToAge(ttlDate, new Date())
            usiaText = (age.year !== 0 ? (age.year + "th ") : "") + (age.month !== 0 ? (age.month + "bln ") : "") + (age.day !== 0 ? (age.day + "hr ") : "") 
        }
        // console.log(ttl)
        table.innerHTML += 
        "<tr onclick='PasienCard(this)' rm='"+item.noRM+"'>"
        + "    <td>"+item.noRM+"</td>"
        + "    <td>"
        + "        <div>"+ gender + item.namaLengkap+"</div>"
        + "    </td>"
        + "    <td>"
        + "        <div>"+item.alamat+"</div>"
        + "    </td>"
        + "    <td>"
        + "        <div>"+ttlText+"</div>"
        + "        <div>"+usiaText+"</div>"
        + "    </td>"
        + "    <td>"
        + "        <div>"+item.ayahNama+"</div>"
        + "        <div>"+item.ayahPek+"</div>"
        + "    </td>"
        + "    <td>"
        + "        <div>"+item.ibuNama+"</div>"
        + "        <div>"+item.ibuPek+"</div>"
        + "    </td>"
        + "</tr>"

        nRow++
    }
    if(res.length === 1){
        PasienCard(table.querySelector("tr:nth-child(1)"))
    } else {
        var resetInput = document.querySelectorAll("div.homereset")
        var nInp = 0
        while(nInp < resetInput.length){
            {resetInput[nInp].innerHTML = "--------"}
            nInp++
        }
    }
}
function PasienCard(elem){
    var noRM = elem.getAttribute("rm")
    var item = database.pasienDB[noRM]
    Elem("pasien-card-noRM").innerHTML = noRM
    Elem("pasien-card-name").innerHTML = item.namaLengkap
    Elem("pasien-card-gender").innerHTML = item.gender
    if(item.ttl !== ""){
        var ttl = new Date(item.ttl)
        var age = dateToAge(ttl, new Date())
        Elem("pasien-card-ttl").innerHTML = 
            ttl.getDate() + "/"+ (ttl.getMonth()+1)+"/"+ ttl.getFullYear()+" <span>("+age.year+"th "+age.month+"bln "+age.day+"hr)</span>"
    } else {Elem("pasien-card-ttl").innerHTML = ""}
    Elem("pasien-card-alamat").innerHTML = item.alamat
    Elem("pasien-card-ayahNama").innerHTML = item.ayahNama
    Elem("pasien-card-ayahPek").innerHTML = item.ayahPek
    Elem("pasien-card-ibuNama").innerHTML = item.ibuNama
    Elem("pasien-card-ibuPek").innerHTML = item.ibuPek
}
async function daftarAntrianCard(){
    var noRM = Elem("pasien-card-noRM").innerHTML
    if(noRM.substring(0,1) !== "-" && confirm("Daftar antrian baru?")){
        var today = new Date()
        var antriJam = "Pagi"
        var antriTgl = dateToInput(today)
        if(today.getHours()<9){antriJam = "Pagi"}
        if(today.getHours()>8 && today.getHours()<19){
            antriJam = "Sore"
        }
        if(today.getHours()>18){
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate()+1)
            antriTgl = dateToInput(tomorrow)
        } 
        var url = dbAPI + "?req=newAntrian"
        +"&soapTgl="+antriTgl
        +"&soapJam="+antriJam
        +"&noRM="+noRM
        +"&soapStatus=Antri"
        
        spinner(true)
        console.log("Daftar Antrian....")
        await fetch(url)
        .then((respon) => respon.json())
        .then((respon) => {
            if(respon.ok){
                // console.log(respon)
                console.log("respon ok..")
                database.soapDB = respon.soapData
                console.log(database)
            }
        })
        HomeReset()
        spinner(false)
    }
}
function UpdateAntrian(){
    var navAntri = Elem("antrian-nav-antri")
    var navSelesai = Elem("antrian-nav-selesai")
    var navReservasi = Elem("antrian-nav-reservasi")
        navAntri.innerHTML = ""
        navSelesai.innerHTML = ""
        navReservasi.innerHTML = ""

    var dataAntri = Object.values(database.soapDB).filter((a)=>{return a.soapStatus == "Antri"}).sort((a,b)=>{return new Date(a.antriTime) - new Date(b.antriTime)})
    var dataSelesai = Object.values(database.soapDB).filter((a)=>{return (a.soapStatus == "Selesai") || (a.soapStatus == "Batal") }).sort((a,b)=>{return new Date(a.selesaiTime) - new Date(b.selesaiTime)})
    var dataReservasi = Object.values(database.reservasiDB)
        .sort((a,b)=>{
            function status(item){
                if(item.resStatus == "saved"){return 1}
                else{return 0}
            }
            return status(a) - status(b) || new Date(a.Timestamp) - new Date(b.Timestamp)
        })
        // .sort((a,b)=>{return b.resStatus - a.resStatus || new Date(a.Timestamp).localCaom - new Date(b.Timestamp)})
    
    document.querySelector(".antrian-nav-btn-container > div:nth-child(1) span").innerHTML = dataAntri.length
    document.querySelector(".antrian-nav-btn-container > div:nth-child(2) span").innerHTML = dataSelesai.length
    document.querySelector(".antrian-nav-btn-container > div:nth-child(3) span").innerHTML = dataReservasi.length

    for(var i = 0; i < dataAntri.length; i++){
        var soapItem = dataAntri[i]
        var timeAntri = new Date(soapItem.antriTime)
        var antrianDiv = 
            "<div class='antrian-list-item'>"
                +"<div class='antrian-item-number'>"+(i+1)+"</div>"
                +"<div>"
                    +"<div class='antrian-item-time'>"+ timeAntri +"</div>"
                    +"<div class='antrian-item-name'>"+ database.pasienDB[soapItem.noRM].namaLengkap +"</div>"
                    +"<div class='antrian-item-norm'>"+ soapItem.noRM +"</div>"
                    +"<button class='btn btn-primary antrian-item-btn' onclick='selectAntrian("+soapItem.soapID+")'>action</button>"
                +"</div>"
            +"</div>"
        navAntri.innerHTML += antrianDiv  
    }
    for(var i = 0; i < dataSelesai.length; i++){
        var soapItem = dataSelesai[i]
        var timeSelesai = new Date(soapItem.selesaiTime)
        var SelesaiDiv = 
            "<div class='antrian-list-item'>"
                +"<div class='antrian-item-number'>"+(i+1)+"</div>"
                +"<div>"
                    +"<div class='antrian-item-time'>"+ timeSelesai +"</div>"
                    +"<div class='antrian-item-name'>"+ database.pasienDB[soapItem.noRM].namaLengkap +"</div>"
                    +"<div class='antrian-item-norm'>"+ soapItem.noRM +"</div>"
                    +"<button class='btn btn-primary antrian-item-btn' onclick='selectAntrianSelesai("+soapItem.soapID+")'>action</button>"
                +"</div>"
            +"</div>"
        navSelesai.innerHTML += SelesaiDiv  
    }
    var nResAvail = 0
    for(var i = 0; i < dataReservasi.length; i++){
        var resItem = dataReservasi[i]
        var timeReservasi = new Date(resItem.Timestamp)
        var isSaved = false
        if(resItem.resStatus == "saved"){isSaved = true; var nRes = "-"}
        else{nResAvail++; var nRes = nResAvail}
        var resDiv = 
            "<div class='antrian-list-item saved-"+isSaved+"'>"
                +"<div class='antrian-item-number'>"+nRes+"</div>"
                +"<div>"
                    +"<div class='antrian-item-time'>"+ timeReservasi +"</div>"
                    +"<div class='antrian-item-name'>"+ resItem.namaLengkap.toUpperCase() +"</div>"
                    +"<div class='antrian-item-norm'>NoRM:"+ resItem.noRM.toUpperCase() +"</div>"
                    +"<button class='btn btn-primary antrian-item-btn' onclick='selectReservasi("+resItem.resID+")'>action</button>"
                +"</div>"
            +"</div>"
        navReservasi.innerHTML += resDiv  
    }
}
async function getAntrian(){
    var tgl = Elem("antrian-date").value
    var jam = Elem("antrian-jam").value
    if(tgl !== "" && jam !== ""){
        spinner(true)
        var url = dbAPI + "?req=getAntrianAll&date=" + tgl + "&jam="+jam
        console.log("getAntrian....")
        await fetch(url)
        .then((respon) => respon.json())
        .then((respon) => {
            if(respon.ok){
                // console.log(respon)
                console.log("respon ok..")
                database.soapDB = respon.soapData
                database.reservasiDB = respon.reservasiData
                console.log(database)
            }
        })
        UpdateAntrian()
        spinner(false)
    }
}
async function selectReservasi(resID){
    var resItem = database.reservasiDB[resID]
    document.querySelectorAll(".modAn-bd-4").forEach((p)=>{
        p.classList.remove("modAn-bd-different")
    })
    document.querySelectorAll(".modAn-bd-2").forEach((p)=>{
        p.classList.remove("modAn-bd-edited")
    })
    Elem("modAn-bd-resID").innerHTML = resID
    Elem("modAn-bd-antrian-date").value = dateToInput(resItem["Tanggal Reservasi"])
    Elem("modAn-bd-antrian-jam").value = resItem["Jam Reservasi"]
    if(resItem.noRM !== ""){
        var noRM = resItem.noRM.toUpperCase()
        var foundPatientID = database.pasienDB[resItem.noRM.toUpperCase()]
        if(foundPatientID){
            modResHide(false)
            updModRes("Both", resID, noRM)
        }
        else{
            alert("Data nomor RM tidak ditemukan")
            modResHide(true)
            updModRes("Res", resID)    
        }
    } else {
        modResHide(true)
        updModRes("Res", resID)
    }

    Elem("reservasiAction_btn").click()
    
    function modResHide(bo){
        if(bo){
            document.querySelectorAll(".modAn-bd-hidden").forEach((p)=>{
                p.classList.add("d-none")
            })
        } else {
            document.querySelectorAll(".modAn-bd-hidden").forEach((p)=>{
                p.classList.remove("d-none")
            })
        }
    }
    function updModRes(type, RMresID, noRM){
        var variable = ["namaLengkap", "gender", "alamat", "ayahNama", "ayahPek", "ibuNama", "ibuPek", "telp", "email", "uk", "bbl", "pbl", "lkl"]
        if(type == "Res"){
            var resItem = database.reservasiDB[resID]
            console.log(resItem)
            for(var i = 0; i<variable.length; i++){
                var itemVar = variable[i]
                Elem("modAn-"+itemVar+"-new").value = resItem[itemVar] 
            }
            Elem("modAn-ttl-new").value = resItem.ttl !== "" ? dateToInputMask(resItem.ttl) : "" 
        }
        if(type == "Both"){
            var resItem = database.reservasiDB[resID]
            var oldItem = database.pasienDB[noRM]
            Elem("modAn-bd-noRM").innerHTML = noRM
            console.log(resItem)
            for(var i = 0; i<variable.length; i++){
                var itemVar = variable[i]
                Elem("modAn-"+itemVar+"-new").value = resItem[itemVar]
                Elem("modAn-"+itemVar+"-old").value = oldItem[itemVar]
                if(resItem[itemVar] !== "" && resItem[itemVar] !== oldItem[itemVar]){
                    document.querySelector("div:has(>#modAn-"+itemVar+"-new)").classList.add("modAn-bd-different")
                }
            }
            Elem("modAn-ttl-new").value = resItem.ttl !== "" ? dateToInputMask(resItem.ttl) : ""
            Elem("modAn-ttl-old").value = oldItem.ttl !== "" ? dateToInputMask(oldItem.ttl) : ""
            if(Elem("modAn-ttl-new").value !== Elem("modAn-ttl-old").value){
                document.querySelector("div:has(>#modAn-ttl-new)").classList.add("modAn-bd-different")
            }
        }
    }
}
function modAnEdited(elem){
    var elemId = elem.id
    var noRM = document.querySelector(".modAn-bd-body:has(#"+elemId+") #modAn-bd-noRM").innerHTML
    var pasienVar = elemId.substring(6,elemId.indexOf("-",6))
    var oldData = database.pasienDB[noRM][pasienVar]
    if(pasienVar !== "ttl"){
        if(elem.value !== oldData){
            document.querySelector("div:has(>#"+elemId).classList.add("modAn-bd-edited")
        } else {
            document.querySelector("div:has(>#"+elemId).classList.remove("modAn-bd-edited")
        }
    } else {
        if(elem.value !== dateToInputMask(oldData)){
            document.querySelector("div:has(>#"+elemId).classList.add("modAn-bd-edited")
        } else {
            document.querySelector("div:has(>#"+elemId).classList.remove("modAn-bd-edited")
        }
    }
}
function modAn(type, elem){
    var noRM = Elem("modAn-bd-noRM").innerHTML
    var parent = elem.closest("div:has(>.modAn-bd-3)")
    if(type == "copy"){
        parent.querySelector(".modAn-bd-2 > input").value = parent.querySelector(".modAn-bd-4 > input").value 
        parent.querySelector(".modAn-bd-2 > input").onchange()
    }
    if(type == "reset"){
        var oldInput = parent.querySelector(".modAn-bd-2 > input") || parent.querySelector(".modAn-bd-2 > select")
        var pasienVar = oldInput.id.substring(6, oldInput.id.indexOf("-",6))
        var oldData = database.pasienDB[noRM][pasienVar]
        if(pasienVar !== "ttl"){
            oldInput.value = oldData
            oldInput.onchange()
        } else {
            oldInput.value = dateToInputMask(oldData)
            oldInput.onchange()
        }
    }
}
async function copyResToNew(){
    var resItem = database.reservasiDB[(Elem("modAn-bd-resID").innerHTML * 1)]
    document.querySelector("#reservasiAction .btn-close").click()
    if(document.querySelector("body").offsetWidth > 992){
        Elem("home-middle-container").setAttribute("w3-include-html", "/html/newRegister.html")
        await includeHTML(Elem("home-container"))
    }   
    else {
        Elem("home-modal-includes").setAttribute("w3-include-html", "/html/newRegister.html")
        await includeHTML(Elem("home-modal"))
        Elem("home-modal").classList.remove("modal-hidden")   
    }
    Elem("newReg-tglAntri").value = dateToInput(resItem["Tanggal Reservasi"])
    Elem("newReg-jamAntri").value = resItem["Jam Reservasi"]
    Elem("newReg-nama").value = resItem.namaLengkap
    autoNoRM(resItem.namaLengkap,"new")
    if(resItem.gender == "Lelaki"){var genCode = 1} 
    if(resItem.gender == "Perempuan"){var genCode = 2}
    Elem("newreg-gender-1").checked = false
    Elem("newreg-gender-2").checked = false
    Elem("newreg-gender-" + genCode).checked = true
    Elem("newReg-ttl").value = dateToInputMask(resItem.ttl)
    reMasking(Elem("newReg-ttl"),'tanggal')
    Elem("newReg-alamat").value = resItem.alamat
    Elem("newReg-telp").value = resItem.telp
    Elem("newReg-email").value = resItem.email
    Elem("newReg-ayah-nama").value = resItem.ayahNama
    Elem("newReg-ayah-pekerjaan").value = resItem.ayahPek
    Elem("newReg-ibu-nama").value = resItem.ibuNama
    Elem("newReg-ibu-pekerjaan").value = resItem.ibuPek
    Elem("newReg-uk").value = resItem.uk
    Elem("newReg-bbl").value = resItem.bbl
    Elem("newReg-pbl").value = resItem.pbl
    Elem("newReg-lkl").value = resItem.lkl
}