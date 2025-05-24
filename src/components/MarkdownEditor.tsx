
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Link, Heading2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>("write");

  const insertMarkdown = (markdownSyntax: string) => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let replacement = "";
    
    switch (markdownSyntax) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        break;
      case 'heading':
        replacement = `## ${selectedText || 'Heading'}`;
        break;
      case 'link':
        replacement = `[${selectedText || 'link text'}](url)`;
        break;
      case 'list':
        replacement = `\n- ${selectedText || 'list item'}\n- another item\n`;
        break;
      default:
        replacement = selectedText;
    }
    
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);
    
    // Set cursor position after update
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + replacement.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <Tabs defaultValue="write" className="w-full" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-2">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        {activeTab === "write" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-1"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown('bold')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown('italic')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown('heading')}
              title="Heading"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown('link')}
              title="Link"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown('list')}
              title="List"
            >
              <List className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
      
      <TabsContent value="write" className="mt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-64 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none font-mono text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
            placeholder="Write your content in Markdown or plain text..."
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="preview" className="mt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full min-h-[16rem] p-4 border rounded-md bg-white dark:bg-gray-800 prose dark:prose-invert max-w-none"
        >
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-gray-400 dark:text-gray-500">Preview will appear here...</p>
          )}
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default MarkdownEditor;
