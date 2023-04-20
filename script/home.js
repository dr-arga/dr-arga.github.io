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
    console.log(bo)
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
    // console.log(database)
}
function homeSearch(elem){
    // console.log(elem)
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