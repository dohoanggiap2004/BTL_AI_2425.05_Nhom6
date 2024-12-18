'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';

const Xk = () => {
    // Define chart configuration
    const chartConfig = {
        xk: {
            label: 'Khả năng cung cấp trung bình(Tấn) ',
            color: '#9562aa',
        },
    };

    // Sample chart data
    const chartData = [
        { month: '2015', xk: 1500000 },
        { month: '2016', xk: 1600000 },
        { month: '2017', xk: 1550000 },
        { month: '2018', xk: 1750000 },
        { month: '2019', xk: 1800000 },
        { month: '2020', xk: 1700000 },
        { month: '2021', xk: 1850000 },
        { month: '2022', xk: 1900000 },
        { month: '2023', xk: 1950000 },
    ];

    return (
        <div className="flex flex-1 items-center flex-col justify-center ">
            <div>
                <h1 className="font-bold py-10">Khả năng cung cấp qua các năm(2015-2023)</h1>
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

                    <Bar dataKey="xk" fill={chartConfig.xk.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default Xk;
