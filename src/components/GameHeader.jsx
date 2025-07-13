import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardContent } from '@/components/ui/card';

export const GameHeader = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-600">🌿 Honeycomb Hero</h1>
            <p className="text-muted-foreground">Protect the Web3 Wilderness as a Digital Druid</p>
          </div>
          <div className="flex items-center gap-4">
            <WalletMultiButton className="!bg-green-600 hover:!bg-green-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

