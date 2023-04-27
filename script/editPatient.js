function editPatient(){
    var noRM = Elem("pasien-card-noRM").innerHTML
    if(noRM == "--------"){alert("Belum ada pasien yang dipilih");return}
    if(document.querySelector("body").offsetWidth > 992){
        Elem("home-middle-container").setAttribute("w3-include-html", "/html/editPatient.html")
        includeHTML(Elem("home-container"))
    }   
    else {
        Elem("home-modal-includes").setAttribute("w3-include-html", "/html/editPatient.html")
        includeHTML(Elem("home-modal"))
        Elem("home-modal").classList.remove("modal-hidden")   
    }
    setTimeout(function(){
        var item = database.pasienDB[noRM]
            // if(item[0]==noRM){
            //     console.log(item)
        Elem("editPat-norm").value = noRM
        Elem("editPat-noRMBefore").value = noRM
        Elem("editPat-nama").value = item.namaLengkap
        if(item.gender == "Lelaki"){Elem("editpat-gender-1").checked = true}
        if(item.gender == "Perempuan"){Elem("editpat-gender-2").checked = true}
        if(item.ttl !==""){
            Elem("editPat-ttl-pre").value = dateToInput(new Date(item.ttl))
            Elem("editPat-ttl").value = dateToInputMask(new Date(item.ttl))
            reMasking(Elem('editPat-ttl'),'tanggal')
        }
        Elem("editPat-alamat").value = item.alamat
        Elem("editPat-ayah-nama").value = item.ayahNama
        Elem("editPat-ayah-pekerjaan").value = item.ayahPek
        Elem("editPat-ibu-nama").value = item.ibuNama
        Elem("editPat-ibu-pekerjaan").value = item.ibuPek
        Elem("editPat-telp").value = item.telp
        Elem("editPat-email").value = item.email
        Elem("editPat-uk").value = item.uk
        Elem("editPat-bbl").value = item.bbl
        Elem("editPat-pbl").value = item.pbl
        Elem("editPat-lkl").value = item.lkl
    },500)
}
function closeEditPatient(){
    if(document.querySelector("body").offsetWidth > 992){
        Elem("home-middle-container").setAttribute("w3-include-html", "")
        Elem("home-middle-container").innerHTML = ""
    }   
    else {
        Elem("home-modal").classList.add("modal-hidden")   
    }   
}
function editPat_ttlToAge(){
    // var age = dateToAge(Elem("editPat-ttl").value, new Date())
    // Elem('editPat-tahun').value = age.year
    // Elem('editPat-bulan').value = age.month
    // Elem('editPat-hari').value = age.day
}
function updPasien1(){
    return
    var namalengkap = Elem("editPat-nama").value
    if(namalengkap == ""){alert("Nama masih kosong"); Elem("editPat-nama").focus(); return}

    var noRM = Elem("editPat-norm").value
    if(noRM == ""){
        if(confirm("Nomor RM kosong. Buat nomor RM otomatis?")){generateRM('edit')} 
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
}
function ed_manualToTTL(){
    var tahun = Elem('editPat-tahun').value || 0
    var bulan = Elem('editPat-bulan').value || 0
    var hari = Elem('editPat-hari').value || 0
    var ttl = manualToTTL(hari, bulan, tahun, new Date())
    
    var month = ttl.getMonth() + 1
    var monthStr = "" 
    if (month.toString().length === 1){monthStr = "0" + month.toString()}
    else {monthStr = month.toString()}

    var dayStr = ""
    if(ttl.getDate().toString().length === 1){dayStr = "0" + ttl.getDate().toString()}
    else{dayStr = ttl.getDate().toString()}

    Elem('editPat-ttl').value = dayStr +"-"+monthStr+"-"+ ttl.getFullYear()
    reMasking(Elem('editPat-ttl'),'tanggal')
}