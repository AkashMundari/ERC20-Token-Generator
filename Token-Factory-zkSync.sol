// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "./Token-Generator-zkSync.sol";

contract TokenFactory {
    event NewToken(address indexed newToken);

    function createToken(
        address initialOwner,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint initialSupply
    ) public returns (address) {
        MyToken newToken = new MyToken(
            initialOwner,
            _tokenName,
            _tokenSymbol,
            initialSupply
        );
        emit NewToken(address(newToken));
        return address(newToken);
    }
}
