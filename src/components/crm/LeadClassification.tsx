import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { t } from "@/lib/i18n";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  criteria: string[];
}

interface LeadClassificationProps {
  categories?: Category[];
  onCreateCategory?: (category: Omit<Category, "id">) => void;
  onUpdateCategory?: (category: Category) => void;
  onDeleteCategory?: (id: string) => void;
  onAssignClassification?: (customerId: string, categoryId: string) => void;
}

const defaultCategories: Category[] = [
  {
    id: "1",
    name: "Hot Lead",
    description: "Customer ready to make a purchase decision",
    color: "#ef4444",
    criteria: ["Recent inquiry", "Requested pricing", "Multiple interactions"],
  },
  {
    id: "2",
    name: "Warm Lead",
    description: "Showed interest but needs nurturing",
    color: "#f97316",
    criteria: [
      "Downloaded resources",
      "Attended webinar",
      "Engaged with content",
    ],
  },
  {
    id: "3",
    name: "Cold Lead",
    description: "Initial contact with minimal engagement",
    color: "#3b82f6",
    criteria: [
      "First contact",
      "No follow-up response",
      "Low engagement score",
    ],
  },
  {
    id: "4",
    name: "Customer",
    description: "Has made a purchase or signed contract",
    color: "#10b981",
    criteria: ["Completed purchase", "Active subscription", "Signed contract"],
  },
];

const LeadClassification = ({
  categories = defaultCategories,
  onCreateCategory = () => {},
  onUpdateCategory = () => {},
  onDeleteCategory = () => {},
  onAssignClassification = () => {},
}: LeadClassificationProps) => {
  const [activeTab, setActiveTab] = useState("categories");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [newCriterion, setNewCriterion] = useState("");
  const [tempCriteria, setTempCriteria] = useState<string[]>([]);
  const [localCategories, setLocalCategories] =
    useState<Category[]>(categories);

  const handleCreateCategory = () => {
    setIsCreateDialogOpen(true);
    setTempCriteria([]);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
    setTempCriteria([...category.criteria]);
  };

  const handleDeleteCategory = (id: string) => {
    const updatedCategories = localCategories.filter((c) => c.id !== id);
    setLocalCategories(updatedCategories);
    onDeleteCategory(id);
  };

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      setTempCriteria([...tempCriteria, newCriterion.trim()]);
      setNewCriterion("");
    }
  };

  const handleRemoveCriterion = (index: number) => {
    setTempCriteria(tempCriteria.filter((_, i) => i !== index));
  };

  const onSubmitCreate = (data: Partial<Category>) => {
    const newCategory = {
      name: data.name || "",
      description: data.description || "",
      color: data.color || "#3b82f6",
      criteria: tempCriteria,
    };

    // Generate a new ID for the category
    const newId = Date.now().toString();
    const categoryWithId = { ...newCategory, id: newId };

    // Update local state
    setLocalCategories([...localCategories, categoryWithId]);

    // Call the prop function
    onCreateCategory(newCategory);

    setIsCreateDialogOpen(false);
    setTempCriteria([]);
  };

  const onSubmitEdit = () => {
    if (selectedCategory) {
      const updatedCategory = {
        ...selectedCategory,
        criteria: tempCriteria,
      };

      // Update local state
      const updatedCategories = localCategories.map((c) =>
        c.id === updatedCategory.id ? updatedCategory : c,
      );
      setLocalCategories(updatedCategories);

      // Call the prop function
      onUpdateCategory(updatedCategory);

      setIsEditDialogOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{t("lead_classifications")}</h2>
          <p className="text-gray-500">{t("manage_lead_categories")}</p>
        </div>
        <Button onClick={handleCreateCategory}>
          <Plus className="mr-2 h-4 w-4" />
          {t("add_classification")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge
                  style={{ backgroundColor: category.color }}
                  className="text-white"
                >
                  {category.name}
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">{category.description}</p>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-medium mb-2">{t("criteria")}:</h4>
              <ul className="space-y-1">
                {category.criteria.map((criterion, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500 mr-2"></span>
                    {criterion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Category Dialog */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {t("new_classification")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("name")}
                </label>
                <Input placeholder="e.g., Hot Lead" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("description")}
                </label>
                <Input placeholder="Brief description of this category" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("color")}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    className="w-12 h-9 p-1"
                    defaultValue="#3b82f6"
                  />
                  <div className="w-8 h-8 rounded-full bg-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("criteria")}
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    placeholder="Add a criterion"
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddCriterion())
                    }
                  />
                  <Button
                    type="button"
                    onClick={handleAddCriterion}
                    variant="outline"
                  >
                    {t("add")}
                  </Button>
                </div>

                <ul className="mt-3 space-y-2">
                  {tempCriteria.map((criterion, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span>{criterion}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCriterion(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  onClick={() => onSubmitCreate({ name: "New Category" })}
                >
                  {t("save_classification")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Dialog */}
      {isEditDialogOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {t("edit_classification")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("name")}
                </label>
                <Input
                  defaultValue={selectedCategory.name}
                  onChange={(e) => {
                    setSelectedCategory({
                      ...selectedCategory,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("description")}
                </label>
                <Input
                  defaultValue={selectedCategory.description}
                  onChange={(e) => {
                    setSelectedCategory({
                      ...selectedCategory,
                      description: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("color")}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    className="w-12 h-9 p-1"
                    defaultValue={selectedCategory.color}
                    onChange={(e) => {
                      setSelectedCategory({
                        ...selectedCategory,
                        color: e.target.value,
                      });
                    }}
                  />
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedCategory.color }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("criteria")}
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    placeholder="Add a criterion"
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddCriterion())
                    }
                  />
                  <Button
                    type="button"
                    onClick={handleAddCriterion}
                    variant="outline"
                  >
                    {t("add")}
                  </Button>
                </div>

                <ul className="mt-3 space-y-2">
                  {tempCriteria.map((criterion, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span>{criterion}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCriterion(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  {t("cancel")}
                </Button>
                <Button onClick={onSubmitEdit}>{t("save_changes")}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadClassification;
