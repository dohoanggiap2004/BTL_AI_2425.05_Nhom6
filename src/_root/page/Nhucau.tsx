'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';

const Nhucau = () => {
    // Define chart configuration
    const chartConfig = {
        nhucau: {
            label: 'Nhu cầu sử dụng trung bình(Tấn) ',
            color: '#60BC5E',
        },
    };

    // Sample chart data
    const chartData = [
        { month: '2015', nhucau: 1850000 },
        { month: '2016', nhucau: 1900000 },
        { month: '2017', nhucau: 1950000 },
        { month: '2018', nhucau: 1970000 },
        { month: '2019', nhucau: 1990000 },
        { month: '2020', nhucau: 2010000 },
        { month: '2021', nhucau: 2030000 },
        { month: '2022', nhucau: 2050000 },
        { month: '2023', nhucau: 2070000 },
    ];

    return (
        <div className="flex flex-1 items-center flex-col justify-center ">
            <div>
                <h1 className="font-bold py-10">Nhu cầu sử dụng qua các năm(2015-2023)</h1>
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

                    <Bar dataKey="nhucau" fill={chartConfig.nhucau.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default Nhucau;
