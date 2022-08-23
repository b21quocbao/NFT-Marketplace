// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// returns hardcoded URI for each token

contract ERC1155Token is ERC1155 {
    address public exchangeContractAddress;

    constructor(
        address _exchangeContractAddress
    ) ERC1155("") {
        exchangeContractAddress = _exchangeContractAddress;
    }

    /**
     * @dev See {IERC1155-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override(ERC1155) returns (bool) {
        return _isExchangeContract(operator) || super.isApprovedForAll(owner, operator);
    }

    function _isExchangeContract(address spender) internal view virtual returns (bool) {
        return spender == exchangeContractAddress;
    }
}
