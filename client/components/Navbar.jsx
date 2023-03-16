import React from "react";
import Modal from "./Modal";
import Error from "../UI/Error";
import Link from "next/link";
import Image from "next/image";

import { ChatContext } from "../context";
import Logo from "../assets/icons/logo.png";
import User from "../assets/images/user.png";
import AddUser from "../assets/images/addUser.png";
import Banner from "../assets/images/banner.jpg";
import { AiFillCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { connectWallet, account, username, createUser, error } =
    React.useContext(ChatContext);

  const [active, setActive] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div className="w-4/5 my-12 mx-auto relative sm:w-[90%] text-white">
      <div className="grid grid-cols-navBar items-center gap-8 sm:grid-cols-smNavBar sm:justify-between">
        <div>
          <Image src={Logo} alt="logo"></Image>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 border-b border-b-transparent transition-all duration-500 ease-in-out sm:fixed sm:z-40 sm:bg-[#050505] sm:w-full sm:flex-col sm:h-[100vh] sm:inset-0 sm:p-16 sm:hidden">
            <div
              onClick={() => setActive(1)}
              className={`${
                active == 1
                  ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                  : ""
              } `}
            >
              <Link href="/">Home</Link>
            </div>
            <div
              onClick={() => setActive(2)}
              className={`${
                active == 2
                  ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                  : ""
              } `}
            >
              <Link href="/users">Users</Link>
            </div>
            <div
              onClick={() => setActive(3)}
              className={`${
                active == 3
                  ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                  : ""
              } `}
            >
              <Link href="/chat">Chat</Link>
            </div>
            <div
              onClick={() => setActive(4)}
              className={`${
                active == 4
                  ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                  : ""
              } `}
            >
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          {open && (
            <div className="hidden sm:block sm:fixed sm:z-40 sm:bg-[#050505] sm:inset-0 sm:text-center sm:pt-16">
              <div
                onClick={() => setActive(1)}
                className={`${
                  active == 1
                    ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                    : ""
                } sm:mt-4`}
              >
                <Link href="/">Home</Link>
              </div>
              <div
                onClick={() => setActive(2)}
                className={`${
                  active == 2
                    ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                    : ""
                } sm:mt-4`}
              >
                <Link href="/users">Users</Link>
              </div>
              <div
                onClick={() => setActive(3)}
                className={`${
                  active == 3
                    ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                    : ""
                } sm:mt-4`}
              >
                <Link href="/chat">Chat</Link>
              </div>
              <div
                onClick={() => setActive(4)}
                className={`${
                  active == 4
                    ? "text-[#d4227b] border-b border-b-[#d4227b] border-solid pb-2"
                    : ""
                } sm:mt-4`}
              >
                <Link href="/contact">Contact</Link>
              </div>
              <div className="pt-8 mx-auto">
                <AiFillCloseCircle
                  onClick={() => setOpen(false)}
                  color={"#fff"}
                  size={48}
                />
              </div>
            </div>
          )}

          <div className="flex justify-self-end">
            {" "}
            {account == "" ? (
              <button
                onClick={() => connectWallet()}
                className="bg-zinc-700 p-4 border-none rounded-lg text-lg text-[#d4227b] font-bold cursor-pointer flex items-center gap-2 sm:text-base sm:p-3"
              >
                Connect to Wallet
              </button>
            ) : (
              <button
                onClick={() => setOpenModal(true)}
                className="bg-zinc-700 p-4 border-none rounded-lg text-lg text-[#d4227b] font-bold cursor-pointer flex items-center gap-2 sm:text-base sm:p-3"
              >
                <Image src={username ? User : AddUser} alt="user"></Image>
                <small>{username || "Create Account"}</small>
              </button>
            )}
          </div>
          <div onClick={() => setOpen(true)} className="hidden sm:block">
            <GiHamburgerMenu size={48} />
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-[#292f3f] z-50 sm:absolute sm:top-0 sm:right-0 sm:bottom-3/4 sm:left-0 sm:bg-[#292f3f]">
          <Modal
            openModal={setOpenModal}
            backgroundImage={Banner}
            data="CoinChat"
            info="Select your name"
            propsFunction={createUser}
            address={account}
          ></Modal>
        </div>
      )}
      {error && <Error error={error} />}
    </div>
  );
};

export default Navbar;
