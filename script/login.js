async function login(){
    // alert(Elem("login-username").value)
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
            if(respon["login"]){
                database['user'] = respon.login.userdata;
                database['klinikInfo'] = respon.login.klinikInfo
                Elem("mainFrame").setAttribute("w3-include-html", "/html/dashboard.html");
                spinner(false)
                return
            } else {
                alert("Username dan Password salah")
                Elem("login-username").focus()
                spinner(false)
                return
            }
        }
        else{
            spinner(false)
            return
        }
    });
    await includeHTML()
    spinner(false)
    console.log(database)
}
function logout(){
    Elem("mainFrame").setAttribute("w3-include-html", "/html/login.html");
}