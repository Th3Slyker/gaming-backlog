import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Plus, LogIn, LogOut, Play, Trophy, Sparkles, Search, Clock, CheckCircle, Heart, Target, X, Star, Calendar, Download, Upload, Share2, Shuffle, Moon, Sun, BarChart3, Tag, Bell, Timer, Award, Database } from 'lucide-react';

const FALLBACK_IMAGE = 'https://via.placeholder.com/300x400/4f46e5/ffffff?text=';

// Base de données de jeux populaires (80+ jeux)
const GAME_DATABASE = [
  { title: "The Last of Us Part II", platform: "PS5", genre: "Action-Aventure", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w6p.jpg", rating: 5 },
  { title: "God of War Ragnarök", platform: "PS5", genre: "Action-Aventure", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg", rating: 5 },
  { title: "Spider-Man 2", platform: "PS5", genre: "Action", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6qmu.jpg", rating: 5 },
  { title: "Horizon Forbidden West", platform: "PS5", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3pxz.jpg", rating: 5 },
  { title: "Returnal", platform: "PS5", genre: "Roguelike", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vcj.jpg", rating: 4 },
  { title: "Ghost of Tsushima", platform: "PS5", genre: "Action-Aventure", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg", rating: 5 },
  { title: "Bloodborne", platform: "PS5", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg", rating: 5 },
  { title: "Final Fantasy XVI", platform: "PS5", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5w5k.jpg", rating: 4 },
  { title: "Zelda: Tears of the Kingdom", platform: "Switch", genre: "Action-Aventure", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg", rating: 5 },
  { title: "Super Mario Odyssey", platform: "Switch", genre: "Platformer", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3oxh.jpg", rating: 5 },
  { title: "Animal Crossing: New Horizons", platform: "Switch", genre: "Simulation", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xuk.jpg", rating: 5 },
  { title: "Mario Kart 8 Deluxe", platform: "Switch", genre: "Course", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.jpg", rating: 5 },
  { title: "Smash Bros. Ultimate", platform: "Switch", genre: "Combat", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3w3f.jpg", rating: 5 },
  { title: "Pokémon Écarlate", platform: "Switch", genre: "RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5j66.jpg", rating: 4 },
  { title: "Metroid Dread", platform: "Switch", genre: "Metroidvania", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3w8m.jpg", rating: 5 },
  { title: "Splatoon 3", platform: "Switch", genre: "Shooter", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s4h.jpg", rating: 4 },
  { title: "Xenoblade Chronicles 3", platform: "Switch", genre: "JRPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4wwk.jpg", rating: 5 },
  { title: "Starfield", platform: "Xbox", genre: "RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6x7j.jpg", rating: 4 },
  { title: "Forza Horizon 5", platform: "Xbox", genre: "Course", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rm4.jpg", rating: 5 },
  { title: "Halo Infinite", platform: "Xbox", genre: "FPS", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2swy.jpg", rating: 4 },
  { title: "Elden Ring", platform: "PC", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg", rating: 5 },
  { title: "Baldur's Gate 3", platform: "PC", genre: "RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5w2q.jpg", rating: 5 },
  { title: "Cyberpunk 2077", platform: "PC", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6kq1.jpg", rating: 4 },
  { title: "The Witcher 3", platform: "PC", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ume.jpg", rating: 5 },
  { title: "Red Dead Redemption 2", platform: "PC", genre: "Action-Aventure", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg", rating: 5 },
  { title: "Counter-Strike 2", platform: "PC", genre: "FPS", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6yh1.jpg", rating: 5 },
  { title: "Valorant", platform: "PC", genre: "FPS", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.jpg", rating: 4 },
  { title: "Minecraft", platform: "PC", genre: "Sandbox", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3qxl.jpg", rating: 5 },
  { title: "Terraria", platform: "PC", genre: "Sandbox", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3x17.jpg", rating: 5 },
  { title: "Stardew Valley", platform: "PC", genre: "Simulation", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vg0.jpg", rating: 5 },
  { title: "Hades", platform: "PC", genre: "Roguelike", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2kw0.jpg", rating: 5 },
  { title: "Hollow Knight", platform: "PC", genre: "Metroidvania", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3pk0.jpg", rating: 5 },
  { title: "Dark Souls III", platform: "PC", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wws.jpg", rating: 5 },
  { title: "GTA V", platform: "PC", genre: "Action-Aventure", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg", rating: 5 },
  { title: "Portal 2", platform: "PC", genre: "Puzzle", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rs5.jpg", rating: 5 },
  { title: "Sekiro", platform: "PC", genre: "Action", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1irx.jpg", rating: 5 },
  { title: "Disco Elysium", platform: "PC", genre: "RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r74.jpg", rating: 5 },
  { title: "It Takes Two", platform: "PC", genre: "Aventure", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2w4x.jpg", rating: 5 },
  { title: "Hogwarts Legacy", platform: "PC", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6mq7.jpg", rating: 4 },
  { title: "Resident Evil 4 Remake", platform: "PC", genre: "Survival Horror", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6c6j.jpg", rating: 5 },
  { title: "Doom Eternal", platform: "PC", genre: "FPS", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qvv.jpg", rating: 5 },
  { title: "Monster Hunter World", platform: "PC", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xdb.jpg", rating: 5 },
  { title: "Persona 5 Royal", platform: "PC", genre: "JRPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ba4.jpg", rating: 5 },
  { title: "Mass Effect Legendary", platform: "PC", genre: "Action-RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3v8k.jpg", rating: 5 },
  { title: "Divinity: Original Sin 2", platform: "PC", genre: "RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r5g.jpg", rating: 5 },
  { title: "Cuphead", platform: "PC", genre: "Run and Gun", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1iux.jpg", rating: 5 },
  { title: "Celeste", platform: "PC", genre: "Platformer", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rdt.jpg", rating: 5 },
  { title: "Undertale", platform: "PC", genre: "RPG", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2tah.jpg", rating: 5 },
  { title: "Subnautica", platform: "PC", genre: "Survie", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ujf.jpg", rating: 5 },
  { title: "No Man's Sky", platform: "PC", genre: "Survie", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg", rating: 4 },
  { title: "Satisfactory", platform: "PC", genre: "Simulation", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8dlo.jpg", rating: 5 },
  { title: "Factorio", platform: "PC", genre: "Simulation", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xqa.jpg", rating: 5 },
  { title: "Slay the Spire", platform: "PC", genre: "Deckbuilder", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6h.jpg", rating: 5 },
  { title: "Dead Cells", platform: "PC", genre: "Roguelike", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49a8.jpg", rating: 5 },
  { title: "Valheim", platform: "PC", genre: "Survie", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2tfo.jpg", rating: 5 },
  { title: "Deep Rock Galactic", platform: "PC", genre: "FPS Coop", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2l7q.jpg", rating: 5 },
  { title: "Phasmophobia", platform: "PC", genre: "Horror Coop", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2txu.jpg", rating: 4 },
  { title: "Fortnite", platform: "PC", genre: "Battle Royale", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4sj3.jpg", rating: 4 },
  { title: "Apex Legends", platform: "PC", genre: "Battle Royale", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7a3t.jpg", rating: 4 },
  { title: "Rocket League", platform: "PC", genre: "Sport", imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6rui.jpg", rating: 4 }
];

export default function App() {
  const [games, setGames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [newGame, setNewGame] = useState({ 
    title: '', 
    imageUrl: '', 
    platform: '', 
    genre: '', 
    rating: 0,
    tags: [],
    notes: '',
    objectives: [],
    releaseDate: '',
    reminderDate: ''
  });
  const [draggedItem, setDraggedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [hoveredGame, setHoveredGame] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [timerActive, setTimerActive] = useState(null);
  const [timerStart, setTimerStart] = useState(null);
  const [customTags, setCustomTags] = useState([]);
  const [showGameBrowser, setShowGameBrowser] = useState(false);
  const [browserSearch, setBrowserSearch] = useState('');
  const [browserPlatform, setBrowserPlatform] = useState('all');

  useEffect(() => {
    loadUserData();
    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Vérifie toutes les minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoggedIn && username) {
      saveUserData();
    }
  }, [games, isLoggedIn, username, darkMode, customTags]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setGames(prevGames => prevGames.map(game => {
          if (game.id === timerActive) {
            const elapsed = Math.floor((Date.now() - timerStart) / 1000 / 60);
            return { ...game, playtime: (game.playtime || 0) + 1 };
          }
          return game;
        }));
      }, 60000); // Update chaque minute
    }
    return () => clearInterval(interval);
  }, [timerActive, timerStart]);

  const stats = useMemo(() => {
    const totalPlaytime = games.reduce((acc, g) => acc + (g.playtime || 0), 0);
    const avgRating = games.filter(g => g.rating > 0).reduce((acc, g) => acc + g.rating, 0) / games.filter(g => g.rating > 0).length || 0;
    
    return {
      total: games.length,
      playing: games.filter(g => g.status === 'playing').length,
      completed: games.filter(g => g.status === 'completed').length,
      wishlist: games.filter(g => g.status === 'wishlist').length,
      favorites: games.filter(g => g.isFavorite).length,
      totalPlaytime: totalPlaytime,
      avgRating: avgRating.toFixed(1),
      completionRate: games.length > 0 ? ((games.filter(g => g.status === 'completed').length / games.length) * 100).toFixed(0) : 0
    };
  }, [games]);

  const checkReminders = () => {
    const now = new Date();
    games.forEach(game => {
      if (game.reminderDate && new Date(game.reminderDate) <= now && !game.reminderShown) {
        if (Notification.permission === "granted") {
          new Notification(`🎮 Rappel: ${game.title}`, {
            body: `N'oublie pas de jouer à ${game.title} !`,
            icon: game.imageUrl
          });
        }
        setGames(prev => prev.map(g => 
          g.id === game.id ? {...g, reminderShown: true} : g
        ));
      }
    });
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const loadUserData = () => {
    try {
      const user = localStorage.getItem('current_user');
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
      }
      
      if (user) {
        setUsername(user);
        setIsLoggedIn(true);
        
        const gamesData = localStorage.getItem(`games_${user}`);
        const tagsData = localStorage.getItem(`tags_${user}`);
        
        if (gamesData) {
          setGames(JSON.parse(gamesData));
        }
        if (tagsData) {
          setCustomTags(JSON.parse(tagsData));
        }
      }
    } catch (error) {
      console.log('Pas de données sauvegardées');
    }
  };

  const saveUserData = () => {
    if (!username) return;
    
    try {
      localStorage.setItem(`games_${username}`, JSON.stringify(games));
      localStorage.setItem(`tags_${username}`, JSON.stringify(customTags));
      localStorage.setItem('darkMode', darkMode.toString());
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      alert('⚠️ Limite de stockage atteinte !');
    }
  };

  const handleLogin = () => {
    if (loginInput.trim()) {
      const user = loginInput.trim();
      setUsername(user);
      setIsLoggedIn(true);
      setLoginInput('');
      
      try {
        localStorage.setItem('current_user', user);
        const gamesData = localStorage.getItem(`games_${user}`);
        const tagsData = localStorage.getItem(`tags_${user}`);
        
        if (gamesData) setGames(JSON.parse(gamesData));
        if (tagsData) setCustomTags(JSON.parse(tagsData));
        
        requestNotificationPermission();
      } catch (error) {
        console.log('Nouveau compte créé');
      }
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('current_user');
    } catch (error) {
      console.log('Déconnexion');
    }
    setIsLoggedIn(false);
    setUsername('');
    setGames([]);
    setCustomTags([]);
  };

  const addGame = () => {
    if (newGame.title.trim()) {
      const game = {
        id: Date.now(),
        title: newGame.title.trim(),
        imageUrl: newGame.imageUrl.trim() || FALLBACK_IMAGE + encodeURIComponent(newGame.title),
        platform: newGame.platform.trim() || 'PC',
        genre: newGame.genre.trim() || 'Action',
        rating: newGame.rating || 0,
        status: 'wishlist',
        addedDate: Date.now(),
        playtime: 0,
        notes: newGame.notes || '',
        isFavorite: false,
        progress: 0,
        tags: newGame.tags || [],
        objectives: newGame.objectives || [],
        releaseDate: newGame.releaseDate || '',
        reminderDate: newGame.reminderDate || '',
        reminderShown: false
      };
      setGames([...games, game]);
      setNewGame({ 
        title: '', 
        imageUrl: '', 
        platform: '', 
        genre: '', 
        rating: 0,
        tags: [],
        notes: '',
        objectives: [],
        releaseDate: '',
        reminderDate: ''
      });
      setShowAddForm(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const addGameFromDatabase = (dbGame) => {
    const game = {
      id: Date.now(),
      title: dbGame.title,
      imageUrl: dbGame.imageUrl,
      platform: dbGame.platform,
      genre: dbGame.genre,
      rating: dbGame.rating || 0,
      status: 'wishlist',
      addedDate: Date.now(),
      playtime: 0,
      notes: '',
      isFavorite: false,
      progress: 0,
      tags: [],
      objectives: [],
      releaseDate: '',
      reminderDate: '',
      reminderShown: false
    };
    setGames([...games, game]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const deleteGame = (id) => {
    setGames(games.filter(game => game.id !== id));
    setSelectedGame(null);
  };

  const toggleFavorite = (id) => {
    setGames(games.map(game => 
      game.id === id ? {...game, isFavorite: !game.isFavorite} : game
    ));
  };

  const updateGameStatus = (id, status) => {
    setGames(games.map(game => 
      game.id === id ? {...game, status} : game
    ));
  };

  const updateGameRating = (id, rating) => {
    setGames(games.map(game => 
      game.id === id ? {...game, rating} : game
    ));
  };

  const updateGameProgress = (id, progress) => {
    const numProgress = Math.max(0, Math.min(100, parseInt(progress) || 0));
    setGames(games.map(game => 
      game.id === id ? {...game, progress: numProgress} : game
    ));
  };

  const updateGameNotes = (id, notes) => {
    setGames(games.map(game => 
      game.id === id ? {...game, notes} : game
    ));
  };

  const addTagToGame = (gameId, tag) => {
    setGames(games.map(game => 
      game.id === gameId ? {...game, tags: [...(game.tags || []), tag]} : game
    ));
  };

  const removeTagFromGame = (gameId, tagToRemove) => {
    setGames(games.map(game => 
      game.id === gameId ? {...game, tags: (game.tags || []).filter(t => t !== tagToRemove)} : game
    ));
  };

  const addObjectiveToGame = (gameId, objective) => {
    if (!objective.trim()) return;
    setGames(games.map(game => 
      game.id === gameId ? {
        ...game, 
        objectives: [...(game.objectives || []), { id: Date.now(), text: objective, completed: false }]
      } : game
    ));
  };

  const toggleObjective = (gameId, objectiveId) => {
    setGames(games.map(game => 
      game.id === gameId ? {
        ...game,
        objectives: (game.objectives || []).map(obj => 
          obj.id === objectiveId ? {...obj, completed: !obj.completed} : obj
        )
      } : game
    ));
  };

  const deleteObjective = (gameId, objectiveId) => {
    setGames(games.map(game => 
      game.id === gameId ? {
        ...game,
        objectives: (game.objectives || []).filter(obj => obj.id !== objectiveId)
      } : game
    ));
  };

  const startTimer = (gameId) => {
    setTimerActive(gameId);
    setTimerStart(Date.now());
  };

  const stopTimer = () => {
    if (timerActive && timerStart) {
      const elapsed = Math.floor((Date.now() - timerStart) / 1000 / 60);
      setGames(prevGames => prevGames.map(game => 
        game.id === timerActive ? {...game, playtime: (game.playtime || 0) + elapsed} : game
      ));
    }
    setTimerActive(null);
    setTimerStart(null);
  };

  const getRandomGame = () => {
    const playableGames = games.filter(g => g.status !== 'completed');
    if (playableGames.length > 0) {
      const random = playableGames[Math.floor(Math.random() * playableGames.length)];
      setSelectedGame(random);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const exportData = () => {
    const data = {
      games,
      customTags,
      username,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gaming-backlog-${username}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.games) {
            setGames(data.games);
            if (data.customTags) setCustomTags(data.customTags);
            alert('✅ Collection importée avec succès !');
          }
        } catch (error) {
          alert('❌ Erreur lors de l\'import du fichier');
        }
      };
      reader.readAsText(file);
    }
  };

  const shareCollection = () => {
    const shareText = `🎮 Ma collection Gaming Backlog Pro!\n\n📊 Stats:\n- ${stats.total} jeux au total\n- ${stats.completed} terminés\n- ${stats.playing} en cours\n- ${stats.wishlist} en wishlist\n- ${stats.totalPlaytime}h de jeu\n\n⭐ Note moyenne: ${stats.avgRating}/5`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Ma Collection Gaming',
        text: shareText
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert('📋 Texte copié dans le presse-papier !');
    }
  };

  const handleDragStart = (e, game) => {
    setDraggedItem(game);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, targetGame) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetGame.id) return;

    const draggedIndex = games.findIndex(g => g.id === draggedItem.id);
    const targetIndex = games.findIndex(g => g.id === targetGame.id);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newGames = [...games];
    newGames.splice(draggedIndex, 1);
    newGames.splice(targetIndex, 0, draggedItem);
    
    setGames(newGames);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        alert('⚠️ Image trop grande ! Maximum 500KB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewGame({...newGame, imageUrl: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE + encodeURIComponent('Game');
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR');
  };

  const formatPlaytime = (minutes) => {
    if (!minutes || minutes === 0) return '0h';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;
  };

  const filteredGames = useMemo(() => {
    return games
      .filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(game => filterPlatform === 'all' || game.platform === filterPlatform)
      .filter(game => filterStatus === 'all' || game.status === filterStatus)
      .filter(game => filterTag === 'all' || (game.tags || []).includes(filterTag))
      .sort((a, b) => {
        if (sortBy === 'priority') return 0;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'date') return b.addedDate - a.addedDate;
        if (sortBy === 'playtime') return (b.playtime || 0) - (a.playtime || 0);
        return 0;
      });
  }, [games, searchTerm, filterPlatform, filterStatus, filterTag, sortBy]);

  const platforms = useMemo(() => [...new Set(games.map(g => g.platform))], [games]);
  const allTags = useMemo(() => {
    const gameTags = games.flatMap(g => g.tags || []);
    return [...new Set([...customTags, ...gameTags])];
  }, [games, customTags]);

  const filteredBrowserGames = useMemo(() => {
    return GAME_DATABASE
      .filter(game => game.title.toLowerCase().includes(browserSearch.toLowerCase()))
      .filter(game => browserPlatform === 'all' || game.platform === browserPlatform)
      .filter(game => !games.some(g => g.title === game.title)); // Exclure les jeux déjà ajoutés
  }, [browserSearch, browserPlatform, games]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'wishlist': return 'from-blue-500/30 to-cyan-500/30 border-blue-400/30';
      case 'playing': return 'from-green-500/30 to-emerald-500/30 border-green-400/30';
      case 'completed': return 'from-purple-500/30 to-pink-500/30 border-purple-400/30';
      default: return 'from-gray-500/30 to-slate-500/30 border-gray-400/30';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'wishlist': return <Heart className="w-4 h-4" />;
      case 'playing': return <Play className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'wishlist': return 'Wishlist';
      case 'playing': return 'En cours';
      case 'completed': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  const hasActiveFilters = searchTerm || filterPlatform !== 'all' || filterStatus !== 'all' || filterTag !== 'all' || sortBy !== 'priority';

  const bgClass = darkMode 
    ? 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900'
    : 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100';

  const cardClass = darkMode
    ? 'bg-white/10 backdrop-blur-xl border-white/30'
    : 'bg-white/80 backdrop-blur-xl border-purple-200';

  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = darkMode ? 'text-white/70' : 'text-gray-600';

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className={`${cardClass} rounded-3xl p-10 max-w-md w-full border shadow-2xl relative z-10 transform hover:scale-105 transition-all duration-300`}>
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform shadow-lg">
              <Trophy className="w-12 h-12 text-white animate-bounce" />
            </div>
            <h1 className={`text-4xl font-black ${textClass} mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
              Gaming Backlog Pro
            </h1>
            <p className={`${textSecondaryClass} text-lg`}>Gère ta collection comme un pro ! 🎮</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Entre ton pseudo de gamer"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className={`w-full px-5 py-4 ${darkMode ? 'bg-white/20 border-white/30 text-white placeholder-white/60' : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all`}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg"
            >
              <LogIn className="w-5 h-5" />
              Let's Go !
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClass} p-4 md:p-8 relative overflow-hidden transition-colors duration-300`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: '1.5s'
              }}
            >
              {['🎮', '⭐', '🏆', '🎯', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`${cardClass} rounded-3xl p-6 mb-6 border shadow-2xl`}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className={`text-4xl font-black ${textClass} mb-2 flex items-center gap-3`}>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Collection de {username}
                </span>
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </h1>
              <p className={`${textSecondaryClass} text-lg`}>Ta bibliothèque gaming ultime ! 🚀</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowGameBrowser(!showGameBrowser)}
                className={`${darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500'} text-white px-4 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:scale-105 font-semibold`}
                title="Parcourir la bibliothèque"
              >
                <Database className="w-4 h-4" />
                <span className="hidden md:inline">Bibliothèque ({GAME_DATABASE.length} jeux)</span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-purple-500/20 hover:bg-purple-500/30'} ${textClass} px-4 py-3 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-purple-300'} hover:scale-105`}
                title="Changer de thème"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className={`${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-purple-500/20 hover:bg-purple-500/30'} ${textClass} px-4 py-3 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-purple-300'} hover:scale-105`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={getRandomGame}
                className={`${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-purple-500/20 hover:bg-purple-500/30'} ${textClass} px-4 py-3 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-purple-300'} hover:scale-105`}
                title="Jeu aléatoire"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={exportData}
                className={`${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-purple-500/20 hover:bg-purple-500/30'} ${textClass} px-4 py-3 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-purple-300'} hover:scale-105`}
                title="Exporter"
              >
                <Download className="w-4 h-4" />
              </button>
              <label
                className={`${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-purple-500/20 hover:bg-purple-500/30'} ${textClass} px-4 py-3 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-purple-300'} hover:scale-105 cursor-pointer`}
                title="Importer"
              >
                <Upload className="w-4 h-4" />
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
              <button
                onClick={shareCollection}
                className={`${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-purple-500/20 hover:bg-purple-500/30'} ${textClass} px-4 py-3 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-purple-300'} hover:scale-105`}
                title="Partager"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className={`${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-purple-500/20 hover:bg-purple-500/30'} ${textClass} px-5 py-3 rounded-xl flex items-center gap-2 transition-all backdrop-blur-sm border ${darkMode ? 'border-white/20' : 'border-purple-300'} hover:scale-105`}
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-blue-300" />
                <span className={`${textSecondaryClass} text-sm font-semibold`}>Wishlist</span>
              </div>
              <p className={`text-3xl font-black ${textClass}`}>{stats.wishlist}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Play className="w-6 h-6 text-green-300" />
                <span className={`${textSecondaryClass} text-sm font-semibold`}>En cours</span>
              </div>
              <p className={`text-3xl font-black ${textClass}`}>{stats.playing}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/30 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-purple-300" />
                <span className={`${textSecondaryClass} text-sm font-semibold`}>Terminés</span>
              </div>
              <p className={`text-3xl font-black ${textClass}`}>{stats.completed}</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/30 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-yellow-300" />
                <span className={`${textSecondaryClass} text-sm font-semibold`}>Total</span>
              </div>
              <p className={`text-3xl font-black ${textClass}`}>{stats.total}</p>
            </div>

            <div className="bg-gradient-to-br from-red-500/30 to-pink-500/30 backdrop-blur-sm rounded-2xl p-4 border border-red-400/30 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Timer className="w-6 h-6 text-red-300" />
                <span className={`${textSecondaryClass} text-sm font-semibold`}>Temps</span>
              </div>
              <p className={`text-3xl font-black ${textClass}`}>{formatPlaytime(stats.totalPlaytime)}</p>
            </div>
          </div>

          {/* Extended Stats */}
          {showStats && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-white/5' : 'bg-purple-50'} rounded-xl p-4 border ${darkMode ? 'border-white/10' : 'border-purple-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className={`${textSecondaryClass} text-sm font-semibold`}>Note moyenne</span>
                </div>
                <p className={`text-2xl font-black ${textClass}`}>{stats.avgRating} / 5</p>
              </div>
              
              <div className={`${darkMode ? 'bg-white/5' : 'bg-purple-50'} rounded-xl p-4 border ${darkMode ? 'border-white/10' : 'border-purple-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className={`${textSecondaryClass} text-sm font-semibold`}>Favoris</span>
                </div>
                <p className={`text-2xl font-black ${textClass}`}>{stats.favorites}</p>
              </div>
              
              <div className={`${darkMode ? 'bg-white/5' : 'bg-purple-50'} rounded-xl p-4 border ${darkMode ? 'border-white/10' : 'border-purple-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className={`${textSecondaryClass} text-sm font-semibold`}>Taux de complétion</span>
                </div>
                <p className={`text-2xl font-black ${textClass}`}>{stats.completionRate}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Filters & Search */}
        <div className={`${cardClass} rounded-3xl p-6 mb-6 border shadow-2xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Rechercher un jeu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white placeholder-white/60' : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all`}
              />
            </div>

            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className={`px-4 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-purple-200 text-gray-900'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all`}
              style={{color: darkMode ? 'white' : '#1f2937'}}
            >
              <option value="all" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🎮 Toutes plateformes</option>
              {platforms.map(p => <option key={p} value={p} style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>{p}</option>)}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-purple-200 text-gray-900'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all`}
              style={{color: darkMode ? 'white' : '#1f2937'}}
            >
              <option value="all" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>📍 Tous statuts</option>
              <option value="wishlist" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>💙 Wishlist</option>
              <option value="playing" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🎮 En cours</option>
              <option value="completed" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>✅ Terminés</option>
            </select>

            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className={`px-4 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-purple-200 text-gray-900'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all`}
              style={{color: darkMode ? 'white' : '#1f2937'}}
            >
              <option value="all" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🏷️ Tous tags</option>
              {allTags.map(tag => <option key={tag} value={tag} style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>{tag}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-purple-200 text-gray-900'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all`}
              style={{color: darkMode ? 'white' : '#1f2937'}}
            >
              <option value="priority" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🎯 Priorité</option>
              <option value="title" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>📝 Titre A-Z</option>
              <option value="rating" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>⭐ Note</option>
              <option value="date" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>📅 Date</option>
              <option value="playtime" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>⏱️ Temps de jeu</option>
            </select>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-xl text-yellow-200 text-sm">
              ⚠️ Le glisser-déposer est désactivé quand des filtres sont actifs
            </div>
          )}

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            {showAddForm ? 'Fermer' : 'Ajouter un jeu'}
          </button>
        </div>

        {/* Add Game Form */}
        {showAddForm && (
          <div className={`${cardClass} rounded-3xl p-6 mb-6 border shadow-2xl`}>
            <h2 className={`text-2xl font-bold ${textClass} mb-4`}>Nouveau jeu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="🎮 Nom du jeu *"
                value={newGame.title}
                onChange={(e) => setNewGame({...newGame, title: e.target.value})}
                onKeyDown={(e) => e.key === 'Enter' && addGame()}
                className={`px-5 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white placeholder-white/60' : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="block px-5 py-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-2 border-blue-400/50 rounded-xl text-white font-semibold cursor-pointer hover:from-blue-500/50 hover:to-cyan-500/50 transition-all text-center"
                >
                  📸 {newGame.imageUrl ? 'Image chargée ✓' : 'Choisir une image'}
                </label>
              </div>

              <input
                type="text"
                placeholder="🎯 Plateforme (PS5, Switch, PC...)"
                value={newGame.platform}
                onChange={(e) => setNewGame({...newGame, platform: e.target.value})}
                className={`px-5 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white placeholder-white/60' : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />
              
              <input
                type="text"
                placeholder="🎭 Genre (Action, RPG...)"
                value={newGame.genre}
                onChange={(e) => setNewGame({...newGame, genre: e.target.value})}
                className={`px-5 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white placeholder-white/60' : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />

              <input
                type="date"
                placeholder="📅 Date de sortie"
                value={newGame.releaseDate}
                onChange={(e) => setNewGame({...newGame, releaseDate: e.target.value})}
                className={`px-5 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-purple-200 text-gray-900'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />

              <input
                type="datetime-local"
                placeholder="🔔 Rappel"
                value={newGame.reminderDate}
                onChange={(e) => setNewGame({...newGame, reminderDate: e.target.value})}
                className={`px-5 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-purple-200 text-gray-900'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />

              <textarea
                placeholder="📝 Notes..."
                value={newGame.notes}
                onChange={(e) => setNewGame({...newGame, notes: e.target.value})}
                className={`col-span-full px-5 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white placeholder-white/60' : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[100px]`}
              />
            </div>
            
            <button
              onClick={addGame}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Ajouter à ma collection
            </button>
          </div>
        )}

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
          <div className={`${cardClass} rounded-3xl p-16 border text-center shadow-2xl`}>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Target className={`w-16 h-16 ${textClass}`} />
            </div>
            <p className={`${textClass} text-2xl font-bold mb-2`}>Aucun jeu trouvé</p>
            <p className={`${textSecondaryClass} text-lg`}>Ajoute ton premier jeu ! 🎯</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredGames.map((game, index) => (
              <div
                key={game.id}
                draggable={!hasActiveFilters}
                onDragStart={(e) => !hasActiveFilters && handleDragStart(e, game)}
                onDragOver={(e) => !hasActiveFilters && handleDragOver(e, game)}
                onDragEnd={handleDragEnd}
                onClick={() => setSelectedGame(game)}
                className={`${cardClass} rounded-2xl overflow-hidden border-2 hover:border-purple-400 transition-all group transform hover:scale-105 shadow-xl cursor-pointer`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    {!hasActiveFilters && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                        #{index + 1}
                      </div>
                    )}
                    {game.isFavorite && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg animate-pulse">
                        ❤️
                      </div>
                    )}
                    {(game.tags || []).slice(0, 2).map(tag => (
                      <div key={tag} className="bg-purple-500/80 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        {tag}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(game.id);
                    }}
                    className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all"
                  >
                    <Heart className={`w-5 h-5 ${game.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`bg-gradient-to-r ${getStatusColor(game.status)} backdrop-blur-sm rounded-lg p-2 flex items-center justify-center gap-2 border`}>
                      {getStatusIcon(game.status)}
                      <span className="text-white text-sm font-bold">{getStatusText(game.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className={`${textClass} font-bold text-lg mb-2 line-clamp-1`}>{game.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${textSecondaryClass} text-sm`}>{game.platform}</span>
                    <span className={`${textSecondaryClass} text-sm`}>{game.genre}</span>
                  </div>
                  
                  {game.playtime > 0 && (
                    <div className="mb-2">
                      <span className={`${textSecondaryClass} text-xs flex items-center gap-1`}>
                        <Timer className="w-3 h-3" />
                        {formatPlaytime(game.playtime)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 cursor-pointer transition-all ${
                          star <= game.rating ? 'fill-yellow-400 text-yellow-400' : darkMode ? 'text-white/30' : 'text-gray-300'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateGameRating(game.id, star);
                        }}
                      />
                    ))}
                  </div>

                  {game.status === 'playing' && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`${textSecondaryClass} text-xs`}>Progression</span>
                        <span className={`${textClass} text-xs font-bold`}>{game.progress}%</span>
                      </div>
                      <div className={`w-full ${darkMode ? 'bg-white/20' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-300"
                          style={{ width: `${game.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newStatus = game.status === 'wishlist' ? 'playing' : game.status === 'playing' ? 'completed' : 'wishlist';
                        updateGameStatus(game.id, newStatus);
                      }}
                      className={`flex-1 ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-purple-100 hover:bg-purple-200'} ${textClass} text-xs py-2 rounded-lg transition-all`}
                    >
                      Changer statut
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Supprimer "${game.title}" ?`)) {
                          deleteGame(game.id);
                        }
                      }}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Browser Modal */}
      {showGameBrowser && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setShowGameBrowser(false)}
        >
          <div 
            className={`${darkMode ? 'bg-gradient-to-br from-purple-900/95 to-indigo-900/95' : 'bg-white'} backdrop-blur-xl rounded-3xl max-w-6xl w-full border-2 ${darkMode ? 'border-white/30' : 'border-purple-200'} shadow-2xl overflow-hidden my-8`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={`text-3xl font-black ${textClass} flex items-center gap-3`}>
                    <Database className="w-8 h-8 text-purple-400" />
                    Bibliothèque de jeux
                  </h2>
                  <p className={`${textSecondaryClass} mt-1`}>{GAME_DATABASE.length} jeux populaires disponibles</p>
                </div>
                <button
                  onClick={() => setShowGameBrowser(false)}
                  className="bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Rechercher dans la bibliothèque..."
                    value={browserSearch}
                    onChange={(e) => setBrowserSearch(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white placeholder-white/60' : 'bg-white border-purple-200 text-gray-900 placeholder-gray-400'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all`}
                  />
                </div>

                <select
                  value={browserPlatform}
                  onChange={(e) => setBrowserPlatform(e.target.value)}
                  className={`px-4 py-3 ${darkMode ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-purple-200 text-gray-900'} border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all`}
                  style={{color: darkMode ? 'white' : '#1f2937'}}
                >
                  <option value="all" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🎮 Toutes plateformes</option>
                  <option value="PC" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>💻 PC</option>
                  <option value="PS5" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🎮 PS5</option>
                  <option value="Switch" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🕹️ Switch</option>
                  <option value="Xbox" style={{backgroundColor: darkMode ? '#1e1b4b' : 'white', color: darkMode ? 'white' : '#1f2937'}}>🎮 Xbox</option>
                </select>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {filteredBrowserGames.length === 0 ? (
                <div className="text-center py-12">
                  <Target className={`w-16 h-16 ${textSecondaryClass} mx-auto mb-4`} />
                  <p className={`${textClass} text-xl font-bold mb-2`}>Aucun jeu trouvé</p>
                  <p className={`${textSecondaryClass}`}>Modifie tes filtres ou tous ces jeux sont déjà dans ta collection ! 🎉</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredBrowserGames.map((game, index) => (
                    <div
                      key={index}
                      className={`${cardClass} rounded-xl overflow-hidden border-2 hover:border-purple-400 transition-all group transform hover:scale-105 shadow-lg cursor-pointer`}
                      onClick={() => {
                        addGameFromDatabase(game);
                        setShowGameBrowser(false);
                      }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Plus className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < game.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className={`${textClass} font-bold text-sm mb-1 line-clamp-2`}>{game.title}</h3>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`${textSecondaryClass}`}>{game.platform}</span>
                          <span className={`${textSecondaryClass}`}>{game.genre}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Game Detail Modal */}
      {selectedGame && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedGame(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gradient-to-br from-purple-900/95 to-indigo-900/95' : 'bg-white'} backdrop-blur-xl rounded-3xl max-w-2xl w-full border-2 ${darkMode ? 'border-white/30' : 'border-purple-200'} shadow-2xl overflow-hidden my-8`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedGame.imageUrl}
                alt={selectedGame.title}
                className="w-full h-64 object-cover"
                onError={handleImageError}
              />
              <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-purple-900 via-purple-900/60' : 'bg-gradient-to-t from-white via-white/60'} to-transparent`}></div>
              
              <button
                onClick={() => setSelectedGame(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{selectedGame.title}</h2>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    {selectedGame.platform}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    {selectedGame.genre}
                  </span>
                  {selectedGame.playtime > 0 && (
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {formatPlaytime(selectedGame.playtime)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Timer */}
              <div>
                <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>⏱️ Timer de jeu</label>
                {timerActive === selectedGame.id ? (
                  <button
                    onClick={stopTimer}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Clock className="w-5 h-5 animate-pulse" />
                    Arrêter le timer
                  </button>
                ) : (
                  <button
                    onClick={() => startTimer(selectedGame.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Démarrer le timer
                  </button>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>⭐ Note</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition-all hover:scale-110 ${
                        star <= selectedGame.rating ? 'fill-yellow-400 text-yellow-400' : darkMode ? 'text-white/30 hover:text-yellow-200' : 'text-gray-300 hover:text-yellow-400'
                      }`}
                      onClick={() => updateGameRating(selectedGame.id, star)}
                    />
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>📍 Statut</label>
                <div className="grid grid-cols-3 gap-2">
                  {['wishlist', 'playing', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateGameStatus(selectedGame.id, status)}
                      className={`py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                        selectedGame.status === status
                          ? `bg-gradient-to-r ${getStatusColor(status)} border-2 text-white`
                          : darkMode ? 'bg-white/10 text-white/60 hover:bg-white/20 border-2 border-transparent' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(status)}
                        <span className="text-sm">{getStatusText(status)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress */}
              {selectedGame.status === 'playing' && (
                <div>
                  <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>
                    📊 Progression: {selectedGame.progress}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedGame.progress}
                    onChange={(e) => updateGameProgress(selectedGame.id, e.target.value)}
                    className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${selectedGame.progress}%, ${darkMode ? 'rgba(255,255,255,0.2)' : '#e5e7eb'} ${selectedGame.progress}%, ${darkMode ? 'rgba(255,255,255,0.2)' : '#e5e7eb'} 100%)`
                    }}
                  />
                  <div className={`flex justify-between ${textSecondaryClass} text-xs mt-1`}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>🏷️ Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(selectedGame.tags || []).map(tag => (
                    <span key={tag} className="bg-purple-500/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => removeTagFromGame(selectedGame.id, tag)}
                        className="hover:text-red-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nouveau tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTag.trim()) {
                        addTagToGame(selectedGame.id, newTag.trim());
                        if (!customTags.includes(newTag.trim())) {
                          setCustomTags([...customTags, newTag.trim()]);
                        }
                        setNewTag('');
                      }
                    }}
                    className={`flex-1 px-3 py-2 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm`}
                  />
                  <button
                    onClick={() => {
                      if (newTag.trim()) {
                        addTagToGame(selectedGame.id, newTag.trim());
                        if (!customTags.includes(newTag.trim())) {
                          setCustomTags([...customTags, newTag.trim()]);
                        }
                        setNewTag('');
                      }
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>🎯 Objectifs</label>
                <div className="space-y-2 mb-2">
                  {(selectedGame.objectives || []).map(obj => (
                    <div key={obj.id} className={`flex items-center gap-2 p-2 ${darkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg`}>
                      <input
                        type="checkbox"
                        checked={obj.completed}
                        onChange={() => toggleObjective(selectedGame.id, obj.id)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className={`flex-1 ${obj.completed ? 'line-through opacity-50' : ''} ${textClass} text-sm`}>
                        {obj.text}
                      </span>
                      <button
                        onClick={() => deleteObjective(selectedGame.id, obj.id)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nouvel objectif..."
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newObjective.trim()) {
                        addObjectiveToGame(selectedGame.id, newObjective);
                        setNewObjective('');
                      }
                    }}
                    className={`flex-1 px-3 py-2 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm`}
                  />
                  <button
                    onClick={() => {
                      if (newObjective.trim()) {
                        addObjectiveToGame(selectedGame.id, newObjective);
                        setNewObjective('');
                      }
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>📝 Notes</label>
                <textarea
                  value={selectedGame.notes || ''}
                  onChange={(e) => updateGameNotes(selectedGame.id, e.target.value)}
                  placeholder="Ajoute tes notes, impressions, astuces..."
                  className={`w-full px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder-white/50' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[100px]`}
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>📅 Sortie</label>
                  <div className={`${textClass} text-sm`}>
                    {selectedGame.releaseDate ? formatDate(new Date(selectedGame.releaseDate).getTime()) : 'Non définie'}
                  </div>
                </div>
                <div>
                  <label className={`${textSecondaryClass} text-sm font-semibold mb-2 block`}>📆 Ajouté</label>
                  <div className={`${textClass} text-sm`}>
                    {formatDate(selectedGame.addedDate)}
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (window.confirm(`Supprimer "${selectedGame.title}" ?`)) {
                    deleteGame(selectedGame.id);
                  }
                }}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 border border-red-400/30"
              >
                <Trash2 className="w-5 h-5" />
                Supprimer ce jeu
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer Credit */}
<div className="text-center mt-8 pb-6">
  <p className={`${textSecondaryClass} text-xs opacity-50`}>
    Made with ❤️ by Slyker
  </p>
</div>
    </div>
  );
}
