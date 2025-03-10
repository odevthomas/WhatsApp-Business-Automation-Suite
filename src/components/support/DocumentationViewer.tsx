import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";

interface DocumentationViewerProps {
  documentPath: string;
  onBack: () => void;
}

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  documentPath,
  onBack,
}) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const response = await fetch(documentPath);
        if (!response.ok) {
          throw new Error(`Failed to load document: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load documentation");
        setContent("");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentPath]);

  // Função simples para converter Markdown para HTML
  const renderMarkdown = (markdown: string) => {
    // Esta é uma implementação básica. Para uma solução completa, use uma biblioteca como marked ou remark
    let html = markdown
      // Headers
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Links
      .replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-blue-600 hover:underline">$1</a>',
      )
      // Lists
      .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal">$1</li>')
      // Code blocks
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-gray-100 p-4 rounded my-4 overflow-x-auto"><code>$1</code></pre>',
      )
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      // Paragraphs
      .replace(/^(?!<[h|l|p|u])(.+)$/gm, '<p class="my-2">$1</p>');

    // Agrupar listas
    html = html.replace(/<\/li>\s*<li/g, "</li><li");
    html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>)+/g, (match) => {
      return `<ul class="my-4">${match}</ul>`;
    });

    return html;
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {documentPath.split("/").pop()}
          </CardTitle>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={documentPath} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" /> Abrir em Nova Aba
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
              <h3 className="font-medium mb-2">
                Erro ao carregar documentação
              </h3>
              <p>{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </Button>
            </div>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DocumentationViewer;
