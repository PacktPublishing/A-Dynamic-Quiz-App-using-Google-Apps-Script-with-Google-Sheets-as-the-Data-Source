const app = function () {
    const myData = {};
    const feedID = "1X2raQeBqfGLZ8DLyJAsPkQI814zkETyS--jIXYfn-l0";
    //
    function init() {
        loadJSON();
    }

    function loadJSON() {
        let urls = [];
        for (let x = 1; x < 3; x++) {
            urls.push("https://spreadsheets.google.com/feeds/list/" + feedID + "/" + x + "/public/values?alt=json");
        }
        //console.log(urls);
        Promise.all(urls.map(function (url) {
            return fetch(url).then(function (rep) {
                return rep.json()
            }).then(function (data) {
                let tempArray = [];
                let sheetName = data.feed.title.$t;
                data.feed.entry.forEach(function (element) {
                    let holder = {};
                    for (let key in element) {
                        if (key.substring(0, 3) == "gsx") {
                            holder[key.split('$')[1]] = element[key].$t;
                        };
                    }
                    tempArray.push(holder);
                })
                return {
                    key: sheetName
                    , value: tempArray
                }
            })
        })).then(function (data) {
            //console.log(data);
            for(let i=0;i<data.length;i++){
                myData[data[i].key] = data[i].value;
            }
            loadOutput(myData);
        })
    }

    function loadOutput(){
        console.log(myData);
    }

    function loadJSON2() {
        const url = "https://spreadsheets.google.com/feeds/list/" + feedID + "/1/public/values?alt=json";
        fetch(url).then(function (res) {
            return res.json()
        }).then(function (data) {
            let tempArray = [];
            let sheetName = data.feed.title.$t;
            data.feed.entry.forEach(function (element) {
                let holder = {};
                for (let key in element) {
                    if (key.substring(0, 3) == "gsx") {
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