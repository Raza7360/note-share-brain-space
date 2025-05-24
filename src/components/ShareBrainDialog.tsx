
import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Copy, Share2, Check, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareBrainDialogProps {
  onClose: () => void;
}

const ShareBrainDialog: React.FC<ShareBrainDialogProps> = ({ onClose }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      // In real app, make API call to POST /api/v1/brain/share
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockLink = `https://brainly.app/shared/${Math.random().toString(36).substr(2, 9)}`;
      setShareLink(mockLink);
      setIsSharing(true);
      toast({
        title: 'Success',
        description: 'Share link generated successfully!'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate share link',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const disableSharing = async () => {
    try {
      // In real app, make API call to disable sharing
      setIsSharing(false);
      setShareLink('');
      toast({
        title: 'Success',
        description: 'Sharing disabled successfully!'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to disable sharing',
        variant: 'destructive'
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: 'Copied!',
        description: 'Share link copied to clipboard'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center">
          <Share2 className="w-6 h-6 mr-2 text-purple-600" />
          Share Your Brain
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Sharing Toggle */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Enable Public Sharing</Label>
                <p className="text-sm text-gray-600">
                  Allow others to view your notes collection through a public link
                </p>
              </div>
              <Switch
                checked={isSharing}
                onCheckedChange={(checked) => {
                  if (checked) {
                    generateShareLink();
                  } else {
                    disableSharing();
                  }
                }}
                disabled={isGenerating}
              />
            </div>
          </CardContent>
        </Card>

        {/* Share Link Section */}
        {(isSharing || shareLink) && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-semibold text-green-800">
                  Public Share Link
                </Label>
                <p className="text-sm text-green-700">
                  Anyone with this link can view your shared notes
                </p>
              </div>

              <div className="flex space-x-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="bg-white border-green-300 text-green-800"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={() => window.open(shareLink, '_blank')}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-3 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">What others will see:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Your username</li>
                  <li>• All your public notes and their titles</li>
                  <li>• Tags and content types</li>
                  <li>• Links to original content</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {!isSharing && (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <h4 className="font-medium text-gray-800 mb-3">How sharing works:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  Enable sharing to generate a unique public link
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  Share the link with friends, colleagues, or on social media
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  Others can view your notes but cannot edit or delete them
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  You can disable sharing at any time
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {!isSharing && (
            <Button 
              onClick={generateShareLink}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isGenerating ? 'Generating...' : 'Generate Share Link'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareBrainDialog;
