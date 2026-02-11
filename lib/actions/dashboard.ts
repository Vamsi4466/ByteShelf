import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseFileData } from "../utils";

interface Document {
    [key: string]: any;
}
type FilterByDate = (
    items: Document[],
    key: string,
    start: string,
    end?: string
) => number;

declare interface DashboardStats {
  totalUsers: number;
  usersJoined: {
    currentMonth: number;
    lastMonth: number;
  };
  userRole: {
    total: number;
    currentMonth: number;
    lastMonth: number;
  };
  totalFiles: number;
  filesCreated: {
    currentMonth: number;
    lastMonth: number;
  };
}

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
    const d = new Date();
    const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
    const startPrev = new Date(d.getFullYear(), d.getMonth() -1, 1).toISOString();
    const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

    const { storage, databases } = await createAdminClient();

    const [users, files] = await Promise.all([
        databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId
        ),
        databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId
        ),
    ]);

    const filterByDate: FilterByDate = (items, key, start, end) => items.filter((item) => (
        item[key] >= start && (!end || item[key] <= end)
    )).length;

    const filterUsersByRole = (role: string) => {
        return users.documents.filter((u: Document) => u.status === role);
    }

    return {
        totalUsers: users.total,
        usersJoined: {
            currentMonth: filterByDate(
                users.documents,
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                users.documents,
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        userRole: {
            total: filterUsersByRole('user').length,
            currentMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        totalFiles: files.total,
        filesCreated: {
            currentMonth: filterByDate(
                files.documents,
                'createdAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        },
    }
}

export const getUserGrowthPerDay = async () => {

    const { storage, databases } = await createAdminClient();

    const users = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId
    );

    const userGrowth = users.documents.reduce(
        (acc: { [key: string]: number }, user: Document) => {
            const date = new Date(user.joinedAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(userGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getFilesCreatedPerDay = async () => {

    const { storage, databases } = await createAdminClient();

    const files = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId
    );

    const filesGrowth = files.documents.reduce(
        (acc: { [key: string]: number }, file: Document) => {
            const date = new Date(file.$createdAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(filesGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getFilesByFileType = async () => {

    const { storage, databases } = await createAdminClient();

    const files = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId
    );

    const fileTypeCounts = files.documents.reduce(
        (acc: { [key: string]: number }, file: any) => {
            
            if(file.type) {
                acc[file.type] = (acc[file.type] || 0) + 1;
            }
            return acc;
        },
        {}
    );
    return Object.entries(fileTypeCounts).map(([fileType, count]) => ({
        count: Number(count),
        fileType,
    }));
}