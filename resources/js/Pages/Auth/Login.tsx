import React, { FormEvent } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Lock } from 'lucide-react'

export default function Login({ }: { }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Log in" />
      <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-primary dark:border-r lg:flex">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400 via-orange-400 to-orange-500" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
            </div>
            <Card className="bg-card">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Enter your email and password to sign in to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      placeholder="Username or email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="pl-10"
                      disabled={processing}
                    />
                    {errors.email && (
                      <p className="px-2 text-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter Your Password"
                      type="password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      className="pl-10"
                      disabled={processing}
                    />
                    {errors.password && (
                      <p className="px-2 text-sm text-destructive">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" 
                      checked={data.remember}
                      onCheckedChange={(checked) => setData('remember', !!checked)} />
                    <label
                      htmlFor="remember"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep me logged in
                    </label>
                  </div>
                  {errors.remember && (
                    <p className="px-2 text-sm text-destructive">
                      {errors.remember}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={submit} disabled={processing}>
                  {processing ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
