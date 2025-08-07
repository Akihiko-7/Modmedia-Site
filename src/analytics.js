import { supabase } from './supabaseClient';

// Enhanced tracking with user metadata
export const trackPageView = async (pagePath) => {
  const today = new Date().toISOString().split('T')[0];
  const userAgent = navigator.userAgent;
  const screenWidth = window.screen.width;
  const referrer = document.referrer || 'direct';

  try {
    // Check for existing record
    const { data, error } = await supabase
      .from('analytics')
      .select('id, visit_count')
      .eq('page_path', pagePath)
      .eq('visit_date', today)
      .single();

    if (error && error.code === 'PGRST116') {
      // No record exists - create new
      await supabase.from('analytics').insert([{
        page_path: pagePath,
        visit_date: today,
        visit_count: 1,
        user_agent: userAgent,
        screen_width: screenWidth,
        referrer: referrer
      }]);
    } else if (data) {
      // Record exists - increment
      await supabase
        .from('analytics')
        .update({ visit_count: data.visit_count + 1 })
        .eq('id', data.id);
    }

    // Update hourly breakdown
    const hour = new Date().getHours();
    await supabase.rpc('increment_hourly_visits', {
      page_path: pagePath,
      visit_date: today,
      visit_hour: hour
    });

  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Enhanced data fetching with multiple metrics
export const fetchAnalyticsData = async (timeRange = '7d') => {
  try {
    // Calculate date range
    const now = new Date();
    let fromDate = new Date();
    
    switch(timeRange) {
      case '24h':
        fromDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        fromDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        fromDate.setDate(now.getDate() - 30);
        break;
      default:
        fromDate.setDate(now.getDate() - 7);
    }

    // Fetch multiple metrics in parallel
    const [
      { data: pageViews, error: viewsError },
      { data: referrers, error: referrersError },
      { data: devices, error: devicesError },
      { data: hourly, error: hourlyError }
    ] = await Promise.all([
      supabase
        .from('analytics')
        .select('page_path, visit_date, visit_count')
        .gte('visit_date', fromDate.toISOString().split('T')[0])
        .order('visit_date', { ascending: true }),
      
      supabase
        .from('analytics')
        .select('referrer, visit_count')
        .gte('visit_date', fromDate.toISOString().split('T')[0])
        .order('visit_count', { ascending: false })
        .limit(5),
      
      supabase.rpc('get_device_stats', {
        from_date: fromDate.toISOString().split('T')[0]
      }),
      
      supabase.rpc('get_hourly_visits', {
        from_date: fromDate.toISOString().split('T')[0]
      })
    ]);

    if (viewsError || referrersError || devicesError || hourlyError) {
      throw new Error('Failed to fetch analytics data');
    }

    return {
      pageViews,
      referrers,
      devices,
      hourly
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return {
      pageViews: [],
      referrers: [],
      devices: [],
      hourly: []
    };
  }
};

// Create these PostgreSQL functions in your Supabase database:

/*
-- Hourly visits increment function
create or replace function increment_hourly_visits(page_path text, visit_date date, visit_hour integer)
returns void as $$
  insert into hourly_visits (page_path, visit_date, hour, visit_count)
  values (page_path, visit_date, visit_hour, 1)
  on conflict (page_path, visit_date, hour)
  do update set visit_count = hourly_visits.visit_count + 1;
$$ language sql;

-- Device stats function
create or replace function get_device_stats(from_date date)
returns table (
  device_type text,
  visit_count bigint
) as $$
  select 
    case 
      when user_agent like '%Mobile%' then 'Mobile'
      when user_agent like '%Tablet%' then 'Tablet'
      else 'Desktop'
    end as device_type,
    sum(visit_count) as visit_count
  from analytics
  where visit_date >= from_date
  group by device_type
  order by visit_count desc;
$$ language sql;

-- Hourly visits function
create or replace function get_hourly_visits(from_date date)
returns table (
  hour integer,
  visit_count bigint
) as $$
  select 
    hour,
    sum(visit_count) as visit_count
  from hourly_visits
  where visit_date >= from_date
  group by hour
  order by hour;
$$ language sql;
*/