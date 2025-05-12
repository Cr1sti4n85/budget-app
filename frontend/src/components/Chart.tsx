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
  heigth: number;
  innerRadius: number;
  outerRadius: number;
};

interface IData {
  value: number;
  name: string;
}

const Chart: FC<ChartProps> = ({
  totalIncome,
  totalExpense,
  heigth,
  innerRadius,
  outerRadius,
}) => {
  const data: IData[] = [
    { name: 'Ganancias', value: totalIncome },
    { name: 'Gastos', value: totalExpense },
  ];

  return (
    <div style={{ width: '100%', height: heigth }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx={'50%'}
            cy={'40%'}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
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
          <Legend verticalAlign="top" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
