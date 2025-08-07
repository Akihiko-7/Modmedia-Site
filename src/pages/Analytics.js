import React, { useEffect, useState } from 'react';
import { fetchAnalyticsData } from '../analytics';
import { 
  Line, 
  Bar, 
  Pie, 
  Doughnut 
} from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import styled, { keyframes } from 'styled-components';
import { FiRefreshCw, FiClock, FiPieChart, FiExternalLink } from 'react-icons/fi';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(0, 212, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
`;

// Styled Components
const AnalyticsPortal = styled.div`
  background: linear-gradient(135deg, #0a0a1a 0%, #121228 100%);
  min-height: 100vh;
  padding: 20px;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(90deg, #00d4ff, #ff00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
`;

const TimeRangeSelector = styled.div`
  display: flex;
  gap: 10px;
  background: rgba(34, 39, 51, 0.8);
  padding: 8px;
  border-radius: 30px;
  border: 1px solid rgba(0, 212, 255, 0.3);
`;

const TimeRangeButton = styled.button`
  background: ${props => props.active ? 'rgba(0, 212, 255, 0.2)' : 'transparent'};
  color: ${props => props.active ? '#00d4ff' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    color: #00d4ff;
  }
`;

const RefreshButton = styled.button`
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  grid-column: span 3;
  background: rgba(34, 39, 51, 0.8);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.1);
    border-color: rgba(0, 212, 255, 0.4);
  }

  @media (max-width: 1200px) {
    grid-column: span 6;
  }

  @media (max-width: 768px) {
    grid-column: span 12;
  }
`;

const StatTitle = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #00d4ff;
  margin-bottom: 5px;
`;

const StatChange = styled.div`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#00ff88' : '#ff5555'};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ChartCard = styled.div`
  grid-column: span ${props => props.span || 6};
  background: rgba(34, 39, 51, 0.8);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.delay || '0s'};

  @media (max-width: 1200px) {
    grid-column: span 12;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 26, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(5px);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 212, 255, 0.2);
  border-radius: 50%;
  border-top-color: #00d4ff;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAnalyticsData(timeRange);
      setAnalyticsData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [timeRange]);

  // Calculate summary stats
  const totalVisits = analyticsData?.pageViews?.reduce((sum, item) => sum + item.visit_count, 0) || 0;
  const uniquePages = [...new Set(analyticsData?.pageViews?.map(item => item.page_path))].length || 0;
  const avgDailyVisits = analyticsData?.pageViews?.length 
    ? totalVisits / analyticsData.pageViews.length 
    : 0;
  const peakHour = analyticsData?.hourly?.reduce((peak, item) => 
    item.visit_count > peak.visit_count ? item : peak, {visit_count: 0, hour: 0}
  ) || { hour: 0, visit_count: 0 };

  // Chart data generators
  const getPageViewsChartData = () => {
    const dates = [...new Set(analyticsData?.pageViews?.map(item => item.visit_date))].sort();
    const paths = [...new Set(analyticsData?.pageViews?.map(item => item.page_path))];
    
    const colors = [
      '#00d4ff', '#ff00ff', '#00ff88', '#ffaa00', '#aa00ff',
      '#00aaff', '#ff5500', '#55ff00', '#ff00aa', '#00ffaa'
    ];
    
    return {
      labels: dates,
      datasets: paths.map((path, i) => ({
        label: path,
        data: dates.map(date => {
          const item = analyticsData.pageViews.find(
            d => d.visit_date === date && d.page_path === path
          );
          return item ? item.visit_count : 0;
        }),
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length] + '20',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6
      }))
    };
  };

  const getReferrersChartData = () => {
    return {
      labels: analyticsData?.referrers?.map(item => item.referrer) || [],
      datasets: [{
        data: analyticsData?.referrers?.map(item => item.visit_count) || [],
        backgroundColor: [
          '#00d4ff', '#ff00ff', '#00ff88', '#ffaa00', '#aa00ff'
        ],
        borderColor: 'rgba(34, 39, 51, 0.8)',
        borderWidth: 1
      }]
    };
  };

  const getDevicesChartData = () => {
    return {
      labels: analyticsData?.devices?.map(item => item.device_type) || [],
      datasets: [{
        data: analyticsData?.devices?.map(item => item.visit_count) || [],
        backgroundColor: [
          '#00d4ff', '#ff00ff', '#00ff88'
        ],
        borderColor: 'rgba(34, 39, 51, 0.8)',
        borderWidth: 1
      }]
    };
  };

  const getHourlyChartData = () => {
    return {
      labels: Array.from({length: 24}, (_, i) => `${i}:00`),
      datasets: [{
        label: 'Visits',
        data: Array.from({length: 24}, (_, i) => {
          const hourData = analyticsData?.hourly?.find(h => h.hour === i);
          return hourData ? hourData.visit_count : 0;
        }),
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
        borderColor: '#00d4ff',
        borderWidth: 2,
        borderRadius: 4
      }]
    };
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(34, 39, 51, 0.9)',
        titleColor: '#00d4ff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const barChartOptions = {
    ...lineChartOptions,
    plugins: {
      ...lineChartOptions.plugins,
      legend: {
        display: false
      }
    }
  };

  const pieChartOptions = {
    ...lineChartOptions,
    plugins: {
      ...lineChartOptions.plugins,
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12
          },
          padding: 20
        }
      }
    }
  };

  return (
    <AnalyticsPortal>
      {loading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}

      <DashboardHeader>
        <h1>Analytics Dashboard</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <TimeRangeSelector>
            <TimeRangeButton 
              active={timeRange === '24h'} 
              onClick={() => setTimeRange('24h')}
            >
              <FiClock size={14} /> 24h
            </TimeRangeButton>
            <TimeRangeButton 
              active={timeRange === '7d'} 
              onClick={() => setTimeRange('7d')}
            >
              <FiClock size={14} /> 7d
            </TimeRangeButton>
            <TimeRangeButton 
              active={timeRange === '30d'} 
              onClick={() => setTimeRange('30d')}
            >
              <FiClock size={14} /> 30d
            </TimeRangeButton>
          </TimeRangeSelector>
          
          <RefreshButton onClick={loadData}>
            <FiRefreshCw size={16} />
            Refresh
          </RefreshButton>
        </div>
      </DashboardHeader>

      {lastUpdated && (
        <div style={{ 
          color: 'rgba(255, 255, 255, 0.5)', 
          fontSize: '0.9rem',
          marginBottom: '20px'
        }}>
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}

      <DashboardGrid>
        <StatCard delay="0s">
          <StatTitle><FiPieChart /> Total Visits</StatTitle>
          <StatValue>{totalVisits.toLocaleString()}</StatValue>
          <StatChange positive={totalVisits > 0}>
            {totalVisits > 0 ? '↑' : '↓'} 
            {Math.abs(totalVisits)} from previous period
          </StatChange>
        </StatCard>

        <StatCard delay="0.1s">
          <StatTitle><FiPieChart /> Unique Pages</StatTitle>
          <StatValue>{uniquePages}</StatValue>
          <StatChange positive={uniquePages > 0}>
            {uniquePages > 0 ? '↑' : '↓'} 
            {Math.abs(uniquePages)} from previous period
          </StatChange>
        </StatCard>

        <StatCard delay="0.2s">
          <StatTitle><FiPieChart /> Avg. Daily Visits</StatTitle>
          <StatValue>{avgDailyVisits.toFixed(1)}</StatValue>
          <StatChange positive={avgDailyVisits > 0}>
            {avgDailyVisits > 0 ? '↑' : '↓'} 
            {Math.abs(avgDailyVisits)} from previous period
          </StatChange>
        </StatCard>

        <StatCard delay="0.3s">
          <StatTitle><FiPieChart /> Peak Hour</StatTitle>
          <StatValue>{peakHour.hour}:00</StatValue>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            {peakHour.visit_count} visits
          </div>
        </StatCard>

        <ChartCard span={8} delay="0.4s">
          <ChartHeader>
            <ChartTitle><FiExternalLink /> Page Views Over Time</ChartTitle>
          </ChartHeader>
          <Line 
            data={getPageViewsChartData()} 
            options={lineChartOptions} 
            height={300}
          />
        </ChartCard>

        <ChartCard span={4} delay="0.5s">
          <ChartHeader>
            <ChartTitle><FiExternalLink /> Traffic Sources</ChartTitle>
          </ChartHeader>
          <Doughnut 
            data={getReferrersChartData()} 
            options={pieChartOptions} 
            height={300}
          />
        </ChartCard>

        <ChartCard span={6} delay="0.6s">
          <ChartHeader>
            <ChartTitle><FiExternalLink /> Device Distribution</ChartTitle>
          </ChartHeader>
          <Pie 
            data={getDevicesChartData()} 
            options={pieChartOptions} 
            height={300}
          />
        </ChartCard>

        <ChartCard span={6} delay="0.7s">
          <ChartHeader>
            <ChartTitle><FiExternalLink /> Hourly Traffic</ChartTitle>
          </ChartHeader>
          <Bar 
            data={getHourlyChartData()} 
            options={barChartOptions} 
            height={300}
          />
        </ChartCard>
      </DashboardGrid>
    </AnalyticsPortal>
  );
};

export default Analytics;