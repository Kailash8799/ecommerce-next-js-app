import '../styles/globals.css'
import Navbar from '../components/Navbar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  
  let router = useRouter();
  const [cart, setcart] = useState({})
  const [subtotal, setsubtotal] = useState(0)
  const [user, setuser] = useState(false)
  const [userlog, setuserlog] = useState({value: null,email:""})
  const [keyy, setkeyy] = useState('')

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
  }
  
    setsubtotal(subt);
  }
  useEffect(() => {
    setkeyy(Math.random());
    router.events.on('routeChangeStart',()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100);
    })
    try {
      if (localStorage.getItem('cart')) {
        setcart(JSON.parse(localStorage.getItem('cart')));
        let myCart = JSON.parse(localStorage.getItem('cart'))
        let subt = 0;
        let keys = Object.keys(myCart)
        for (let i = 0; i < keys.length; i++) {
          subt += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setsubtotal(subt);
      }
    } catch (error) {
      localStorage.removeItem('cart');
    }
    let token = localStorage.getItem("token")
    let useremail = localStorage.getItem("useremail");
    if(token){
      setuserlog({value:token,email:useremail})
      setuser(true);
      setkeyy(Math.random());
    }
  },[router.query])

  const clearToCart = () => {
    setcart({});
    saveCart({});
    setsubtotal(0);
  }
  const userlogout = ()=>{
    setProgress(10)
    localStorage.removeItem("token");
    localStorage.removeItem("useremail");
    setuser(false);
    setProgress(70)
    setkeyy(Math.random());
    setProgress(100)
    setuserlog({value:null,email:""})
    router.push(`${process.env.NEXT_PUBLIC_HOST}`)
  }
  const addTocart = (itemCode, qty, price, itemname, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty : 1, price, itemname, size, variant };
    }
    setcart(newCart);
    saveCart(newCart);
  }
  const buyNow = (itemCode, qty, price, itemname, size, variant)=>{
    let newCart = {}
    newCart[itemCode] = {qty, price, itemname, size, variant};
    setcart(newCart);
    saveCart(newCart);
  }
  const removeFromcart = (itemCode, qty, price, itemname, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setcart(newCart);
    saveCart(newCart);
  }
   const [progress, setprogress] = useState(0)
  const setProgress = (prog) => {
    setprogress(prog)
  }
  return <>
    {keyy&&<Navbar setProgress={setProgress} key={keyy} user={user} userlogout={userlogout} buyNow={buyNow} removeFromcart={removeFromcart} addTocart={addTocart} clearToCart={clearToCart} cart={cart} subtotal={subtotal} />}
    <LoadingBar
            color='#f11946'
            waitingTime={400}
            progress={progress}
            onLoaderFinished={setProgress}
          />
    <Nav/>
    <Component userlog={userlog} setuserlog={setuserlog} buyNow={buyNow} removeFromcart={removeFromcart} addTocart={addTocart} clearToCart={clearToCart} cart={cart} subtotal={subtotal} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
