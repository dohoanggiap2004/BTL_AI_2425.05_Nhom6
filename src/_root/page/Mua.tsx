'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';

const Mua = () => {
    // Define chart configuration
    const chartConfig = {
        luongmua: {
            label: 'Lượng mưa trung bình(mm) ',
            color: '#2563eb',
        },
    };

    // Sample chart data
    const chartData = [
        { month: '2015', luongmua: 1980 },
        { month: '2016', luongmua: 1920 },
        { month: '2017', luongmua: 2030 },
        { month: '2018', luongmua: 1950 },
        { month: '2019', luongmua: 1870 },
        { month: '2020', luongmua: 1900 },
        { month: '2021', luongmua: 1940 },
        { month: '2022', luongmua: 1890 },
        { month: '2023', luongmua: 1950 },
    ];

    return (
        <div className="flex flex-1 items-center flex-col justify-center ">
            <div>
                <h1 className="font-bold py-10">Lượng mưa trung bình qua các năm(2015-2023)</h1>
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

                    <Bar dataKey="luongmua" fill={chartConfig.luongmua.color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default Mua;
