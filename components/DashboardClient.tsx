'use client';

import HeaderText from '@/components/HeaderText';
import StatsCard from '@/components/StatsCard';

import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
  Inject,
} from '@syncfusion/ej2-react-charts';

import { fileXAxis, fileyAxis, getSizeSummary, typeXAxis, typeyAxis, userXAxis, useryAxis } from '@/lib/utils';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';

interface Props {
  currentUser: any;
  dashboardStats: any;
  userGrowth: any[];
  filesGrowth: any[];
  filesByFileType: any[];
  sizeSummary: any[];
}

const DashboardClient = ({
  currentUser,
  dashboardStats,
  userGrowth,
  filesGrowth,
  filesByFileType,
  sizeSummary,
}: any) => {
  return (
    <main className="dashboard w-full max-w-7xl mx-auto px-4 lg:px-8">
      <HeaderText
        title={`Welcome ${currentUser?.fullName ?? 'Guest'} 👋`}
        description="Monitor storage usage, user activity, file trends, and system insights in real time"
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          headerTitle="Total Users"
          total={dashboardStats.totalUsers}
          currentMonthCount={dashboardStats.usersJoined.currentMonth}
          lastMonthCount={dashboardStats.usersJoined.lastMonth}
        />
        <StatsCard
          headerTitle="Total Files"
          total={dashboardStats.totalFiles}
          currentMonthCount={dashboardStats.filesCreated.currentMonth}
          lastMonthCount={dashboardStats.filesCreated.lastMonth}
        />
        {/* <StatsCard
          headerTitle="Active Users"
          total={dashboardStats.userRole.total}
          currentMonthCount={dashboardStats.userRole.currentMonth}
          lastMonthCount={dashboardStats.userRole.lastMonth}
        /> */}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        <ChartComponent
          id="chart-1"
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          title="User Growth"
          tooltip={{ enable: true }}
        >
          <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="Column"
              columnWidth={0.3}
            />
          </SeriesCollectionDirective>
        </ChartComponent>

        <ChartComponent
          id="chart-2"
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          title="File Growth"
          tooltip={{ enable: true }}
        >
          <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={filesGrowth}
              xName="day"
              yName="count"
              type="Column"
              columnWidth={0.3}
            />
          </SeriesCollectionDirective>
        </ChartComponent>

        <ChartComponent
                    id="chart-3"
                    primaryXAxis={fileXAxis}
                    primaryYAxis={fileyAxis}
                    title="File Type"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={filesByFileType}
                            xName="fileType"
                            yName="count"
                            type="Column"
                            columnWidth={0.3}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>

                <ChartComponent
                    id="chart-4"
                    primaryXAxis={typeXAxis}
                    primaryYAxis={typeyAxis}
                    title="File Size"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={sizeSummary}
                            xName="type"
                            yName="count"
                            type="Column"
                            columnWidth={0.3}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
      </section>
    </main>
  );
};

export default DashboardClient;
