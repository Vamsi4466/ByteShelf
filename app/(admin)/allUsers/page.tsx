'use client';

import { useEffect, useMemo, useState } from 'react';
import { getAllUsers } from '@/lib/actions/user.actions';
import { formatBytes, formatDate } from '@/lib/utils';
import SearchUsers from '@/components/SearchUsers';
import { useSearchParams } from 'next/navigation';

/* =======================
   Types
======================= */

type User = {
  $id: string;
  email: string;
  fullName: string;
  filesCount: number;
  storageUsed: number;
  joinedAt: string;
  status: 'admin' | 'user';
};

type SortKey =
  | 'email'
  | 'fullName'
  | 'filesCount'
  | 'storageUsed'
  | 'joinedAt'
  | 'status';

type SortOrder = 'asc' | 'desc';

/* =======================
   Page
======================= */

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  const [sortKey, setSortKey] = useState<SortKey>('joinedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  /* =======================
     Fetch users
  ======================= */

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * pageSize;
        const { users, total } = await getAllUsers(
          pageSize,
          offset,
          searchQuery
        );

        setUsers(users as any);
        setTotal(total);
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  /* =======================
     Sorting (client-side)
  ======================= */

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [users, sortKey, sortOrder]);

  const totalPages = Math.ceil(total / pageSize);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  /* =======================
     Render
  ======================= */

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Users</h1>
          <p className="text-sm text-gray-500">
            Manage users and their storage usage
          </p>
        </div>

        <SearchUsers />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <TableHeader label="Email" onClick={() => handleSort('email')} />
              <TableHeader label="Name" onClick={() => handleSort('fullName')} />
              <TableHeader label="Files" align="center" onClick={() => handleSort('filesCount')} />
              <TableHeader label="Storage" align="right" onClick={() => handleSort('storageUsed')} />
              <TableHeader label="Joined" onClick={() => handleSort('joinedAt')} />
              <TableHeader label="Status" align="center" onClick={() => handleSort('status')} />
            </tr>
          </thead>

          <tbody className="divide-y">
            {sortedUsers.map((user) => (
              <tr key={user.$id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 font-medium">{user.fullName}</td>
                <td className="px-4 py-3 text-center">{user.filesCount}</td>
                <td className="px-4 py-3 text-right">
                  {formatBytes(user.storageUsed)}
                </td>
                <td className="px-4 py-3">
                  {formatDate(user.joinedAt)}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))}

            {sortedUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4">
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          className="border rounded-lg px-3 py-1 text-sm"
        >
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================
   Components
======================= */

function TableHeader({
  label,
  onClick,
  align = 'left',
}: {
  label: string;
  onClick?: () => void;
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <th
      onClick={onClick}
      className={`px-4 py-3 font-medium cursor-pointer select-none text-${align}`}
    >
      {label}
    </th>
  );
}

function StatusBadge({ status }: { status: User['status'] }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        status === 'admin'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-200 text-gray-700'
      }`}
    >
      {status}
    </span>
  );
}
