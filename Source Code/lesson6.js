const app = function () {
    const myData = "";
    const feedID = "1X2raQeBqfGLZ8DLyJAsPkQI814zkETyS--jIXYfn-l0";
    const url = "https://spreadsheets.google.com/feeds/list/" + feedID + "/1/public/values?alt=json";

    function init() {
        loadJSON();
    }

    function loadJSON() {
        fetch(url).then(function (res) {
            return res.json()
        }).then(function (data) {
            let tempArray = [];
            let sheetName = data.feed.title.$t;
            console.log(sheetName);
            console.log(data);
            data.feed.entry.forEach(function (element) {
                console.log(element);
                let holder = {};
                for (let key in element) {
                    if (key.substring(0, 3) == "gsx") {
                        console.log(key.split('$')[1]);
                        console.log(element[key].$t);
                        holder[key.split('$')[1]] = element[key].$t;
                    };
                }
                tempArray.push(holder);
            })
            console.log(tempArray);
        })
    }
    return {
        init: init
    }
}();
document.addEventListener('DOMContentLoaded', app.init);