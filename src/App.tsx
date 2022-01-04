import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Conversion from "./components/Conversion";
import Form from "./components/Form";
import CriptoImage from "./img/imagen-criptos.png";
import Spinner from "./components/Spinner";

type ConversionProps = {
  PRICE: string;
  HIGHDAY: string;
  LOWDAY: string;
  CHANGEPCT24HOUR: string;
  IMAGEURL: string;
  LASTUPDATE: string;
};

const Container = styled.main`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    display: block;
    background-color: #66a2fe;
    margin: 10px auto 0 auto;
    border-radius: 4;
  }
`;

const Image = styled.img`
  max-width: 300px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

type CoinsType = {
  cripto: string;
  coin: string;
};

const App = () => {
  const [coins, setCoins] = useState<CoinsType>({
    cripto: "",
    coin: "",
  });

  const [conversion, setConversion] = useState<ConversionProps>({
    PRICE: "",
    HIGHDAY: "",
    LOWDAY: "",
    CHANGEPCT24HOUR: "",
    IMAGEURL: "",
    LASTUPDATE: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!Object.values(coins).includes("")) {
      const getConversion = async (cripto: string, coin: string) => {
        setLoading(true);
        setConversion({
          PRICE: "",
          HIGHDAY: "",
          LOWDAY: "",
          CHANGEPCT24HOUR: "",
          IMAGEURL: "",
          LASTUPDATE: "",
        });
        const res = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${coin}`
        );

        const data = await res.json();
        // console.log();
        setConversion(data.DISPLAY[cripto][coin]);
        setLoading(false);
      };

      getConversion(coins.cripto, coins.coin);
    }
  }, [coins]);
  return (
    <Container>
      <Image src={CriptoImage} alt="Imagen de criptomonedas" />
      <section>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form setCoins={setCoins} />
        {loading && <Spinner />}
        {conversion.PRICE && <Conversion {...conversion} />}
      </section>
    </Container>
  );
};

export default App;
