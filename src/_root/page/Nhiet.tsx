'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';

const Nhiet = () => {
    // Define chart configuration
    const chartConfig = {
        nhietdo: {
            label: 'Nhiệt độ trung bình(C) ',
            color: 'orange',
        },
    };

    // Sample chart data
    const chartData = [
        { month: '2015', nhietdo: 24.3 },
        { month: '2016', nhietdo: 24.4 },
        { month: '2017', nhietdo: 24.5 },
        { month: '2018', nhietdo: 24.7 },
        { month: '2019', nhietdo: 24.8 },
        { month: '2020', nhietdo: 24.6 },
        { month: '2021', nhietdo: 24.9 },
        { month: '2022', nhietdo: 25.1 },
        { month: '2023', nhietdo: 25.0 },
    ];

    return (
        <div className="flex flex-1 items-center flex-col justify-center ">
            <div>
                <h1 className="font-bold py-10">Nhiệt độ trung bình qua các năm(2015-2023)</h1>
            </div>
            <ChartContainer config={chartConfig} className="min-h-[350px] w-2/4 ">
                <BarChart data={chartData}>
                    <CartesianGrid vertical={true} />

                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 4)}
                    />

                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />

                    <Bar dataKey="nhietdo" fill={chartConfig.nhietdo.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default Nhiet;
