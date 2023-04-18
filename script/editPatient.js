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
        var data = database.pasienDB
        var nD = 0
        while(nD < data.length){
            var item = data[nD]
            if(item[0]==noRM){
                Elem("editPat-norm").value = noRM
                Elem("editPat-nama").value = item[1]
                if(item[2] == "Lelaki"){Elem("editpat-gender-1").checked = true}
                if(item[2] == "Perempuan"){Elem("editpat-gender-2").checked = true}
                if(item[3]!==""){
                    Elem("editPat-ttl").value = dateToInput(new Date(item[3]))
                    Elem("editPat-ttl").onchange()
                }
                Elem("editPat-alamat").value = item[4]
                Elem("editPat-ayah-nama").value = item[5]
                Elem("editPat-ayah-pekerjaan").value = item[6]
                Elem("editPat-ibu-nama").value = item[7]
                Elem("editPat-ibu-pekerjaan").value = item[8]
            } 
            nD++
        }
        // Elem("newReg-norm").value = new Date().getFullYear().toString().substring(2);
        // Elem("newReg-card").focus()new Date()
        // Elem("newReg-nama").focus()
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