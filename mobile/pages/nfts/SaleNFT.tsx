import { useState } from "react";
import SaleNftForm from "../../components/nfts/SaleNftForm";

function SaleNft({ route }) {
  const saleNftHandler = () => {};
  const [loading, setLoading] = useState(false);

  return <SaleNftForm onSaleNft={saleNftHandler} loading={loading} />;
}

export default SaleNft;
