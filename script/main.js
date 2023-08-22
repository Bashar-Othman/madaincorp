function getSelectedCateg(){
   
var e = document.getElementById("categs");
var value = e.value;
var text = e.options[e.selectedIndex].text;

return text;
}


function getRowNum(){
    var rowNum=document.getElementById("rownum").value;
    console.log("Data Num "+rowNum);
    if(isNaN(rowNum)){
    alert("Please insert correct positive value ex: 1 , 4, 10 ");
    return -1;
    }

return rowNum;

}

function loaData(){
let jsonData = [];
let categories=[];
let categ=getSelectedCateg();
let rowNum=getRowNum();

if(categ === 'All'){
    categories="[\"category1\",\"category2\",\"category3\"]";
}else{
    console.log("CATEGS "+categ);
    categories.push(categ);
}  
 

const apiUrl =
  `https://filltext.com/?rows=${rowNum}&fname={firstName}&lname={lastName}&pretty=true&category=${categories}`;
console.log(apiUrl);
  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      console.log(item);
      jsonData.push(item);
    });

    const cardRow = document.getElementById("card-row");

    cardRow.textContent = '';

    jsonData.forEach((item) => {
      console.log("HTML creation");
      const cardHtml = `
<div class="col-md-4">
<div class="card">
<div class="card-body d-flex align-items-center">
  <div class="circle">${item.fname != undefined ? item.fname[0] : ""}${
        item.fname != undefined ? item.lname[0] : ""
      }</div>
  <h5 class="card-title">${item.fname} ${item.lname}</h5>
  <span class="badge badge-primary ml-auto">${item.category}</span>
</div>
</div>
</div>
`;
      cardRow.insertAdjacentHTML("beforeend", cardHtml);
    });
  })
  .catch((error) => {
    console.error("Error :-( ", error);
  });
 
}