import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface Historical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
  timestamp: number;
}

interface ChartProps {
  coinId: string;
  name: string;
}

interface Data {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId, name } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<Data[]>(
    ["price in chart", coinId],
    () => fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close,
      y: [
        Number(i.open).toFixed(2),
        Number(i.high).toFixed(2),
        Number(i.low).toFixed(2),
        Number(i.close).toFixed(2),
      ],
    };
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            title: {
              text: `${name} chart`,
              align: "center",
              style: {
                fontSize: "17px",
              },
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "green",
                  downward: "red",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;