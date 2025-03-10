import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import {
  ImageIcon,
  Type,
  ListPlus,
  Variable,
  Smile,
  FileText,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

interface ResponseTemplateProps {
  templates?: ResponseTemplate[];
  onSave?: (template: ResponseTemplate) => void;
  onDelete?: (templateId: string) => void;
}

interface ResponseTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  variables?: string[];
  mediaAttachments?: MediaAttachment[];
}

interface MediaAttachment {
  type: "image" | "document" | "video";
  url: string;
  name: string;
}

const ResponseTemplates: React.FC<ResponseTemplateProps> = ({
  templates = [
    {
      id: "1",
      name: "Welcome Message",
      content:
        "Hello {{customer_name}}, thank you for contacting us! How can we help you today?",
      category: "Greeting",
      variables: ["customer_name"],
      mediaAttachments: [],
    },
    {
      id: "2",
      name: "Business Hours",
      content:
        "Our business hours are Monday-Friday 9am-5pm. We will respond to your inquiry during our operating hours.",
      category: "Information",
      variables: [],
      mediaAttachments: [],
    },
    {
      id: "3",
      name: "Product Inquiry",
      content:
        "Thank you for your interest in {{product_name}}. The price is {{product_price}} and it is currently {{product_availability}}.",
      category: "Sales",
      variables: ["product_name", "product_price", "product_availability"],
      mediaAttachments: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
          name: "product-image.jpg",
        },
      ],
    },
  ],
  onSave = () => {},
  onDelete = () => {},
}) => {
  const [activeTemplate, setActiveTemplate] = useState<ResponseTemplate | null>(
    null,
  );
  const [editMode, setEditMode] = useState(false);
  const [newTemplate, setNewTemplate] = useState<ResponseTemplate>({
    id: "",
    name: "",
    content: "",
    category: "General",
    variables: [],
    mediaAttachments: [],
  });

  const categories = [
    "General",
    "Greeting",
    "Information",
    "Sales",
    "Support",
    "Follow-up",
  ];

  const handleNewTemplate = () => {
    setActiveTemplate(null);
    setNewTemplate({
      id: Date.now().toString(),
      name: "",
      content: "",
      category: "General",
      variables: [],
      mediaAttachments: [],
    });
    setEditMode(true);
  };

  const handleEditTemplate = (template: ResponseTemplate) => {
    setActiveTemplate(template);
    setNewTemplate({ ...template });
    setEditMode(true);
  };

  const handleSaveTemplate = () => {
    onSave(newTemplate);
    setEditMode(false);
    setActiveTemplate(null);
  };

  const handleAddVariable = () => {
    const variableName = prompt("Enter variable name (without brackets):");
    if (variableName && !newTemplate.variables?.includes(variableName)) {
      setNewTemplate({
        ...newTemplate,
        variables: [...(newTemplate.variables || []), variableName],
      });
    }
  };

  const handleAddMedia = () => {
    // In a real implementation, this would open a file picker
    const mockMedia: MediaAttachment = {
      type: "image",
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      name: "new-attachment.jpg",
    };

    setNewTemplate({
      ...newTemplate,
      mediaAttachments: [...(newTemplate.mediaAttachments || []), mockMedia],
    });
  };

  const handleRemoveVariable = (variable: string) => {
    setNewTemplate({
      ...newTemplate,
      variables: newTemplate.variables?.filter((v) => v !== variable),
    });
  };

  const handleRemoveMedia = (index: number) => {
    setNewTemplate({
      ...newTemplate,
      mediaAttachments: newTemplate.mediaAttachments?.filter(
        (_, i) => i !== index,
      ),
    });
  };

  return (
    <div className="bg-white w-full h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Response Templates
          </h2>
          <p className="text-gray-500">
            Create and manage templates for automated responses
          </p>
        </div>
        <Button onClick={handleNewTemplate}>
          <Plus className="mr-2 h-4 w-4" /> Create New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1">
          <Card className="h-[700px] overflow-auto">
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>
                Select a template to edit or preview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-blue-50 border ${activeTemplate?.id === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                    onClick={() => setActiveTemplate(template)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-xs text-gray-500">
                          {template.category}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTemplate(template);
                          }}
                        >
                          Edit
                        </Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(template.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete template</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {template.content}
                    </p>
                    {template.variables && template.variables.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.variables.map((variable) => (
                          <span
                            key={variable}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                          >
                            {`{{${variable}}}`}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Editor or Preview */}
        <div className="lg:col-span-2">
          {editMode ? (
            <Card className="h-[700px] overflow-auto">
              <CardHeader>
                <CardTitle>
                  {activeTemplate ? "Edit Template" : "Create New Template"}
                </CardTitle>
                <CardDescription>
                  Customize your response template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="template-name"
                    >
                      Template Name
                    </label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, name: e.target.value })
                      }
                      placeholder="Enter template name"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="template-category"
                    >
                      Category
                    </label>
                    <Select
                      value={newTemplate.category}
                      onValueChange={(value) =>
                        setNewTemplate({ ...newTemplate, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        className="block text-sm font-medium"
                        htmlFor="template-content"
                      >
                        Template Content
                      </label>
                      <div className="flex space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleAddVariable}
                              >
                                <Variable className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add variable</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Smile className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add emoji</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleAddMedia}
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add media</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <Textarea
                      id="template-content"
                      value={newTemplate.content}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          content: e.target.value,
                        })
                      }
                      placeholder="Enter your template content here. Use {{variable_name}} for dynamic content."
                      className="min-h-[200px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">
                          Template Variables
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAddVariable}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Variable
                        </Button>
                      </div>

                      {newTemplate.variables &&
                      newTemplate.variables.length > 0 ? (
                        <div className="space-y-2">
                          {newTemplate.variables.map((variable) => (
                            <div
                              key={variable}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                            >
                              <div className="flex items-center">
                                <Variable className="h-4 w-4 text-blue-500 mr-2" />
                                <span className="text-sm">{`{{${variable}}}`}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveVariable(variable)}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No variables added yet
                        </p>
                      )}
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">
                          Media Attachments
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAddMedia}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Media
                        </Button>
                      </div>

                      {newTemplate.mediaAttachments &&
                      newTemplate.mediaAttachments.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {newTemplate.mediaAttachments.map((media, index) => (
                            <div
                              key={index}
                              className="relative group border rounded-md overflow-hidden"
                            >
                              {media.type === "image" && (
                                <img
                                  src={media.url}
                                  alt={media.name}
                                  className="w-full h-32 object-cover"
                                />
                              )}
                              {media.type === "document" && (
                                <div className="w-full h-32 flex items-center justify-center bg-gray-100">
                                  <FileText className="h-10 w-10 text-gray-400" />
                                </div>
                              )}
                              <div className="p-2 bg-white">
                                <p className="text-xs truncate">{media.name}</p>
                              </div>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveMedia(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No media attachments added yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setActiveTemplate(activeTemplate);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveTemplate}>
                  <Save className="mr-2 h-4 w-4" /> Save Template
                </Button>
              </CardFooter>
            </Card>
          ) : activeTemplate ? (
            <Card className="h-[700px] overflow-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{activeTemplate.name}</CardTitle>
                    <CardDescription>
                      Category: {activeTemplate.category}
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleEditTemplate(activeTemplate)}>
                    Edit Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Template Content
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                      {activeTemplate.content}
                    </div>
                  </div>

                  {activeTemplate.variables &&
                    activeTemplate.variables.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">Variables</h3>
                        <div className="flex flex-wrap gap-2">
                          {activeTemplate.variables.map((variable) => (
                            <div
                              key={variable}
                              className="flex items-center p-2 bg-blue-50 rounded-md"
                            >
                              <Variable className="h-4 w-4 text-blue-500 mr-2" />
                              <span className="text-sm">{`{{${variable}}}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {activeTemplate.mediaAttachments &&
                    activeTemplate.mediaAttachments.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Media Attachments
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {activeTemplate.mediaAttachments.map(
                            (media, index) => (
                              <div
                                key={index}
                                className="border rounded-md overflow-hidden"
                              >
                                {media.type === "image" && (
                                  <img
                                    src={media.url}
                                    alt={media.name}
                                    className="w-full h-32 object-cover"
                                  />
                                )}
                                {media.type === "document" && (
                                  <div className="w-full h-32 flex items-center justify-center bg-gray-100">
                                    <FileText className="h-10 w-10 text-gray-400" />
                                  </div>
                                )}
                                <div className="p-2 bg-white">
                                  <p className="text-xs truncate">
                                    {media.name}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  <div>
                    <h3 className="text-sm font-medium mb-2">Preview</h3>
                    <div className="p-4 bg-blue-50 rounded-md border-l-4 border-blue-500">
                      <p className="text-sm">
                        {activeTemplate.content.replace(
                          /\{\{(\w+)\}\}/g,
                          (match, variable) =>
                            `<span class="font-bold text-blue-600">[${variable} value]</span>`,
                        )}
                      </p>

                      {activeTemplate.mediaAttachments &&
                        activeTemplate.mediaAttachments.length > 0 && (
                          <div className="mt-2 flex gap-2">
                            {activeTemplate.mediaAttachments.map(
                              (media, index) => (
                                <div
                                  key={index}
                                  className="w-16 h-16 bg-white rounded border overflow-hidden"
                                >
                                  {media.type === "image" && (
                                    <img
                                      src={media.url}
                                      alt={media.name}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                  {media.type === "document" && (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <FileText className="h-6 w-6 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[700px] flex items-center justify-center">
              <div className="text-center p-6">
                <ListPlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Template Selected
                </h3>
                <p className="text-gray-500 mb-4">
                  Select a template from the list to view or edit, or create a
                  new one
                </p>
                <Button onClick={handleNewTemplate}>
                  <Plus className="mr-2 h-4 w-4" /> Create New Template
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseTemplates;
