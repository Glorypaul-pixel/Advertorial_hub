import React from 'react';
import MyPost from '@/app/components/MyPosts';
import DashboardHeader from "@/app/components/DashboardHeader";


const Page = () => {
  return (
    <div className='page-container'>
      <DashboardHeader />
      <MyPost />
    </div>
  );
}

export default Page;
