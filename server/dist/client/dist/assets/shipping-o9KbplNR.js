import{n as p,w as g,d as m,r as d,j as e,x,o as y,p as j,_ as v}from"./index-CnNG6d7V.js";import{B as C}from"./index-DFsyqHTy.js";const I=()=>{const{cartItems:o}=p(t=>t.cartReducer),{user:i}=p(t=>t.userReducer),s=g(),u=m(),[a,l]=d.useState({address:"",city:"",state:"",country:"",pincode:""}),n=t=>{l(r=>({...r,[t.target.name]:t.target.value}))},h=async t=>{t.preventDefault(),u(x({...a}));try{const{data:r}=await y.post(`${j}/api/v1/payment/create?id=${i==null?void 0:i._id}`,{items:o.map(c=>({productId:c._id,quantity:c.quantity})),shippingInfo:a,coupon:localStorage.getItem("couponCode")?JSON.parse(localStorage.getItem("couponCode")):""},{headers:{"Content-Type":"application/json"}});s("/pay",{state:r.clientSecret})}catch(r){console.error(r),v.error("Something went wrong")}};return d.useEffect(()=>{if(o.length<=0)return s("/cart")},[o,s]),e.jsxs("div",{className:"shipping",children:[e.jsx("button",{className:"back-btn",onClick:()=>s("/cart"),children:e.jsx(C,{})}),e.jsxs("form",{onSubmit:h,children:[e.jsx("h1",{children:"Shipping Address"}),e.jsx("input",{required:!0,type:"text",placeholder:"Address",name:"address",value:a.address,onChange:n}),e.jsx("input",{required:!0,type:"text",placeholder:"City",name:"city",value:a.city,onChange:n}),e.jsx("input",{required:!0,type:"text",placeholder:"State",name:"state",value:a.state,onChange:n}),e.jsxs("select",{name:"country",required:!0,value:a.country,onChange:n,children:[e.jsx("option",{value:"",children:"Choose Country"}),e.jsx("option",{value:"india",children:"India"})]}),e.jsx("input",{required:!0,type:"text",placeholder:"Pin Code",name:"pincode",value:a.pincode,onChange:n}),e.jsx("button",{type:"submit",children:"Pay Now"})]})]})};export{I as default};
