import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const DRUID_SPECIALIZATIONS = [
  {
    id: 'code-weaver',
    name: 'Code-Weaver',
    description: 'Masters of technical skills and smart contract security',
    emoji: '💻',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'community-tender',
    name: 'Community-Tender',
    description: 'Experts in social coordination and DAO governance',
    emoji: '🤝',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'chain-healer',
    name: 'Chain-Healer',
    description: 'Specialists in security and protocol recovery',
    emoji: '🛡️',
    color: 'bg-green-100 text-green-800'
  }
];

export const CharacterCreation = ({ onCreateCharacter }) => {
  const [druidName, setDruidName] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCharacter = async () => {
    if (!druidName || !selectedSpecialization) return;
    
    setIsCreating(true);
    try {
      await onCreateCharacter({
        name: druidName,
        specialization: selectedSpecialization
      });
    } catch (error) {
      console.error('Error creating character:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Create Your Digital Druid</CardTitle>
        <p className="text-center text-muted-foreground">
          Choose your path to protect the Web3 Wilderness
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="druid-name">Druid Name</Label>
          <Input
            id="druid-name"
            placeholder="Enter your druid's name..."
            value={druidName}
            onChange={(e) => setDruidName(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label>Choose Your Specialization</Label>
          <div className="grid gap-4">
            {DRUID_SPECIALIZATIONS.map((spec) => (
              <Card
                key={spec.id}
                className={`cursor-pointer transition-all ${
                  selectedSpecialization?.id === spec.id
                    ? 'ring-2 ring-green-500 bg-green-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSpecialization(spec)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{spec.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{spec.name}</h3>
                      <p className="text-sm text-muted-foreground">{spec.description}</p>
                    </div>
                    <Badge className={spec.color}>{spec.name}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button
          onClick={handleCreateCharacter}
          disabled={!druidName || !selectedSpecialization || isCreating}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isCreating ? 'Creating Druid...' : 'Create Digital Druid'}
        </Button>
      </CardContent>
    </Card>
  );
};

