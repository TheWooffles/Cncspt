import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GameSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  availableTags: string[];
}

export const GameSearch = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  availableTags,
}: GameSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background-glass backdrop-blur-glass border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-background-glass backdrop-blur-glass border-glass-border hover:bg-glass-primary transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            {selectedTag || 'All Categories'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-popover backdrop-blur-glass border-glass-border">
          <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => onTagChange('')}
            className={selectedTag === '' ? 'bg-glass-primary' : ''}
          >
            All Categories
          </DropdownMenuItem>
          {availableTags.map((tag) => (
            <DropdownMenuItem 
              key={tag} 
              onClick={() => onTagChange(tag)}
              className={selectedTag === tag ? 'bg-glass-primary' : ''}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};