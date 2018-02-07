import { Router } from 'express';

const fs = require('file-system');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');

const input = fs.readFileSync(path.join(__dirname, 'SimpleStorage.sol'), 'utf8');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':SimpleStorage'].bytecode;
const abi = JSON.parse(output.contracts[':SimpleStorage'].interface);

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	routes.route('/sstest')
		.get(function(req, res) {
			var web3;
			if (typeof web3 !== 'undefined') {
           web3 = new Web3(web3.currentProvider);
       } else {
           web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
       }

       web3.eth.defaultAccount = web3.eth.accounts[0];

       var SimpleStorageContract = web3.eth.contract(abi);

       var SimpleStorage = SimpleStorageContract.at('0x8cdaf0cd259887258bc13a92c0a6da92698644c0');

			 //var value = SimpleStorage.get();

			 SimpleStorage.get(function(error, result) {
					if (!error) {
							console.log('Result: ' + result);
							res.json({ message: 'Result (not sure why this is the TX and not value; it also crashes the server...): ' + result });
					} else
							 console.log('Error: ' + error);
							 res.json({ message: 'Error: ' + error });
			});

		})

	return routes;
}
