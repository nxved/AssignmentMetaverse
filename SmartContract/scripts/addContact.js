const { ethers } = require("hardhat");
const { run } = require("hardhat");
const {
  VerifywithArgs, Verify } = require("../verifyfunc");

  async function main() {
   const contractAddress = '0x418C8bBf6B74E096420A8808eB52Fd4491b54767';
   const [sender] = await ethers.getSigners();
   const ContractVault = await ethers.getContractFactory('ContactVault');
   const contract = new ethers.Contract(contractAddress, ContractVault.interface, sender);

   const contactName = 'Naved';
  const contactPhoneNumber = '8275103919';
  const tx = await contract.addOrUpdateContact(contactName, contactPhoneNumber);
  console.log(tx); 
 }
 
 main()
   .then(() => process.exit(0))
   .catch((error) => {
     console.error(error);
     process.exit(1);
   });