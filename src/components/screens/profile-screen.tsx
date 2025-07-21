"use client"

import { useState } from "react"
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  Edit3,
  Mail,
  Award,
  Target,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Switch } from "../ui/switch"

export function ProfileScreen() {
  const [notifications, setNotifications] = useState({
    analysis: true,
    reminders: false,
    updates: true,
  })

  const userStats = {
    totalScans: 15,
    streak: 7,
    accuracy: 89,
    joinDate: "2023-12-01",
  }

  const menuItems = [
    {
      icon: Settings,
      title: "Account Settings",
      subtitle: "Manage your account preferences",
      action: () => console.log("Settings"),
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Configure your notification preferences",
      action: () => console.log("Notifications"),
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      subtitle: "Manage your privacy settings",
      action: () => console.log("Privacy"),
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "Get help and contact support",
      action: () => console.log("Help"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white text-blue-600 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <Button variant="ghost" size="sm" className="p-1 text-white hover:bg-white/20">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-blue-100 text-sm">Premium Member</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-blue-100">john@example.com</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{userStats.totalScans}</div>
              <div className="text-xs text-gray-600">Total Scans</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{userStats.streak}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">First Scan</h4>
                <p className="text-xs text-gray-600">Completed your first skin analysis</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-700">Earned</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">Consistent User</h4>
                <p className="text-xs text-gray-600">Used the app for 7 consecutive days</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Earned</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg opacity-60">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-500">Health Champion</h4>
                <p className="text-xs text-gray-400">Complete 30 skin analyses</p>
              </div>
              <Badge variant="outline" className="text-gray-400">
                15/30
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <Bell className="w-5 h-5 text-purple-600" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm text-gray-900">Analysis Results</h4>
                <p className="text-xs text-gray-600">Get notified when analysis is complete</p>
              </div>
              <Switch
                checked={notifications.analysis}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, analysis: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm text-gray-900">Health Reminders</h4>
                <p className="text-xs text-gray-600">Reminders for regular skin checks</p>
              </div>
              <Switch
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, reminders: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm text-gray-900">App Updates</h4>
                <p className="text-xs text-gray-600">New features and improvements</p>
              </div>
              <Switch
                checked={notifications.updates}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, updates: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-sm text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Member since:</span>
              <span className="font-medium">{new Date(userStats.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Account type:</span>
              <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white">Premium</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Data usage:</span>
              <span className="font-medium">2.3 MB</span>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Button
          variant="outline"
          className="w-full flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Button>

        {/* App Version */}
        <div className="text-center text-xs text-gray-500 py-4">Skin-AI v2.1.0 • Made with ❤️ for your health</div>
      </div>
    </div>
  )
}
