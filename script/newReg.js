function NewPatient(){
    if(document.querySelector("body").offsetWidth > 992){
        Elem("home-middle-container").setAttribute("w3-include-html", "/html/newRegister.html")
        includeHTML(Elem("home-container"))
    }   
    else {
        Elem("home-modal-includes").setAttribute("w3-include-html", "/html/newRegister.html")
        includeHTML(Elem("home-modal"))
        Elem("home-modal").classList.remove("modal-hidden")   
    }
    
    setTimeout(function(){
        Elem("newReg-norm").value = new Date().getFullYear().toString().substring(2);
        Elem("newReg-card").focus()
        Elem("newReg-nama").focus()
    },500)
}
function closeNewPatientModal(){
    if(document.querySelector("body").offsetWidth > 992){
        Elem("home-middle-container").setAttribute("w3-include-html", "")
        Elem("home-middle-container").innerHTML = ""
    }   
    else {
        Elem("home-modal").classList.add("modal-hidden")   
    }
    
}
function ttlToAge_Input(elem){
    var age = dateToAge(elem.value, new Date())
    Elem('newReg-tahun').value = age.year
    Elem('newReg-bulan').value = age.month
    Elem('newReg-hari').value = age.day
}
function nR_manualToTTL(){
    var tahun = Elem('newReg-tahun').value || 0
    var bulan = Elem('newReg-bulan').value || 0
    var hari = Elem('newReg-hari').value || 0
    var ttl = manualToTTL(hari, bulan, tahun, new Date())
    
    var month = ttl.getMonth() + 1
    var monthStr = "" 
    if (month.toString().length === 1){monthStr = "0" + month.toString()}
    else {monthStr = month.toString()}

    var dayStr = ""
    if(ttl.getDate().toString().length === 1){dayStr = "0" + ttl.getDate().toString()}
    else{dayStr = ttl.getDate().toString()}


    Elem('newReg-ttl').value = ttl.getFullYear()+"-"+monthStr+"-"+dayStr
}
async function newReg_Simpan(antri){
    var namalengkap = Elem("newReg-nama").value
    if(namalengkap == ""){alert("Nama masih kosong"); Elem("newReg-nama").focus(); return}

    var noRM = Elem("newReg-norm").value
    if(noRM == ""){
        if(confirm("Nomor RM kosong. Buat nomor RM otomatis?")){newReg_generateRM()} 
        else {Elem("newReg-norm").focus(); return;}
    }

    var gender = document.querySelector("[name='newreg-gender']:checked").value
    
    var ttl = Elem("newReg-ttl").value
    if(ttl == ""){alert("Tanggal lahir masih kosong"); Elem("newReg-ttl").focus(); return}
    
    var alamat = Elem("newReg-alamat").value
    if(alamat == ""){alert("Alamat masih kosong"); Elem("newReg-alamat").focus(); return}
    
    var ayahNama = Elem("newReg-ayah-nama").value; var ayahPek = Elem("newReg-ayah-pekerjaan").value
    var ibuNama = Elem("newReg-ibu-nama").value; var ibuPek = Elem("newReg-ibu-pekerjaan").value
    if(ayahNama == "" && ibuNama == ""){alert("Salah satu nama orangtua harus diisi"); Elem("newReg-ayah-nama").focus(); return}

    if(antri !== undefined){
        if(!(confirm("Simpan data pasien baru dan lanjut antrian?"))){return}
        spinner(true)
        await simpanPasienBaru()
        closeNewPatientModal()
        NewAntrian(noRM)
        spinner(false)
    } else {
        if(!(confirm("Simpan data pasien baru?"))){return}
        spinner(true)
        await simpanPasienBaru()
        closeNewPatientModal()
        spinner(false)
    }
    async function simpanPasienBaru(){
        await fetch(
            dbAPI +
              "?req=newReg"
                + "&noRM=" + noRM
                + "&name=" + namalengkap
                + "&gender=" + gender
                + "&ttl=" + ttl
                + "&alamat=" + alamat
                + "&ayahNama=" + ayahNama
                + "&ayahPek=" + ayahPek
                + "&ibuNama=" + ibuNama
                + "&ibuPek=" + ibuPek
        )
        .then((respon) => respon.json())
        .then((respon) => {
            if(respon.ok){
                console.log(respon)
                console.log("respon ok..")
                database.pasienDB = respon.patientData
                alert("Data pasien baru telah disimpan")
                console.log(database)
            }
        })
    }
}
function newReg_generateRM(){
    var namalengkap = Elem("newReg-nama").value
    if(namalengkap == ""){
        alert("Nama masih kosong")
        Elem("newReg-nama").focus()
        return
    }
    var year = new Date().getFullYear().toString().substring(2)
    var lastRM = checkingLastRM(year + "-" + namalengkap.substring(0,1).toUpperCase())
    var newRM = "0".repeat(4 - (lastRM+1).toString().length) + (lastRM+1)
    var newRMText = year + "-" + namalengkap.substring(0,1).toUpperCase() + "-" + newRM 
    Elem("newReg-norm").value = newRMText
}
function checkingLastRM(value){
    var nDB = 0;
    var RMArr = [];
    while(nDB < database.pasienDB.length){
        var item = database.pasienDB[nDB]
        var noRM = item[0]
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
function autoNoRM(nama){
    if(nama == ""){
        Elem("newReg-norm").value = ""
    } else {
        newReg_generateRM()
    }
}