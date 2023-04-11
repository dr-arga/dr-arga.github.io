async function login(){
    if(Elem("login-username").value == ""){
        alert("Username kosong")
        Elem("login-username").focus()
        return
    }
    if(Elem("login-password").value == ""){
        alert("Password kosong")
        Elem("login-password").focus()
        return
    }
    spinner(true)
    console.log("Login trying...")
    await fetch(
        klinikAPI +
          "?login=true&user=" + Elem("login-username").value + "&password=" + Elem("login-password").value
    )
    .then((respon) => respon.json())
    .then((respon) => {
        if (respon.ok) {
            console.log("respon ok..")
            if(respon["login"]){
                if(respon.login.isValid){
                    database['user'] = respon.login.userdata;
                    database['klinikInfo'] = respon.login.klinikInfo
                    Elem("mainFrame").setAttribute("w3-include-html", "/html/dashboard.html");
                    

                }
                else{
                    alert("Username dan Password salah")
                    Elem("login-username").focus()
                    spinner(false)
                    return    
                }
            } else {
                alert("Username dan Password salah")
                Elem("login-username").focus()
                spinner(false)
                return
            }
        }
        else{
            console.log("respon false..")
            spinner(false)
            return
        }
    });
    if(database.user){
        await includeHTML(document.querySelector("body"))
        Elem("user-fullname").innerHTML = ""
        if(database.user.nama){Elem("user-fullname").innerHTML = database.user.nama}
        var r = document.querySelector(':root');
        if(database.user.level){
            r.style.setProperty('--baseColor', database.color.html.basecolor[database.user.level])
            r.style.setProperty('--baseColorActive', database.color.html.baseColorActive[database.user.level])
        }
        NavTo(Elem("nav-home"))
        spinner(false)
    }
    console.log(database)
}
function logout(){
    console.log("Login Out...")
    Elem("mainFrame").setAttribute("w3-include-html", "/html/login.html");
    includeHTML(document.querySelector("body"))
    spinner(false)
}