var datepickLocalEn = {
    days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    daysShort: ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    daysMin: ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'dd-MM-yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 1
}

developing(true)

async function developing(bo){
    if(bo){
        // Elem("login-username").value = "Arga"
        // Elem("login-password").value = "radenr0r0"
        // login()
        Elem("mainFrame").setAttribute("w3-include-html", "/html/dashboard.html")
        await includeHTML(document.querySelector("body"))
        HideDiv()
        NavTo(Elem('nav-home'))
        setTimeout(NewPatient,1000)
    }
}

