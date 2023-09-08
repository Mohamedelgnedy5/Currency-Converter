let selections = document.querySelectorAll("select");
let inp = document.querySelector("input");
let res = document.querySelector("span");
let replacement = document.querySelector("i");
let myData = await fetch(
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rY4HJSDWu10pl5NWaBnTIOMJzII5dn3JLH1zW7Ud"
)
  .then((res) => {
    let mydata = res.json();
    return mydata;
  })
  .then((mydata) => {
    return mydata.data;
  });
for (let k = 0; k < selections.length; k++) {
  for (let i = 0; i < Object.keys(myData).length; i++) {
    let opt = document.createElement("option");
    opt.innerHTML = Object.keys(myData)[i];
    opt.value = Object.keys(myData)[i];
    if (k === 0 && opt.value === "USD") {
      opt.setAttribute("selected", true);
    }
    selections[k].appendChild(opt);
  }
}
inp.addEventListener("input", conv);
selections[0].addEventListener("input", conv);
selections[1].addEventListener("input", conv);
function conv() {
  res.innerHTML =
    (
      inp.value *
      (myData[selections[1].value] / myData[selections[0].value])
    ).toFixed(2) +
    " " +
    selections[1].value;
}
replacement.onclick = () => {
  [selections[0].value, selections[1].value] = [
    selections[1].value,
    selections[0].value,
  ];
  conv();
};
conv();
