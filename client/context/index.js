import React from "react";
import { useRouter } from "next/router";

import {
  ifWalletIsConnected,
  connectWallet,
  connectingToContract,
} from "../utils/contractConnection";

export const ChatContext = React.createContext();

export const ChatProvider = (props) => {
  const [account, setAccount] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [friends, setFriends] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState("");
  const [currentUserAddress, setCurrentUserAddress] = React.useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const contract = await connectingToContract();

      const contractAccount = await connectWallet();
      setAccount(contractAccount);

      const accountUsername = await contract.getUser(contractAccount);
      setUsername(accountUsername);

      const friendsList = await contract.getFriends(contractAccount);
      setFriends(friendsList);

      const allUsers = await contract.getAllUsers(contractAccount);
      setUsers(allUsers);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingToContract();

      const message = await contract.readMessage(friendAddress);

      setMessages(message);
    } catch (error) {
      setError("No messages");
    }
  };

  const sendMessage = async (messageData) => {
    try {
      if (messageData.message || messageData.address) {
        return setError("Please provide both message and address");
      }
      const contract = await connectingToContract();

      const message = await contract.sendMessage(
        messageData.address,
        messageData.message
      );

      setLoading(true);

      await message.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Try again later.");
    }
  };

  const createUser = async (userData) => {
    try {
      if (userData.name || userData.accountAddress) {
        return setError("Please provide both name and account address");
      }

      const contract = await connectingToContract();
      const getUser = await contract.addUser(userData.name);
      setLoading(true);

      await getUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  const addFriends = async (friendData) => {
    try {
      if (friendData.name || friendData.accountAddress) {
        return setError("Please provide both name and account address");
      }

      const contract = await connectingToContract();
      const addFriend = await contract.addFriend(
        friendData.name,
        friendData.accountAddress
      );
      setLoading(true);

      await addFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  const getUserInfo = async (address) => {
    try {
      if (address) {
        return setError("Please provide account address");
      }

      const contract = await connectingToContract();
      const username = await contract.getUser(address);

      setCurrentUser(username);
      setCurrentUserAddress(address);
      setLoading(true);
      await username.wait();
      setLoading(false);
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        account,
        friends,
        loading,
        currentUserAddress,
        currentUser,
        error,
        users,
        messages,
        username,
        readMessage,
        createUser,
        addFriends,
        sendMessage,
        getUserInfo,
        ifWalletIsConnected,
        connectWallet
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
