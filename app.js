(function(){
  const cartInfo =document.getElementById("cart-info");
  const cart=document.getElementById("cart");
  //console.log(cartInfo);
  cartInfo.addEventListener("click",function(){
      cart.classList.toggle("show-cart");
  });
})();
//
(function(){
 const cartbtn=document.querySelectorAll('.store-item-icon');
 cartbtn.forEach(function(btn) {
   btn.addEventListener('click',function(event){
  // console.log(event.target);
  if(event.target.parentElement.classList.contains('store-item-icon')){
  let fullpath=event.target.parentElement.previousElementSibling.src;
  let pos=fullpath.indexOf("img")+3;
  let parpath=fullpath.slice(pos);

  let item={};
  item.img =`img-cart${parpath}`;
  let name=event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
  item.name=`${name}`;
  let price=event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
  let finalprice=price.slice(1).trim();
  item.price=`${finalprice}`;


  //console.log(item);
  const cartitem=document.createElement("div");
  cartitem.classList.add(
      "cart-item", 
      "d-flex",
      "justify-content-between",
      "text-capitalize",
      "my-3",
  );
  cartitem.innerHTML=`

            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>₹ </span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
          </div>
  `;
  const cart=document.getElementById('cart');
  const total=document.querySelector('.cart-total-container');
  cart.insertBefore(cartitem,total);
alert("item added");
showtotals();
clear(item);

  }
   });
 });
 //console.log(btn);
 function showtotals(){
     const total=[];
     const items=document.querySelectorAll(".cart-item-price");
     items.forEach(function(item){
       total.push(parseFloat(item.textContent));

     });
     const totalmoney=total.reduce(function(total,item){
         total=total+item;
         return total;
     },0);
     const mrp=totalmoney.toFixed(2);
     document.getElementById('cart-total').textContent=mrp;
     document.querySelector('.item-total').textContent=mrp;
     document.getElementById('item-count').textContent=total.length;
 }
})();
function clear(obj){
var x=document.getElementById("clear-cart");
x.addEventListener('click',function(){
  document.getElementById('cart-total').textContent="00.00";
  document.querySelector('.item-total').textContent="00.00";
  document.getElementById('item-count').textContent=0;

  var y=obj;
  console.log(y[1].img);



});
}


//firebase starts here
let row = document.querySelector('#store-items');
const firebaseConfig = {
  apiKey: "AIzaSyDEdTE6BhoWUgKN9ahP7-XjAqt-aiW-Bls",
  authDomain: "another-app-market.firebaseapp.com",
  databaseURL: "https://another-app-market.firebaseio.com",
  projectId: "another-app-market",
  storageBucket: "another-app-market.appspot.com",
  messagingSenderId: "242637576670",
  appId: "1:242637576670:web:ab394edd400f33969c654f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();

function renderOnPage(doc){
  // doc.preventDefault();
  let data = doc;
  let name = data.get("name");
  let product = data.get("categoryName");
  let desc = data.get("description").substring(1,100)+"...";
  let price = data.get("price");
  let imgurl = data.get("listOfImages")[0];



  let col = document.createElement('div');
  col.className = 'col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item sweets';
  let card = document.createElement('div');
  card.className = 'card';
  let imgcon = document.createElement('div');
  imgcon.className = 'img-container';
  let img = document.createElement('img');
  img.className = "card-img-top store-img";
  img.src = imgurl;
  let span = document.createElement('span');
  span.className = "store-item-icon";
  let icon = document.createElement('i');
  icon.className = "fas fa-shopping-cart";
  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  let cardBodyInner = document.createElement('div');
  cardBodyInner.className = 'card-text d-flex justify-content-between text-capitalize';
  let productC = document.createElement('h5');
  productC.id = "store-item-name";
  let priceC = document.createElement('h5');
  priceC.className = "store-item-value";
  img.setAttribute("style", "width:200px;height:250px;");
  productC.innerHTML = product;
  priceC.innerHTML = "₹ "+price;

  span.appendChild(icon);
  imgcon.appendChild(img);
  imgcon.appendChild(span);
  cardBodyInner.appendChild(productC);
  cardBodyInner.appendChild(priceC);
  cardBody.appendChild(cardBodyInner);
  card.appendChild(imgcon);
  card.appendChild(cardBody);
  col.appendChild(card);



  // let cardaltimage = document.createElement('div');
  // cardaltimage.className = 'cardalt-image';
  // let cardalttext = document.createElement('div');
  // cardalttext.className = 'cardalt-text';
  // let s = document.createElement('span');
  // s.innerHTML = "---";
  // let p = document.createElement('h2');
  // p.innerHTML = product;
  // let pr = document.createElement('h3');
  // pr.innerHTML = "₹ "+price;
  // let n = document.createElement('h6');
  // n.innerHTML = "Posted By : "+name;
  // let d = document.createElement('p');
  // d.innerHTML = desc;
  // let cardaltstats = document.createElement('div');
  // cardaltstats.className = 'cardalt-stats';
  // let img = document.createElement('img');
  // img.setAttribute("style", "height: 100%; width:100%; object-fit: contain;");
  // img.src = imgurl;
  // cardaltimage.append(img);
  // cardalttext.appendChild(s);
  // cardalttext.appendChild(p);
  // cardalttext.appendChild(pr);
  // cardalttext.appendChild(n);
  // cardalttext.appendChild(d);
  // cardalt.appendChild(cardaltimage);
  // cardalt.appendChild(cardalttext);
  // cardalt.appendChild(cardaltstats);
  row.appendChild(col);
}

db.collection("products").get().then(
  (snapshot)=>{
        snapshot.docs.forEach(doc=>{
          // console.log(doc.data());
          // doc.data();
          // let name = doc.get("Name");
          // console.log(name);
          renderOnPage(doc);
        })
      }
  );


// let dsubmit = document.querySelector("#demo-btn");
// let dimg = document.querySelector("#demo-img");
//
// dsubmit.addEventListener('click',demoUpload);

function demoUpload(){
  console.log(dimg);
  let image = dimg.files[0];
  let image_name = image.name;
  let storeRef = firebase.storage().ref('images/'+image_name);
  let uploadTask = storeRef.put(image);

  uploadTask.on('state_changed', function(snapshot){
    let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log(progress);
  },function(error){
    console.log(error.message);
  },function(){
      uploadTask.snapshot.ref.getDownloadURL().then(function(url){
        console.log(url);
      });
  }
  );
}

// let product = document.querySelector("#product-form");
// let name = document.querySelector("#name-form");
// let price = document.querySelector("#price-form");
// let desc = document.querySelector("#desc-form");
// let img = document.querySelector('#img-form');
// let submit = document.querySelector('#submit-form');

// submit.addEventListener('click',addToFirebase);

// function addToFirebase(e){
//   e.preventDefault();
//   let image = img.files[0];
//   let image_name = image.name;
//   let storeRef = firebase.storage().ref('images/'+image_name);
//   let uploadTask = storeRef.put(image);
//   let imgurl = null;
//   uploadTask.on('state_changed', function(snapshot){
//     let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
//     console.log(progress);
//   },function(error){
//     console.log(error.message);
//   },function(){
//       uploadTask.snapshot.ref.getDownloadURL().then(function(url){
//         imgurl = url;
//       });
//   }
//   );

//   function checkFlag() {
//     if(imgurl ==null) {
//        window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
//     } else {
//       db.collection("products").add({
//         Name : categoryName.value,
//         Price : price.value,
//         Product : product.value,
//         Description : description.value,
//         Image : listOfImages[0]
//       });
//     }
//   }
//   checkFlag();

// }
