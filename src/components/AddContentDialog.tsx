
import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus, FileText, Youtube, Twitter, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Content {
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
}

interface AddContentDialogProps {
  onAdd: (content: Content) => void;
  onClose: () => void;
}

const AddContentDialog: React.FC<AddContentDialogProps> = ({ onAdd, onClose }) => {
  const [type, setType] = useState<Content['type']>('document');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contentTypes = [
    { value: 'document', label: 'Document', icon: FileText, color: 'text-blue-600' },
    { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { value: 'tweet', label: 'Tweet', icon: Twitter, color: 'text-sky-600' },
    { value: 'link', label: 'Link', icon: LinkIcon, color: 'text-green-600' }
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!link.trim() || !title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAdd({
        type,
        link: link.trim(),
        title: title.trim(),
        tags
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add content',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (typeValue: string) => {
    const contentType = contentTypes.find(ct => ct.value === typeValue);
    if (!contentType) return null;
    const Icon = contentType.icon;
    return <Icon className={`w-4 h-4 ${contentType.color}`} />;
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Add New Content
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Content Type</Label>
          <div className="grid grid-cols-2 gap-3">
            {contentTypes.map((contentType) => {
              const Icon = contentType.icon;
              return (
                <Card
                  key={contentType.value}
                  className={`cursor-pointer transition-all duration-200 ${
                    type === contentType.value
                      ? 'ring-2 ring-purple-500 bg-purple-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setType(contentType.value as Content['type'])}
                >
                  <CardContent className="p-4 text-center">
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${contentType.color}`} />
                    <div className="font-medium">{contentType.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Link Input */}
        <div className="space-y-2">
          <Label htmlFor="link" className="text-base font-semibold">
            URL <span className="text-red-500">*</span>
          </Label>
          <Input
            id="link"
            type="url"
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-white/80 backdrop-blur-sm"
            required
          />
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-semibold">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/80 backdrop-blur-sm"
            required
          />
        </div>

        {/* Tags Input */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Tags</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="flex-1 bg-white/80 backdrop-blur-sm"
            />
            <Button type="button" onClick={addTag} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Display Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 pr-1"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(tag)}
                    className="ml-1 h-4 w-4 p-0 hover:bg-purple-200"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Preview Card */}
        {(link || title) && (
          <div className="space-y-2">
            <Label className="text-base font-semibold">Preview</Label>
            <Card className="bg-gray-50 border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    {getTypeIcon(type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {title || 'Untitled'}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {link || 'No URL provided'}
                    </p>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isSubmitting ? 'Adding...' : 'Add Content'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddContentDialog;
