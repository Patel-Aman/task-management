'use client';

import { Button } from '@/components/ui/button';
import { fetchTasks } from '@/lib/features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Task } from '@/types/task';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/hooks/useDebounce';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ITEMS_PER_PAGE = 10;
const STATUS_OPTIONS = ['All', 'pending', 'in-progress', 'completed'];

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pageNumbers = [];

  if (totalPages <= 5) {
    // If total pages is 5 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 3) {
    // If current page is among first 3 pages
    // Show first 3, ellipsis, and last page
    pageNumbers.push(1, 2, 3, 'ellipsis', totalPages);
  } else if (currentPage >= totalPages - 2) {
    // If current page is among last 3 pages
    // Show first page, ellipsis, and last 3 pages
    pageNumbers.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages);
  } else {
    // If current page is in the middle
    // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
    pageNumbers.push(
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages
    );
  }

  return pageNumbers;
};

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    items: tasks,
    loading,
    error,
    total,
  } = useAppSelector((state) => state.tasks);

  // Initialize page from URL or default to 1
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const currentPage = parseInt(searchParams.get('page') || '1');
  const [searchQuery, setSearchQuery] = useState('');
  const [goToPage, setGoToPage] = useState('');
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get('status') || ''
  );

  // Update URL with page, status and search parameters
  const updateURL = (page: number, search: string, status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    if (status && status !== 'All') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Handle page change
  const handlePageChange = (page: number) => {
    updateURL(page, debouncedSearch, statusFilter);
  };

  // Handle search change
  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    updateURL(1, debouncedSearch, status);
  };

  // Handle direct page navigation
  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPage);
    if (pageNumber && pageNumber > 0 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
      setGoToPage('');
    }
  };

  useEffect(() => {
    dispatch(
      fetchTasks({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        status: statusFilter,
      })
    );
  }, [dispatch, currentPage, debouncedSearch, statusFilter]);

  // Update URL when debounced search changes
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (debouncedSearch !== currentSearch) {
      updateURL(1, debouncedSearch, statusFilter); // Only reset to page 1 for new searches
    }
  }, [debouncedSearch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button
          onClick={() => router.push('/tasks/new')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        {/* Search Input with Icon */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Filter Dropdown */}
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-48 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <Filter className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-lg">
            {STATUS_OPTIONS.map((status) => (
              <SelectItem
                key={status}
                value={status}
                className="hover:bg-gray-100"
              >
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {getPageNumbers(currentPage, totalPages).map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => handlePageChange(page as number)}
                  disabled={loading}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGoToPage()}
              placeholder="Go to page"
              className="w-20 text-center"
              min={1}
              max={totalPages}
            />
            <Button
              variant="outline"
              onClick={handleGoToPage}
              disabled={!goToPage || loading}
            >
              Go
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
