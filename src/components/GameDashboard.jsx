import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SAMPLE_MISSIONS = [
  {
    id: 1,
    title: 'Cleanse the Code-Shrine',
    description: 'Identify and fix vulnerabilities in a smart contract to prevent Chain-Rot corruption.',
    difficulty: 'Easy',
    xpReward: 100,
    duration: '5 minutes',
    requirements: ['Code-Weaver Level 1'],
    status: 'available'
  },
  {
    id: 2,
    title: 'Fertilize the Community-Grove',
    description: 'Contribute to a DAO proposal and help grow the Web3 ecosystem.',
    difficulty: 'Medium',
    xpReward: 250,
    duration: '10 minutes',
    requirements: ['Community-Tender Level 1'],
    status: 'available'
  },
  {
    id: 3,
    title: 'Heal the Chain-Wound',
    description: 'Assist in recovering funds from a simulated protocol exploit.',
    difficulty: 'Hard',
    xpReward: 500,
    duration: '15 minutes',
    requirements: ['Chain-Healer Level 2'],
    status: 'locked'
  }
];

export const GameDashboard = ({ character, onStartMission }) => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [activeMission, setActiveMission] = useState(null);

  const handleStartMission = async (mission) => {
    setActiveMission(mission);
    try {
      await onStartMission(mission);
    } catch (error) {
      console.error('Error starting mission:', error);
      setActiveMission(null);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSpecializationEmoji = (specialization) => {
    switch (specialization) {
      case 'code-weaver': return '💻';
      case 'community-tender': return '🤝';
      case 'chain-healer': return '🛡️';
      default: return '🌿';
    }
  };

  return (
    <div className="space-y-6">
      {/* Character Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{getSpecializationEmoji(character.specialization)}</span>
            {character.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <p className="text-2xl font-bold">{character.level}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="text-2xl font-bold">{character.xp}</p>
              <Progress value={(character.xp % 1000) / 10} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {character.xp % 1000}/1000 XP to next level
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Specialization</p>
              <Badge className="mt-1">
                {character.specialization.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Content */}
      <Tabs defaultValue="missions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Missions</CardTitle>
              <p className="text-muted-foreground">
                Choose your next adventure to protect the Web3 Wilderness
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {SAMPLE_MISSIONS.map((mission) => (
                  <Card
                    key={mission.id}
                    className={`cursor-pointer transition-all ${
                      mission.status === 'locked' ? 'opacity-50' : 'hover:bg-gray-50'
                    } ${selectedMission?.id === mission.id ? 'ring-2 ring-green-500' : ''}`}
                    onClick={() => mission.status !== 'locked' && setSelectedMission(mission)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{mission.title}</h3>
                        <div className="flex gap-2">
                          <Badge className={getDifficultyColor(mission.difficulty)}>
                            {mission.difficulty}
                          </Badge>
                          {mission.status === 'locked' && (
                            <Badge variant="secondary">🔒 Locked</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex gap-4">
                          <span>⚡ {mission.xpReward} XP</span>
                          <span>⏱️ {mission.duration}</span>
                        </div>
                        {selectedMission?.id === mission.id && mission.status !== 'locked' && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartMission(mission);
                            }}
                            disabled={activeMission !== null}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {activeMission ? 'Mission Active...' : 'Start Mission'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your inventory is empty. Complete missions to earn resources!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No achievements yet. Start your journey to unlock them!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

