import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ChatContext } from "../context";
import ClipLoader from "react-spinners/ClipLoader";
import { FaUserAlt } from "react-icons/fa";
import { MdAccountBox, MdSend } from "react-icons/md";

const Modal = (props) => {
  const { loading } = React.useContext(ChatContext);

  const [name, setName] = React.useState("");
  const [accountAddress, setAccountAddress] = React.useState("");

  return (
    <div className="w-4/5 my-4 mx-auto sm:w-[90%]">
      <div className="grid grid-cols-modalGrid items-center sm:grid-cols-1">
        <div>
          <Image src={props.backgroundImage} alt="image" />
        </div>
        <div className="p-4">
          <h1 className="text-3xl text-[#d4227b] leading-4 font-semibold sm:text-base ">
            {props.data}
          </h1>
          <p>{props.info}</p>

          {loading == true ? (
            <div>
              <ClipLoader
                color={"#000"}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center m-4 gap-4 bg-[rgba(0,0,0,0.25)] p-4 rounded-lg cursor-pointer">
                <FaUserAlt />
                <input
                  className="w-full bg-transparent border-none outline-none text-[#f18]"
                  type="text"
                  placeholder="Your name?"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center m-4 gap-4 bg-[rgba(0,0,0,0.25)] p-4 rounded-lg cursor-pointer">
                <MdAccountBox />
                <input
                  className="w-full bg-transparent border-none outline-none text-[#f18]"
                  type="text"
                  placeholder={props.address || "Enter address"}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid sm:grid-cols-1 sm:z-40">
                <button
                  className="outline-none border-none text-[#f18] text-base font-bold uppercase bg-[rgba(0,0,0,0.25)] p-4 rounded-lg flex items-center justify-center gap-4 cursor-pointer"
                  onClick={() => props.propsFunction({ name, accountAddress })}
                >
                  <MdSend />
                  Send
                </button>
                <button
                  className="outline-none border-none text-[#f18] text-base font-bold uppercase bg-[rgba(0,0,0,0.25)] p-4 rounded-lg flex items-center justify-center gap-4 cursor-pointer"
                  onClick={() => props.openModal(false)}
                >
                  <MdSend />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
