import { FC } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#00C49F', '#d10404 '];

type ChartProps = {
  totalIncome: number | 0;
  totalExpense: number | 0;
};

interface IData {
  value: number;
  name: string;
}

const Chart: FC<ChartProps> = ({ totalIncome, totalExpense }) => {
  const data: IData[] = [
    { name: 'Ganancias', value: totalIncome },
    { name: 'Gastos', value: totalExpense },
  ];

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx={'50%'}
            cy={'50%'}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
