import { useState } from "react";
import { useAuthUser } from "../../auth/api/queries";
import {
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useExportDataMutation,
  useDeleteAccountMutation,
  useUploadAvatarMutation,
  useUpdateNotificationsMutation,
  useUpdatePrivacyMutation,
} from "../api/mutations";
import {
  User,
  Camera,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Check,
  X,
  Bell,
  Lock,
  Globe,
  Eye,
  FileText,
  Download,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Switch } from "../../../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { toast } from "sonner";

type EditField =
  | "first_name"
  | "last_name"
  | "phone"
  | "gender"
  | "date_of_birth"
  | null;

export const ProfilePage = () => {
  const { data: user } = useAuthUser();
  const updateProfile = useUpdateProfileMutation();
  const changePassword = useChangePasswordMutation();
  const exportData = useExportDataMutation();
  const deleteAccount = useDeleteAccountMutation();
  const uploadAvatar = useUploadAvatarMutation();
  const updateNotifications = useUpdateNotificationsMutation();
  const updatePrivacy = useUpdatePrivacyMutation();

  const [editingField, setEditingField] = useState<EditField>(null);
  const [editValues, setEditValues] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    date_of_birth: user?.date_of_birth || "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    appointmentReminders: true,
    resultsReady: true,
    promotions: false,
  });

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    shareData: false,
    showProfile: true,
  });

  const handleEdit = (field: EditField) => {
    if (field) {
      setEditingField(field);
      setEditValues({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
        date_of_birth: user?.date_of_birth || "",
      });
    }
  };

  const handleSave = async (field: EditField) => {
    if (!field) return;

    try {
      await updateProfile.mutateAsync({
        [field]: editValues[field],
      });
      setEditingField(null);
    } catch (error) {
      // Error handled by mutation
      console.error("Update error:", error);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handlePhotoUpload = () => {
    // Create file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 5MB");
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload an image file");
          return;
        }

        try {
          await uploadAvatar.mutateAsync(file);
        } catch (error) {
          // Error handled by mutation
          console.error("Upload error:", error);
        }
      }
    };
    input.click();
  };

  const handlePasswordChange = async () => {
    try {
      await changePassword.mutateAsync(passwordData);
      setShowPasswordDialog(false);
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      // Error handled by mutation
      console.error("Password change error:", error);
    }
  };

  const handleExportData = async () => {
    try {
      await exportData.mutateAsync();
    } catch (error) {
      // Error handled by mutation
      console.error("Export error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // In a real app, you'd want to confirm with password
      await deleteAccount.mutateAsync({ password: "" });
      setShowDeleteDialog(false);
    } catch (error) {
      // Error handled by mutation
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-(--color-gray-darker) mb-2">
          Profile & Settings
        </h1>
        <p className="text-(--color-slate)">
          Manage your account information and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <User className="w-4 h-4 mr-1.5 md:mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <Bell className="w-4 h-4 mr-1.5 md:mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <Lock className="w-4 h-4 mr-1.5 md:mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <FileText className="w-4 h-4 mr-1.5 md:mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          {/* Profile Photo Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#E4B68A]/10 flex items-center justify-center">
                  {user?.first_name ? (
                    <span className="text-3xl font-bold text-[#E4B68A]">
                      {user.first_name[0]}
                      {user.last_name?.[0] || ""}
                    </span>
                  ) : (
                    <User className="w-10 h-10 text-[#E4B68A]" />
                  )}
                </div>
                <button
                  onClick={handlePhotoUpload}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#E4B68A] hover:bg-[#D4A67A] flex items-center justify-center text-black transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-(--color-gray-darker) mb-1">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-(--color-slate) mb-2">{user?.email}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E4B68A]/10 text-[#E4B68A] capitalize">
                  {user?.primary_role || "Patient"}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-(--color-gray-darker) mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              {/* First Name */}
              <ProfileField
                icon={<User className="w-5 h-5 text-[#E4B68A]" />}
                label="First Name"
                value={user?.first_name || ""}
                isEditing={editingField === "first_name"}
                onEdit={() => handleEdit("first_name")}
                onSave={() => handleSave("first_name")}
                onCancel={handleCancel}
                editValue={editValues.first_name}
                onChange={(value) =>
                  setEditValues({ ...editValues, first_name: value })
                }
              />

              {/* Last Name */}
              <ProfileField
                icon={<User className="w-5 h-5 text-[#E4B68A]" />}
                label="Last Name"
                value={user?.last_name || ""}
                isEditing={editingField === "last_name"}
                onEdit={() => handleEdit("last_name")}
                onSave={() => handleSave("last_name")}
                onCancel={handleCancel}
                editValue={editValues.last_name}
                onChange={(value) =>
                  setEditValues({ ...editValues, last_name: value })
                }
              />

              {/* Email (read-only) */}
              <ProfileField
                icon={<Mail className="w-5 h-5 text-[#E4B68A]" />}
                label="Email"
                value={user?.email || ""}
                isEditing={false}
                readOnly
              />

              {/* Phone */}
              <ProfileField
                icon={<Phone className="w-5 h-5 text-[#E4B68A]" />}
                label="Phone"
                value={user?.phone || ""}
                isEditing={editingField === "phone"}
                onEdit={() => handleEdit("phone")}
                onSave={() => handleSave("phone")}
                onCancel={handleCancel}
                editValue={editValues.phone}
                onChange={(value) => setEditValues({ ...editValues, phone: value })}
              />

              {/* Gender */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#E4B68A]" />
                  </div>
                  <div>
                    <p className="text-sm text-(--color-slate)">Gender</p>
                    {editingField === "gender" ? (
                      <Select
                        value={editValues.gender}
                        onValueChange={(value) =>
                          setEditValues({ ...editValues, gender: value })
                        }
                      >
                        <SelectTrigger className="w-[180px] h-9 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="font-medium text-(--color-gray-darker) capitalize">
                        {user?.gender || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
                {editingField === "gender" ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSave("gender")}
                      className="h-8 w-8 p-0 bg-[#E4B68A] hover:bg-[#D4A67A] text-black"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancel}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit("gender")}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="w-4 h-4 text-[#E4B68A]" />
                  </Button>
                )}
              </div>

              {/* Date of Birth */}
              <ProfileField
                icon={<Calendar className="w-5 h-5 text-[#E4B68A]" />}
                label="Date of Birth"
                value={user?.date_of_birth || ""}
                isEditing={editingField === "date_of_birth"}
                onEdit={() => handleEdit("date_of_birth")}
                onSave={() => handleSave("date_of_birth")}
                onCancel={handleCancel}
                editValue={editValues.date_of_birth}
                onChange={(value) =>
                  setEditValues({ ...editValues, date_of_birth: value })
                }
                type="date"
              />
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#E4B68A]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-(--color-gray-darker)">
                  Notifications
                </h3>
                <p className="text-sm text-(--color-slate)">
                  Choose how you want to be notified
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <SettingSwitch
                label="Email Notifications"
                description="Receive updates via email"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
              <SettingSwitch
                label="SMS Notifications"
                description="Receive updates via text message"
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, sms: checked })
                }
              />
              <SettingSwitch
                label="Push Notifications"
                description="Receive push notifications on your device"
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
              <div className="pt-2 border-t border-gray-100" />
              <SettingSwitch
                label="Appointment Reminders"
                description="Get reminders before scheduled consultations"
                checked={notifications.appointmentReminders}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    appointmentReminders: checked,
                  })
                }
              />
              <SettingSwitch
                label="Results Ready"
                description="Notify when AI analysis or test results are ready"
                checked={notifications.resultsReady}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, resultsReady: checked })
                }
              />
              <SettingSwitch
                label="Promotions & News"
                description="Receive promotional offers and health tips"
                checked={notifications.promotions}
                onCheckedChange={(checked) => {
                  const newSettings = { ...notifications, promotions: checked };
                  setNotifications(newSettings);
                  updateNotifications.mutate(newSettings);
                }}
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#E4B68A]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-(--color-gray-darker)">
                  Privacy
                </h3>
                <p className="text-sm text-(--color-slate)">
                  Control your data and visibility
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <SettingSwitch
                label="Share Data for Research"
                description="Help improve healthcare by sharing anonymized data"
                checked={privacy.shareData}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, shareData: checked })
                }
              />
              <SettingSwitch
                label="Show Profile to Doctors"
                description="Allow doctors to view your profile when booking"
                checked={privacy.showProfile}
                onCheckedChange={(checked) => {
                  const newSettings = { ...privacy, showProfile: checked };
                  setPrivacy(newSettings);
                  updatePrivacy.mutate(newSettings);
                }}
              />
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#E4B68A]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-(--color-gray-darker)">
                  Language & Region
                </h3>
                <p className="text-sm text-(--color-slate)">
                  Set your preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm text-(--color-slate) mb-2">
                  Language
                </Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-(--color-slate) mb-2">
                  Timezone
                </Label>
                <Select defaultValue="utc">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="waf">West Africa Time (WAT)</SelectItem>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* Password Change */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#E4B68A]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-(--color-gray-darker)">
                  Password
                </h3>
                <p className="text-sm text-(--color-slate)">
                  Last changed 3 months ago
                </p>
              </div>
              <Button
                onClick={() => setShowPasswordDialog(true)}
                variant="outline"
                className="border-[#E4B68A] text-[#E4B68A] hover:bg-[#E4B68A]/10"
              >
                Change Password
              </Button>
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-[#E4B68A]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-(--color-gray-darker)">
                  Export Your Data
                </h3>
                <p className="text-sm text-(--color-slate)">
                  Download a copy of all your data
                </p>
              </div>
              <Button
                onClick={handleExportData}
                variant="outline"
                className="border-[#E4B68A] text-[#E4B68A] hover:bg-[#E4B68A]/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-600">
                  Delete Account
                </h3>
                <p className="text-sm text-(--color-slate)">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          {/* Consultation History */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-(--color-gray-darker) mb-4">
              Recent Consultations
            </h3>
            <div className="space-y-3">
              {/* Mock consultation history */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-(--color-gray-darker)">
                    Dr. Sarah Johnson
                  </p>
                  <p className="text-sm text-(--color-slate)">
                    Video Consultation • Dec 15, 2025
                  </p>
                </div>
                <Button size="sm" variant="ghost" className="text-[#E4B68A]">
                  View Details
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-(--color-gray-darker)">
                    Dr. Michael Chen
                  </p>
                  <p className="text-sm text-(--color-slate)">
                    Async Consultation • Nov 28, 2025
                  </p>
                </div>
                <Button size="sm" variant="ghost" className="text-[#E4B68A]">
                  View Details
                </Button>
              </div>
            </div>
          </div>

          {/* Medical Documents */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-(--color-gray-darker)">
                Medical Documents
              </h3>
              <Button
                size="sm"
                variant="outline"
                className="border-[#E4B68A] text-[#E4B68A]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
            <div className="space-y-3">
              {/* Mock documents */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#E4B68A]" />
                  <div>
                    <p className="font-medium text-(--color-gray-darker)">
                      AI Analysis Report
                    </p>
                    <p className="text-sm text-(--color-slate)">Dec 20, 2025 • 234 KB</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-[#E4B68A]">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#E4B68A]" />
                  <div>
                    <p className="font-medium text-(--color-gray-darker)">
                      Treatment Plan
                    </p>
                    <p className="text-sm text-(--color-slate)">Dec 15, 2025 • 156 KB</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-[#E4B68A]">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-(--color-gray-darker)">
              Change Password
            </DialogTitle>
            <DialogDescription className="text-(--color-slate)">
              Enter your current password and choose a new one
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                className="mt-1"
                placeholder="Enter current password"
                value={passwordData.current_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    current_password: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                className="mt-1"
                placeholder="Enter new password"
                value={passwordData.new_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    new_password: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                className="mt-1"
                placeholder="Confirm new password"
                value={passwordData.confirm_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirm_password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordChange}
              className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black"
            >
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-red-600">
                  Delete Account
                </DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-(--color-slate)">
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> You will lose access to:
            </p>
            <ul className="list-disc list-inside text-sm text-red-800 mt-2 space-y-1">
              <li>All consultation history</li>
              <li>AI analysis results</li>
              <li>Treatment plans</li>
              <li>Saved preferences</li>
            </ul>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete My Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Reusable Profile Field Component
const ProfileField = ({
  icon,
  label,
  value,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editValue,
  onChange,
  type = "text",
  readOnly = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  editValue?: string;
  onChange?: (value: string) => void;
  type?: string;
  readOnly?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-(--color-slate)">{label}</p>
          {isEditing ? (
            <Input
              type={type}
              value={editValue}
              onChange={(e) => onChange?.(e.target.value)}
              className="h-9 mt-1 max-w-sm"
              autoFocus
            />
          ) : (
            <p className="font-medium text-(--color-gray-darker) truncate">
              {value || "Not specified"}
            </p>
          )}
        </div>
      </div>
      {!readOnly && (
        <div className="flex items-center gap-2 shrink-0 ml-4">
          {isEditing ? (
            <>
              <Button
                size="sm"
                onClick={onSave}
                className="h-8 w-8 p-0 bg-[#E4B68A] hover:bg-[#D4A67A] text-black"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4 text-[#E4B68A]" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Reusable Setting Switch Component
const SettingSwitch = ({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="font-medium text-(--color-gray-darker)">{label}</p>
        <p className="text-sm text-(--color-slate)">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-[#E4B68A]"
      />
    </div>
  );
};

