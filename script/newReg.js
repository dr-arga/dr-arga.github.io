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
        Elem("newReg-norm").value = new Date().getFullYear().toString().substring(2)
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
