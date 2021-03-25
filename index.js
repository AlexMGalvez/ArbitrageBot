// Requires
const Web3        = require('web3');
const BigNumber   = require('bignumber.js');
const OneSplitAbi = require('./abis/1splitabi.json');
                    require("dotenv").config()
                    
const weiEthDecimals = 18;
const provider = new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT);

let web3 = new Web3(provider);
let fromTokenAddress = process.env.FROM_TOKEN_ADDRESS;
let toTokenAddress = process.env.TO_TOKEN_ADDRESS;
let amount = 1;

let OneSplitContract = new web3.eth.Contract(OneSplitAbi, process.env.ONESPLIT_ETH_ADDRESS);

let splitExchanges = [
    "Uniswap",
    "Kyber",
    "Bancor",
    "Oasis",
    "Curve Compound",
    "Curve USDT",
    "Curve Y",
    "Curve Binance",
    "Curve Synthetix",
    "Uniswap Compound",
    "Uniswap CHAI",
    "Uniswap Aave",
    "Mooniswap",
    "Uniswap V2",
    "Uniswap V2 ETH",
    "Uniswap V2 DAI",
    "Uniswap V2 USDC",
    "Curve Pax",
    "Curve renBTC",
    "Curve tBTC",
    "Dforce XSwap",
    "Shell",
    "mStable mUSD",
    "Curve sBTC",
    "Balancer 1",
    "Balancer 2",
    "Balancer 3",
    "Kyber 1",
    "Kyber 2",
    "Kyber 3",
    "Kyber 4"
];

OneSplitContract.methods
    .getExpectedReturn(
        fromTokenAddress,
        toTokenAddress,
        new BigNumber(amount).shiftedBy(weiEthDecimals), 
        100,
        0
    )
    .call({}, (err, res) => {
        if (err) console.error(err);
        console.log(`
            from: ${fromTokenAddress}
            to: ${toTokenAddress}
            amount: ${amount}
            returnAmount: ${new BigNumber(res.returnAmount).shiftedBy(-weiEthDecimals)}
        `);
        for (let i = 0; i < res.distribution.length; i++) {
            console.log(splitExchanges[i] + ': ' + res.distribution[i])
        }
    });
