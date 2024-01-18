import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

//  기본 Coin Components
function Coin() {
  const { coinId } = useParams<RouteParams>();
  return <h1>Coin: ${coinId}</h1>
}

export default Coin;