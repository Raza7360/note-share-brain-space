
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Share2, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ContentCard from '@/components/ContentCard';
import AddContentDialog from '@/components/AddContentDialog';
import ShareBrainDialog from '@/components/ShareBrainDialog';
import FilterDropdown from '@/components/FilterDropdown';

interface Content {
  id: number;
  type: 'document' | 'tweet' | 'youtube' | 'link';
  link: string;
  title: string;
  tags: string[];
}

const Index = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { toast } = useToast();

  // Get all unique tags from contents
  const allTags = Array.from(new Set(contents.flatMap(content => content.tags)));

  // Filter contents based on search and tags
  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => content.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Fetch contents from API
  const fetchContents = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockData = [
        {
          id: 1,
          type: 'document' as const,
          link: 'https://example.com/doc1',
          title: 'Introduction to React Hooks',
          tags: ['react', 'programming', 'frontend']
        },
        {
          id: 2,
          type: 'youtube' as const,
          link: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
          title: 'Advanced TypeScript Patterns',
          tags: ['typescript', 'programming', 'tutorial']
        },
        {
          id: 3,
          type: 'tweet' as const,
          link: 'https://twitter.com/user/status/123',
          title: 'Interesting thread about AI development',
          tags: ['ai', 'technology', 'thoughts']
        }
      ];
      setContents(mockData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contents',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleAddContent = async (newContent: Omit<Content, 'id'>) => {
    try {
      // In real app, make API call to POST /api/v1/content
      const id = Math.max(...contents.map(c => c.id), 0) + 1;
      const contentWithId = { ...newContent, id };
      setContents(prev => [contentWithId, ...prev]);
      setIsAddDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Content added successfully!'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add content',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteContent = async (contentId: number) => {
    try {
      // In real app, make API call to DELETE /api/v1/content
      setContents(prev => prev.filter(c => c.id !== contentId));
      toast({
        title: 'Success',
        description: 'Content deleted successfully!'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete content',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your brain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Brainly
                </h1>
                <p className="text-sm text-gray-600">Your Second Brain</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hidden sm:flex">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Brain
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <ShareBrainDialog onClose={() => setIsShareDialogOpen(false)} />
                </DialogContent>
              </Dialog>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <AddContentDialog 
                    onAdd={handleAddContent}
                    onClose={() => setIsAddDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search notes by title or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-purple-200 focus:border-purple-400"
              />
            </div>
            <FilterDropdown
              allTags={allTags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>
          
          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Filtered by:</span>
              {selectedTags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer"
                  onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                >
                  {tag} ×
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTags([])}
                className="text-purple-600 hover:text-purple-700"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{contents.length}</div>
              <div className="text-sm text-gray-600">Total Notes</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{allTags.length}</div>
              <div className="text-sm text-gray-600">Unique Tags</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-cyan-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-cyan-600">{filteredContents.length}</div>
              <div className="text-sm text-gray-600">Filtered Results</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        {filteredContents.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
            <CardContent className="p-12 text-center">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {contents.length === 0 ? 'Your brain is empty' : 'No results found'}
              </h3>
              <p className="text-gray-500 mb-6">
                {contents.length === 0 
                  ? 'Start building your second brain by adding some content!' 
                  : 'Try adjusting your search or filters to find what you\'re looking for.'
                }
              </p>
              {contents.length === 0 && (
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Note
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map(content => (
              <ContentCard 
                key={content.id} 
                content={content} 
                onDelete={() => handleDeleteContent(content.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
