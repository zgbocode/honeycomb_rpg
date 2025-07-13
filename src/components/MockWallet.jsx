import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const MockWallet = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleMockConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay
    setTimeout(() => {
      const mockPublicKey = {
        toString: () => 'MockWallet123456789'
      };
      
      onConnect(mockPublicKey);
      setIsConnecting(false);
    }, 1000);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Demo Mode</h3>
        <p className="text-muted-foreground mb-4">
          Connect with a mock wallet to test the game features
        </p>
        <Button 
          onClick={handleMockConnect}
          disabled={isConnecting}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isConnecting ? 'Connecting...' : 'Connect Mock Wallet'}
        </Button>
      </CardContent>
    </Card>
  );
};

