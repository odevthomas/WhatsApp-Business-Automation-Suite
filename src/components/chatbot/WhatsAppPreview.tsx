import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Mic, Check } from "lucide-react";
import { t } from "@/lib/i18n";

interface Message {
  id: string;
  content: string | React.ReactNode;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

interface WhatsAppPreviewProps {
  messages: Message[];
  businessName?: string;
  businessAvatar?: string;
  onSendMessage?: (message: string) => void;
}

const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({
  messages = [],
  businessName = "Your Business",
  businessAvatar = "https://api.dicebear.com/7.x/initials/svg?seed=YB",
  onSendMessage = () => {},
}) => {
  const [inputMessage, setInputMessage] = React.useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-gray-400" />
            <Check className="h-3 w-3 text-gray-400 -ml-1" />
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 text-blue-500 -ml-1" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-gray-300 shadow-md">
      <CardHeader className="p-3 bg-green-600 text-white flex flex-row items-center space-y-0 gap-3">
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarImage src={businessAvatar} alt={businessName} />
          <AvatarFallback>{businessName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-sm">{businessName}</h3>
          <p className="text-xs text-green-100">{t("online")}</p>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[500px]">
        <div
          className="flex-1 p-4 bg-[#e5ddd5] bg-opacity-30"
          style={{
            backgroundImage:
              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAA+UlEQVQ4y+3UMUoDQRTG8Z+KnkJCGlNZpLGwsrGwUNDCwkN4AU8gWHkIDxAQrBQbq4AHEKxEsFHBQoQUgojP5i1ZJpMJRBBx4c8w+/a9+WZ25hVFkdSqOEzqmk5mnawzWMUVznCIJv7wjBvc4wULOMAVvtCNOMMtHrCFD8xjDxNYxxqWMIcnXOIWrwF9xDTKEVBVbQRwFmPYxiY+0YmtVMN7gN/xHlb0Ec5jgGcYwQJ2w0oXcBjz6oZ9HVN4C/gRJgP+G/ZZgLthnw5fJ+yz6McgBtAXzpqJeRN4wjimAtYO2AwWw1cP2G+8YiXApR5O/vMPp9Z/1y/q4l9B4HBhAgAAAABJRU5ErkJggg==')",
          }}
        >
          <ScrollArea className="h-full pr-4">
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-2 ${message.sender === "user" ? "bg-[#dcf8c6]" : "bg-white"}`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span className="text-[10px] text-gray-500">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {message.sender === "user" &&
                        getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="p-2 bg-gray-100 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder={t("type_a_message")}
            className="flex-1 bg-white"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500"
            onClick={handleSendMessage}
          >
            {inputMessage.trim() ? (
              <Send className="h-5 w-5 text-green-600" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppPreview;
