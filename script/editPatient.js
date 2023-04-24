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
            editPat_ttlToAge()
            // Elem("editPat-ttl-pre").dispatchEvent("onchange")
            // document.querySelector('#editPat-ttl').dispatchEvent(new Event('change', { 'bubbles': true }))
        }
        Elem("editPat-alamat").value = item.alamat
        Elem("editPat-ayah-nama").value = item.ayahNama
        Elem("editPat-ayah-pekerjaan").value = item.ayahPek
        Elem("editPat-ibu-nama").value = item.ibuNama
        Elem("editPat-ibu-pekerjaan").value = item.ibuPek
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
    var age = dateToAge(Elem("editPat-ttl").value, new Date())
    Elem('editPat-tahun').value = age.year
    Elem('editPat-bulan').value = age.month
    Elem('editPat-hari').value = age.day
}
function updPasien1(){
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