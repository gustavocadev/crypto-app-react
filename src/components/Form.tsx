import styled from "@emotion/styled";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { coins } from "../data/coins";
import useSelectCoins from "../hooks/useSelectCoins";
import Text from "../components/Error";

const InputSubmit = styled.button`
  background-color: #888dff;
  border-radius: 4px;
  text-align: center;
  text-transform: uppercase;
  padding: 12px 12px;
  display: block;
  width: 100%;
  border: none;
  font-weight: 700;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.4s ease;

  &:hover {
    background-color: #7a7dfe;
  }
`;

type CoinsType = {
  coin: string | any;
  cripto: string | any;
};

type FormProps = {
  setCoins: Dispatch<SetStateAction<CoinsType>>;
};

const Form = ({ setCoins }: FormProps) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [coin, SelectCoins] = useSelectCoins("elige tu moneda", coins);
  const [cripto, SelectCriptos] = useSelectCoins(
    "elige tu criptomoneda",
    criptos
  );
  console.log(criptos);
  useEffect(() => {
    const getCoins = async () => {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      );
      const data = await res.json();
      const arrayOfCriptos = data.Data.map((el: any) => {
        return {
          id: el.CoinInfo.Name,
          name: el.CoinInfo.FullName,
        };
      });
      //   console.log(data);
      setCriptos(arrayOfCriptos);
    };
    getCoins();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([coin, cripto].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setCoins({
      coin,
      cripto,
    });
  };
  return (
    <>
      {error && <Text>Todos los campos son obligatorios</Text>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCriptos />
        <InputSubmit type="submit">Cotizar</InputSubmit>
      </form>
    </>
  );
};

export default Form;
