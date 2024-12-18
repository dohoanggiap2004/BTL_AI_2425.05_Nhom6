'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';

const Nk = () => {
    // Define chart configuration
    const chartConfig = {
        mucgia: {
            label: 'Mức giá (USD/kg) ',
            color: '#de2a',
        },
    };

    // Sample chart data
    const chartData = [
        { month: '2015', mucgia: 2.1 },
        { month: '2016', mucgia: 2.2 },
        { month: '2017', mucgia: 2.15 },
        { month: '2018', mucgia: 2.18 },
        { month: '2019', mucgia: 2.25 },
        { month: '2020', mucgia: 2.28 },
        { month: '2021', mucgia: 2.3 },
        { month: '2022', mucgia: 2.35 },
        { month: '2023', mucgia: 2.4 },
    ];

    return (
        <div className="flex flex-1 items-center flex-col justify-center ">
            <div>
                <h1 className="font-bold py-10">Mức giá qua các năm(2015-2023)</h1>
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

                    <Bar dataKey="mucgia" fill={chartConfig.mucgia.color} radius={4} />
                </BarChart>
            </ChartContainer>

            <div className="py-5">
                <h1>Chú giải:</h1>
                <p className="text-slate-600">Mức giá nhỏ hơn 2.20 (Thấp)</p>
                <p className="text-slate-600">Mức giá 2.20 - 2.30 (Trung bình)</p>
                <p className="text-slate-600">Mức giá lớn hơn 2.30 (Cao)</p>
            </div>
        </div>
    );
};

export default Nk;
