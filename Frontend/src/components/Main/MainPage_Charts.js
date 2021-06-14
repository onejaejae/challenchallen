import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

import gas from "./gas.json";

function MainPage_Charts() {
    const { data } = gas;
    const data2 = [
        { name: "0", total: 0 },
        { name: `${data[0].year}년`, total: `${data[0].Total}` },
        { name: `${data[1].year}년`, total: `${data[1].Total}` },
        { name: `${data[2].year}년`, total: `${data[2].Total}` },
        { name: `${data[3].year}년`, total: `${data[3].Total}` },
    ];
    const data3 = [
        {
            name: `${data[0].year}년`,
            total: `${data[0].Total}`,
            direct: `${data[0].Direct}`,
            indirect: `${data[0].Indirect}`,
        },
        {
            name: `${data[1].year}년`,
            total: `${data[1].Total}`,
            direct: `${data[1].Direct}`,
            indirect: `${data[1].Indirect}`,
        },
        {
            name: `${data[2].year}년`,
            total: `${data[2].Total}`,
            direct: `${data[2].Direct}`,
            indirect: `${data[2].Indirect}`,
        },
        {
            name: `${data[3].year}년`,
            total: `${data[3].Total}`,
            direct: `${data[3].Direct}`,
            indirect: `${data[3].Indirect}`,
        },
    ];
   
    return (
        <div className="MainPage_Charts">
            <div className="MainPage_Charts_title">
                <p>우리나라 온실 가스 배출 현황</p>
                <p>온실 가스를 줄이기위해 챌린지에 참여해주세요</p>
            </div>
            <div className="MainPage_Charts_charts">
       
                    <AreaChart
                        width={350}
                        height={350}
                        data={data3}
                        margin={{
                            top: 80,
                            right: 30,
                            left: 20,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="total" stroke="red" fill="red" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="direct" stroke="#8884d8"  fillOpacity={0.1} fill="blue" activeDot={{ r: 8 }} />
                        <Area type="monotone" dataKey="indirect" fillOpacity={0.1} fill="green" stroke="#82ca9d" />
                    </AreaChart>
            </div>
        </div>
    )
}

export default MainPage_Charts
