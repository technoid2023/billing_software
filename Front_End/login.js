async function login() {
    let emp_code = +(document.getElementById("emp_code").value);
    let pass = document.getElementById("password").value;
    console.log(typeof emp_code);
    console.log(typeof pass);
    let data1;
    let data;
     await fetch("https://technoid-bill.onrender.com/bill/login", {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
      },
      method: "POST",
      body: JSON.stringify({
        code: emp_code,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((json) => {console.log(json);
      //   data = JSON.parse(json);
      data=JSON.stringify(json);
      data1=JSON.parse(data);
        console.log("user",data);
      });
      if(data1.Success==true){
      alert("logged In")
      localStorage.setItem("user",(data));

    location.assign('homepage.html')}
    else{
      alert("error")
    }
    
  }
