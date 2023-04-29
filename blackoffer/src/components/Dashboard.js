import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar ,Pie} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [search,setSearch ] = useState("")

  const fetchData = () => {
    axios
      .get('http://localhost:5000/blackoffer')
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  const handleChange=(e)=>{
    setSearch(e.target.value)
   
  }

  const filterData=()=>{
    // const x = data.map((curElem,id)=>{
    //     return curElem
    // })
    // .filter((elem,ind)=>{
    //     console.log(elem,"elem")
    //     console.log(search,"search")
    //      if (elem===search){
            
    //         return true;
    //      }
    //    })
       
    //     setData(x)
  }

  useEffect(() => {
    fetchData();
    filterData()
  }, [search]);

  const lineChart = {
    labels: data.map((d) => d.published),
    datasets: [
      {
        label: 'Intensity',
        data: data.map((d) => d.intensity),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const lineChart2 = {
    labels: data.map((d) => d.published),
    datasets: [
      {
        label: 'Likelihood',
        data: data.map((d) => d.likelihood),
        fill: false,
        backgroundColor: 'black',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barChart = {
    labels: data.map((d) => d.published),
    datasets: [
      {
        label: 'Relevance',
        data: data.map((d) => d.relevance),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const barChart2= {
    labels: data.map((d) => d.sector),
    datasets: [
      {
        label: 'Sector',
        data: data.map((d) => d.relevance),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: data.map((d) => d.country),
    datasets: [
      {
        label: 'Sectors',
        data: data.map((d) => d.intensity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const pieData2 = {
    labels: data.map((d) => d.region),
    datasets: [
      {
        label: 'Sectors',
        data: data.map((d) => d.intensity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

 

  return (
    <div >
        <h1>Dashboard</h1>
        <input type="text" onChange={handleChange} placeholder="Search" value={search} style={{display:"block", padding:"10px",margin:"20px", border: "1px solid black",
    borderRadius: "10px"}}/>
       <div style={{color:"Blue",textDecoration:"underline", display:""}}> <div><h1>Intensity</h1>
      <h3>Line Chart</h3>
      <Line
        data={lineChart}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                type: 'time',
                time: {
                  displayFormats: {
                    month: 'MMM YYYY',
                  },
                },
              },
            ],
          },
        }}
      /></div><hr/>
<div>
<h1>Likelihood</h1>
<h3>Bar Chart</h3>
<Line
        data={lineChart2}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                type: 'time',
                time: {
                  displayFormats: {
                    month: 'MMM YYYY',
                  },
                },
              },
            ],
          },
        }}
      />
</div></div><hr/>
      <div style={{color:"Blue",textDecoration:"underline"}}><h1>Sector</h1>
<h3>Bar Chart</h3>
<Bar
        data={barChart2}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                type: 'time',
                time: {
                  displayFormats: {
                    month: 'MMM YYYY',
                  },
                },
              },
            ],
          },
        }}
      /></div><hr/>
<div style={{color:"Blue",textDecoration:"underline"}}>
<h1>Relevance</h1>
      <h3>Bar Chart</h3>
      <Bar
        data={barChart}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                type: 'time',
                time: {
                  displayFormats: {
                    month: 'MMM YYYY',
                  },
                },
              },
            ],
          },
        }}
      />
</div><hr/>
       <div style={{color:"Blue",textDecoration:"underline"}}>
       <h1>Country</h1>
       <h3>Pie chart</h3>
      <Pie data={pieData} />
       </div><hr/>
       <div style={{color:"Blue",textDecoration:"underline"}}>
       <h1>Region</h1>
       <h3>Pie chart</h3>
      <Pie data={pieData2} />
       </div>
    </div>
  );
};

export default Dashboard;
