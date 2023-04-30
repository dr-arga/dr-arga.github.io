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
async function editPat_Simpan(){
    var curRM = Elem("editPat-norm").value
    var oldRM = Elem("editPat-noRMBefore").value

    if(curRM !== oldRM){
        var paramUrl = getParamUpdNew()
        console.log(paramUrl)
        if(paramUrl.isError){alert(paramUrl.errorText);return}
        if(confirm("Terjadi perubahan nomor RM dari sebelumnya. \nMenyimpan data pasien baru dengan nomor RM baru dan menghapus data lama?")){
            var paramUrl = getParamUpdNew()
            var urlSend = dbAPI + "?req=updDelPatient" + paramUrl + "&noRMBefore=" + oldRM
        } else {
            return
        }
    } else {    
        var paramUrl = getParamUpdNew()
        console.log(paramUrl)
        if(paramUrl.isError){alert(paramUrl.errorText);return}    
        if(confirm("Kirim perubahan data?")){
            var urlSend = dbAPI + "?req=updPatient" + paramUrl
        } else {
            return
        }
    }
    function getParamUpdNew(){
        var urlText = ""
        var paramTextArr = Object.keys(IDtoUrl)
        for (var i = 0; i<paramTextArr.length; i++){
            var key = paramTextArr[i]
            if(key !== "gender"){
                urlText += "&"+key+"="+Elem("editPat-"+IDtoUrl[key].id).value
                if(key !== "ayahNama" && key !== "ibuNama"){
                    if(IDtoUrl[key].required){
                        var inputVal = Elem("editPat-"+IDtoUrl[key].id).value
                        if(inputVal == "" || inputVal.replace(" ","").length === 0){
                            // alert("Input " + key + " masih kosong")
                            Elem("editPat-"+IDtoUrl[key].id).focus()
                            var err = {isError:true,errorText:"Input " + key + " masih kosong"}
                            return err
                        }
                    }
                } else{
                    var ayahNama = Elem("editPat-ayah-nama").value
                    var ibuNama = Elem("editPat-ibu-nama").value
                    // console.log(ayahNama == "")
                    if( (ayahNama == "" || ayahNama.replace(" ","").length === 0) &&
                        (ibuNama == "" || ibuNama.replace(" ","").length === 0)){
                            // console.log("Masuk sini nggak")
                            Elem("editPat-ayah-nama").focus()
                            var err = {isError:true, errorText:"Salah satu input nama orangtua harus diisi"}
                            return err
                        }
                }   
            } else {
                var gender = ""
                if(Elem("editpat-gender-1").checked){gender = "Lelaki"}
                if(Elem("editpat-gender-2").checked){gender = "Perempuan"}
                if(gender == "" || gender.replace(" ","").length === 0){
                    var err = {isError:true, errorText:"Jenis kelamin masih kosong"}
                    return err
                } else {
                    urlText += "&gender=" + gender
                }
            }
            // console.log(urlText)
        }
        return urlText
    }
    spinner(true)
    await fetch(urlSend)
        .then((respon) => respon.json())
        .then((respon) => {
            if(respon.ok){
                console.log(respon)
                console.log("respon ok..")
                database.pasienDB = respon.patientData
                closeEditPatient()
                homeSearchFilterReset()
                UpdateAntrian()
                alert("Perubahan data telah disimpan.")

            }
            spinner(false)
        })   
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