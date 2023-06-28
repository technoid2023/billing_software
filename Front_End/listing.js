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
  async function getallticket(){
    let d=localStorage.getItem('user');
    let z=JSON.parse(d)
    let token=z.Token
    // console.log(token);
  
    await fetch(`https://technoid-bill.onrender.com/bill/ticket`, {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
        "token":token
        
      },
      method: "GET",
      
    }).then((response)=>
    response.json()).then((json)=>{
  let data1=json;
  console.log(json);
  var li = ""
  data1.Data.forEach((data) => {           
    // let id=data._id; 
    // console.log(id); 
    li += `<tr>
       
        <td>${data.date} </td>
        <td>${data.owner}</td>
        <td>${data.owner_mobile}</td>
        <td>${data.subcat}</td>
        <td>${data.item}</td>
        <td>${data.requirements}</td>
        <td>${data.status} </td>
        <td style="font-size:34px" onclick="viewbyID(${("'"+data._id+"'")})" class="fa">&#xf06e;</td>
          
      </tr>`;
  });
  document.getElementById("table").innerHTML = li;
    //   data=JSON.stringify(json)
    //   localStorage.setItem('pathis',data)
    //   console.log(data);
    // location.assign('showpathis.html');
        
    })
  }
  function viewbyID(id){
   location.assign('detail.html')
   localStorage.setItem('ticket_id',(id));
  }
  getallticket();
  async function getTicketbycategory(){
    let d=localStorage.getItem('user');
    let z=JSON.parse(d)
    let token=z.Token
  let cat=document.getElementById('search').value;
  
    await fetch(`https://technoid-bill.onrender.com/bill/ticket`, {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
        "token":token
        
      },
      method: "POST",
      body: JSON.stringify({
        "sub_catgory":cat
      }),
      
    }).then((response)=>
    response.json()).then((json)=>{
      console.log(json);
  let data1=json;
  var li = ""
            //  console.log(data1.Data[0]);
    // let id=data._id; 
    // console.log(id); 
    li += `<tr>
       
        <td>${data1.Data[0].date} </td>
        <td>${data1.Data[0].owner}</td>
        <td>${data1.Data[0].owner_mobile}</td>
        <td>${data1.Data[0].subcat}</td>
        <td>${data1.Data[0].item}</td>
        <td>${data1.Data[0].requirements}</td>
        <td>${data1.Data[0].status} </td>
        <td style="font-size:34px" onclick="viewbyID(${("'"+data1.Data[0]._id+"'")})" class="fa">&#xf06e;</td>
          
      </tr>`;

  document.getElementById("table").innerHTML = li;
    //   data=JSON.stringify(json)
    //   localStorage.setItem('pathis',data)
    //   console.log(data);
    // location.assign('showpathis.html');
        
    })
  }