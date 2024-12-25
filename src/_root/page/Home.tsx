import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
    // Tạo các ref để tham chiếu đến các input
    const luongMuaRef = useRef(null);
    const nhietDoRef = useRef(null);
    const cungRef = useRef(null);
    const cauRef = useRef(null);

    const [forecast, setForecast] = useState('');

    /**
     * Dữ liệu mẫu:
     *   +, rainfall: lượng mưa (mm)
     *   +, temperature: nhiệt độ (độ C)
     *   +, supply: khả năng cung cấp (tấn)
     *   +, demand: nhu cầu (tấn)
     */
    interface DataPoint {
        year: number;
        rainfall: number;
        temperature: number;
        supply: number;
        demand: number;
        price: string;
    }

    const data: DataPoint[] = [
        { year: 2015, rainfall: 1980, temperature: 24.3, supply: 1500000, demand: 1850000, price: 'low' }, // 2.10USD/kg
        { year: 2016, rainfall: 1920, temperature: 24.4, supply: 1600000, demand: 1900000, price: 'medium' }, // 2.20USD/kg
        { year: 2017, rainfall: 2030, temperature: 24.5, supply: 1550000, demand: 1950000, price: 'low' }, // 2.15USD/kg
        { year: 2018, rainfall: 1950, temperature: 24.7, supply: 1750000, demand: 1970000, price: 'low' }, // 2.18USD/kg
        { year: 2019, rainfall: 1870, temperature: 24.8, supply: 1800000, demand: 1990000, price: 'medium' }, // 2.25USD/kg
        { year: 2020, rainfall: 1900, temperature: 24.6, supply: 1700000, demand: 2010000, price: 'medium' }, // 2.28USD/kg
        { year: 2021, rainfall: 1940, temperature: 24.9, supply: 1850000, demand: 2030000, price: 'high' }, // 2.30USD/kg
        { year: 2022, rainfall: 1890, temperature: 25.1, supply: 1900000, demand: 2050000, price: 'high' }, // 2.35USD/kg
        { year: 2023, rainfall: 1950, temperature: 25.0, supply: 1950000, demand: 2070000, price: 'high' }, // 2.40USD/kg
    ];

    // Hàm tính toán giá trị thông tin
    function entropy(data: DataPoint[]): number {
        const counts: Record<string, number> = {};
        for (const item of data) {
            if (!counts[item.price]) {
                counts[item.price] = 0;
            }
            counts[item.price]++;
        }

        let result = 0;
        for (const label in counts) {
            const p = counts[label] / data.length;
            result -= p * Math.log2(p);
        }
        return result;
    }

    // Hàm chọn key-value tốt nhất để phân chia
    function bestSplit(
        data: DataPoint[],
        features: (keyof DataPoint)[],
    ): { feature: keyof DataPoint | null; threshold: number | null } {
        let bestFeature: keyof DataPoint | null = null;
        let bestThreshold: number | null = null;
        let bestInfoGain = -Infinity;

        const currentEntropy = entropy(data);

        for (const feature of features) {
            const values = data.map((item) => item[feature]);
            const uniqueValues = [...new Set(values)];

            for (const value of uniqueValues) {
                const leftSplit = data.filter((item) => item[feature] <= value);
                const rightSplit = data.filter((item) => item[feature] > value);

                const pLeft = leftSplit.length / data.length;
                const pRight = rightSplit.length / data.length;

                const newEntropy = pLeft * entropy(leftSplit) + pRight * entropy(rightSplit);
                const infoGain = currentEntropy - newEntropy;

                if (infoGain > bestInfoGain) {
                    bestInfoGain = infoGain;
                    bestFeature = feature;
                    bestThreshold = value as number;
                }
            }
        }

        return { feature: bestFeature, threshold: bestThreshold };
    }

    // Kiểu dữ liệu cho nút lá
    interface LeafNode {
        label: string;
    }

    // Kiểu dữ liệu cho nút quyết định
    interface DecisionNode {
        feature: keyof DataPoint;
        threshold: number;
        left: TreeNode;
        right: TreeNode;
    }

    // Cây quyết định có thể là nút lá hoặc nút quyết định
    type TreeNode = LeafNode | DecisionNode;

    // Hàm xây dựng cây quyết định
    function buildDecisionTree(data: DataPoint[], features: (keyof DataPoint)[], depth = 0, maxDepth = 15): TreeNode {
        const labels = data.map((item) => item.price);
        const uniqueLabels = [...new Set(labels)];

        // Điều kiện dừng: nếu đạt tới độ sâu tối đa hoặc chỉ có một nhãn duy nhất
        if (depth >= maxDepth || uniqueLabels.length === 1) {
            return { label: uniqueLabels[0] };
        }

        const { feature, threshold } = bestSplit(data, features);

        if (!feature) {
            return { label: uniqueLabels[0] };
        }

        const leftSplit = data.filter((item) => item[feature!] <= threshold!);
        const rightSplit = data.filter((item) => item[feature!] > threshold!);

        return {
            feature,
            threshold,
            left: buildDecisionTree(leftSplit, features, depth + 1, maxDepth),
            right: buildDecisionTree(rightSplit, features, depth + 1, maxDepth),
        } as DecisionNode;
    }

    // Hàm dự đoán giá trị
    function predict(tree: TreeNode, sample: DataPoint): string {
        if ('label' in tree) {
            return tree.label;
        }

        const value = sample[tree.feature];

        if (typeof value === 'number' && value <= tree.threshold) {
            return predict(tree.left, sample);
        } else if (typeof value === 'number' && value > tree.threshold) {
            return predict(tree.right, sample);
        } else {
            throw new Error('Không thể so sánh giá trị không phải là số');
        }
    }

    // Đặc trưng được sử dụng để xây dựng cây (loại bỏ 'price' vì nó là string)
    const features: (keyof DataPoint)[] = ['rainfall', 'temperature', 'supply', 'demand'];

    // Xây dựng cây quyết định
    const decisionTree = buildDecisionTree(data, features);

    console.log('Cây quyết định được xây dựng:', JSON.stringify(decisionTree, null, 2));

    // ==================Dự đoán giá cà phê với một mẫu mới==================
    // Năm 2024
    const sample1: DataPoint = {
        year: 2024,
        rainfall: 1800,
        temperature: 25.3,
        supply: 2100000,
        demand: 2080000,
        price: '',
    };
    const prediction1 = predict(decisionTree, sample1);

    console.log(`Dự đoán giá cà phê năm 2024: ${prediction1}`);

    // =================================================================================================================
    // =================================================================================================================
    // =================================================================================================================

    const handleSubmit = () => {
        // Lấy giá trị từ các input
        const luongMua = parseFloat(luongMuaRef.current.value);
        const nhietDo = parseFloat(nhietDoRef.current.value);
        const cung = parseFloat(cungRef.current.value);
        const cau = parseFloat(cauRef.current.value);

        // Kiểm tra nếu có giá trị không hợp lệ
        if (isNaN(luongMua) || isNaN(nhietDo) || isNaN(cung) || isNaN(cau)) {
            console.error('Vui lòng nhập đầy đủ và chính xác các giá trị.');
            return;
        }

        // Hiển thị giá trị ra console
        console.log('Lượng mưa:', luongMua);
        console.log('Nhiệt độ:', nhietDo);
        console.log('Khả năng cung cấp:', cung);
        console.log('Nhu cầu sử dụng:', cau);

        // ==================Dự đoán giá cà phê với một mẫu mới==================
        const sample1: any = { rainfall: luongMua, temperature: nhietDo, supply: cung, demand: cau };
        const prediction1 = predict(decisionTree, sample1);

        console.log(`Dự đoán giá cà phê: ${prediction1}`);
        if(prediction1 === 'high') {
            setForecast("Mức giá cao");
        } else if (prediction1 === 'medium') {
            setForecast("Mức giá trung bình");
        } else {
            setForecast("Mức giá thấp");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="assignment">
                <h1 className="font-bold py-10 text-center">
                    BÀI TẬP LỚN: ỨNG DỤNG THUẬT TOÁN HỌC MÁY DỰ ĐOÁN XU HƯỚNG GIÁ CÀ PHÊ VIỆT NAM <br/>
                    <i>(sử dụng cây quyết định với thuật toán ID3)</i>
                </h1>
            </div>
            <div className="dataBefore">
                <h1>Dữ liệu dự đoán từ các năm</h1>
            </div>
            <div className="flex flex-1 gap-10 py-10">
                <Link to="/mua" className="w-full">
                    <Button className="predictive-data rainFall-btn border border-sky-500 p-10" variant="secondary">
                        Lượng mưa
                    </Button>
                </Link>
                <Link to="/nhiet" className="w-full">
                    <Button className="predictive-data temperature-btn border border-sky-500 p-10" variant="secondary">
                        Nhiệt độ
                    </Button>
                </Link>
                <Link to="/xk" className="w-full">
                    <Button className="predictive-data supply-btn border border-sky-500 p-10" variant="secondary">
                        Khả năng cung cấp
                    </Button>
                </Link>
                <Link to="/nhucau" className="w-full">
                    <Button className="predictive-data demand-btn border border-sky-500 p-10" variant="secondary">
                        Nhu cầu
                    </Button>
                </Link>
                <Link to="/nk" className="w-full">
                    <Button className="predictive-data price-btn border border-sky-500 p-10" variant="secondary">
                        Mức giá
                    </Button>
                </Link>
            </div>

            <div className="dataCurrent">
                <h1>Dữ liệu dự đoán của năm nay</h1>
            </div>

            <div className="flex items-center gap-3 p-4 mt-2">
                {/* Trường Lượng Mưa */}
                <div className="flex flex-col">
                    <label htmlFor="luongmua" className='title-inputData'>Lượng mưa</label>
                    <input
                        type="text"
                        id="luongmua"
                        ref={luongMuaRef}
                        className="border p-2"
                        placeholder="Nhập lượng mưa(mm)"
                    />
                </div>

                {/* Trường Nhiệt Độ */}
                <div className="flex flex-col">
                    <label htmlFor="nhietdo" className='title-inputData'>Nhiệt độ</label>
                    <input
                        type="text"
                        id="nhietdo"
                        ref={nhietDoRef}
                        className="border p-2"
                        placeholder="Nhập nhiệt độ(°C)"
                    />
                </div>

                {/* Trường Khả Năng Cung Cấp */}
                <div className="flex flex-col">
                    <label htmlFor="cung" className='title-inputData'>Khả năng cung cấp</label>
                    <input
                        type="text"
                        id="cung"
                        ref={cungRef}
                        className="border p-2 w-60"
                        placeholder="Nhập khả năng cung cấp(tấn)"
                    />
                </div>

                {/* Trường Nhu Cầu Sử Dụng */}
                <div className="flex flex-col">
                    <label htmlFor="cau" className='title-inputData'>Nhu cầu sử dụng</label>
                    <input
                        type="text"
                        id="cau"
                        ref={cauRef}
                        className="border p-2 w-60"
                        placeholder="Nhập nhu cầu sử dụng(tấn)"
                    />
                </div>
            </div>
            <button
                id="submit"
                className="submit-btn border border-sky-500 px-5 py-2 rounded-sm bg-slate-800 text-slate-50"
                onClick={handleSubmit}
            >
                <div>Dự đoán</div>
            </button>
            <input
                className="mt-4"
                type="text"
                value={forecast}
                onChange={(e) => setForecast(e.target.value)}
                placeholder="Mức giá dự đoán..."
                readOnly
            />
        </div>
    );
};

export default Home;
