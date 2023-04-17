developing(true)

async function developing(bo){
    await includeHTML(document.querySelector("body"))
    HideDiv()
    if(bo){
        Elem("mainFrame").setAttribute("w3-include-html", "/html/dashboard.html");
        await includeHTML(document.querySelector("body"))
        spinner(true)
        await fetch(
            dbAPI +
              "?req=onLoad"
        )
        .then((respon) => respon.json())
        .then((respon) => {
            if(respon.ok){
                console.log("respon ok..")
                database.pasienDB = respon.patientData    
                setTimeout(devNav, 2000)
            }
        })
        function devNav(){
            // console.log("devNav")
            NavTo(Elem("nav-home"))
            spinner(false)
        }
        console.log(database)
    }
}
