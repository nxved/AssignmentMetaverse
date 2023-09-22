import { Controller, Get, Post, Body, Dependencies } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ethers } from "ethers"

const ContactVault = [
  {
     "anonymous": false,
     "inputs": [
        {
           "indexed": true,
           "internalType": "address",
           "name": "user",
           "type": "address"
        },
        {
           "indexed": false,
           "internalType": "string",
           "name": "name",
           "type": "string"
        },
        {
           "indexed": false,
           "internalType": "string",
           "name": "phoneNumber",
           "type": "string"
        },
        {
           "indexed": false,
           "internalType": "uint256",
           "name": "date",
           "type": "uint256"
        }
     ],
     "name": "ContactAdded",
     "type": "event"
  },
  {
     "anonymous": false,
     "inputs": [
        {
           "indexed": true,
           "internalType": "address",
           "name": "user",
           "type": "address"
        },
        {
           "indexed": false,
           "internalType": "string",
           "name": "name",
           "type": "string"
        },
        {
           "indexed": false,
           "internalType": "string",
           "name": "phoneNumber",
           "type": "string"
        },
        {
           "indexed": false,
           "internalType": "uint256",
           "name": "date",
           "type": "uint256"
        }
     ],
     "name": "ContactDeleted",
     "type": "event"
  },
  {
     "inputs": [
        {
           "internalType": "string",
           "name": "_name",
           "type": "string"
        },
        {
           "internalType": "string",
           "name": "_number",
           "type": "string"
        }
     ],
     "name": "addOrUpdateContact",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
  },
  {
     "inputs": [
        {
           "internalType": "address",
           "name": "",
           "type": "address"
        }
     ],
     "name": "contacts",
     "outputs": [
        {
           "internalType": "string",
           "name": "name",
           "type": "string"
        },
        {
           "internalType": "string",
           "name": "phoneNumber",
           "type": "string"
        },
        {
           "internalType": "uint256",
           "name": "date",
           "type": "uint256"
        }
     ],
     "stateMutability": "view",
     "type": "function"
  },
  {
     "inputs": [],
     "name": "deleteContact",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
  }
];


function unixTimestampToDateString(unixTimestamp) {
   const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const formattedDate = dateObject.toISOString().slice(0, 19).replace("T", " ");
   return formattedDate;
 }

 @Controller('contacts')
 export class ContactsController {
   constructor(private contactsService: ContactsService) {}

  @Post()
  async storeContact(@Body() body: any) {
    console.log("run", body);
    const txnReceipt = body;
    const logs = txnReceipt.logs;
    const provider = ethers.getDefaultProvider('bscTestnet', {
      bsc: 'https://bsc-dataseed1.binance.org',
    });
    
    const addr = "0x418C8bBf6B74E096420A8808eB52Fd4491b54767";
    const contract = new ethers.Contract(
      addr,
      ContactVault,
      provider
    );
    let log = contract.interface.parseLog(
      logs[logs.length - 1]
    );
    const name = log.args.name;
    const number = log.args.phoneNumber;
    const date = unixTimestampToDateString(log.args.unixTimestampToDateString)
    const contact = await this.contactsService.storeContact(
      name,
      number,
      date,
    );
    return contact;
  }
}
