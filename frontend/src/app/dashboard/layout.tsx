import React from 'react';
import DashboardClientLayout from './DashboardClientLayout';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
