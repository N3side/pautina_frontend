import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

export default function ChartCard({ title, data }: { title: string, data: any[] }) {
    const hasData = data.some(item => item.value > 0);

    return (
        <div className="flex flex-col items-center p-6 rounded-[24px] glass-effect shadow-sm w-full">
            <h4 className="text-text-main font-semibold mb-6 self-start">{title}</h4>

            <div className="h-[250px] w-full flex items-center justify-center">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={45} /* Делаем современный "пончик" */
                                paddingAngle={2}
                                dataKey="value"
                                stroke="transparent" /* Убираем стандартную обводку */
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        className="hover:opacity-80 transition-opacity duration-200 outline-none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-text-muted text-sm flex items-center justify-center h-full">
                        Нет данных
                    </div>
                )}
            </div>
        </div>
    );
}
