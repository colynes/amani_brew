import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <Card className="mb-8 border-0 shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-primary-text">{title}</CardTitle>
        <CardDescription className="text-lg text-secondary-text">{subtitle}</CardDescription>
        {action && (
          <div className="mt-4">
            {action}
          </div>
        )}
      </CardHeader>
    </Card>
  )
}

