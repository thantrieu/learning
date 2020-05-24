function showCountDown() {
    var date = new Date();
    var currDay = date.getDate();
    var currMonth = date.getMonth();
    if(currMonth === 6) {
        currDay = 7 - currDay;
    } else if(currMonth === 5) {
        currDay = 7 + 30 - currDay;
    } else {
        currDay = 37 + 31 - currDay;
    }
    var more = (currDay > 1) ? "s" : "";
    document.getElementById("countdown").innerHTML = "Event countdown remain " + currDay + " day" + more;
}