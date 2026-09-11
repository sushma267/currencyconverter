let base_url = "https://api.frankfurter.dev/v2/rate"; // currency exchange rate
let dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("form button");
let fromcurrval = document.querySelector(".From select");
let tocurrval = document.querySelector(".To select")
let msg = document.querySelector(".msg");
// for( let code in countryList){
//     console.log(code,countryList[code]);
// }
for(let select of dropdowns){
for(let currcode in countryList){
    let newopt = document.createElement("option")
    newopt.innerText = currcode;
    newopt.value = currcode;
    if(select.name === "From" && currcode === "USD"){
        newopt.selected = "true";
    } 
    else if (select.name === "To" && currcode === "INR") {
        newopt.selected = "true"; //selected = true → "Yes, select this option."
    }
    select.append(newopt);
}
select.addEventListener("change", (evt)=>{
    updateflag(evt.target);
})
}
 const updateflag =(element) =>{
    let currcode = element.value;// all country currency code
    let countrycode = countryList[currcode];
    let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
 }
button.addEventListener("click", async(evt)=>{
    evt.preventDefault();// dont reload when i click on button because i have to fetch data
let amount = document.querySelector(".amount input");
let amountVal = amount.value;
if (amountVal === "" || amountVal < 1){
    amountVal = 1;
    amount.value ="1";
}
const URL = `${base_url}/${fromcurrval.value}/${tocurrval.value}`;
let response = await fetch(URL);
let data = await response.json();
let rate = data.rate;
// console.log(rate);
 let finalamount = amountVal * rate;
msg.innerText = `${amountVal} ${fromcurrval.value} = ${finalamount} ${tocurrval.value}`;
console.log(finalamount) ;
});
