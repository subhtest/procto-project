'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CreateExamDialog from '@/components/CreateExamDialog';

// Mock data - Replace with actual data from your backend
const studentData = {
  upcomingExams: [
    { id: 1, title: 'JavaScript Basics', date: '2024-03-25', type: 'Quiz' },
    { id: 2, title: 'Python Programming', date: '2024-03-28', type: 'Coding Test' },
  ],
  previousExams: [
    { id: 3, title: 'HTML & CSS', date: '2024-03-15', score: 85, type: 'Quiz' },
    { id: 4, title: 'Java Programming', date: '2024-03-10', score: 92, type: 'Coding Test' },
  ],
  recentResults: [
    { id: 3, title: 'HTML & CSS', score: 85, total: 100, date: '2024-03-15' },
    { id: 4, title: 'Java Programming', score: 92, total: 100, date: '2024-03-10' },
  ],
};

const teacherData = {
  recentExams: [
    { id: 1, title: 'JavaScript Basics', date: '2024-03-25', type: 'Quiz', students: 25 },
    { id: 2, title: 'Python Programming', date: '2024-03-28', type: 'Coding Test', students: 30 },
  ],
  examCategories: [
    { type: 'Quiz', count: 5 },
    { type: 'Coding Test', count: 3 },
    { type: 'Assignment', count: 2 },
  ],
  studentResults: [
    { examId: 1, title: 'JavaScript Basics', averageScore: 85, totalStudents: 25 },
    { examId: 2, title: 'Python Programming', averageScore: 78, totalStudents: 30 },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/user/role');
        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchUserRole();
    }
  }, [status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  const renderDashboardContent = () => {
    switch (userRole) {
      case Role.ADMIN:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Manage users, roles, and permissions</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Settings</h3>
              <p className="text-gray-600 dark:text-gray-300">Configure system-wide settings</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">View system-wide analytics</p>
            </div>
          </div>
        );
      case Role.TEACHER:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => setIsCreateExamOpen(true)}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create Exam</h3>
              <p className="text-gray-600 dark:text-gray-300">Create and manage exams</p>
            </button>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Student Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">Monitor student performance</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reports</h3>
              <p className="text-gray-600 dark:text-gray-300">Generate and view reports</p>
            </div>
          </div>
        );
      case Role.STUDENT:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">View and take available exams</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">Track your exam history and scores</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">Access practice materials</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>Loading dashboard content...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {session?.user?.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Role: {userRole?.toLowerCase() || 'Loading...'}
          </p>
        </div>
        {renderDashboardContent()}
        <CreateExamDialog
          isOpen={isCreateExamOpen}
          onClose={() => setIsCreateExamOpen(false)}
        />
      </div>
    </div>
  );
} 