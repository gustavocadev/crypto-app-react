import styled from "@emotion/styled";

const ConversionStyle = styled.section`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const Text = styled.p`
  font-size: 18px;

  span {
    font-weight: 700;
  }
`;

const Price = styled.p`
  font-size: 30px;

  span {
    font-weight: 700;
  }
`;
const Image = styled.img`
  display: block;
  width: 120px;
`;
type ConversionProps = {
  PRICE: string;
  HIGHDAY: string;
  LOWDAY: string;
  CHANGEPCT24HOUR: string;
  IMAGEURL: string;
  LASTUPDATE: string;
};

const Conversion = (conversion: ConversionProps) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    conversion;
  return (
    <ConversionStyle>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} />
      <section>
        <Price>
          El precio es de: <span>{PRICE}</span>
        </Price>
        <Text>
          El precio más alto del día: <span>{HIGHDAY}</span>
        </Text>
        <Text>
          El precio es más bajo del día: <span>{LOWDAY}</span>
        </Text>
        <Text>
          Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Text>
        <Text>
          última actualización: <span>{LASTUPDATE}</span>
        </Text>
      </section>
    </ConversionStyle>
  );
};

export default Conversion;
