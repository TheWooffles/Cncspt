import { Gamepad2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background-glass backdrop-blur-glass border-t border-glass-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Cncspt</h3>
              <p className="text-sm text-muted-foreground">Your ultimate gaming destination</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © 2024 Cncspt. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with ❤ by Cncspt (Formerly Wooffles)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};