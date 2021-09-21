const getContractInstance = async (web3, tokenD) => {
  // get network ID and the deployed address
  const networkId = await web3.eth.net.getId()
  const deployedAddress = tokenD.networks[networkId].address

  // create the instance
  const instance = new web3.eth.Contract(
    tokenD.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
