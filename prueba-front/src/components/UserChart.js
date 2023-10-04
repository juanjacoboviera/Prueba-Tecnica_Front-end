import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { organizeData } from "../helpers/helpers";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCleanData } from "../store/slices/usersSlice";

const UserChart = ({ usersList }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const dispatch = useDispatch();
  const cleanData = useSelector((state) => state.users.cleanData);
  const inputField = useSelector((state) => state.users.inputField);

  useEffect(() => {
    const getCleanData = async () => {
      const data = await organizeData(usersList);
      dispatch(addCleanData(data));
    };
    getCleanData();
  }, [usersList]);

  useEffect(() => {
    if (cleanData) {
      const data = {
        labels: cleanData?.map((user) => user.name),
        datasets: [
          {
            label: "Seguidores",
            data: cleanData?.map((user) => user.followers),
            backgroundColor: [
              "rgb(14, 33, 160)",
              "rgb(99, 102, 241)",
              "rgb(157, 68, 192)",
              "rgb(236, 83, 176)",
            ],
            borderColor: [
              "rgb(255, 159, 64)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 0,
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      };
      setChartData(data);
      setChartOptions(options);
    }
  }, [cleanData]);

  return inputField ? (
    <div className="chart-container">
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        height="400px"
        width="800px"
      />
    </div>
  ) : (
    ""
  );
};

export default UserChart;
