const Cubit = artifacts.require('./contracts/Cubit.sol');
const Government = artifacts.require('./contracts/Government.sol');
const BusinessOwner = artifacts.require('./contracts/BusinessOwner.sol');
const Citizen = artifacts.require('./contracts/Citizen.sol');

const BigNumber = web3.utils.BN;

const should = require('chai')
    .use(require('chai-as-promised'))
    .should();

let government, cubit, citizen, businessOwner;

contract('testGovernment', async (accounts) => {

    let account1, account2, account3, account4, account5, account6;

    [account1, account2, account3, account4, account5, account6 ] = accounts;

    /*
    beforeEach(async () => {
        sender = await TokenZendR.new();
        bear = await BearToken.new();
        cub = await CubToken.new();

        await sender.addNewToken('BEAR', bear.address);
        await sender.addNewToken('CUB', cub.address);
    });*/

    it("should register account2 as citizen", async() => {
        citizen = await Citizen.deployed();
        citizen.registerCitizen(web3.utils.fromAscii("name account2"),
            web3.utils.fromAscii("surname account2"),
            web3.utils.fromAscii("fiscal code account2"),
            web3.utils.fromAscii("mail account2"),
            {from: account2});
        let ret = await citizen.login(account2);
        web3.utils.toUtf8(ret[0]).should.equal("name account2");
        web3.utils.toUtf8(ret[1]).should.equal("surname account2");
        web3.utils.toUtf8(ret[2]).should.equal("fiscal code account2");
        web3.utils.toUtf8(ret[3]).should.equal("mail account2");
    });

    it("should register account3 as business owner", async() => {
        businessOwner = await BusinessOwner.deployed();
        businessOwner.registerBusinessOwner(web3.utils.fromAscii("name account3"),
            web3.utils.fromAscii("location account3"),
            web3.utils.fromAscii("VAT account3"),
            web3.utils.fromAscii("CE account3"),
            {from: account3});
        let ret = await businessOwner.login(account3);
        web3.utils.toUtf8(ret[0]).should.equal("name account3");
        web3.utils.toUtf8(ret[1]).should.equal("location account3");
        web3.utils.toUtf8(ret[2]).should.equal("VAT account3");
        web3.utils.toUtf8(ret[3]).should.equal("CE account3");

    });

    it("should mint 1.000.000 cubits", async() => {
        let amount = new BigNumber(1000000);
        cubit = await Cubit.deployed();
        government = await Government.deployed();
        await cubit.mint(account1, amount);
        let balance = (await  cubit.balanceOf(account1)).toString();
        balance.should.equal(amount.toString())
    });

    it("should be able to distribute cubits to all registered users (account2, account3)", async() => {
        let amount = new BigNumber(1000);

        await cubit.approve(government.address, amount * 2,{from: account1});

        await government.distributeToAll(amount);

        let balance = ((await  cubit.balanceOf(account2)).toString());
        balance.should.equal(amount.toString());

        balance = ((await  cubit.balanceOf(account3)).toString());
        balance.should.equal(amount.toString());

        balance = ((await  cubit.balanceOf(account4)).toString());
        balance.should.equal("0");

        balance = ((await  cubit.balanceOf(account1)).toString());
        balance.should.equal("998000");
    });
});