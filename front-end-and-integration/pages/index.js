import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { 
  electionContractAddress,
  electionContractABI,
} from "@/abiAndContractSettings";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits, parseUnits, formatBytes32String } from 'ethers'


export default function BallotBridgeHome() {
      // wallet connect settings
      const { address, chainId, isConnected } = useWeb3ModalAccount()
      const { walletProvider } = useWeb3ModalProvider()

      //loading state
      const [loading, setLoading] = useState()
  useEffect(() => {
    AOS.init();
  }, [])

  //functions to control election components mounted
  const [blureffect, setBlurEffect] = useState()
  const [electionComponent, setElectionComponent] = useState("mainElectionPage")
  //create election component
  const controlCreateElectionVisibility = () => {
    setBlurEffect("blur(10px)")
    setTimeout(()=> {
      setBlurEffect("blur(0px)")
      setElectionComponent("createElection")
    },1000)
  }

  const resetControlCreateElectionVisibility = () => {
    setElectionComponent("mainElectionPage")
  }

  //help component
  //usestates for help instructions
  const [instruction1, setInstruction1] = useState(false)
  const [instruction2, setInstruction2] = useState(false)
  const [instruction3, setInstruction3] = useState(false)
  const [instruction4, setInstruction4] = useState(false)
  const [instruction5, setInstruction5] = useState(false)

  const controlHelpVisibility = () => {
    setBlurEffect("blur(10px)")
    setTimeout(()=> {
      setBlurEffect("blur(0px)")
      setElectionComponent("help")
    },1000)
  }

  const resetControlHelpVisibility = () => {
    setElectionComponent("mainElectionPage")
    setInstruction1(false)
    setInstruction2(false)
    setInstruction3(false)
    setInstruction4(false)
    setInstruction5(false)
  }

  //single election component
  const controlSingleElectionVisibility = () => {
    setBlurEffect("blur(10px)")
    setTimeout(()=> {
      setBlurEffect("blur(0px)")
      setElectionComponent("singleElection")
    },1000)
  }

  const resetControlSingleElectionVisibility = () => {
    setElectionComponent("mainElectionPage")
  }


  //functions to control election buttons
  const [currentElectionButton, setcurrentElectionButton] = useState("all")
  const [allBg, setAllBg] = useState("#000")
  const [allBoxShadow, setAllBoxShadow] = useState("1px 1px 2px 1px #fff")
  const [voteOngoingBg, setVoteOngoingBg] = useState("#001")
  const [voteOngoingBoxShadow, setVoteOngoingBoxShadow] = useState("1px 1px 2px 1px #00f")
  const [registrationOngoingBg, setRegistrationOngoingBg] = useState("#001")
  const [registrationOngoingBoxShadow, setRegistrationOngoingBoxShadow] = useState("1px 1px 2px 1px #00f")
  const [upcomingBg, setUpcomingBg] = useState("#001")
  const [upcomingboxShadow, setUpcomingBoxShadow] = useState("1px 1px 2px 1px #00f")
  const [endedBg, setEndedBg] = useState("#001")
  const [endedBoxShadow, setEndedBoxShadow] = useState("1px 1px 2px 1px #00f")
  const [yourElectionsBg, setYourElectionsBg] = useState("#001")
  const [yourElectionsBoxShadow, setYourElectionsBoxShadow] = useState("1px 1px 2px 1px #00f")

  const controlTheAllButton = () => {
    setcurrentElectionButton("all")
    setAllBg("#000")
    setAllBoxShadow("1px 1px 2px 1px #fff")
    setVoteOngoingBg("#001")
    setVoteOngoingBoxShadow("1px 1px 2px 1px #00f")
    setRegistrationOngoingBg("#001")
    setRegistrationOngoingBoxShadow("1px 1px 2px 1px #00f")
    setUpcomingBg("#001")
    setUpcomingBoxShadow("1px 1px 2px 1px #00f")
    setEndedBg("#001")
    setEndedBoxShadow("1px 1px 2px 1px #00f")
    setYourElectionsBg("#001")
    setYourElectionsBoxShadow("1px 1px 2px 1px #00f")
  }

  const controlTheVoteOngoingButton = () => {
    setcurrentElectionButton("voteOngoing")
    setAllBg("#001")
    setAllBoxShadow("1px 1px 2px 1px #00f")
    setVoteOngoingBg("#000")
    setVoteOngoingBoxShadow("1px 1px 2px 1px #fff")
    setRegistrationOngoingBg("#001")
    setRegistrationOngoingBoxShadow("1px 1px 2px 1px #00f")
    setUpcomingBg("#001")
    setUpcomingBoxShadow("1px 1px 2px 1px #00f")
    setEndedBg("#001")
    setEndedBoxShadow("1px 1px 2px 1px #00f")
    setYourElectionsBg("#001")
    setYourElectionsBoxShadow("1px 1px 2px 1px #00f")
  }

  const controlTheRegistrationOngoingButton = () => {
    setcurrentElectionButton("registrationOngoing")
    setAllBg("#001")
    setAllBoxShadow("1px 1px 2px 1px #00f")
    setVoteOngoingBg("#001")
    setVoteOngoingBoxShadow("1px 1px 2px 1px #00f")
    setRegistrationOngoingBg("#000")
    setRegistrationOngoingBoxShadow("1px 1px 2px 1px #fff")
    setUpcomingBg("#001")
    setUpcomingBoxShadow("1px 1px 2px 1px #00f")
    setEndedBg("#001")
    setEndedBoxShadow("1px 1px 2px 1px #00f")
    setYourElectionsBg("#001")
    setYourElectionsBoxShadow("1px 1px 2px 1px #00f")
  }

  const controlTheUpcomingButton = () => {
    setcurrentElectionButton("upcoming")
    setAllBg("#001")
    setAllBoxShadow("1px 1px 2px 1px #00f")
    setVoteOngoingBg("#001")
    setVoteOngoingBoxShadow("1px 1px 2px 1px #00f")
    setRegistrationOngoingBg("#001")
    setRegistrationOngoingBoxShadow("1px 1px 2px 1px #00f")
    setUpcomingBg("#000")
    setUpcomingBoxShadow("1px 1px 2px 1px #fff")
    setEndedBg("#001")
    setEndedBoxShadow("1px 1px 2px 1px #00f")
    setYourElectionsBg("#001")
    setYourElectionsBoxShadow("1px 1px 2px 1px #00f")
  }

  const controlTheEndedButton = () => {
    setcurrentElectionButton("ended")
    setAllBg("#001")
    setAllBoxShadow("1px 1px 2px 1px #00f")
    setVoteOngoingBg("#001")
    setVoteOngoingBoxShadow("1px 1px 2px 1px #00f")
    setRegistrationOngoingBg("#001")
    setRegistrationOngoingBoxShadow("1px 1px 2px 1px #00f")
    setUpcomingBg("#001")
    setUpcomingBoxShadow("1px 1px 2px 1px #00f")
    setEndedBg("#000")
    setEndedBoxShadow("1px 1px 2px 1px #fff")
    setYourElectionsBg("#001")
    setYourElectionsBoxShadow("1px 1px 2px 1px #00f")
  }

  const controlTheYourElectionsButton = () => {
    setcurrentElectionButton("yourElections")
    setAllBg("#001")
    setAllBoxShadow("1px 1px 2px 1px #00f")
    setVoteOngoingBg("#001")
    setVoteOngoingBoxShadow("1px 1px 2px 1px #00f")
    setRegistrationOngoingBg("#001")
    setRegistrationOngoingBoxShadow("1px 1px 2px 1px #00f")
    setUpcomingBg("#001")
    setUpcomingBoxShadow("1px 1px 2px 1px #00f")
    setEndedBg("#001")
    setEndedBoxShadow("1px 1px 2px 1px #00f")
    setYourElectionsBg("#000")
    setYourElectionsBoxShadow("1px 1px 2px 1px #fff")
  }

  //for the countries section in the create election function
  const allAfricanCountries = [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", 
    "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo", "Congo (DRC)",
    "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", 
    "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia",
    "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", 
    "Namibia", "Niger", "Nigeria", "Rwanda", "São Tomé and Príncipe", "Senegal", "Seychelles", 
    "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", 
    "Tunisia", "Uganda", "Zambia", "Zimbabwe"
  ];
  const [getCountry, setGetCountry] = useState("Nigeria")
  const [showCountries, setShowCountries] = useState(false)

  //controlling the single election components
  const [currentSingleElectionComponent, setCurrentSingleElectionComponent] = useState("defaultSingleElectionComponent")
  const [singleElectionFilter, setSingleElectionFilter] = useState()
  const controlAddCandidate = () => {
    setSingleElectionFilter("blur(10px)")
    setTimeout(()=> {
      setCurrentSingleElectionComponent("addCandidate")
      setSingleElectionFilter("blur(0px)")
    }, 1000)
  }
  const resetControlAddCandidate = () => {
    setCurrentSingleElectionComponent("defaultSingleElectionComponent")
  }
  const controlUpdateElection = () => {
    setSingleElectionFilter("blur(10px)")
    setTimeout(()=> {
      setCurrentSingleElectionComponent("updateElection")
      setSingleElectionFilter("blur(0px)")
    }, 1000)
  }
  const resetControlUpdateElection = () => {
    setCurrentSingleElectionComponent("defaultSingleElectionComponent")
  }
  const controlRegisterForElection = () => {
    setSingleElectionFilter("blur(10px)")
    setTimeout(()=> {
      setCurrentSingleElectionComponent("registerForElection")
      setSingleElectionFilter("blur(0px)")
    }, 1000)
  }
  const resetControlRegisterForElection = () => {
    setCurrentSingleElectionComponent("defaultSingleElectionComponent")
  }

  // //here we will start reading from and writing to the contracts
  //   //read from NFT contract for user details and collection details
  //   const [userRBTCbalance, setuserRBTCbalance] = useState()
  //   const [registeredUsername, setregisteredUsername] = useState()
  //   const [showUsername, setShowUsername] = useState()
  //   const [soldBalance, setSoldBalance] = useState()
  //   const [dateJoined, setDateJoined] = useState()
  //   const [epochDateJoined, setepochDateJoined] = useState()
  //   const [creatorProfilePhoto, setcreatorProfilePhoto] = useState()
  //   const [allPublicCollections, setAllPublicCollections] = useState([])
  //   const [userCollections, setUserCollections] = useState([])
  //   useEffect(()=>{
  //     const getTheData = async() => {
  //       if(isConnected){
  //          //read settings first
  //          const ethersProvider = new BrowserProvider(walletProvider) 
  //          const nftContractReadSettings = new Contract(electionContractAddress, electionContractABI, ethersProvider)       
  //        try {
  //         const RBTCbalance = await ethersProvider.getBalance(address)
  //         const parseRBTCbalance = formatUnits(RBTCbalance, 18);
  //         console.log(parseRBTCbalance)
  //         setuserRBTCbalance(parseRBTCbalance)
  //         const userDetails = await nftContractReadSettings.users(address)
  //         console.log(userDetails)
  //         const registeredusername = userDetails.username.toString()
  //         console.log(registeredusername)
  //         setregisteredUsername(registeredusername)
  //         setShowUsername(bytes32ToString(registeredusername))
  //         const datejoined = userDetails.joined_at.toString()
  //         setepochDateJoined(datejoined)
  //         const convertedDateJoined = new Date(datejoined.toString() * 1000).toLocaleString()
  //         setDateJoined(convertedDateJoined)
  //         const soldbalance = userDetails.balance.toString()
  //         console.log("sold:" + soldbalance)
  //         const parsedSoldBalance = parseFloat(formatUnits(soldbalance, 18)).toFixed(10)
  //         setSoldBalance(parsedSoldBalance)
  //         const profilePhoto = userDetails.avatar.toString()
  //         console.log(profilePhoto)
  //         setcreatorProfilePhoto(profilePhoto)
  //         const allpubliccollections = await nftContractReadSettings.getAllPublicCollections()
  //         console.log(allpubliccollections)
  //         setAllPublicCollections(allpubliccollections)
  //         const specificuserdetails = await nftContractReadSettings.getUserDetails(address)
  //         const specificusercollections = specificuserdetails[1]
  //         setUserCollections(specificusercollections)
  //         console.log("specificusercollections:" + specificusercollections)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     }
  //     getTheData();  
  //   }, [isConnected, address, loading])

      // //function to set collection visibility
      // const collectionVisibility = async (initialCollectionContractAddress, visibility) => {
      //   if(isConnected){
      //    setLoading(true) 
      //    const ethersProvider = new BrowserProvider(walletProvider) 
      //    const signer = await ethersProvider.getSigner()
      //    const nftContractWriteSettings = new Contract(electionContractAddress, electionContractABI, signer)
      //    try {
      //     const collectionvisibility = await nftContractWriteSettings.changeCollectionVisibility(initialCollectionContractAddress, visibility);
      //    } catch (error) {
      //     console.log(error)
      //     setLoading(false)
      //    }
      //    finally {
      //     setLoading(false)
      //    }
      //   }
      // }

      //function for uploading and getting election cover upload
      const [theElectionCoverPhotoHash, setTheElectionCoverPhotoHash] = useState();
      const [theElectionCoverPhotoFile, setTheElectionCoverPhotoFile] = useState()
      const uploadElectionCover = async () => {
        if(isConnected){
          setLoading(true) 
        try {
          const formData = new FormData();
          formData.append('file', theElectionCoverPhotoFile);
    
          const response = await axios.post('/api/uploadelectioncover', formData);
          if (response.status === 200) {
            setTheElectionCoverPhotoHash(response.data.cid);
            console.log('File uploaded to IPFS:', response.data.cid);
          }
        } catch (error) {
          console.error('Error uploading to IPFS:', error.message);
          setLoading(false)
        }
        finally {
          setLoading(false)
         }
      }
      };

      //function for uploading and getting election governing body logo
      const [theGoverningBodyLogoHash, setTheGoverningBodyLogoHash] = useState();
      const [theGoverningBodyLogoFile, setTheGoverningBodyLogoFile] = useState()
      const uploadGoverningBodyLogo = async () => {
        if(isConnected){
          setLoading(true) 
        try {
          const formData = new FormData();
          formData.append('file', theGoverningBodyLogoFile);
    
          const response = await axios.post('/api/uploadgoverningbodylogo', formData);
          if (response.status === 200) {
            setTheGoverningBodyLogoHash(response.data.cid);
            console.log('File uploaded to IPFS:', response.data.cid);
          }
        } catch (error) {
          console.error('Error uploading to IPFS:', error.message);
          setLoading(false)
        }
        finally {
          setLoading(false)
         }
      }
      };

            //function for uploading and getting candidate portrait
            const [theCandidatePortraitHash, setTheCandidatePortraitHash] = useState();
            const [theCandidatePortraitFile, setTheCandidatePortraitFile] = useState()
            const uploadCandidatePortrait = async () => {
              if(isConnected){
                setLoading(true) 
              try {
                const formData = new FormData();
                formData.append('file', theCandidatePortraitFile);
          
                const response = await axios.post('/api/uploadcandidateportrait', formData);
                if (response.status === 200) {
                  setTheCandidatePortraitHash(response.data.cid);
                  console.log('File uploaded to IPFS:', response.data.cid);
                }
              } catch (error) {
                console.error('Error uploading to IPFS:', error.message);
                setLoading(false)
              }
              finally {
                setLoading(false)
               }
            }
            };

        //to create an election, we need to define the useStates for the task first
        const [administratorName, setAdministratorName] = useState()
        const [electionTitle, setElectionTitle] = useState()
        const [electionDescription, setElectionDescription] = useState()
        const [governingBody, setGoverningBody] = useState()
        const [governingBodyXlink, setGoverningBodyXlink] = useState()
        const [electionRegStartDate, setElectionRegStartDate] = useState()
        const [electionRegEndDate, setElectionRegEndDate] = useState()
        const [votingStartDate, setVotingStartDate] = useState()
        const [votingEndDate, setVotingEndDate] = useState()
        // const [electionAvailability, setElectionAvailability] = useState()

         //function to create election
         const createElection = async () => {
          if(isConnected){
           setLoading(true) 
           const ethersProvider = new BrowserProvider(walletProvider) 
           const signer = await ethersProvider.getSigner()
           const electionContractWriteSettings = new Contract(electionContractAddress, electionContractABI, signer)
            // Convert the dates to epoch for the contract
           const toEpoch = (dateString) => Math.floor(new Date(dateString).getTime() / 1000);
           const regStartEpoch = toEpoch(electionRegStartDate)
           const regEndEpoch = toEpoch(electionRegEndDate)
           const votingStartEpoch = toEpoch(votingStartDate)
           const votingEndEpoch = toEpoch(votingEndDate)
           try {
            const createAnElection = await electionContractWriteSettings.createElection(administratorName, electionTitle, electionDescription, theElectionCoverPhotoHash, 
              governingBody, governingBodyXlink, getCountry, theGoverningBodyLogoHash, regStartEpoch, regEndEpoch, votingStartEpoch, votingEndEpoch);
            resetControlCreateElectionVisibility()
           } catch (error) {
            console.log(error)
            setLoading(false)
           }
           finally {
            setLoading(false)
           }
          }
        }


    //read all elections from election contract contract
    const [allElections, setAllElections] = useState([])
    useEffect(()=>{
      const getAllElections = async() => {
        if(isConnected){
           //read settings first
           const ethersProvider = new BrowserProvider(walletProvider) 
           const electionContractReadSettings = new Contract(electionContractAddress, electionContractABI, ethersProvider)       
         try {
          const electionArray = []
          const showallelections = await electionContractReadSettings.getAllElections()
          electionArray.push(showallelections)
          setAllElections(electionArray)
          console.log("election array:" + electionArray)
        } catch (error) {
          console.log(error)
        }
      }
      }
      getAllElections();  
    }, [isConnected, address, loading])

    //read single election from election contract
    const [singleElection, setSingleElection] = useState([])
    useEffect(()=>{
      const getSingleElections = async() => {
        if(isConnected){
           //read settings first
           const ethersProvider = new BrowserProvider(walletProvider) 
           const electionContractReadSettings = new Contract(electionContractAddress, electionContractABI, ethersProvider)       
         try {
  

          const showelection = await electionContractReadSettings.getElectionDetails("1")
          const singleElectionArray = showelection.map(election => ({
            admin: election[0],
            adminName: election[1],
            electionTitle: election.electionTitle,
            electionDescription: election[3],
            electionCoverPhoto: election[4],
            electionStartTime: Number(election[5]),
            electionEndTime: Number(election[6]),
            hasStarted: election[7],
            hasEnded: election[8],
            electionTimeCreated: Number(election[9]),
            electionRegistrationStartTime: Number(election[10]),
            electionRegistrationEndTime: Number(election[11]),
            electionCountry: election[12],
            electionAvailability: election[13],
            governingBody: election[14],
            governingBodyTwitterLink: election[15],
            governingBodyCover: election[16],
          }));
          setSingleElection(singleElectionArray)
          console.log("single election array:" + singleElectionArray)
        } catch (error) {
          console.log(error)
        }
      }
      }
      getSingleElections();  
    }, [isConnected, address, loading])

  return (
    <>
    <Head>
   <title>BallotBridge - The leading platform for governmental elections in Africa.</title>
   <link rel="shortcut icon" href="/favicon.ico" />
   </Head>
   <div className='lg:pb-[200%] pb-[550%]' style={{backgroundAttachment:"fixed", backgroundImage:"url(/images/africa.jpg)", backgroundPositionX:"50%", backgroundPositionY:"30%", backgroundSize:"100%"}}>
   <div className='p-[0.5cm] text-center'><img src="images/logo.png" width="200" className='mt-[-1cm] float-left' style={{display:"inline-block"}} /><div className='rounded-full bg-[#000] lg:float-right md:float-right' style={{display:"inline-block"}}><w3m-button /></div></div>

   {electionComponent === "mainElectionPage" &&
   (<div style={{filter:blureffect}}>
   <div data-aos="zoom-out" className='applyshadowanimation lg:mx-[15%] mx-[5%] lg:mt-[1.5cm] mt-[1cm] message1 bg-[rgba(0,0,0,0.96)] lg:p-[1cm] p-[0.5cm]' style={{boxShadow:"5px 5px 2px 2px #00f"}}>
    <div className='text-center lg:text-[220%] md:text-[150%] text-[130%] font-[500] uppercase' style={{textShadow:"3px 3px 5px #502"}}><img src='images/agree.png' width="50" className='mt-[-0.2cm]' style={{display:"inline-block"}} /> Welcome to BallotBridge!</div>
    <div className='text-center text-[110%] font-[500]'>The leading platform for governmental elections in Africa <img src='images/africa.png' width="30" className='mt-[-0.2cm]' style={{display:"inline-block"}} /></div>
    <div className='italic text-[105%] text-center'>Mass adoption of zk technology <img src='images/automation.png' width="25" style={{display:"inline-block"}} /></div>
    <div className='mt-[1cm] text-center lg:text-[130%] md:text-[120%] text-[110%] lg:mx-[10%] mx-[5%] text-[#fff] messagecomponent'>
      <div data-aos="zoom-in" className='info1 message1 lg:p-[1cm] p-[0.5cm]'>
       Here, the rhythm of change finds its course, in the harmony of choice, with a powerful force, the leading platform,
       where every vote speaks, in Africa's elections, where history peaks.
      </div>
      <div data-aos="zoom-in" className='info2 message2 lg:p-[1cm] p-[0.5cm]'>
      For in its embrace, the future is found, A place where the pulse of a continent is bound, a beacon of trust, where 
      all roads meet, In the dance of democracy, steady and sweet.
      </div>
      <div data-aos="zoom-in" className='info3 message3 lg:p-[1cm] p-[0.5cm]'>
      So let the winds of progress unfurl the flag high, on the wings of this platform, let our hopes fly, for Africa's elections, where the people decide, in unity and strength, 
      with honor and pride.
      </div>
    </div>

    <div>
    <div className='text-center mt-[1.5cm] '>
        <span className='bg-[#000] text-[#fff] px-[0.5cm] py-[0.2cm] rounded-full' style={{border:"2px solid #00f"}}>
        <form onSubmit={{}} style={{display:"inline-block"}}>
        <input type="text" placeholder="Search for an election...." className='bg-[#000] w-[85%] placeholder-[#fff] text-[#fff] text-[90%] outline-none' /><img src="images/search.png" width="20" className='ml-[0.2cm] cursor-pointer' onClick={{}} style={{display:"inline-block"}}/>
        </form>
        </span>
    </div>
    <div className='text-center mt-[0.5cm]'>
      <button className='p-[0.15cm] px-[0.3cm] rounded-md m-[0.2cm] mx-[0.4cm] electionbutton' onClick={(e) => controlTheAllButton()} style={{boxShadow:allBoxShadow, background:allBg}}>All (20)</button>
      <button className='p-[0.15cm] px-[0.3cm] rounded-md m-[0.2cm] mx-[0.4cm] electionbutton' onClick={(e) => controlTheVoteOngoingButton()} style={{boxShadow:voteOngoingBoxShadow, background:voteOngoingBg}}>Vote ongoing (5)</button>
      <button className='p-[0.15cm] px-[0.3cm] rounded-md m-[0.2cm] mx-[0.4cm] electionbutton' onClick={(e) => controlTheRegistrationOngoingButton()} style={{boxShadow:registrationOngoingBoxShadow, background:registrationOngoingBg}}>Registration ongoing (3)</button>
      <button className='p-[0.15cm] px-[0.3cm] rounded-md m-[0.2cm] mx-[0.4cm] electionbutton' onClick={(e) => controlTheUpcomingButton()} style={{boxShadow:upcomingboxShadow, background:upcomingBg}}>Upcoming (8)</button>
      <button className='p-[0.15cm] px-[0.3cm] rounded-md m-[0.2cm] mx-[0.4cm] electionbutton' onClick={(e) => controlTheEndedButton()} style={{boxShadow:endedBoxShadow, background:endedBg}}>Ended (5)</button>
      <button className='p-[0.15cm] px-[0.3cm] rounded-md m-[0.2cm] mx-[0.4cm] electionbutton' onClick={(e) => controlTheYourElectionsButton()} style={{boxShadow:yourElectionsBoxShadow, background:yourElectionsBg}}>Your elections (3)</button>
    </div>

    {currentElectionButton === "all" &&
    (<div>
    <div className='mt-[1cm] text-center'>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
      {allElections.map((elections, index) => (
      <div key={index} className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:`url(${elections.electionCoverPhoto})`, backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(0,30,0,0.95)]' style={{display:"inline-block"}}>72 hr : 54 min : 4 sec</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src={elections.governingBodyCover} width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>{elections.governingBody}</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Nigeria</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Nigerian presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      {/* <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Drug Baron <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div> */}
      </div>
      </div>
      ))}
      {/* <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/iebc.png)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(50,0,0,0.95)]' style={{display:"inline-block"}}>Ended</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/iebc.png' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>IEBC</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Kenya</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Kenyan presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>William Ruto <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div>
      </div>
      </div>
      <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/ecg.jpg)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(0,0,0,0.95)]' style={{display:"inline-block"}}>Upcoming</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/ecg.jpg' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>ECG</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Ghana</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Ghanaian presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      {/* <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>William Ruto <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div> */}
      {/* </div> */}
      {/* </div> */}
  
    </div>
    </div>
    <div className='my-[0.5cm]'>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          1
        </button>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          2
        </button>
    </div>
    </div>)}

    {currentElectionButton === "voteOngoing" &&
    (<div>
    <div className='mt-[1cm] text-center'>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
      <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/inec.png)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(0,30,0,0.95)]' style={{display:"inline-block"}}>72 hr : 54 min : 4 sec</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/ineclogo.jpg' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>INEC</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Nigeria</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Nigerian presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      {/* <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Drug Baron <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div> */}
      </div>
      </div>
    </div>
    </div>
    <div className='my-[0.5cm]'>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          1
        </button>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          2
        </button>
    </div>
    </div>)}

    {currentElectionButton === "registrationOngoing" &&
    (<div>
    <div className='mt-[1cm] text-center'>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
    <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/siec.jpg)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(90,90,0,0.95)]' style={{display:"inline-block"}}>Registration ongoing</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/siec.jpg' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>SIEC</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>South Africa</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>South African presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      {/* <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Mandela <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div> */}
      </div>
      </div> 
    </div>
    </div>
    <div className='my-[0.5cm]'>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          1
        </button>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          2
        </button>
    </div>
    </div>)}

    {currentElectionButton === "upcoming" &&
    (<div>
    <div className='mt-[1cm] text-center'>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
    <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/ecg.jpg)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(0,0,0,0.95)]' style={{display:"inline-block"}}>Upcoming</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/ecg.jpg' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>ECG</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Ghana</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Ghanaian presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      {/* <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>William Ruto <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div> */}
      </div>
      </div>
    </div>
    </div>
    <div className='my-[0.5cm]'>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          1
        </button>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          2
        </button>
    </div>
    </div>)}

    {currentElectionButton === "ended" &&
    (<div>
    <div className='mt-[1cm] text-center'>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
    <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/iebc.png)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(50,0,0,0.95)]' style={{display:"inline-block"}}>Ended</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/iebc.png' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>IEBC</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Kenya</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Kenyan presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>William Ruto <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div>
      </div>
      </div>
    </div>
    </div>
    <div className='my-[0.5cm]'>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          1
        </button>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          2
        </button>
    </div>
    </div>)}

    {currentElectionButton === "yourElections" &&
    (<div>
    <div className='mt-[1cm] text-center'>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
    <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/inec.png)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(0,30,0,0.95)]' style={{display:"inline-block"}}>72 hr : 54 min : 4 sec</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/ineclogo.jpg' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>INEC</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Nigeria</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Nigerian presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      {/* <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Drug Baron <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div> */}
      </div>
      </div>
    <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/iebc.png)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(50,0,0,0.95)]' style={{display:"inline-block"}}>Ended</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/iebc.png' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>IEBC</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Kenya</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Kenyan presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>William Ruto <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div>
      </div>
      </div>
    </div>
    </div>
    <div className='my-[0.5cm]'>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          1
        </button>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          2
        </button>
    </div>
    </div>)}

    {currentElectionButton === "searchResults" &&
    (<div>
    <div className='mt-[1cm] text-center'>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
    <div className='grid-cols-1 mb-[0.5cm]'>
      <div onClick={(e) => controlSingleElectionVisibility()} className='homeelectiondiv bg-[#000] rounded-md pb-[80%] cursor-pointer' style={{boxShadow:"2px 2px 2px 2px #333", backgroundImage:"url(/images/iebc.png)", backgroundSize:"100%", backgroundRepeat:"no-repeat"}}> 
        <div className='p-[0.5cm] hometimeout rounded-md bg-[rgba(50,0,0,0.95)]' style={{display:"inline-block"}}>Ended</div>
      </div>
      <div className='mt-[0.5cm] lg:px-[0.2cm] text-left'>
      <div>
        <img src='images/iebc.png' width="25" className='rounded-[100%]' style={{display:"inline-block"}} />
        <span className='uppercase ml-[0.2cm] font-[500]'>IEBC</span>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Country</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>Kenya</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Election</div>
        <div className='mt-[0.1cm] ml-[0.2cm]'>Kenyan presidential elections</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Year</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>2024</div>
      </div>
      <div className='mt-[0.3cm]'>
        <div className='px-[0.2cm] py-[0.1cm] bg-[#d7b644] text-[#000] rounded-md' style={{boxShadow:"2px 2px 1px 1px #333", display:"inline-block"}}>Winner</div>
        <div className='ml-[0.2cm]' style={{display:"inline-block"}}>William Ruto <img src='images/winner.png' width="25" style={{display:"inline-block"}} /></div>
      </div>
      </div>
      </div>
    </div>
    </div>
    <div className='my-[0.5cm]'>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          1
        </button>
        <button className='generalbutton bg-[#005] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]'>
          2
        </button>
    </div>
    </div>)}

    </div>  
   </div>


   <div className='mt-[1.5cm] mb-[0.5cm] lg:mx-[25%] mx-[5%] rounded-2xl p-[0.2cm] text-center bg-[rgba(0,0,0,0.95)] electionmenu' style={{border:"2px solid #00f"}}>
      <Link href="#createElection">
      <div className='lg:mx-[1cm] mx-[0.5cm] cursor-pointer electionmenudiv text-center rounded-xl' onClick={(e) => controlCreateElectionVisibility()} style={{display:"inline-block"}}>
        <div className='bg-[rgba(40,40,40,0.95)] rounded-full py-[0.1cm] px-[0.4cm] electionmenuoption absolute w-[4.6cm] ml-[-1.8cm]' style={{border:"1px solid #555"}}>Create an election</div>
        <img src="images/ballot.png" width="40" className='mx-[auto] electionmenuimage' /> 
      </div>
      </Link>
      <Link href="#help">
      <div className='lg:mx-[1cm] mx-[0.5cm] cursor-pointer electionmenudiv text-center rounded-xl' onClick={(e) => controlHelpVisibility()} style={{display:"inline-block"}}>
        <div className='bg-[rgba(40,40,40,0.95)] rounded-full py-[0.1cm] px-[0.4cm] electionmenuoption absolute ml-[-0.4cm]' style={{border:"1px solid #555"}}>Help</div>
        <img src="images/help.png" width="40" className='mx-[auto] electionmenuimage' /> 
      </div>
      </Link>
      <div className='lg:mx-[1cm] mx-[0.5cm] cursor-pointer electionmenudiv text-center rounded-xl' style={{display:"inline-block"}}>
        <div className='bg-[rgba(40,40,40,0.95)] rounded-full py-[0.1cm] px-[0.4cm] electionmenuoption absolute ml-[-0.38cm]' style={{border:"1px solid #555"}}>Docs</div>
        <img src="images/docs.png" width="40" className='mx-[auto] electionmenuimage' /> 
      </div>
    </div>
    </div>)
     }

   {electionComponent === "createElection" && (
    <div data-aos="flip-up" id="createElection" className='lg:mx-[20%] applyshadowanimation mx-[5%] lg:mt-[2.5cm] mt-[4cm] message1 absolute top-0 lg:w-[60%] w-[90%]' style={{boxShadow:"5px 5px 2px 2px #00f", zIndex:"9999"}}>
    <div className='px-[0.5cm] py-[0.4cm] bg-[#002]' style={{borderBottom:"2px solid #222"}}>
     <div className='px-[0.3cm] py-[0.2cm] rounded-md bg-[#000]' style={{display:"inline-block"}}>Create election</div>
     <img src="images/cancel.png" width="35" className='float-right normalbutton cursor-pointer' onClick={(e) => resetControlCreateElectionVisibility()} style={{display:"inline-block"}} />
    </div>
    <div className='p-[0.5cm] bg-[#001] text-center font-[500]' style={{borderBottom:"2px solid #222"}}>By creating an election, you become the election's administrator <img src="images/admin.png" width="25" style={{display:"inline-block"}} /></div>
    <div className='lg:p-[1cm] p-[0.5cm]'>
     <div>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Administrator's name</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#333]' placeholder='Input your full name' onChange={(e) => setAdministratorName(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election title</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#333]' placeholder='Please give the election a title' onChange={(e) => setElectionTitle(e.target.value)}  style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election description</div>
      <div className='mt-[0.5cm]'><textarea className='px-[0.2cm] py-[0.25cm] h-[3cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#3333]' placeholder='Please give the election a description' onChange={(e) => setElectionDescription(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election cover photo</div>
      <div className='mt-[0.5cm]'><input type="file" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='upload' onChange={(e) => setTheElectionCoverPhotoFile(e.target.files[0])} style={{border:"2px solid #00f"}} /></div>
      {theElectionCoverPhotoHash ? (
      <div className='mt-[0.5cm]'>
        <img src={theElectionCoverPhotoHash} className='w-[20%] p-[0.2cm] bg-[#000]' style={{border:"2px solid #333"}} />
      </div>) :
      (<span></span>)}
      <button className='py-[0.15cm] px-[0.3cm] bg-[#111] rounded-md mt-[0.5cm] electionbutton' onClick={(e) => uploadElectionCover()}>Upload cover <img src="images/upload.png" width="18" style={{display:"inline-block"}} /></button> 
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Country</div>
      {showCountries === false ?
      (<div className='bg-[#001] lg:w-[50%] w-[100%] mt-[0.5cm] rounded-md text-[#fff] p-[0.3cm] cursor-pointer' style={{border:"2px solid #00f"}} onClick={(e) => setShowCountries(true)}>{getCountry} <i className='fa fa-chevron-down float-right'></i></div>) :
      (<div className='lg:w-[50%] w-[100%] mt-[0.5cm]' style={{border:"2px solid #00f"}}>
      <div className='bg-[#001] text-[#fff] p-[0.3cm] cursor-pointer' onClick={(e) => setShowCountries(false)}>{getCountry} <i className='fa fa-chevron-up float-right'></i></div>
      <div className='h-[6.2cm] overflow-auto'>
      {allAfricanCountries.map((country) => (
      <div className='country bg-[#000] text-[#fff] p-[0.3cm] cursor-pointer countriesdiv' onClick={(e) => setGetCountry(country) & setShowCountries(false)}>
        {country}
      </div>
      ))}
      </div>
      </div>)}
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election governing body</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#333]' placeholder='Please type name of election governing body e.g INEC' onChange={(e) => setGoverningBody(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election governing body logo</div>
      <div className='mt-[0.5cm]'><input type="file" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='upload' onChange={(e) => setTheGoverningBodyLogoFile(e.target.files[0])} style={{border:"2px solid #00f"}} /></div>
      {theGoverningBodyLogoHash ? (
      <div className='mt-[0.5cm]'>
        <img src={theGoverningBodyLogoHash} className='w-[20%] p-[0.2cm] bg-[#000]' style={{border:"2px solid #333"}} />
      </div>) :
      (<span></span>)}
      <button className='py-[0.15cm] px-[0.3cm] bg-[#111] rounded-md mt-[0.5cm] electionbutton' onClick={(e) => uploadGoverningBodyLogo()}>Upload logo <img src="images/upload.png" width="18" style={{display:"inline-block"}} /></button> 
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Governing body X (Twitter) handle</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#333]' placeholder='Input X (Twitter) profile link of governing body' onChange={(e) => setGoverningBodyXlink(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     {/* <div>Date election was created will be passed in the javascript function using newdate.gettime</div> */}
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election registration start date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input registration start date' onChange={(e) => setElectionRegStartDate(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election registration end date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input registration end date' onChange={(e) => setElectionRegEndDate(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Voting start date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input voting start date' onChange={(e) => setVotingStartDate(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Voting end date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input voting end date' onChange={(e) => setVotingEndDate(e.target.value)} style={{border:"2px solid #00f"}} /></div>
     </div>
     {/* <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election availability</div>
      <div className='mt-[0.5cm] ml-[0.2cm]'>
        <input type="radio" name="availability" onClick={(e) => setElectionAvailability(true)} className='mr-[0.2cm]' style={{border:"2px solid #00f"}} />
        <span>Public</span>
      </div>
      <div className='mt-[0.2cm] ml-[0.2cm]'>
        <input type="radio" name="availability" onClick={(e) => setElectionAvailability(false)} className='mr-[0.2cm]' style={{border:"2px solid #00f"}} />
        <span>Private</span>
      </div>
     </div> */}
     <button className='py-[0.15cm] px-[0.3cm] bg-[#111] lg:mx-[5%] lg:w-[90%] w-[100%] rounded-md mt-[1cm] electionbutton' onClick={(e) => {e.preventDefault;createElection()}}>Create election <img src="images/plus-sign.png" width="37" style={{display:"inline-block"}} /></button>
    </div>
    </div>
   )}

 {electionComponent === "help" && (
    <div data-aos="flip-up" id="help" className='lg:mx-[20%] applyshadowanimation mx-[5%] lg:mt-[2.5cm] mt-[4cm] message2 absolute top-0 lg:w-[60%] w-[90%]' style={{boxShadow:"5px 5px 2px 2px #00f", zIndex:"9999"}}>
    <div className='px-[0.5cm] py-[0.4cm] bg-[#002]' style={{borderBottom:"2px solid #222"}}>
     <div className='px-[0.3cm] py-[0.2cm] rounded-md bg-[#000]' style={{display:"inline-block"}}>Help</div>
     <img src="images/cancel.png" width="35" className='float-right normalbutton cursor-pointer' onClick={(e) => resetControlHelpVisibility()} style={{display:"inline-block"}} />
    </div>
    <div className='p-[0.5cm] bg-[#001] text-center font-[500]' style={{borderBottom:"2px solid #222"}}>Having trouble using the BallotBridge platform? Follow the instructions below. <img src="images/helping.png" width="20" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>
    <div className='lg:p-[1cm] p-[0.5cm]'>

     <div style={{border:"2px solid #222"}}>
     <div style={{borderBottom:"2px solid #222"}}>
      {instruction1 === false ? 
      (<div onClick={(e) => setInstruction1(true)} className='p-[0.5cm] bg-[#000] text-[#fff] cursor-pointer'><img src="images/asterisk.png" width="17" className='mr-[0.2cm] mt-[-0.05cm]' style={{display:"inline-block"}} /> Voter registeration for an election <img src="images/add.png" width="17" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>) :
      (<div>
      <div onClick={(e) => setInstruction1(false)} className='p-[0.5cm] bg-[#000] text-[#fff] cursor-pointer'>Voter registeration for an election <img src="images/delete.png" width="20" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>
      <div className='p-[0.5cm] bg-[#111] text-[#fff]'>Come out and register for the election</div>
      </div>)}
     </div>
     <div>
      {instruction2 === false ? 
      (<div onClick={(e) => setInstruction2(true)} className='p-[0.5cm] bg-[#000] text-[#fff] cursor-pointer'><img src="images/asterisk.png" width="17" className='mr-[0.2cm] mt-[-0.05cm]' style={{display:"inline-block"}} /> Vote for a candidate <img src="images/add.png" width="17" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>) :
      (<div>
      <div onClick={(e) => setInstruction2(false)} className='p-[0.5cm] bg-[#000] text-[#fff] cursor-pointer'>Vote for a candidate <img src="images/delete.png" width="20" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>
      <div className='p-[0.5cm] bg-[#111] text-[#fff]'>I know you don't want to vote for a drug baron </div>
      </div>)}
     </div>
     </div>

    </div>
    </div>)
     }

  {electionComponent === "singleElection" && (
    <div data-aos="flip-up" id="singleElection" className='lg:mx-[20%] applyshadowanimation mx-[5%] lg:mt-[2.5cm] mt-[4cm] message2 absolute top-0 lg:w-[60%] w-[90%]' style={{boxShadow:"5px 5px 2px 2px #00f", zIndex:"9999"}}>
    <div className='px-[0.5cm] py-[0.4cm] bg-[#002]' style={{borderBottom:"2px solid #222"}}>
     <div className='px-[0.3cm] py-[0.2cm] rounded-md bg-[#000]' style={{display:"inline-block"}}>Election</div>
     <img src="images/cancel.png" width="35" className='float-right normalbutton cursor-pointer' onClick={(e) => resetControlSingleElectionVisibility()} style={{display:"inline-block"}} />
    </div>
    {singleElection.map((election) => (  
    <div>
    <div className='p-[0.5cm] bg-[#001] text-center font-[500] text-[120%] uppercase' style={{borderBottom:"2px solid #222", textShadow:"2px 2px 2px #000"}}>{electionTitle} 2024 <img src="images/ballotpaper.png" width="25" className='ml-[0.2cm] mt-[-0.2cm]' style={{display:"inline-block"}} /></div>
    {currentSingleElectionComponent === "defaultSingleElectionComponent" &&
    (<div className='lg:p-[1cm] p-[0.5cm]' style={{filter:singleElectionFilter}}>

     <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
      <div className='grid-cols-1'>
        <img src="images/nigerianpresidential.jpg" className='w-[100%]' style={{border:"2px solid #333"}} />
        <div className='mt-[0.3cm]'>
          <img src="images/ineclogo.jpg" width="30" className='rounded-[100%]' style={{display:"inline-block", border:"2px solid #333"}} />
          <span className='ml-[0.2cm] font-[500]'>INEC</span>
          <span className='ml-[0.2cm] font-[500]'>Nigeria</span>
          <Link href="https://x.com"><img src="images/xlogo.png" width="30" className='mt-[0.3cm]' /></Link>
        </div>
        <div className='mt-[0.3cm]'>
          <button className='px-[0.3cm] py-[0.1cm] bg-[#002] m-[0.2cm] rounded-md electionbutton normalbutton singleelectionbutton' onClick={(e) => controlRegisterForElection()}>Register</button>
          <button className='px-[0.3cm] py-[0.1cm] bg-[#002] m-[0.2cm] rounded-md electionbutton normalbutton singleelectionbutton' onClick={(e) => controlAddCandidate()}>Add a candidate</button>
          {/* <button className='px-[0.3cm] py-[0.1cm] bg-[#002] m-[0.2cm] rounded-md electionbutton normalbutton singleelectionbutton'>Remove a candidate</button> */}
          <button className='px-[0.3cm] py-[0.1cm] bg-[#002] m-[0.2cm] rounded-md electionbutton normalbutton singleelectionbutton' onClick={(e) => controlUpdateElection()}>Update election</button>
          {/* <button className='px-[0.3cm] py-[0.1cm] bg-[#002] m-[0.2cm] rounded-md electionbutton normalbutton singleelectionbutton'>Publish election</button>
          <button className='px-[0.3cm] py-[0.1cm] bg-[#002] m-[0.2cm] rounded-md electionbutton normalbutton singleelectionbutton'>Unpublish election</button> */}
          <button className='px-[0.3cm] py-[0.1cm] bg-[#002] m-[0.2cm] rounded-md electionbutton normalbutton singleelectionbutton'>Close election</button>
          <button className='px-[0.3cm] py-[0.15cm] bg-[rgba(0,30,0,0.95)] m-[0.2cm] rounded-md cursor-default'>72 hr : 54 min : 4 sec</button>
          <button className='px-[0.3cm] py-[0.15cm] bg-[rgba(50,0,0,0.95)] m-[0.2cm] rounded-md cursor-default'>Ended</button>
          <button className='px-[0.3cm] py-[0.15cm] bg-[rgba(0,0,0,1)] m-[0.2cm] rounded-md cursor-default'>Upcoming</button>
          <button className='px-[0.3cm] py-[0.15cm] bg-[rgba(90,90,0,0.95)] m-[0.2cm] rounded-md cursor-default'>Registration ongoing</button>
        </div>
      </div>
      <div className='grid-cols-1 lg:col-span-2 bg-[#000]' style={{border:"2px solid #333"}}>
      <div>
        <div className='bg-[#000] p-[0.3cm] font-[500]'>Election administrator <img src="images/admin2.png" width="25" className='ml-[0.1cm]' style={{display:"inline-block"}} /></div>
        <div className='bg-[#222] p-[0.3cm]'>Atahiru Jega</div>
      </div>
      <div>
        <div className='bg-[#000] p-[0.3cm] font-[500]'>Election description <img src="images/description.png" width="18" className='ml-[0.2cm]' style={{display:"inline-block"}} /></div>
        <div className='bg-[#222] p-[0.3cm]'>
        There are well-established mechanisms in place for the adjudication of electoral disputes, and we encourage any candidate or party seeking to challenge the outcome
        to pursue redress through those mechanisms. We call on all parties, candidates, and supporters to refrain from violence or inflammatory rhetoric at this critical time.
        </div>
      </div>
      <div>
        <div className='bg-[#000] p-[0.3cm] font-[500]'>Date of election creation <img src="images/calendar.png" width="18" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>
        <div className='bg-[#222] p-[0.3cm]'>25th Jan 2024 WAT 11:52 pm</div>
      </div>
      <div>
        <div className='bg-[#000] p-[0.3cm] font-[500]'>Election registration start / end dates <img src="images/add-user.png" width="18" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>
        <div className='bg-[#222] p-[0.3cm]'>
          <div><span className='font-[500]'>Starts</span> - 20th February 2024 WAT 11:00 pm</div> 
          <div><span className='font-[500]'>Ends</span> - 25th March 2024 WAT 11:00 pm</div>
        </div>
      </div>
      <div>
        <div className='bg-[#000] p-[0.3cm] font-[500]'>Election voting start / end dates <img src="images/vote-ballot.png" width="25" className='ml-[0.2cm] mt-[-0.1cm]' style={{display:"inline-block"}} /></div>
        <div className='bg-[#222] p-[0.3cm]'>
          <div><span className='font-[500]'>Starts</span> - 25th May 2024 WAT 07:00 am</div> 
          <div><span className='font-[500]'>Ends</span> - 27th May 2024 WAT 12:00 pm</div>
        </div>
      </div>
      </div>
     </div>

     <div className='mt-[1cm] mb-[0.6cm]' style={{borderBottom:"4px solid #333"}}></div>

     <div>
      <div className='text-[110%] uppercase font-[500] text-center mb-[0.5cm]' style={{textShadow:"2px 2px 2px #000"}}>Vote for a candidate</div>
      {/* <div className='text-[110%] uppercase font-[500] text-center mb-[1cm]' style={{textShadow:"2px 2px 2px #000"}}>Candidates</div> */}
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
       <div className='grid-cols-1 mt-[0.5cm] bg-[#000]' style={{border:"2px solid #333"}}>
        <img src="images/tinubu.jpg" width="200" className='lg:h-[7cm] md:h-[8cm] w-[100%]' />
        <div className='p-[0.3cm]'>
        <div className='font-[500]'>Chief Bola Ahmed Tinubu</div>
        <div className='mt-[0.1cm]'><img src="images/flag.png" width="20" style={{display:"inline-block"}} /> APC</div>
        <div className='mt-[0.1cm]'>Votes - 71,058,002</div>
        <div className='mt-[0.3cm]'><img src="images/vote.png" width="40" className='fa-fade cursor-pointer' style={{display:"inline-block", animationDuration:"5s"}} /></div>
        {/* <div className='mt-[0.3cm]'><img src="images/winner-logo.png" width="40" style={{display:"inline-block", animationDuration:"5s"}} /></div> */}
        <div className='mt-[0.3cm] text-right'><span className='cursor-pointer'>Remove <img src="images/remove.png" width="15" style={{display:"inline-block"}} /></span></div>
        </div>
       </div> 
       <div className='grid-cols-1 mt-[0.5cm] bg-[#000]' style={{border:"2px solid #333"}}>
        <img src="images/peterobi.png" width="200" className='lg:h-[7cm] md:h-[8cm] w-[100%]' />
        <div className='p-[0.3cm]'>
        <div className='font-[500]'>Mr Peter Obi</div>
        <div className='mt-[0.1cm]'><img src="images/flag.png" width="20" style={{display:"inline-block"}} /> LP</div>
        <div className='mt-[0.1cm]'>Votes - 81,023,556</div>
        <div className='mt-[0.3cm]'><img src="images/vote.png" width="40" className='fa-fade cursor-pointer' style={{display:"inline-block", animationDuration:"5s"}} /></div>
        {/* <div className='mt-[0.3cm]'><img src="images/winner-logo.png" width="40" style={{display:"inline-block", animationDuration:"5s"}} /></div> */}
        <div className='mt-[0.3cm] text-right'><span className='cursor-pointer'>Remove <img src="images/remove.png" width="15" style={{display:"inline-block"}} /></span></div>
        </div>
       </div> 
       <div className='grid-cols-1 mt-[0.5cm] bg-[#000]' style={{border:"2px solid #333"}}>
        <img src="images/atiku.jpg" width="200" className='lg:h-[7cm] md:h-[8cm] w-[100%]' />
        <div className='p-[0.3cm]'>
        <div className='font-[500]'>Alhaji Atiku Abubakar</div>
        <div className='mt-[0.1cm]'><img src="images/flag.png" width="20" style={{display:"inline-block"}} /> PDP</div>
        <div className='mt-[0.1cm]'>Votes - 21,000,174</div>
        <div className='mt-[0.3cm]'><img src="images/vote.png" width="40" className='fa-fade cursor-pointer' style={{display:"inline-block", animationDuration:"5s"}} /></div>
        {/* <div className='mt-[0.3cm]'><img src="images/winner-logo.png" width="40" style={{display:"inline-block", animationDuration:"5s"}} /></div> */}
        <div className='mt-[0.3cm] text-right'><span className='cursor-pointer'>Remove <img src="images/remove.png" width="15" style={{display:"inline-block"}} /></span></div>
        </div>
       </div>       
       </div>
      </div> 
    </div>)}
    </div>
    ))}

    {currentSingleElectionComponent === "addCandidate" && 
    (<div>
      <div className='py-[0.3cm] px-[0.5cm] bg-[#111] text-center font-[500] text-[105%]' style={{borderBottom:"2px solid #222", textShadow:"2px 2px 2px #000"}}>Add a candidate  <img src="images/remove.png" width="22" className='float-right normalbutton cursor-pointer' onClick={(e) => resetControlAddCandidate()} style={{display:"inline-block"}} /></div>
      <div className='lg:p-[1cm] p-[0.5cm]'>
      <div className=''>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Candidate's name</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Type name of election candidate' style={{border:"2px solid #00f"}} /></div>
      </div>
      <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Candidate's portrait</div>
      <div className='mt-[0.5cm]'><input type="file" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='upload' onChange={(e) => setTheCandidatePortraitFile(e.target.files[0])} style={{border:"2px solid #00f"}} /></div>
      {theCandidatePortraitHash ? (
      <div className='mt-[0.5cm]'>
        <img src={theCandidatePortraitHash} className='w-[20%] p-[0.2cm] bg-[#000]' style={{border:"2px solid #333"}} />
      </div>) :
      (<span></span>)}
      <button className='py-[0.15cm] px-[0.3cm] bg-[#111] rounded-md mt-[0.5cm] electionbutton' onClick={(e) => uploadCandidatePortrait()}>Upload portrait <img src="images/upload.png" width="18" style={{display:"inline-block"}} /></button> 
     </div>
      <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Candidate's political party</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder="Type candidate's political party e.g LP" style={{border:"2px solid #00f"}} /></div>
      </div>
      <button className='py-[0.3cm] px-[0.3cm] bg-[#111] w-[100%] rounded-md mt-[1cm] electionbutton'>Add candidate now <img src="images/candidate.png" width="17" className='mt-[-0.1cm] ml-[0.1cm]' style={{display:"inline-block"}} /></button>
      </div>
     </div>)}

    {currentSingleElectionComponent === "updateElection" && 
    (<div>
      <div className='py-[0.3cm] px-[0.5cm] bg-[#111] text-center font-[500] text-[105%]' style={{borderBottom:"2px solid #222", textShadow:"2px 2px 2px #000"}}>Update election  <img src="images/remove.png" width="22" className='float-right normalbutton cursor-pointer' onClick={(e) => resetControlUpdateElection()} style={{display:"inline-block"}} /></div>
      <div className='lg:p-[1cm] p-[0.5cm]'>
     <div>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election title</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#333]' placeholder='Nigerian presidential elections' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election description</div>
      <div className='mt-[0.5cm]'><textarea className='px-[0.2cm] py-[0.25cm] h-[3cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#3333]' placeholder='Please give the election a description' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election cover photo</div>
      <div className='mt-[0.5cm]'><input type="file" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='upload' onChange={(e) => setTheElectionCoverPhotoFile(e.target.files[0])} style={{border:"2px solid #00f"}} /></div>
      {theElectionCoverPhotoHash ? (
      <div className='mt-[0.5cm]'>
        <img src={theElectionCoverPhotoHash} className='w-[20%] p-[0.2cm] bg-[#000]' style={{border:"2px solid #333"}} />
      </div>) :
      (<span></span>)}
      <button className='py-[0.15cm] px-[0.3cm] bg-[#111] rounded-md mt-[0.5cm] electionbutton' onClick={(e) => uploadElectionCover()}>Upload cover <img src="images/upload.png" width="18" style={{display:"inline-block"}} /></button> 
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Country</div>
      {showCountries === false ?
      (<div className='bg-[#001] lg:w-[50%] w-[100%] mt-[0.5cm] rounded-md text-[#fff] p-[0.3cm] cursor-pointer' style={{border:"2px solid #00f"}} onClick={(e) => setShowCountries(true)}>{getCountry} <i className='fa fa-chevron-down float-right'></i></div>) :
      (<div className='lg:w-[50%] w-[100%] mt-[0.5cm]' style={{border:"2px solid #00f"}}>
      <div className='bg-[#001] text-[#fff] p-[0.3cm] cursor-pointer' onClick={(e) => setShowCountries(false)}>{getCountry} <i className='fa fa-chevron-up float-right'></i></div>
      <div className='h-[6.2cm] overflow-auto'>
      {allAfricanCountries.map((country) => (
      <div className='country bg-[#000] text-[#fff] p-[0.3cm] cursor-pointer countriesdiv' onClick={(e) => setGetCountry(country) & setShowCountries(false)}>
        {country}
      </div>
      ))}
      </div>
      </div>)}
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election governing body</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#333]' placeholder='Please type name of election governing body e.g INEC' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election governing body logo</div>
      <div className='mt-[0.5cm]'><input type="file" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='upload' onChange={(e) => setTheGoverningBodyLogoFile(e.target.files[0])} style={{border:"2px solid #00f"}} /></div>
      {theGoverningBodyLogoHash ? (
      <div className='mt-[0.5cm]'>
        <img src={theGoverningBodyLogoHash} className='w-[20%] p-[0.2cm] bg-[#000]' style={{border:"2px solid #333"}} />
      </div>) :
      (<span></span>)}
      <button className='py-[0.15cm] px-[0.3cm] bg-[#111] rounded-md mt-[0.5cm] electionbutton' onClick={(e) => uploadGoverningBodyLogo()}>Upload logo <img src="images/upload.png" width="18" style={{display:"inline-block"}} /></button> 
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Governing body X (Twitter) handle</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[80%] w-[100%] outline-[#333]' placeholder='Input X (Twitter) profile link of governing body' style={{border:"2px solid #00f"}} /></div>
     </div>
     {/* <div>Date election was created will be passed in the javascript function using newdate.gettime</div> */}
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election registration start date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input registration start date' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election registration end date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input registration end date' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Voting start date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input voting start date' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Voting end date</div>
      <div className='mt-[0.5cm]'><input type="datetime-local" className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Input voting end date' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Election availability</div>
      <div className='mt-[0.5cm] ml-[0.2cm]'>
        <input type="radio" name="availability" className='mr-[0.2cm]' style={{border:"2px solid #00f"}} />
        <span>Public</span>
      </div>
      <div className='mt-[0.2cm] ml-[0.2cm]'>
        <input type="radio" name="availability" className='mr-[0.2cm]' style={{border:"2px solid #00f"}} />
        <span>Private</span>
      </div>
      <button className='py-[0.3cm] px-[0.3cm] bg-[#111] lg:mx-[5%] lg:w-[90%] w-[100%] rounded-md mt-[1cm] electionbutton'>Update election <img src="images/update.png" width="20" className="mt-[-0.1cm]" style={{display:"inline-block"}} /></button>
      </div>
      </div>
    </div>)}

    {currentSingleElectionComponent === "registerForElection" && 
    (<div>
      <div className='py-[0.3cm] px-[0.5cm] bg-[#111] text-center font-[500] text-[105%]' style={{borderBottom:"2px solid #222", textShadow:"2px 2px 2px #000"}}>Register for election  <img src="images/remove.png" width="22" className='float-right normalbutton cursor-pointer' onClick={(e) => resetControlRegisterForElection()} style={{display:"inline-block"}} /></div>
      <div className='lg:p-[1cm] p-[0.5cm]'>
      <div>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Phone number</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Please input phone number e.g +2348169023301' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div className='mt-[0.8cm]'>
      <div className='px-[0.2cm] py-[0.1cm] bg-[#000] rounded-md' style={{boxShadow:"2px 2px 2px 2px #333", display:"inline-block"}}>Your wallet address</div>
      <div className='mt-[0.5cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='0x82aD97bEf0b7E17b1D30f56e592Fc819E1eeDAfc' style={{border:"2px solid #00f"}} /></div>
     </div>
     <div><button className='py-[0.15cm] px-[0.3cm] bg-[#002] rounded-md mt-[0.8cm] electionbutton' style={{border:"2px solid #999"}}>Generate OTP <img src="images/synchronize.png" width="25" className='mt-[-0.2cm]' style={{display:"inline-block"}} /></button></div>
     <div><button className='py-[0.15cm] px-[0.3cm] bg-[#002] rounded-md mt-[0.8cm] electionbutton' style={{border:"2px solid #999"}}>Click to receive OTP <img src="images/show.png" width="20" className='mt-[-0.1cm]' style={{display:"inline-block"}} /></button></div>
     <div className='mt-[0.8cm]'><input className='px-[0.2cm] py-[0.25cm] rounded-md bg-[#001] lg:w-[50%] w-[100%] outline-[#333]' placeholder='Please input OTP here' style={{border:"2px solid #00f"}} /></div>
     <button className='py-[0.25cm] px-[0.3cm] bg-[#111] lg:w-[100%] w-[100%] rounded-md mt-[1cm] electionbutton'>Register <img src="images/register.png" width="23" style={{display:"inline-block"}} /></button>
      </div>
    </div>)}
    </div>)
     }

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }

   </div>
  </>
  );
};

