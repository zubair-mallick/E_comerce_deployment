import{j as e,D as V,E as Y,H as Z,d as ee,n as se,I as te,r as d,J as ie,K as re,M as ne,N as oe,O as o,m as ce,P as le,Q as de,_ as x,f as ae,T as ue,U as he}from"./index-CnNG6d7V.js";import{B as P,I as xe,$ as je}from"./index-C-Nwj5L5.js";import{r as _}from"./features-BvmZWnqf.js";import{A as pe}from"./index-BwyhZKgd.js";const T=({value:i=0})=>{const{Ratings:l}=P({IconFilled:e.jsx(V,{}),IconOutline:e.jsx(Y,{}),value:i,styles:{fontSize:"1.75rem",color:"coral",justifyContent:"flex-start",gap:"1px"}});return e.jsx(l,{})},Ce=()=>{var w,R,b,y,C,k,S,F,I,N,D;const i=Z(),l=ee(),{user:r}=se(t=>t.userReducer),{isLoading:A,isError:E,data:s}=te(i.id),[H,j]=d.useState(!1),[c,p]=d.useState(1),u=ie(i.id),[m,g]=d.useState(""),h=d.useRef(null),[M,f]=d.useState(!1),[Q]=re(),[$]=ne(),B=()=>{c>0&&p(t=>t-1)},q=()=>{var t,n;((t=s==null?void 0:s.product)==null?void 0:t.stock)>c?p(a=>a+1):x.error(`${(n=s==null?void 0:s.product)==null?void 0:n.stock} available only`)},z=t=>{if(!r){x.error("Login Required");return}if(t.stock<1)return x.error("Out of Stock");l(ae(t))};if(E)return e.jsx(oe,{to:"/404"});const U=()=>{var t;(t=h.current)==null||t.showModal()},{Ratings:X,rating:J,setRating:K}=P({IconFilled:e.jsx(ue,{}),IconOutline:e.jsx(he,{}),value:0,selectable:!0,styles:{fontSize:"1.75rem",color:"coral",justifyContent:"flex-start"}}),v=()=>{var t;(t=h.current)==null||t.close(),K(0),g("")},W=async t=>{t.preventDefault(),f(!0),v();const n=await Q({comment:m,rating:J,userId:r==null?void 0:r._id,productId:i.id});f(!1),_(n,null,"")},G=async t=>{const n=await $({reviewId:t,userId:r==null?void 0:r._id});_(n,null,"")};return e.jsxs("div",{className:"product-details",children:[A?e.jsx(ge,{}):e.jsx(e.Fragment,{children:e.jsxs("main",{children:[e.jsxs("section",{children:[e.jsx(xe,{showThumbnails:!0,showNav:!1,onClick:()=>j(!0),images:((w=s==null?void 0:s.product)==null?void 0:w.photos)||[]}),H&&e.jsx(je,{NextButton:fe,PrevButton:ve,setIsOpen:j,images:((R=s==null?void 0:s.product)==null?void 0:R.photos)||[]})]}),e.jsxs("section",{children:[e.jsx("code",{children:(b=s==null?void 0:s.product)==null?void 0:b.category}),e.jsx("h1",{children:(y=s==null?void 0:s.product)==null?void 0:y.name}),e.jsx("div",{children:e.jsxs("em",{style:{display:"flex",gap:"1rem",alignItems:"center"},children:[e.jsx(T,{value:((C=s==null?void 0:s.product)==null?void 0:C.ratings)||5}),"(",(k=s==null?void 0:s.product)==null?void 0:k.numOfReviews," reviews)"]})}),e.jsxs("h3",{children:["₹",(S=s==null?void 0:s.product)==null?void 0:S.price]}),e.jsxs("article",{children:[e.jsxs("div",{children:[e.jsx("button",{disabled:c===0,onClick:B,children:"-"}),e.jsx("span",{children:c}),e.jsx("button",{disabled:c===((F=s==null?void 0:s.product)==null?void 0:F.stock),onClick:q,children:"+"})]}),c===((I=s==null?void 0:s.product)==null?void 0:I.stock)&&e.jsx("p",{className:"red",children:"stock limit reached"}),e.jsx("button",{onClick:()=>{var t,n,a,L,O;return z({productId:(t=s==null?void 0:s.product)==null?void 0:t._id,name:(n=s==null?void 0:s.product)==null?void 0:n.name,price:(a=s==null?void 0:s.product)==null?void 0:a.price,stock:(L=s==null?void 0:s.product)==null?void 0:L.stock,quantity:c,photos:((O=s==null?void 0:s.product)==null?void 0:O.photos)||[]})},children:"Add To Cart"})]}),e.jsx("p",{children:(N=s==null?void 0:s.product)==null?void 0:N.description})]})]})}),e.jsxs("dialog",{ref:h,className:"review-dialog",children:[e.jsx("button",{onClick:v,children:"X"}),e.jsx("h2",{children:"Write a Review"}),e.jsxs("form",{onSubmit:W,children:[e.jsx("textarea",{value:m,onChange:t=>g(t.target.value),placeholder:"Review..."}),e.jsx(X,{}),e.jsx("button",{disabled:M,type:"submit",children:"Submit"})]})]}),e.jsxs("section",{children:[e.jsxs("article",{children:[e.jsx("h2",{children:"Reviews"}),u.isLoading?null:r&&e.jsx("button",{onClick:U,children:e.jsx(pe,{})})]}),e.jsx("div",{style:{display:"flex",gap:"2rem",overflowX:"auto",padding:"2rem"},children:u.isLoading?e.jsxs(e.Fragment,{children:[e.jsx(o,{width:"45rem",length:5}),e.jsx(o,{width:"45rem",length:5}),e.jsx(o,{width:"45rem",length:5})]}):(D=u.data)==null?void 0:D.reviews.map(t=>e.jsx(me,{handleDeleteReview:G,userId:r==null?void 0:r._id,review:t},t._id))})]})]})},me=({review:i,userId:l,handleDeleteReview:r})=>e.jsx("div",{className:"review-container",children:e.jsxs("div",{className:"review",children:[e.jsx(T,{value:i.rating}),e.jsx("p",{children:i.comment}),e.jsxs("div",{children:[e.jsx("img",{src:i.user.photo,alt:"User"}),e.jsx("small",{children:i.user.name})]}),l===i.user._id&&e.jsx("button",{onClick:()=>r(i._id),children:e.jsx(ce,{})})]})}),ge=()=>e.jsxs("div",{style:{display:"flex",gap:"2rem",border:"1px solid #f1f1f1",height:"80vh"},children:[e.jsx("section",{style:{width:"100%",height:"100%"},children:e.jsx(o,{width:"100%",containerHeight:"100%",height:"100%",length:1})}),e.jsxs("section",{style:{width:"100%",display:"flex",flexDirection:"column",gap:"4rem",padding:"2rem"},children:[e.jsx(o,{width:"40%",length:3}),e.jsx(o,{width:"50%",length:4}),e.jsx(o,{width:"100%",length:2}),e.jsx(o,{width:"100%",length:10})]})]}),fe=({onClick:i})=>e.jsx("button",{onClick:i,className:"carousel-btn",children:e.jsx(le,{})}),ve=({onClick:i})=>e.jsx("button",{onClick:i,className:"carousel-btn",children:e.jsx(de,{})});export{Ce as default};
