developing(true)

async function developing(bo){
    await includeHTML(document.querySelector("body"))
    HideDiv()
    if(bo){
        Elem("mainFrame").setAttribute("w3-include-html", "/html/dashboard.html");
        await includeHTML(document.querySelector("body"))
        Elem("nav-home").click()
    }
}
