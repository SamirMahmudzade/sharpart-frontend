import { useEffect, useRef, useState } from "react";
import { toast, Zoom } from "react-toastify";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import {
  ExclamationIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import MoralisAuth from "../components/Buttons/MoralisAuth";
import NodeCard from "../components/Cards/NodeCard";
import Heading from "../components/Typography/Heading";
import AlertCard from "../components/Cards/AlertCard";
import Dropdown from "../components/Dropdown";
import contractInterface from "../lib/contracts/SharpDaoV2.sol/SharpDaoV2.json";

export default function MakeADao() {
  const baseURIExample =
    "https://sharpart.vercel.app/nft-metadata/jsons/{id}.json";
  //? Initialise Moralis and userDaoObj.
  const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  Moralis.initialize(APP_ID);
  Moralis.serverURL = SERVER_ID;
  const userDaoObj = Moralis.Object.extend("userDao");
  const daoQuery = new Moralis.Query(userDaoObj);

  //? User's wallet state.
  const { isAuthenticated, user } = useMoralis();
  const ethAddress = user?.get("ethAddress");
  const [ethersState, setEtherState] = useState({
    ethereum: null,
    provider: null,
    signer: null,
  });
  //? State for users daos (fetched from Moralis)
  //? State for the selected dao address the user wants to interact with
  const [usersDaos, setDaos] = useState([]);
  const [selectedDao, setSelectedDao] = useState("");

  //? Form state
  const [formData, setFormData] = useState({
    addressInput: "",
    baseURI: "",
  });
  const [addressArray, setAddrArr] = useState([]);

  //? DAO INTERACTIONS

  const fetchUserDaos = async () => {
    let localArr = [];
    daoQuery.equalTo("ethAddress", ethAddress);
    const results = await daoQuery.find();
    for (let i = 0; i < results.length; i++) {
      localArr.push(results[i].get("daoAddress"));
    }
    setDaos(localArr);
    console.log("Moralis Dao fetch results: " + localArr);
  };

  const interactDao = async () => {
    const factory = new ethers.ContractFactory(
      contractInterface.abi,
      contractInterface.bytecode,
      ethersState.signer
    );
    const contract = factory.attach(selectedDao);
    const testOwner = await contract.owners(1);
    const testBase = await contract.uri(0);
    console.log("test interaction:" + testOwner + testBase);
  };

  const deployDao = async () => {
    let deployed = null;
    //? If there is no signer in ethersState, return toast.error
    if (!ethersState.signer) {
      return toast.error("No Metamask/Ethers connection, try refreshing", {
        position: "top-right",
        autoClose: 3000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    //? Instantiate new userDao Moralis obj and new contract factory.
    //? This will be for recording data to Moralis DB when deploying the contract.
    const daoSession = new userDaoObj();
    const factory = new ethers.ContractFactory(
      contractInterface.abi,
      contractInterface.bytecode,
      ethersState.signer
    );
    const mappedAddressArray = addressArray.map((item) => {
      return item.owner;
    });
    console.log("Owner/Signer:" + ethersState.signer);
    console.log("Owners:" + mappedAddressArray);

    const contract = await factory.deploy(mappedAddressArray, formData.baseURI);
    console.log(contract.address);
    console.log(contract.deployTransaction);
    await contract.deployTransaction
      .wait()
      .then((res) => {
        deployed = true;
        console.log(res);
        daoSession.set("ethAddress", ethAddress);
        daoSession.set("daoAddress", contract.address);
        toast.success(`Contract deployed to: ${contract.address}`, {
          position: "top-right",
          autoClose: 3000,
          transition: Zoom,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        deployed = false;
        console.log(err);
        toast.error(err, {
          position: "top-right",
          autoClose: 3000,
          transition: Zoom,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });

    if (deployed) await daoSession.save();
  };

  //? Form functions

  //? Internal function for pushAddress to push to state
  const addOwner = (owner) => {
    const newArr = [...addressArray, { owner }];
    setAddrArr(newArr);
    console.log(addressArray);
  };

  const pushAddress = async () => {
    console.log("state check:" + ethersState.signer + addressArray);
    const input = formData.addressInput;

    //? If Ethers doesn't validate the address, warn the user.
    if (!ethers.utils.isAddress(input)) {
      return toast.error("Address' must be valid", {
        position: "top-right",
        autoClose: 3000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    //? Else convert address input as a Checksum Address and add state
    else {
      const checksum = ethers.utils.getAddress(input);
      addOwner(checksum);
      setFormData({
        ...formData,
        addressInput: "",
      });
    }
  };
  const removeAddress = async (index) => {
    const newAddressArray = [...addressArray];
    newAddressArray.splice(index, 1);
    setAddrArr(newAddressArray);
  };

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  useEffect(() => {
    //@ts-ignore
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const newState = {
      ethereum,
      provider,
      signer,
    };
    setEtherState(newState);
    console.log(ethersState);
  }, []);

  //? No Auth
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col py-16 space-y-4 sm:space-y-10 lg:space-y-16 items-center justify-center ">
        <AlertCard
          title="Whoa There!"
          body="You require metamask to use these decentralised applications"
          failure
        />
        <MoralisAuth />
      </div>
    );
  }
  //? Authed
  else
    return (
      <div className="flex flex-col space-y-4 sm:space-y-10 lg:space-y-16 items-center justify-center ">
        <NodeCard>
          <Heading fontSize="text-4xl" title={`Welcome ${ethAddress}`} />
          <p className="text-th-primary-light">
            Please ensure you are on Mumbai.
          </p>
        </NodeCard>
        <div
          className="
            bg-th-accent-warning-light text-th-accent-warning-dark
            border-2 md:border-8 border-th-accent-warning-medium p-8 rounded relative"
          role="alert"
        >
          <div className="flex flex-row space-x-4">
            <ExclamationIcon width={25} height={25} />
            <h1 className="font-bold text-sm md:text-3xl mb-4">Tips for use</h1>
          </div>
          <ol className="list-decimal ">
            <li>
              First, add your dao owners address (friends) in the form below.
              Owners can create new proposals.
            </li>
            <li>
              Finally, get your base URI for ERC1155 standard. This URI will
              look like this {baseURIExample} and watch{" "}
              <a
                target="blank"
                rel="noopener noreferrer"
                className="
                text-th-primary-medium
                transition duration-300 ease-in-out
                transform border-b-2
                border-th-primary-medium
                hover:border-transparent
                hover:scale-125
              "
                href="https://youtu.be/VglTdr0n5ZQ?t=1439"
              >
                HERE
              </a>{" "}
              for more info
            </li>
          </ol>
        </div>

        <NodeCard>
          <div className=" mx-12 flex flex-col space-y-4 text-th-primary-light text-center text-sm sm:text-lg md:text-2xl lg:text-4xl ">
            <Heading title="Enter your DAO details" />
            <label className="text-th-primary-light" htmlFor="addressInput">
              Dao owners
            </label>
            <div className=" flex flex-row space-x-4">
              <input
                value={formData.addressInput}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="
                                                focus:outline-none 
                                                text-th-primary-dark focus:bg-th-primary-light 
                                                transition-colors duration-300 
                                                ease-in-out bg-opacity-25 p-2"
                type="text"
                name="addressInput"
              />
              <button
                className="
                text-sm
             hover:bg-th-primary-dark
             text-th-primary-light
             shadow-md hover:shadow-lg rounded-lg 
             transition duration-300 ease-in-out
             focus:outline-none 
            "
                onClick={() => pushAddress()}
              >
                <PlusCircleIcon width={50} height={50} />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {addressArray.map((addr, index) => (
                <div key={index}>
                  <div className=" flex justify-center items-center space-x-2 text-lg">
                    <p>{addr.owner}</p>
                    <button
                      className="
                      text-sm
                      hover:bg-th-primary-dark
                      text-th-primary-light
                      shadow-md hover:shadow-lg rounded-lg 
                      transition duration-300 ease-in-out
                      focus:outline-none 
            "
                      onClick={() => removeAddress(index)}
                    >
                      <MinusCircleIcon width={25} height={25} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <label className="text-th-primary-light" htmlFor="message">
              Base URI
            </label>
            <input
              className="
                focus:outline-none 
                text-th-primary-dark focus:bg-th-primary-light 
                transition-colors duration-300 
                ease-in-out bg-opacity-25 p-2"
              type="email"
              onChange={(e) => {
                handleChange(e);
              }}
              name="baseURI"
            />
            {formData.baseURI.length > 2 && (
              <button
                type="submit"
                onClick={() => deployDao()}
                className="
                  p-4 focus:outline-none             
                  hover:bg-th-primary-dark
                  text-th-primary-light
                  shadow-md hover:shadow-lg rounded-lg 
                  transition duration-300 ease-in-out
                  "
              >
                Submit
              </button>
            )}
          </div>
        </NodeCard>
        <NodeCard wFull>
          <div className=" flex flex-col space-y-4 text-th-primary-light text-center text-sm sm:text-lg md:text-2xl lg:text-4xl ">
            <button
              className="
              text-th-primary-light flex justify-center items-center
              antialiased focus:outline-none
              shadow-md rounded-lg 
              hover:shadow-lg
              transition duration-200 ease-in-out transform hover:scale-110
            "
              onClick={() => fetchUserDaos()}
            >
              Fetch your daos
              <RefreshIcon width={50} height={50} />
            </button>
            {usersDaos.map((dao, index) => (
              <h1 key={index} className=" text-th-primary-light">
                {dao}
              </h1>
            ))}
          </div>
        </NodeCard>
        <NodeCard wFull>
          <div className=" flex flex-col space-y-4 text-th-primary-light text-center text-sm sm:text-lg md:text-2xl lg:text-4xl ">
            <div className="flex flex-row">
              <Heading title="Interact with your DAOs" />

              <div className="flex flex-row justify-end items-center">
                <Dropdown
                  options={usersDaos}
                  clickHandler={setSelectedDao}
                  title={selectedDao}
                />
                <button
                  className=" flex justify-center items-center
                                          antialiased focus:outline-none text-th-primary-light
                                          hover:shadow-lg rounded-lg 
                                          transition duration-200 ease-in-out transform hover:scale-125 "
                  onClick={() => fetchUserDaos()}
                >
                  <RefreshIcon width={50} height={50} />
                </button>
              </div>
            </div>

            <Heading title='coming in next update'/> 
          </div>
        </NodeCard>
      </div>
    );
}
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = axios.get(process.env.HOST_PROD + "/api/fetcheth")

  return {
    props: data
  }
}
*/
