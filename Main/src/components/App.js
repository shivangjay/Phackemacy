import React, { Component } from 'react';
import Phackemacy from '../abis/phackemacy.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Phackemacy.networks[networkId]
    if(networkData) {
      const Phackemacy = new web3.eth.Contract(Phackemacy.abi, networkData.address)
      this.setState({ Phackemacy })
      const medav = await Phackemacy.methods.medicineCount().call()
      this.setState({ medav })
      // Load medicines, sort by newest
      for (var i=medav; i>=1; i--) {
        const medicine = await Phackemacy.methods.medicines(i).call()
        this.setState({
          medicines: [...this.state.medicines, medicine]
        })
      }
      //Set latest medicine with mname to view as default 
      const latest = await Phackemacy.methods.medicines(medav).call()
      this.setState({
        currentHash: latest.hash,
        currentmname: latest.mname
      })
      this.setState({ loading: false})
    } else {
      window.alert('Phackemacy contract not deployed to detected network.')
    }
  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }


  Checkmed = mname => {
    console.log("Submitting file to IPFS...")
    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.Phackemacy.methods.Checkmed(result[0].hash, mname).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  changemedicine = (hash, mname) => {
    this.setState({'currentHash': hash});
    this.setState({'currentmname': mname});
  }

  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      account: '',
      Phackemacy: null,
      medicines: [],
      loading: true,
      currentHash: null,
      currentmname: null
    }

    this.Checkmed = this.Checkmed.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.changemedicine = this.changemedicine.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              medicines={this.state.medicines}
              Checkmed={this.Checkmed}
              captureFile={this.captureFile}
              changemedicine={this.changemedicine}
              currentHash={this.state.currentHash}
              currentmname={this.state.currentmname}
            />
        }
      </div>
    );
  }
}

export default App;