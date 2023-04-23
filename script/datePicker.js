function datepickbuild(){
    return
    var dateInps = document.querySelectorAll(".datePre")
    for (var i = 0; i < dateInps.length; i++){
        var elem = dateInps[i]
        var selector = "#"+elem.id
        var targetID = elem.getAttribute('for')
        let todayButton = {
            content: 'Hari ini',
            className: 'custom-button-classname',
            onClick: (dp) => {
                let date = new Date();
                dp.selectDate(date);
                dp.setViewDate(date);   
            }
        }
        new AirDatepicker(selector,{
            locale: datepickLocalEn,
            isMobile: true,
            buttons: [todayButton, 'clear'],
            autoClose: true,
            onSelect({date, formattedDate, datepicker}){
                Elem(targetID).value = formattedDate
            }
        })
    }
}
// datepickbuild('#testDate1')