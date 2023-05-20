import * as React from 'react'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaMugHot,FaTshirt, FaUserCircle, FaPlusCircle, FaMinusCircle, FaShoppingCart } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { GiHoodie } from 'react-icons/gi';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AiFillHome } from 'react-icons/ai';
import { BiSticker } from 'react-icons/bi';
import { HiMenuAlt1 } from 'react-icons/hi';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const Navbar = ({ user, userlogout, removeFromcart, addTocart, clearToCart, cart, subtotal }) => {
  let flag = false
  if (Object.keys(cart).length === 0) {
    flag = true;
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  const ref2 = useRef();
  const toggleNav = () => {
    if (ref2.current.classList.contains('translate-x-full')) {
      ref2.current.classList.remove('translate-x-full')
      ref2.current.classList.add('translate-x-0')
    }
    else if (!ref2.current.classList.contains('translate-x-full')) {
      ref2.current.classList.remove('translate-x-0')
      ref2.current.classList.add('translate-x-full')
    }
  }
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openn, setOpen] = React.useState(false);
  const [openn1, setOpen1] = React.useState(false);
  const [openn2, setOpen2] = React.useState(false);
  const [openn3, setOpen3] = React.useState(false);

  const handleClickl = () => {
    setOpen(!openn);
    if(openn1 || openn2 || openn3){
      setOpen1(false)
      setOpen2(false)
      setOpen3(false)
    }
  };
  const handleClick2 = () => {
    setOpen1(!openn1);
    if(openn || openn2 || openn3){
      setOpen(false)
      setOpen2(false)
      setOpen3(false)
    }
  };
  const handleClick3 = () => {
    setOpen2(!openn2);
    if(openn1 || openn || openn3){
      setOpen1(false)
      setOpen(false)
      setOpen3(false)
    }
  };
  const handleClick4 = () => {
    setOpen3(!openn3);
    if(openn1 || openn2 || openn){
      setOpen1(false)
      setOpen2(false)
      setOpen(false)
    }
  };

  return (
    <>
      <div className='navbaradd fixed w-full top-0 bg-slate-50 z-50'>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-col md:flex-row md:justify-start items-center py-3 shadow-md">
          <div className="logo mx-5 cursor-pointer">
            <Link legacyBehavior  href={"/"}>
              <a>
                <Image src="/logo.png" alt='logo' height={40} width={200} ></Image>
              </a>
            </Link>
          </div>
          <div className="nav hidden md:block text-gray-700">
            <ul className="flex items-center space-x-3 font-medium text-xl">
              <Link legacyBehavior href={"/tshirt"}><a className='cursor-pointer'><li className='hover:text-pink-600'>T-shirts</li></a></Link>
              <Link legacyBehavior href={"/mugs"}><a className='cursor-pointer'><li className='hover:text-pink-600'>Mugs</li></a></Link>
              <Link legacyBehavior href={"/hoodies"}><a className='cursor-pointer'><li className='hover:text-pink-600'>Hoodies</li></a></Link>
              <Link legacyBehavior href={"/stickers"}><a className='cursor-pointer'><li className='hover:text-pink-600'>Stickers</li></a></Link>
            </ul>
          </div>
          {user ?
            <div className="cart absolute right-20 top-5 hidden md:block">

              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <FaUserCircle className='text-2xl text-pink-500' />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link legacyBehavior href={"/myaccount"}>
                  <MenuItem>
                    <Avatar /> My account
                  </MenuItem>
                </Link>
                <Link legacyBehavior href={"/myorder"}>
                  <MenuItem>
                    <Avatar>
                      <LocalMallRoundedIcon />
                    </Avatar> My Order
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={() => { userlogout() }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
            :
            <div className="cart absolute right-20 top-5 hidden md:block"><Link legacyBehavior href={"/login"}><button className='rounded-lg border-solid border bg-pink-500 text-white border-gray-400 py-1 px-2'>Login</button></Link>
            </div>
          }
          <div className="cart absolute right-10 top-5 hidden  md:block">
            <Tooltip title="Cart">
              <IconButton onClick={toggleCart} className='rounded-lg  p-1'>
                <AiOutlineShoppingCart className='text-2xl
          text-pink-500'/>
              </IconButton>
            </Tooltip>
          </div>
          <div id='cartdiv' ref={ref} className={`transition-transform transform translate-x-full overflow-y-scroll sideCart fixed top-0 right-0 h-[100vh] bg-white w-full md:w-2/4 z-50`}>
            <div className=''>
              <div className='h-20 border-b border-gray-400 items-center py-6'>
                <div>
                  <h1 className='text-xl font-bold ml-4'>Shopping cart</h1>
                </div>
                <div className='text-2xl font-bold absolute right-7 top-7 cursor-pointer' onClick={toggleCart}><GrClose /></div>
              </div>
              <div className="cartitems ml-12 mt-9">
                {Object.keys(cart).length !== 0 && <ol className='list-decimal font-medium'>
                  {Object.keys(cart).map((k) => {
                    return <li key={k} className='py-2'>
                      <div className="item flex">
                        <div className="w-3/4 font-semibold text-lg">{`${cart[k].itemname}(${cart[k].size}/${cart[k].variant})`}</div>
                        <div className='w-1/4 items-center justify-center flex'>
                          <div onClick={() => { removeFromcart(k, 1, cart[k].price, cart[k].itemname, cart[k].size, cart[k].variant) }} className='px-2 cursor-pointer'><FaMinusCircle className='text-pink-500 text-xl' /></div>
                          <div>{cart[k].qty}</div>
                          <div onClick={() => { addTocart(k, 1, cart[k].price, cart[k].itemname, cart[k].size, cart[k].variant) }} className='px-2 cursor-pointer'><FaPlusCircle className='text-pink-500 text-xl' /></div>
                        </div>
                      </div>
                    </li>
                  })}
                </ol>}
                {Object.keys(cart).length === 0 && 'Your cart is Empty!'}
              </div>
              <div className='ml-10 mt-7 text-xl font-bold'>
                Subtotal : ₹{subtotal}
              </div>
              <div className="flex ml-10 mb-16">
                <Link legacyBehavior href={"/checkout"}><button onClick={toggleCart} className=" mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg flex items-center disabled:bg-pink-400" disabled={flag}><FaShoppingCart className='text-xl' /><span className='pl-2'> Checkout</span></button></Link>
                <button onClick={clearToCart} className="ml-3 mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg disabled:bg-pink-400" disabled={flag}>Clear Cart</button>
              </div>
            </div>
          </div>
          <div ref={ref2} className={`transition-transform transform translate-x-full overflow-y-scroll  fixed top-0 right-0 h-[100vh] bg-white md:hidden w-full md:w-2/4 z-50`}>
          <div className='h-20 border-b mb-2 border-gray-400 items-center py-6'>
                <div>
                  <h1 className='text-xl font-bold ml-4'>Menu</h1>
                </div>
                <div className='text-2xl font-bold absolute right-7 top-7 cursor-pointer' onClick={toggleNav}><GrClose /></div>
              </div>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Featured
                </ListSubheader>
              }
            >
              <ListItemButton onClick={handleClickl}>
                <ListItemIcon>
                  <FaTshirt className='text-2xl'/>
                </ListItemIcon>
                <ListItemText primary="T-Shirts" />
                {openn ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openn} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <Link legacyBehavior href={"tshirt"}>
                    <ListItemText onClick={toggleNav} primary="All T-Shirts" />
                    </Link>
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleClick2}>
                <ListItemIcon>
                  <FaMugHot className='text-2xl'/>
                </ListItemIcon>
                <ListItemText primary="Mugs" />
                {openn1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openn1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <Link legacyBehavior href={"/mugs"}>
                    <ListItemText onClick={toggleNav} primary="All Mugs" />
                    </Link>
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleClick3}>
                <ListItemIcon>
                  <GiHoodie className="text-2xl" />
                </ListItemIcon>
                <ListItemText primary="Hoodies" />
                {openn2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openn2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <Link legacyBehavior href={"/hoodies"}>
                    <ListItemText onClick={toggleNav} primary="All Hoodies" />
                    </Link>
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton onClick={handleClick4}>
                <ListItemIcon>
                  <BiSticker className='text-2xl'/>
                </ListItemIcon>
                <ListItemText primary="Stickers" />
                {openn3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openn3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <Link legacyBehavior href={"stickers"}>
                    <ListItemText onClick={toggleNav} primary="All Stickers" />
                    </Link>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </div>
        </div>
      </div>
      <div className='navbaradd md:hidden border-t shadow-xl'>
        <BottomNavigation className='w-full z-40 bg-gray-200 shadow-lg' sx={{ position: 'fixed', bottom: 2, left: 0, right: 0 }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            onClick={toggleNav}
            icon={<HiMenuAlt1 className='text-2xl text-pink-500' />}
          />
          <Link legacyBehavior href={"/"}>
            <BottomNavigationAction
              icon={<AiFillHome className='text-2xl text-pink-500' />}
            /></Link>
          <BottomNavigationAction
            onClick={toggleCart}
            icon={<AiOutlineShoppingCart className='text-pink-500 text-2xl' />}
          />
          <BottomNavigationAction
            icon={<FaUserCircle className='text-2xl text-pink-500' />}
          />
        </BottomNavigation>
      </div>
    </>
  )
}

export default Navbar