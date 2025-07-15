# 🌿 Honeycomb Hero - Web3 RPG

**Protect the Web3 Wilderness as a Digital Druid**

Honeycomb Hero is a decentralized, text-based RPG built on Solana that leverages the Honeycomb Protocol for on-chain progression, player traits, and mission logic. Players take on the role of Digital Druids tasked with protecting the Web3 Wilderness from the corrupting influence of Chain-Rot.

## 🎮 Game Overview

In Honeycomb Hero, players create unique Digital Druid characters with specialized traits and embark on missions to earn experience points and level up their abilities. All progression and achievements are permanently recorded on-chain using Honeycomb Protocol, ensuring true ownership and portability of player data.

### Key Features

- **On-chain Character Progression**: Player levels, XP, and achievements stored permanently on Solana
- **Programmable Traits**: Three specialization paths with unique abilities and mission access
- **Mission System**: Engaging quests that teach Web3 concepts while rewarding players
- **Wallet Integration**: Seamless connection with Phantom, Solflare, and other Solana wallets
- **Demo Mode**: Test the game without wallet connection using mock data

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Blockchain**: Solana (Devnet)
- **Protocol**: Honeycomb Protocol for on-chain game mechanics
- **Wallet**: Solana Wallet Adapter for multi-wallet support

### Honeycomb Protocol Integration

The game integrates with Honeycomb Protocol to provide:

1. **Character Management**: On-chain character creation and trait assignment
2. **Mission Logic**: Verifiable mission completion and reward distribution
3. **Progression Tracking**: Persistent XP and level progression
4. **Profile System**: Decentralized player profiles with custom metadata

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- A Solana wallet (Phantom, Solflare, etc.) for full functionality

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zgbocode/honeycomb_rpg.git
cd honeycomb-hero
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Mode

For testing without a wallet, click "Connect Mock Wallet" to experience the full game functionality using local storage.

## 🎯 Gameplay

### Character Creation

Players begin by creating their Digital Druid and choosing one of three specializations:

- **💻 Code-Weaver**: Masters of technical skills and smart contract security
- **🤝 Community-Tender**: Experts in social coordination and DAO governance  
- **🛡️ Chain-Healer**: Specialists in security and protocol recovery

### Mission System

The game features three types of missions with increasing difficulty:

1. **Cleanse the Code-Shrine** (Easy - 100 XP)
   - Identify and fix vulnerabilities in smart contracts
   - Duration: 5 minutes
   - Requirements: Code-Weaver Level 1

2. **Fertilize the Community-Grove** (Medium - 250 XP)
   - Contribute to DAO proposals and ecosystem growth
   - Duration: 10 minutes
   - Requirements: Community-Tender Level 1

3. **Heal the Chain-Wound** (Hard - 500 XP)
   - Assist in recovering from protocol exploits
   - Duration: 15 minutes
   - Requirements: Chain-Healer Level 2

### Progression System

- **Experience Points (XP)**: Earned by completing missions
- **Levels**: Automatically calculated (1000 XP per level)
- **Specialization Traits**: Unlock new abilities and mission access
- **Achievements**: Track major milestones and accomplishments

## 🔧 Development

### Project Structure

```
honeycomb-hero/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── WalletProvider.jsx
│   │   ├── GameHeader.jsx
│   │   ├── CharacterCreation.jsx
│   │   ├── GameDashboard.jsx
│   │   └── MockWallet.jsx
│   ├── lib/
│   │   └── honeycomb.js  # Honeycomb Protocol integration
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   └── main.jsx          # Application entry point
├── package.json
└── README.md
```

### Key Components

- **WalletProvider**: Manages Solana wallet connections
- **CharacterCreation**: Handles new character setup and specialization selection
- **GameDashboard**: Main game interface with missions, inventory, and achievements
- **HoneycombService**: Abstraction layer for Honeycomb Protocol interactions

### Building for Production

```bash
pnpm run build
```

The built files will be available in the `dist/` directory.

## 🌐 Deployment

The game can be deployed to any static hosting service. For Solana-specific hosting:

1. Build the project: `pnpm run build`
2. Deploy the `dist/` folder to your hosting provider
3. Ensure the hosting service supports client-side routing

## 🔮 Future Roadmap

### Phase 2: Enhanced Features
- **Cooperative Missions**: Multi-player quests with shared rewards
- **Player-Created Content**: Community-driven mission creation tools
- **Advanced Trait System**: More specialization paths and abilities
- **Resource Crafting**: On-chain item creation and trading

### Phase 3: Community Governance
- **DAO Integration**: Community voting on game features and content
- **Tournament System**: Competitive events with leaderboards
- **Cross-Game Compatibility**: Character portability across Web3 games
- **Mobile App**: Native mobile experience with full feature parity

## 🤝 Contributing

We welcome contributions from the community! Please see our contributing guidelines for more information.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Honeycomb Protocol** for providing the on-chain infrastructure
- **Solana Foundation** for the robust blockchain platform
- **React Team** for the excellent frontend framework
- **shadcn/ui** for the beautiful component library


**Built with ❤️ for the Web3 gaming community**

