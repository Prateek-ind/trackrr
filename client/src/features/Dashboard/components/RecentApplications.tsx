import { Button } from '@/components/ui/button'
import React from 'react'

const RecentApplications = () => {
  return (
    <section className='w-full col-span-2 border p-4 rounded-md shadow-md'>

        <div>
            <div className='w-full border-b flex items-center justify-between p-4'>
                <div className=''>
                    <h2 className='text-2xl font-bold text-text-primary'>Recent Applications</h2>
                    <p className='text-sm font-medium text-text-secondary'>Keep track of your latest submissions.</p>
                </div>
                <Button variant={"outline"}>View All</Button>
            </div>
        </div>
    </section>
  )
}

export default RecentApplications