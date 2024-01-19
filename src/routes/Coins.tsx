import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import React, { useEffect } from 'react';

const lightTheme = {
  bgColor: "white",
  textColor: "black",
  accentColor: "black", 
  cardBgColor: "white",
};

const darkTheme = {
  bgColor: "black",
  textColor: "white",
  accentColor: "white", 
  cardBgColor: "white",
};

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-style: inset;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 5px;
  margin: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: color 0.3s ease-in-out;
  }
  &:hover{
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 30px;
  left: 30px;
`;

export const NavigationIcon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 2px;
  &:hover {
    cursor: pointer;
  }
  svg {
    font-size: 22px;
    background-color: inherit;
    color: ${(props) => props.theme.bgColor};
  }
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const Coins = () => {
  const { isLoading, data } = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
  console.log(isLoading, data);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? darkTheme.bgColor : lightTheme.bgColor;
    document.body.style.color = isDark ? darkTheme.textColor : lightTheme.textColor;
  }, [isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coin Market</Title>
      </Header>
      <NavigationContainer>
        {isDark ? (
          <NavigationIcon onClick={toggleDarkAtom}>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faSun} />
            </Link>
          </NavigationIcon>
        ) : (
          <NavigationIcon onClick={toggleDarkAtom}>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faMoon} />
            </Link>
          </NavigationIcon>
        )}
      </NavigationContainer>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 30).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
    </ThemeProvider>
  );
};

export default Coins;