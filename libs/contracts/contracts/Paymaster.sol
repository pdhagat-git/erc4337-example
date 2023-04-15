// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./base/BasePaymaster.sol";

contract Paymaster is Ownable, BasePaymaster {
    mapping(address => bool) public childAddress;

    event ChildAddressesAdded(address[] indexed children);
    event ChildAddressesRemoved(address[] indexed children);

    constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {}

    /**
      * @notice validate paymaster request
    */
    function _validatePaymasterUserOp(UserOperation calldata userOp, bytes32 /*userOpHash*/, uint256 /*requiredPreFund*/)
    internal view override returns (bytes memory context, uint256 validationData) {
        require(childAddress[userOp.sender], "TokenPaymaster: sender is not a validated child address");

        return (abi.encode(userOp.sender), 0);
    }

    /**
      * @notice Function to register children accounts
      * @dev can be only called by contract owner
      * @param _addresses array containing addresses to whitelist
    */
    function addChildren(address[] calldata _addresses) external onlyOwner {     
        for (uint256 i = 0; i < _addresses.length; i++) {
            address addr = _addresses[i];
            require(addr != address(0), "Paymaster: address cannot be zero address");

            if (!childAddress[addr]) {
                childAddress[addr] = true;
            }
        }

        emit ChildAddressesAdded(_addresses);
    }


    /** 
      * @notice Function to remove children accounts
      * @dev can be only called by contract owner
      * @param _addresses array containing addresses to remove
    */
    function removeChildren(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            address addr = _addresses[i];
            require(addr != address(0), "Paymaster: address cannot be zero address");

            if (childAddress[addr]) {
                childAddress[addr] = false;
            }
        }

        emit ChildAddressesRemoved(_addresses);
    }
}