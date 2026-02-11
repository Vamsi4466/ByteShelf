// app/(admin)/dashboard/page.tsx

import DashboardClient from '@/components/DashboardClient';
import {
  getFilesByFileType,
  getFilesCreatedPerDay,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from '@/lib/actions/dashboard';
import { getAllFiles, getTotalSpaceUsed, getTotalSpaceUsedForAllUsers } from '@/lib/actions/file.actions';
import { getAllUsers, getCurrentUser } from '@/lib/actions/user.actions';
import { getSizeSummary } from '@/lib/utils';


const Page = async () => {
  const [
    currentUser,
    dashboardStats,
    files,
    totalSpace,
    userGrowth,
    filesGrowth,
    filesByFileType,
    allUsers,
  ] = await Promise.all([
    getCurrentUser(),
    getUsersAndTripsStats(),
    getAllFiles(100, 0),
    getTotalSpaceUsedForAllUsers(),
    getUserGrowthPerDay(),
    getFilesCreatedPerDay(),
    getFilesByFileType(),
    getAllUsers(10, 0),
  ]);
    
    const sizeSummary = getSizeSummary(totalSpace);
  return (
    <DashboardClient
      currentUser={currentUser}
      dashboardStats={dashboardStats}
      userGrowth={userGrowth}
      filesGrowth={filesGrowth}
      filesByFileType={filesByFileType}
      sizeSummary={sizeSummary}
    />
  );
};

export default Page;
