1:"$Sreact.fragment"
2:I[68275,["/_next/static/chunks/13f8b9b460cab25b.js","/_next/static/chunks/cc162e5663281663.js","/_next/static/chunks/b05a5109468bf8e7.js","/_next/static/chunks/63bdf154c4daac0e.js"],"Header"]
3:I[2879,["/_next/static/chunks/13f8b9b460cab25b.js","/_next/static/chunks/cc162e5663281663.js","/_next/static/chunks/b05a5109468bf8e7.js","/_next/static/chunks/63bdf154c4daac0e.js"],"BlogContent"]
9:I[45429,["/_next/static/chunks/cc162e5663281663.js","/_next/static/chunks/db909c0d74f8c046.js"],"OutletBoundary"]
a:"$Sreact.suspense"
4:T12eb,
# synthatsu_katana_thief

### Challenge 1

2000 years from now, the earth has seen many wars, and the surface of the earth was forever damaged. Humans had to develop floating cities, the first one was Synthatsu, made by what was left of the Japanese history. Mixing futuristic building with a hint of traditional looks. This town was well known for its close combat weapons. One of the most prized katana maker works in that town. But just yesterday, some thugs named Beyond robbed his shop, and took some of his work!

### Goal:

Will you be able to get them for yourself?

### Challenge.sol

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./KatanaSale.sol";

contract Challenge{
    KatanaSale public katanaSale;
    address constant public PLAYER = 0xCaffE305b3Cc9A39028393D3F338f2a70966Cb85;

    constructor () payable {
        katanaSale = new KatanaSale(10 ether, 100);
    }

    function isSolved() public view returns(bool){
        if(katanaSale.balanceOf(PLAYER) >= 60){
            return true;
        }
        return false;
    }

}
```

### KatanaSale.sol

```solidity

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract KatanaSale {

    address public beyond;
    uint256 public katanaPrice;
    uint256 public katanaSold;
    string public name = "one-katana";
    string public symbol = "KTN";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Sold(address buyer, uint256 amount);

    constructor(uint256 _katanaPrice, uint256 _totalSupply) {
        beyond = msg.sender;
        katanaPrice = _katanaPrice;
        totalSupply = _totalSupply;
    }

    function transfer(address to, uint256 value) external {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
    }

    function becomeBeyond(string memory passPhrase) external {
        require (keccak256(abi.encode(passPhrase)) == keccak256(abi.encode("I will check out @BeyondBZH and @gcc_ensibs on X")));
        beyond = msg.sender;
    }

    function buyKatana(uint256 _numberOfKatana) external payable {
        require(msg.value == _numberOfKatana * katanaPrice, "Incorrect Ether value");
        katanaSold += _numberOfKatana;
        balanceOf[msg.sender] += _numberOfKatana;
        emit Sold(msg.sender, _numberOfKatana);
    }

    function endSale() external {
        require(msg.sender == beyond, "Only a true Beyond can end the sale");
        balanceOf[msg.sender] += totalSupply - katanaSold;
    }
}
```

### Solution:

To solve this challenge, we need to make the balance of the player greater than or equal to 60, for that follow the steps

1. When we call the `becomeBeyond()` with the arguement **I will check out @BeyondBZH and @gcc_ensibs on X**, then we became the beyond.

2. Call the `endSale()` and we got the totalSupply since we don't call the buyKatana().

### Solution Contract

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract KatanaSale {

    address public beyond;
    uint256 public katanaPrice;
    uint256 public katanaSold;
    string public name = "one-katana";
    string public symbol = "KTN";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Sold(address buyer, uint256 amount);

    constructor(uint256 _katanaPrice, uint256 _totalSupply) {
        beyond = msg.sender;
        katanaPrice = _katanaPrice;
        totalSupply = _totalSupply;
    }

    function transfer(address to, uint256 value) external {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
    }

    function becomeBeyond(string memory passPhrase) external {
        require (keccak256(abi.encode(passPhrase)) == keccak256(abi.encode("I will check out @BeyondBZH and @gcc_ensibs on X")));
        beyond = msg.sender;
    }

    function buyKatana(uint256 _numberOfKatana) external payable {
        require(msg.value == _numberOfKatana * katanaPrice, "Incorrect Ether value");
        katanaSold += _numberOfKatana;
        balanceOf[msg.sender] += _numberOfKatana;
        emit Sold(msg.sender, _numberOfKatana);
    }

    function endSale() external {
        require(msg.sender == beyond, "Only a true Beyond can end the sale");
        balanceOf[msg.sender] += totalSupply - katanaSold;
    }
}

contract Challenge{
    KatanaSale public katanaSale;
    address constant public PLAYER = 0xCaffE305b3Cc9A39028393D3F338f2a70966Cb85;

    constructor () payable {
        katanaSale = new KatanaSale(10 ether, 100);
    }

    function isSolved() public view returns(bool){
        if(katanaSale.balanceOf(PLAYER) >= 60){
            return true;
        }
        return false;
    }

}
```
0:{"buildId":"xOmyQrz477VMR99oMhEMM","rsc":["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen","children":[["$","$L2",null,{}],["$","main",null,{"className":"pt-24 pb-16 px-4 sm:px-6 lg:px-8","children":["$","$L3",null,{"blog":{"slug":"GCCCTF2024web3CTFChallengeWriteUp","title":"GCC CTF 2024 web3  challenge writeup","excerpt":"Check out my writeup for the GCC CTF 2024 web3 CTF Challenge WriteUp.","date":"2024-04-11","readTime":"5 min read","tags":["CTF","GCC","web3","writeup"],"image":"/gccCTF.jpeg","content":"$4"}}]}]]}],["$L5","$L6","$L7"],"$L8"]}],"loading":null,"isPartial":false}
5:["$","script","script-0",{"src":"/_next/static/chunks/cc162e5663281663.js","async":true}]
6:["$","script","script-1",{"src":"/_next/static/chunks/b05a5109468bf8e7.js","async":true}]
7:["$","script","script-2",{"src":"/_next/static/chunks/63bdf154c4daac0e.js","async":true}]
8:["$","$L9",null,{"children":["$","$a",null,{"name":"Next.MetadataOutlet","children":"$@b"}]}]
b:null
