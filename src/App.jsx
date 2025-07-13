import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletContextProvider } from './components/WalletProvider';
import { GameHeader } from './components/GameHeader';
import { CharacterCreation } from './components/CharacterCreation';
import { GameDashboard } from './components/GameDashboard';
import { MockWallet } from './components/MockWallet';
import { honeycombService } from './lib/honeycomb';
import './App.css';

function GameContent() {
  const { connected, publicKey } = useWallet();
  const [character, setCharacter] = useState(null);
  const [gameState, setGameState] = useState('loading'); // loading, character-creation, playing
  const [mockWallet, setMockWallet] = useState(null);
  const [honeycombInitialized, setHoneycombInitialized] = useState(false);

  // Use either real wallet or mock wallet
  const activeWallet = connected ? publicKey : mockWallet;
  const isWalletConnected = connected || mockWallet !== null;

  // Initialize Honeycomb Protocol
  useEffect(() => {
    const initHoneycomb = async () => {
      try {
        await honeycombService.initialize();
        setHoneycombInitialized(true);
        console.log('Honeycomb Protocol initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Honeycomb Protocol:', error);
        // Continue with localStorage fallback
        setHoneycombInitialized(false);
      }
    };

    initHoneycomb();
  }, []);

  useEffect(() => {
    if (isWalletConnected && activeWallet) {
      loadCharacterData();
    } else {
      setGameState('loading');
      setCharacter(null);
    }
  }, [isWalletConnected, activeWallet, honeycombInitialized]);

  const loadCharacterData = async () => {
    try {
      let savedCharacter = null;

      if (honeycombInitialized) {
        // Try to load from Honeycomb Protocol first
        savedCharacter = await honeycombService.getCharacterProfile(activeWallet);
      }

      if (!savedCharacter) {
        // Fallback to localStorage
        const localCharacter = localStorage.getItem(`character_${activeWallet.toString()}`);
        if (localCharacter) {
          savedCharacter = JSON.parse(localCharacter);
        }
      }

      if (savedCharacter) {
        setCharacter(savedCharacter);
        setGameState('playing');
      } else {
        setGameState('character-creation');
      }
    } catch (error) {
      console.error('Error loading character data:', error);
      setGameState('character-creation');
    }
  };

  const handleMockWalletConnect = (mockPublicKey) => {
    setMockWallet(mockPublicKey);
  };

  const handleCreateCharacter = async (characterData) => {
    try {
      const newCharacter = {
        id: Date.now(),
        name: characterData.name,
        specialization: characterData.specialization.id,
        level: 1,
        xp: 0,
        createdAt: new Date().toISOString(),
        walletAddress: activeWallet.toString()
      };

      if (honeycombInitialized) {
        // Create character using Honeycomb Protocol
        const result = await honeycombService.createCharacter(activeWallet, newCharacter);
        if (result.success) {
          newCharacter.honeycombAddress = result.characterAddress;
          console.log('Character created on-chain with Honeycomb Protocol');
        }
      }

      // Save to localStorage as backup
      localStorage.setItem(`character_${activeWallet.toString()}`, JSON.stringify(newCharacter));
      setCharacter(newCharacter);
      setGameState('playing');
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Failed to create character. Please try again.');
    }
  };

  const handleStartMission = async (mission) => {
    try {
      if (honeycombInitialized && character.honeycombAddress) {
        // Start mission using Honeycomb Protocol
        const result = await honeycombService.startMission(character.honeycombAddress, mission.id);
        if (result.success) {
          console.log('Mission started on-chain with Honeycomb Protocol');
        }
      }

      // Simulate mission completion after a delay
      setTimeout(async () => {
        try {
          const updatedCharacter = {
            ...character,
            xp: character.xp + mission.xpReward,
            level: Math.floor((character.xp + mission.xpReward) / 1000) + 1
          };

          if (honeycombInitialized && character.honeycombAddress) {
            // Complete mission and update XP using Honeycomb Protocol
            await honeycombService.completeMission(
              character.honeycombAddress, 
              mission.id, 
              { xp: mission.xpReward }
            );
            await honeycombService.updateCharacterXP(character.honeycombAddress, mission.xpReward);
            console.log('Mission completed on-chain with Honeycomb Protocol');
          }

          // Update localStorage as backup
          localStorage.setItem(`character_${activeWallet.toString()}`, JSON.stringify(updatedCharacter));
          setCharacter(updatedCharacter);
          
          alert(`Mission completed! You earned ${mission.xpReward} XP! ${honeycombInitialized ? '(Recorded on-chain)' : '(Local storage)'}`);
        } catch (error) {
          console.error('Error completing mission:', error);
        }
      }, 3000);
    } catch (error) {
      console.error('Error starting mission:', error);
      alert('Failed to start mission. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <GameHeader />
        
        {/* Honeycomb Status Indicator */}
        <div className="mb-4 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            honeycombInitialized 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              honeycombInitialized ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            {honeycombInitialized 
              ? 'Honeycomb Protocol Connected' 
              : 'Running in Demo Mode (Local Storage)'}
          </div>
        </div>
        
        {!isWalletConnected && (
          <div className="text-center py-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome to Honeycomb Hero</h2>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to begin your journey as a Digital Druid
              </p>
              <div className="text-6xl mb-4">🌿</div>
            </div>
            
            <div className="max-w-md mx-auto">
              <MockWallet onConnect={handleMockWalletConnect} />
            </div>
          </div>
        )}

        {isWalletConnected && gameState === 'character-creation' && (
          <CharacterCreation onCreateCharacter={handleCreateCharacter} />
        )}

        {isWalletConnected && gameState === 'playing' && character && (
          <GameDashboard character={character} onStartMission={handleStartMission} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <WalletContextProvider>
      <GameContent />
    </WalletContextProvider>
  );
}

export default App;

