import React, { useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
  status: "active" | "inactive";
  avatar?: string;
  permissions: {
    dashboard: boolean;
    chatbot: boolean;
    crm: boolean;
    integrations: boolean;
    settings: boolean;
  };
}

interface UserManagementProps {
  users?: User[];
  onAddUser?: (user: Omit<User, "id">) => void;
  onUpdateUser?: (user: User) => void;
  onDeleteUser?: (userId: string) => void;
}

const UserManagement = ({
  users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      permissions: {
        dashboard: true,
        chatbot: true,
        crm: true,
        integrations: true,
        settings: true,
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "manager",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      permissions: {
        dashboard: true,
        chatbot: true,
        crm: true,
        integrations: false,
        settings: false,
      },
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      status: "inactive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
      permissions: {
        dashboard: true,
        chatbot: false,
        crm: true,
        integrations: false,
        settings: false,
      },
    },
  ],
  onAddUser = () => {},
  onUpdateUser = () => {},
  onDeleteUser = () => {},
}: UserManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // New user form state
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "user",
    status: "active",
    permissions: {
      dashboard: true,
      chatbot: false,
      crm: false,
      integrations: false,
      settings: false,
    },
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditUserDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setIsDeleteUserDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (currentUser) {
      onDeleteUser(currentUser.id);
      setIsDeleteUserDialogOpen(false);
    }
  };

  const handleAddUser = () => {
    onAddUser(newUser);
    setNewUser({
      name: "",
      email: "",
      role: "user",
      status: "active",
      permissions: {
        dashboard: true,
        chatbot: false,
        crm: false,
        integrations: false,
        settings: false,
      },
    });
    setIsAddUserDialogOpen(false);
  };

  const handleUpdateUser = () => {
    if (currentUser) {
      onUpdateUser(currentUser);
      setIsEditUserDialogOpen(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case "manager":
        return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">User</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "manager":
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-500">Manage user access and permissions</p>
        </div>
        <Button onClick={() => setIsAddUserDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-48">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      {getRoleBadge(user.role)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "outline"}
                      className={
                        user.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "text-gray-500"
                      }
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.dashboard && (
                        <Badge variant="secondary" className="text-xs">
                          Dashboard
                        </Badge>
                      )}
                      {user.permissions.chatbot && (
                        <Badge variant="secondary" className="text-xs">
                          Chatbot
                        </Badge>
                      )}
                      {user.permissions.crm && (
                        <Badge variant="secondary" className="text-xs">
                          CRM
                        </Badge>
                      )}
                      {user.permissions.integrations && (
                        <Badge variant="secondary" className="text-xs">
                          Integrations
                        </Badge>
                      )}
                      {user.permissions.settings && (
                        <Badge variant="secondary" className="text-xs">
                          Settings
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account and set their permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right font-medium">
                Name
              </label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right font-medium">
                Role
              </label>
              <Select
                value={newUser.role}
                onValueChange={(value: "admin" | "manager" | "user") =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right font-medium">
                Status
              </label>
              <Select
                value={newUser.status}
                onValueChange={(value: "active" | "inactive") =>
                  setNewUser({ ...newUser, status: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4 pt-4">
              <span className="text-right font-medium">Permissions</span>
              <div className="col-span-3 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="dashboard-permission" className="font-medium">
                    Dashboard
                  </label>
                  <Switch
                    id="dashboard-permission"
                    checked={newUser.permissions.dashboard}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: {
                          ...newUser.permissions,
                          dashboard: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="chatbot-permission" className="font-medium">
                    AI Chatbot
                  </label>
                  <Switch
                    id="chatbot-permission"
                    checked={newUser.permissions.chatbot}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: {
                          ...newUser.permissions,
                          chatbot: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="crm-permission" className="font-medium">
                    Mini-CRM
                  </label>
                  <Switch
                    id="crm-permission"
                    checked={newUser.permissions.crm}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: { ...newUser.permissions, crm: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="integrations-permission"
                    className="font-medium"
                  >
                    Integrations
                  </label>
                  <Switch
                    id="integrations-permission"
                    checked={newUser.permissions.integrations}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: {
                          ...newUser.permissions,
                          integrations: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="settings-permission" className="font-medium">
                    Settings
                  </label>
                  <Switch
                    id="settings-permission"
                    checked={newUser.permissions.settings}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: {
                          ...newUser.permissions,
                          settings: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and permissions.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right font-medium">
                  Name
                </label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-email" className="text-right font-medium">
                  Email
                </label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-role" className="text-right font-medium">
                  Role
                </label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value: "admin" | "manager" | "user") =>
                    setCurrentUser({ ...currentUser, role: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right font-medium">
                  Status
                </label>
                <Select
                  value={currentUser.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setCurrentUser({ ...currentUser, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4 pt-4">
                <span className="text-right font-medium">Permissions</span>
                <div className="col-span-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="edit-dashboard-permission"
                      className="font-medium"
                    >
                      Dashboard
                    </label>
                    <Switch
                      id="edit-dashboard-permission"
                      checked={currentUser.permissions.dashboard}
                      onCheckedChange={(checked) =>
                        setCurrentUser({
                          ...currentUser,
                          permissions: {
                            ...currentUser.permissions,
                            dashboard: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="edit-chatbot-permission"
                      className="font-medium"
                    >
                      AI Chatbot
                    </label>
                    <Switch
                      id="edit-chatbot-permission"
                      checked={currentUser.permissions.chatbot}
                      onCheckedChange={(checked) =>
                        setCurrentUser({
                          ...currentUser,
                          permissions: {
                            ...currentUser.permissions,
                            chatbot: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="edit-crm-permission"
                      className="font-medium"
                    >
                      Mini-CRM
                    </label>
                    <Switch
                      id="edit-crm-permission"
                      checked={currentUser.permissions.crm}
                      onCheckedChange={(checked) =>
                        setCurrentUser({
                          ...currentUser,
                          permissions: {
                            ...currentUser.permissions,
                            crm: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="edit-integrations-permission"
                      className="font-medium"
                    >
                      Integrations
                    </label>
                    <Switch
                      id="edit-integrations-permission"
                      checked={currentUser.permissions.integrations}
                      onCheckedChange={(checked) =>
                        setCurrentUser({
                          ...currentUser,
                          permissions: {
                            ...currentUser.permissions,
                            integrations: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="edit-settings-permission"
                      className="font-medium"
                    >
                      Settings
                    </label>
                    <Switch
                      id="edit-settings-permission"
                      checked={currentUser.permissions.settings}
                      onCheckedChange={(checked) =>
                        setCurrentUser({
                          ...currentUser,
                          permissions: {
                            ...currentUser.permissions,
                            settings: checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog
        open={isDeleteUserDialogOpen}
        onOpenChange={setIsDeleteUserDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-4 border rounded-md">
                <Avatar>
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-sm text-gray-500">
                    {currentUser.email}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
