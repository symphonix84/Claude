import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  ComposedChart, Area
} from 'recharts';

// Monthly service data based on our analysis
const monthlyData = [
  { month: 'Jan', total: 323, revenue: 69387.91, moveOut: 29, deepClean: 21, standard: 70, strTurnover: 97, other: 106 },
  { month: 'Feb', total: 314, revenue: 69348.61, moveOut: 19, deepClean: 36, standard: 72, strTurnover: 92, other: 95 },
  { month: 'Mar', total: 403, revenue: 91873.57, moveOut: 29, deepClean: 35, standard: 93, strTurnover: 119, other: 127 },
  { month: 'Apr', total: 359, revenue: 79504.83, moveOut: 20, deepClean: 24, standard: 93, strTurnover: 116, other: 106 },
  { month: 'May', total: 369, revenue: 84369.82, moveOut: 27, deepClean: 29, standard: 92, strTurnover: 103, other: 118 },
  { month: 'Jun', total: 364, revenue: 83773.32, moveOut: 37, deepClean: 13, standard: 44, strTurnover: 119, other: 151 },
  { month: 'Jul', total: 325, revenue: 72894.60, moveOut: 16, deepClean: 36, standard: 41, strTurnover: 104, other: 128 },
  { month: 'Aug', total: 366, revenue: 87955.38, moveOut: 19, deepClean: 36, standard: 36, strTurnover: 92, other: 183 },
  { month: 'Sep', total: 333, revenue: 78923.43, moveOut: 18, deepClean: 11, standard: 35, strTurnover: 91, other: 178 },
  { month: 'Oct', total: 310, revenue: 75994.50, moveOut: 13, deepClean: 37, standard: 34, strTurnover: 85, other: 141 },
  { month: 'Nov', total: 331, revenue: 83082.81, moveOut: 29, deepClean: 40, standard: 29, strTurnover: 84, other: 149 },
  { month: 'Dec', total: 342, revenue: 87169.78, moveOut: 36, deepClean: 34, standard: 31, strTurnover: 84, other: 157 }
];

// Quarterly data from our analysis
const quarterlyData = [
  { 
    quarter: 'Q1', 
    total: 1040, 
    revenue: 230610.09,
    moveOut: 77, 
    deepClean: 92, 
    standard: 235, 
    strTurnover: 308,
    finalStep: 118,
    hourly: 106,
    other: 104
  },
  { 
    quarter: 'Q2', 
    total: 1092, 
    revenue: 247647.97,
    moveOut: 84, 
    deepClean: 66, 
    standard: 229, 
    strTurnover: 338,
    finalStep: 129,
    hourly: 114,
    other: 132
  },
  { 
    quarter: 'Q3', 
    total: 1024, 
    revenue: 239773.41,
    moveOut: 53, 
    deepClean: 83, 
    standard: 112, 
    strTurnover: 287,
    finalStep: 204,
    hourly: 109,
    other: 176
  },
  { 
    quarter: 'Q4', 
    total: 983, 
    revenue: 246247.09,
    moveOut: 78, 
    deepClean: 111, 
    standard: 94, 
    strTurnover: 253,
    finalStep: 88,
    hourly: 103,
    housekeeping: 143,
    other: 113
  }
];

// Service distribution data
const serviceDistribution = [
  { name: 'STR Turnover', value: 28.65 },
  { name: 'Standard Clean', value: 16.19 },
  { name: 'Final Step Move-In', value: 13.02 },
  { name: 'Hourly Service', value: 10.44 },
  { name: 'Deep Clean', value: 7.63 },
  { name: 'Housekeeping', value: 3.79 },
  { name: 'Move-Out/Move-In', value: 3.74 },
  { name: 'Basic Clean', value: 3.38 },
  { name: 'Other', value: 13.16 }
];

// Industry distribution data
const industryDistribution = [
  { name: 'Home Cleaning', value: 53.32 },
  { name: 'Vacation Rental/Airbnb', value: 30.01 },
  { name: 'Beazer Homes', value: 13.29 },
  { name: 'Commercial Cleaning', value: 2.05 },
  { name: 'Post-Construction', value: 0.92 },
  { name: 'Corporate Housing', value: 0.41 }
];

// Colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c'];

const CleaningServicesVisualization = () => {
  const [activeView, setActiveView] = useState('monthly');

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">2024 Cleaning Services Analysis</h1>
      
      {/* View selector */}
      <div className="flex justify-center mb-6 space-x-4">
        <button 
          className={`px-4 py-2 rounded-lg ${activeView === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('monthly')}
        >
          Monthly View
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeView === 'quarterly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('quarterly')}
        >
          Quarterly View
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeView === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('services')}
        >
          Service Breakdown
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeView === 'trends' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('trends')}
        >
          Service Trends
        </button>
      </div>
      
      {/* Monthly view */}
      {activeView === 'monthly' && (
        <div className="w-full space-y-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Monthly Service Volume</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total Services" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Peak month: March (403 services)</p>
              <p>Slowest month: October (310 services)</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Highest revenue: March ($91,873.57)</p>
              <p>Lowest revenue: February ($69,348.61)</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Monthly Service Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value * 100}%`} />
                <Tooltip formatter={(value, name) => [`${value} services`, name]} />
                <Legend />
                <Bar dataKey="strTurnover" stackId="a" fill={COLORS[0]} name="STR Turnover" />
                <Bar dataKey="standard" stackId="a" fill={COLORS[1]} name="Standard Clean" />
                <Bar dataKey="moveOut" stackId="a" fill={COLORS[2]} name="Move-Out/In" />
                <Bar dataKey="deepClean" stackId="a" fill={COLORS[3]} name="Deep Clean" />
                <Bar dataKey="other" stackId="a" fill={COLORS[4]} name="Other Services" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Most consistent service: STR Turnover maintained steady demand throughout the year</p>
              <p>Biggest shift: Standard Clean services declined significantly in the second half of the year</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Quarterly view */}
      {activeView === 'quarterly' && (
        <div className="w-full space-y-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quarterly Service Volume</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total Services" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Busiest quarter: Q2 (1,092 services)</p>
              <p>Slowest quarter: Q4 (983 services)</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quarterly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Highest revenue: Q2 ($247,647.97)</p>
              <p>Most revenue per service: Q4 ($250.51 per service)</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quarterly Service Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quarterlyData.map((entry, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">{entry.quarter} Service Mix</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'STR Turnover', value: entry.strTurnover },
                          { name: 'Standard Clean', value: entry.standard },
                          { name: 'Move-Out/In', value: entry.moveOut },
                          { name: 'Deep Clean', value: entry.deepClean },
                          { name: 'Final Step', value: entry.finalStep },
                          { name: 'Hourly', value: entry.hourly },
                          { name: 'Housekeeping', value: entry.housekeeping || 0 },
                          { name: 'Other', value: entry.other }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {COLORS.map((color, i) => (
                          <Cell key={`cell-${i}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Total services: {entry.total}</p>
                    <p>Revenue: ${entry.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Service Breakdown view */}
      {activeView === 'services' && (
        <div className="w-full space-y-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Service Type Distribution (2024)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Top 3 services: STR Turnover (28.65%), Standard Clean (16.19%), Final Step Move-In (13.02%)</p>
              <p>Total services performed in 2024: 4,139</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Industry Distribution (2024)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={industryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {industryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Primary industry: Home Cleaning (53.32%)</p>
              <p>Secondary industry: Vacation Rental/Airbnb (30.01%)</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Trends view */}
      {activeView === 'trends' && (
        <div className="w-full space-y-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Move-Out Cleaning Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="moveOut" stroke="#FFBB28" name="Move-Out/In Clean" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-medium mb-2">Key Observations:</h3>
              <ul className="list-disc pl-5">
                <li>Peak periods: January, March, June, and December</li>
                <li>Lowest demand in July-October</li>
                <li>Service experienced a mid-year transition to new Move-Out/Move-In Clean category</li>
                <li>Strong recovery in November-December</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Deep Cleaning Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="deepClean" stroke="#FF8042" name="Deep Clean" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-medium mb-2">Key Observations:</h3>
              <ul className="list-disc pl-5">
                <li>Peak month: November (40 services)</li>
                <li>Significant drop in September (only 11 services)</li>
                <li>Strong performance in February-March and July-August</li>
                <li>Relatively consistent demand throughout the year with seasonal fluctuations</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Standard Clean vs. STR Turnover</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="standard" stroke="#00C49F" name="Standard Clean" strokeWidth={2} />
                <Line type="monotone" dataKey="strTurnover" stroke="#0088FE" name="STR Turnover" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-medium mb-2">Key Observations:</h3>
              <ul className="list-disc pl-5">
                <li>Standard Clean showed strong decline after May</li>
                <li>STR Turnover maintained consistent demand throughout the year</li>
                <li>Standard Clean and STR Turnover were closely aligned in Q1</li>
                <li>STR Turnover became significantly more dominant in the second half of the year</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Service Comparison (All Types)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="strTurnover" stroke="#0088FE" name="STR Turnover" strokeWidth={2} />
                <Line type="monotone" dataKey="standard" stroke="#00C49F" name="Standard Clean" strokeWidth={2} />
                <Line type="monotone" dataKey="moveOut" stroke="#FFBB28" name="Move-Out/In" strokeWidth={2} />
                <Line type="monotone" dataKey="deepClean" stroke="#FF8042" name="Deep Clean" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-medium mb-2">Annual Service Trends Summary:</h3>
              <ul className="list-disc pl-5">
                <li>STR Turnover: Most consistent service with steady demand</li>
                <li>Standard Clean: Strong in first half of year, significant decline in second half</li>
                <li>Move-Out cleaning: Peaks in winter months and early summer</li>
                <li>Deep Clean: Consistent with notable dip in September and peak in November</li>
                <li>Service mix evolved significantly throughout the year</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleaningServicesVisualization;