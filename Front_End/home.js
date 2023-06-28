// open-close function

// let z=localStorage.getItem('user');
function y(){
    // z=z.toString();
    let z=localStorage.getItem('user');
    let z1=JSON.parse(z);
   
    document.getElementById("name").innerText="Welcome"+" "+z1.Data[0].name;
    
}
y();

async function logout(){
    let data=localStorage.getItem('user');
    let token=data.token
    console.log(token);
    await fetch("https://technoid-bill.onrender.com/bill/logout", {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
        "token":token
      },
      method: "POST",
    }).then((response)=>
    response.json()).then((json)=>{console.log(json)
    location.replace('login.html');
        localStorage.clear();
    })
}
async function medical(){

  location.assign('history.html');
      

}
async function diago(){
  location.assign('diago.html')
}
async function appoint(){
  location.assign('appointdoc.html')
}
async function showappoint(){
  
  location.assign('showappoint.html');
      
  }
 
async function createTicket(){
//   console.log(document.getElementById("nm").value);
let x=(document.getElementById("xxx").value);
  let z=localStorage.getItem('user');
    let z1=JSON.parse(z);
  await fetch("https://technoid-bill.onrender.com/bill/ticket/add", {
    headers: {
      "Content-type": "application/json",
      'Connection': "keep-alive",
      "Accept-Encoding": "gzip, deflate, br",
      'Accept': "*/*",
      "User-Agent": "PostmanRuntime/7.31.1",
      "token":z1.Token
    },
    method: "POST",
    body: JSON.stringify(
      {
        category:document.getElementById("category").value,
        subcat:document.getElementById("xxx").value,
        owner:document.getElementById("nm").value,
        owner_mobile:+(document.getElementById("mobile").value),
        owner_email:document.getElementById("email").value,
        item:document.getElementById("item").value,
        brand:document.getElementById("brand").value,
        color:document.getElementById("color").value,
        model_no:document.getElementById("model_no").value,
        serial_no:+(document.getElementById("serial_no").value),
        issue:document.getElementById("issue").value,
        requirements:document.getElementById("requirements").value,
        estimated_fees:+(document.getElementById("fees").value),
        status:document.getElementById("status").value,
      }
    ),
  })
    .then((response) => response.json())
    .then((json) => {
    //   data = JSON.parse(json);
    data=JSON.stringify(json);
    data1=JSON.parse(data);
      // console.log(data1);
    });
    if(data1.Success==true){
  //   localStorage.setItem("user",(data));
//   document.write("logged in");
      alert("Ticket Created")
  location.assign('homepage.html')}
  else{
    alert("error")
  }

}
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}