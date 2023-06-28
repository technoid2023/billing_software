


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
  async function getticket(){
    let d=localStorage.getItem('user');
    let z=JSON.parse(d)
    // console.log(d);
    let token=z.Token
    let id=(localStorage.getItem('ticket_id'));

  console.log(id);
    await fetch(`https://technoid-bill.onrender.com/bill/ticket/${id}`, {
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
      localStorage.setItem('ticket',JSON.stringify(json.Data[0]));
// console.log(json.Data[0])
document.getElementById("category").value=json.Data[0].category,
document.getElementById("sub_category").value=json.Data[0].subcat,
document.getElementById("nm").value=json.Data[0].owner,
(document.getElementById("mobile").value)=json.Data[0].owner_mobile,
document.getElementById("email").value=json.Data[0].owner_email,
document.getElementById("item").value=json.Data[0].item,
document.getElementById("brand").value=json.Data[0].brand,
document.getElementById("color").value=json.Data[0].color,
document.getElementById("model_no").value=json.Data[0].model_no,
(document.getElementById("serial_no").value)=json.Data[0].serial_no,
document.getElementById("issue").innerText=json.Data[0].issue,
document.getElementById("requirements").value=json.Data[0].requirements,
(document.getElementById("fees").value)=json.Data[0].estimated_fees,
document.getElementById("status").value=json.Data[0].status
  })
  }
  getticket();
  async function updateTicket(){
    let z=localStorage.getItem('user');
      let z1=JSON.parse(z);
      let id=localStorage.getItem('ticket_id')
    await fetch(`https://technoid-bill.onrender.com/bill/ticket/${id}`, {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
        "token":z1.Token
      },
      method: "PUT",
      body: JSON.stringify(
        {
          category:document.getElementById("category").value,
          subcat:document.getElementById("sub_category").value,
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
        alert("Ticket Updated")
    location.assign('listing.html')}
    else{
      alert("Nothing to Update")
    }
  
  }
  async function delTicket(){
    let d=localStorage.getItem('user');
    let z=JSON.parse(d)
    // console.log(d);
    let token=z.Token
    let id=(localStorage.getItem('ticket_id'));

  console.log(id);
    
  if (confirm('Are Your Sure ?') == true) {
    await fetch(`https://technoid-bill.onrender.com/bill/ticket/${id}`, {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
        "token":token
        
      },
      method: "DELETE",
      
    }).then((response)=>
    response.json()).then((json)=>{
  alert('Ticket Deleetd !!')
      location.assign('listing.html')
  })
  } else {
    location.assign('detail.html')
  }
}
async function generatePdf(){
//  console.log(15);
  var pdfObject = jsPDFInvoiceTemplate.default(props);
  console.log('saved',pdfObject);
}
var ticket= JSON.parse(localStorage.getItem('ticket'));
var props = {
  outputType: jsPDFInvoiceTemplate.OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: ticket.owner+"_"+ticket.subcat,
  orientationLandscape: false,
  compress: true,
  logo: {
      src: "./logo.png",
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
      }
  },
  stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "Front_End\logo.png",
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
      }
  },
  business: {
      name: "RSEN Technologies",
      address: "Jajpur Road,Odisha",
      phone: "+91 9999999999",
      email: "email@example.com",
      email_1: "info@example.al",
      website: "www.example.al",
  },
  contact: {
      label: "Invoice issued for:",
      name: ticket.owner,
      address: "Odisha",
      phone: (ticket.owner_mobile).toString(),
      email: ticket.owner_email,
      // otherInfo: "www.website.al",
  },
  invoice: {
      label: "Invoice #: ",
      num:   Math.floor(Math.random() * 100),
      // invDate: "Payment Date: 01/01/2021 18:12",
      invGenDate: "Invoice Date: "+new Date().toString().slice(0,16),
      headerBorder: false,
      tableBodyBorder: false,
      
      header: [
        {
          title: "Category", 
          style: { 
            width: 25 
          } 
        }, 
        { 
          title: "Item",
          style: {
            width: 25
          } 
        }, 
        { 
          title: "Brand",
          style: {
            width: 25
          } 
        }, 
        { 
          title: "Model No",
          style: {
            width: 30
          } 
        },
        { 
          title: "Requirements",
          style: {
            width: 30
          } 
        },
        { title: "Ticket Date",
        style: {
          width: 20
        } },
        { title: "Issues",
        style: {
          width: 40
        } }
       
      ],
      table: Array.from(Array(1), (item, index)=>([
         ticket.category,
         ticket.subcat,
         ticket.brand,
         ticket.model_no,
         ticket.requirements,
         ticket.date,
         ticket.issue
      ])),
      // invDescLabel: "Issues",
      // invDesc: ticket.issue,
      
      invDescLabel: "Service Charge",
      invDesc: ticket.estimated_fees
  },
  footer: {
      text: "The invoice is system generated and is valid without the signature and stamp.",
  },
  pageEnable: true,
  pageLabel: "Page ",
};