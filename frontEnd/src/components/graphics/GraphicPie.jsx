import { DonutChart, Legend } from '@tremor/react';

export default function GraphicPie({data}) {
  return (
    <>
      <div className="h-full flex items-center justify-center space-x-3">
        <DonutChart
          data={data}
          category="value"
          index="name"
          colors={['green', 'yellow', 'red']}
          className="w-20 h-20 z-10"
        />
        <Legend
          categories={['Alcanzado', 'En proceso', 'No alcanzado']}
          colors={['green', 'yellow', 'red']}
          className="max-w-[150px] z-0"
        />
      </div>
    </>
  );
}