
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  FileText, 
  Youtube, 
  Twitter, 
  Link as LinkIcon,
  Trash2,
  Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContentPreview from './ContentPreview';

interface Content {
  id: number;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
}

interface ContentCardProps {
  content: Content;
  onDelete: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onDelete }) => {
  const getIcon = () => {
    switch (content.type) {
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'tweet':
        return <Twitter className="w-5 h-5" />;
      case 'link':
        return <LinkIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (content.type) {
      case 'document':
        return 'text-blue-600 bg-blue-50';
      case 'youtube':
        return 'text-red-600 bg-red-50';
      case 'tweet':
        return 'text-sky-600 bg-sky-50';
      case 'link':
        return 'text-green-600 bg-green-50';
    }
  };

  const getGradient = () => {
    switch (content.type) {
      case 'document':
        return 'from-blue-500 to-purple-600';
      case 'youtube':
        return 'from-red-500 to-pink-600';
      case 'tweet':
        return 'from-sky-500 to-blue-600';
      case 'link':
        return 'from-green-500 to-teal-600';
    }
  };

  return (
    <Card className="group bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:shadow-purple-100">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${getTypeColor()}`}>
            {getIcon()}
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <ContentPreview content={content} />
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.open(content.link, '_blank')}
              className="h-8 w-8 p-0"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDelete}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {content.title}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {content.link}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {content.tags.map(tag => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:from-purple-100 hover:to-blue-100"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <ContentPreview content={content} />
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(content.link, '_blank')}
            className={`bg-gradient-to-r ${getGradient()} text-white border-0 hover:opacity-90`}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
