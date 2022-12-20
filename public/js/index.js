console.log("client side javascript is loaded");



let btn = document.querySelector("form");
let searchValue = document.querySelector("input");
let para1 = document.querySelector("#text-1")
let para2 = document.querySelector("#text-2")

btn.addEventListener("submit", (e) => {
    e.preventDefault();
    let location = searchValue.value;
    para1.textContent = "Loading..."
    para2.textContent = "";
    if (location) {
        fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    para1.textContent = data.error
                } else {
                    para1.textContent = data.forecast;
                    para2.textContent = data.address
                }
            })
        })
    } else {
        para1.textContent = "Please provide address";
    }

})