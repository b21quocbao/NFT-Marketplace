// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

// returns hardcoded URI for each token

contract ERC721Token is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public cost = 0 ether;
    uint256 public maxSupply = 200000;
    uint256 public maxMintAmount = 2000;
    address public payoutAddress;
    address public exchangeContractAddress;
    mapping(uint256 => string) private _tokenURIs;

    mapping(address => bool) public whitelisted;
    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    constructor(
        string memory _name,
        string memory _symbol,
        address _exchangeContractAddress
    ) ERC721(_name, _symbol) {
        exchangeContractAddress = _exchangeContractAddress;
    }

    // public
    function mint(
        address _to,
        uint256 _mintAmount,
        string[] memory _metadataURIs
    ) public payable {
        uint256 supply = totalSupply();
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);
        require(_metadataURIs.length == _mintAmount);

        if (msg.sender != owner()) {
            if (whitelisted[msg.sender] != true) {
                require(msg.value >= cost * _mintAmount);
            }
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _owners[supply + i] = msg.sender;
            _safeMint(_to, supply + i);
            _setTokenURI(supply + i, _metadataURIs[i - 1]);
        }
    }

    function _isExchangeContract(address spender) internal view virtual returns (bool) {
        return spender == exchangeContractAddress;
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override(ERC721) returns (bool) {
        return _isExchangeContract(operator) || super.isApprovedForAll(owner, operator);
    }

    function _substring(
        string memory str,
        uint256 startIndex,
        uint256 endIndex
    ) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }

    function _compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }

    function _contains(string memory a, address b) internal view virtual returns (bool) {
        require(bytes(a).length > 42, "not-enough-length");

        return _compareStrings(_substring(a, 0, 42), Strings.toHexString(uint256(uint160(b))));
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721) {
        require(
            _isExchangeContract(_msgSender()) || _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        if (_owners[tokenId] == address(0)) {
            require(_contains(Strings.toHexString(tokenId), from), "invalid");
            _owners[tokenId] = to;
            _safeMint(to, tokenId);
        } else {
            _transfer(from, to, tokenId);
        }
    }

    function stringToUint(string memory s) internal view returns (bool success, uint256 result) {
        bytes memory b = bytes(s);
        uint256 result = 0;
        success = false;
        for (uint256 i = 0; i < b.length; i++) {
            if ((uint8(b[i]) >= 48 && uint8(b[i]) <= 57)) {
                result = result * 16 + uint8(b[i]) - 48;
                success = true;
            } else if (uint8(b[i]) >= 97 && uint8(b[i]) <= 102) {
                result = result * 16 + 10 + uint8(b[i]) - 97;
                success = true;
            } else {
                result = 0;
                success = false;
                break;
            }
        }
        return (success, result);
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) public view virtual override(ERC721) returns (address) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            bool success;
            uint256 result;
            string memory a = Strings.toHexString(tokenId);
            string memory b = _substring(a, 2, 42);
            (success, result) = stringToUint(b);
            require(success, "invalid");
            return address(uint160(result));
        }
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://nft-marketplace-psi-seven.vercel.app/nft/";
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override(ERC721) returns (address) {
        return address(0);
    }

    //only owner
    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function setmaxMintAmount(uint256 _maxMintAmount) public onlyOwner {
        maxMintAmount = _maxMintAmount;
    }

    function setmaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function setPayoutAddress(address _payoutAddress) public onlyOwner {
        payoutAddress = _payoutAddress;
    }

    function whitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = true;
    }

    function removeWhitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = false;
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(payoutAddress).call{ value: address(this).balance }("");
        require(os);
    }
}
