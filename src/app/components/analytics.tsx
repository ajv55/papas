'use client';
import React from 'react';
import { Bar, Doughnut, Line, } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, ArcElement);

interface AnalyticsProps {
  orders: {
    items: {
      name: string;
      price: number;
      quantity: number;
    }[];
  }[];
}

const Analytics: React.FC<AnalyticsProps> = ({ orders }) => {
  // Process data for charts
  const getPopularItemsData = () => {
    const itemCounts: Record<string, number> = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (itemCounts[item.name]) {
          itemCounts[item.name] += item.quantity;
        } else {
          itemCounts[item.name] = item.quantity;
        }
      });
    });

    const labels = Object.keys(itemCounts);
    const data = Object.values(itemCounts);

    return {
      labels,
      datasets: [
        {
          label: 'Quantity Sold',
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const popularItemsData = getPopularItemsData();

  // Helper functions for chart data
  const getRevenueOverTimeData = () => {
    const revenueByDate = {} as any;
    orders.forEach((order: any) => {
      const date = format(new Date(order.createdAt), 'yyyy-MM-dd');
      if (revenueByDate[date]) {
        revenueByDate[date] += order.totalAmount;
      } else {
        revenueByDate[date] = order.totalAmount;
      }
    });
    const labels = Object.keys(revenueByDate);
    const data = Object.values(revenueByDate);

    return {
      labels,
      datasets: [
        {
          label: 'Revenue Over Time',
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
  };

  const getOrderVolumeByDayData = () => {
    const orderCountsByDay = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 } as any;
    orders.forEach((order: any) => {
      const dayOfWeek = format(new Date(order.createdAt), 'EEEE');
      orderCountsByDay[dayOfWeek]++;
    });
    const labels = Object.keys(orderCountsByDay);
    const data = Object.values(orderCountsByDay);

    return {
      labels,
      datasets: [
        {
          label: 'Order Volume by Day of Week',
          data,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="bg-white overflow-scroll shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold text-primary-dark mb-6">Analytics</h2>
      <div className="flex flex-col  justify-center items-center gap-3">
        {/* Popular Items Bar Chart */}
        <div className="bg-white lg:w-[90%] w-full ring-2 ring-primary-dark p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Revenue Over Time</h2>
        <Line
          data={getRevenueOverTimeData()}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' as const },
              tooltip: {
                callbacks: { label: (context: any) => `$${context.raw.toFixed(2)}` },
              },
            },
            scales: {
              x: { title: { display: true, text: 'Date' } },
              y: { title: { display: true, text: 'Revenue ($)' } },
            },
          }}
        />
      </div>
      <div className="bg-white lg:w-[90%] w-full ring-2 ring-primary-dark p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Order Volume by Day of Week</h2>
        <Bar
          data={getOrderVolumeByDayData()}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' as const },
              tooltip: {
                callbacks: { label: (context) => `${context.label}: ${context.raw} orders` },
              },
            },
            scales: {
              x: { title: { display: true, text: 'Day of Week' } },
              y: { title: { display: true, text: 'Order Count' } },
            },
          }}
        />
      </div>
        <div className="bg-white lg:w-[90%] w-full  ring-2 ring-primary-dark p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Popular Items</h3>
          <Bar
            data={popularItemsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.raw} units`,
                  },
                },
              },
            }}
          />
        </div>

        {/* Total Sales Doughnut Chart */}
        <div className="bg-white lg:w-[90%] w-full   ring-2 ring-primary-dark p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Sales Breakdown</h3>
          <Doughnut
            data={{
              labels: ['Completed Orders', 'Processing Orders'], // Update labels as needed
              datasets: [
                {
                  data: [orders.filter((o: any) => o.status === 'Completed').length, orders.filter((o: any) => o.status === 'processing').length],
                  backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                  borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.raw} orders`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
