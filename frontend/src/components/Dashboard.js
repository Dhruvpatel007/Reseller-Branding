import { Bar } from "react-chartjs-2";
import { Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const BarChart = () => {

  const [threatData, setThreatData] = useState({
    labels: [],
    datasets: [{
      label: "Threats Detected",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: [],
    }],
  });
  const [incidentData, setIncidentData] = useState({
    labels: [],
    datasets: [{
      label: "Incident Reports",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: [],
    }],
  });
  const [vulnerabilityData, setVulnerabilityData] = useState({
    labels: [],
    datasets: [{
      label: "Vulnerability Scans",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: [],
    }],
  });
  const [activityData, setActivityData] = useState({
    labels: [],
    datasets: [{
      label: "User Activity",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: [],
    }],
  });


  const fetchData = async () => {
    try {

      // set ThreatData
      const threatRes = await axios.get("http://localhost:5000/api/security-data/threat-detection");
      setThreatData({
        labels: threatRes.data.data.labels,
        datasets: [{
          label: "Threats Detected",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: threatRes.data.data.values,
        }],
      });

      //set IncidentData
      const incidentRes = await axios.get("http://localhost:5000/api/security-data/incident-reports");
      setIncidentData({
        labels: incidentRes.data.data.labels,
        datasets: [{
          label: "Incident Reports",
          data: incidentRes.data.data.values,
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
        }],
      });

      //set vulnerabilityData
      const vulnerabilityRes = await axios.get("http://localhost:5000/api/security-data/vulnerability-scans");
      setVulnerabilityData({
        labels: vulnerabilityRes.data.data.labels,
        datasets: [{
          label: "Vulnerability Scans",
          data: vulnerabilityRes.data.data.values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        }],
      });

      //set activityData
      const activityRes = await axios.get("http://localhost:5000/api/security-data/user-activity");
      setActivityData({
        labels: activityRes.data.data.labels,
        datasets: [{
          label: "User Activity",
          data: activityRes.data.data.values,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        }],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div>
      <Header />
      <Typography align="center" variant="h3">
        Security Dashboard
      </Typography>
      <Grid container spacing={3} pl={3}>
        <Grid item xs={6} md={6} lg={6} p={4}>
          <Bar data={threatData} options={options} />
          <Bar data={incidentData} options={options} />
        </Grid>
        <Grid item xs={6} md={6} lg={6} p={4}>
          <Bar data={vulnerabilityData} options={options} />
          <Bar data={activityData} options={options} />
        </Grid>
      </Grid>
    </div>
  );
};

export default BarChart;
