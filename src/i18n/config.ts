import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'pt-BR': {
    translation: {
      // Common
      loading: 'Carregando...',
      save: 'Salvar',
      cancel: 'Cancelar',
      submit: 'Enviar',
      
      // Dashboard
      dashboard: {
        title: 'Dashboard',
        totalSavings: 'Economia Total',
        goalsAchieved: 'Metas Alcançadas',
        currentStreak: 'Sequência Atual',
        activeGoals: 'Metas Ativas',
        welcomeBack: 'Bem-vindo de volta!',
        doingGreat: 'Você está indo muito bem! Continue rastreando seus gastos e alcançando suas metas financeiras.',
      },
      
      // Behavioral History
      behavioralHistory: {
        title: 'Histórico Comportamental',
        timeline: 'Linha do Tempo',
        insights: 'Insights',
        allTime: 'Todo o Tempo',
        thisMonth: 'Este Mês',
        thisWeek: 'Esta Semana',
        prev: 'Anterior',
        next: 'Próximo',
      },
      
      // Create Goal
      createGoal: {
        title: 'Criar Nova Meta',
        goalName: 'Nome da Meta',
        goalNamePlaceholder: 'Ex: Economizar para férias',
        description: 'Descrição',
        descriptionPlaceholder: 'Descreva sua meta...',
        duration: 'Duração (dias)',
        category: 'Categoria',
        categoryPlaceholder: 'Selecione uma categoria',
        goalType: 'Tipo de Meta',
        personal: 'Pessoal',
        professional: 'Profissional',
        createGoal: 'Criar Meta',
        goalCreated: 'Meta Criada com Sucesso!',
        createAnother: 'Criar Outra Meta',
      },
      
      // Emotional Support
      emotionalSupport: {
        title: 'Suporte Emocional',
        selfControlTips: 'Dicas de Autocontrole',
        progress: 'Progresso',
        yourCommitment: 'Seu Compromisso',
        commitmentPlaceholder: 'Escreva seu compromisso...',
        saveCommitment: 'Salvar Compromisso',
        commitmentSaved: 'Compromisso salvo!',
        noTips: 'Nenhuma dica disponível no momento.',
      },
      
      // Gamification
      gamification: {
        title: 'Gamificação',
        points: 'Pontos',
        level: 'Nível',
        badges: 'Emblemas',
        levelProgress: 'Nível 3: Resistente a Impulsos',
        toNextLevel: '60% para o próximo nível',
        achievements: 'Conquistas',
        leaderboard: 'Ranking',
        rank: 'Rank',
        user: 'Usuário',
      },
      
      // Rewards
      rewards: {
        title: 'Recompensas',
        availableRewards: 'Recompensas Disponíveis',
        unlock: 'Desbloquear',
        yourPoints: 'Seus Pontos',
        totalPoints: 'Pontos Totais',
        progressToNextReward: 'Progresso para a próxima recompensa:',
        morePointsNeeded: 'mais pontos necessários',
        unlocked: 'Desbloqueado!',
      },
      
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        goals: 'Metas',
        history: 'Histórico',
        support: 'Suporte',
        gamification: 'Gamificação',
        rewards: 'Recompensas',
        community: 'Comunidade',
        settings: 'Configurações',
        track: 'Rastrear',
        learn: 'Aprender',
        challenges: 'Desafios',
        transactions: 'Transações',
      },
    },
  },
  'en-US': {
    translation: {
      // Common
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      
      // Dashboard
      dashboard: {
        title: 'Dashboard',
        totalSavings: 'Total Savings',
        goalsAchieved: 'Goals Achieved',
        currentStreak: 'Current Streak',
        activeGoals: 'Active Goals',
        welcomeBack: 'Welcome Back!',
        doingGreat: 'You are doing great! Keep tracking your spending and achieving your financial goals.',
      },
      
      // Behavioral History
      behavioralHistory: {
        title: 'Behavioral History',
        timeline: 'Timeline',
        insights: 'Insights',
        allTime: 'All Time',
        thisMonth: 'This Month',
        thisWeek: 'This Week',
        prev: 'Previous',
        next: 'Next',
      },
      
      // Create Goal
      createGoal: {
        title: 'Create New Goal',
        goalName: 'Goal Name',
        goalNamePlaceholder: 'Ex: Save for vacation',
        description: 'Description',
        descriptionPlaceholder: 'Describe your goal...',
        duration: 'Duration (days)',
        category: 'Category',
        categoryPlaceholder: 'Select a category',
        goalType: 'Goal Type',
        personal: 'Personal',
        professional: 'Professional',
        createGoal: 'Create Goal',
        goalCreated: 'Goal Created Successfully!',
        createAnother: 'Create Another Goal',
      },
      
      // Emotional Support
      emotionalSupport: {
        title: 'Emotional Support',
        selfControlTips: 'Self-Control Tips',
        progress: 'Progress',
        yourCommitment: 'Your Commitment',
        commitmentPlaceholder: 'Write your commitment...',
        saveCommitment: 'Save Commitment',
        commitmentSaved: 'Commitment saved!',
        noTips: 'No tips available at the moment.',
      },
      
      // Gamification
      gamification: {
        title: 'Gamification',
        points: 'Points',
        level: 'Level',
        badges: 'Badges',
        levelProgress: 'Level 3: Impulse Resistant',
        toNextLevel: '60% to next level',
        achievements: 'Achievements',
        leaderboard: 'Leaderboard',
        rank: 'Rank',
        user: 'User',
      },
      
      // Rewards
      rewards: {
        title: 'Rewards',
        availableRewards: 'Available Rewards',
        unlock: 'Unlock',
        yourPoints: 'Your Points',
        totalPoints: 'Total Points',
        progressToNextReward: 'Progress to next reward:',
        morePointsNeeded: 'more points needed',
        unlocked: 'Unlocked!',
      },
      
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        goals: 'Goals',
        history: 'History',
        support: 'Support',
        gamification: 'Gamification',
        rewards: 'Rewards',
        community: 'Community',
        settings: 'Settings',
        track: 'Track',
        learn: 'Learn',
        challenges: 'Challenges',
        transactions: 'Transactions',
      },
    },
  },
  'es-ES': {
    translation: {
      // Common
      loading: 'Cargando...',
      save: 'Guardar',
      cancel: 'Cancelar',
      submit: 'Enviar',
      
      // Dashboard
      dashboard: {
        title: 'Panel',
        totalSavings: 'Ahorros Totales',
        goalsAchieved: 'Metas Alcanzadas',
        currentStreak: 'Racha Actual',
        activeGoals: 'Metas Activas',
        welcomeBack: '¡Bienvenido de nuevo!',
        doingGreat: '¡Lo estás haciendo muy bien! Sigue rastreando tus gastos y alcanzando tus metas financieras.',
      },
      
      // Behavioral History
      behavioralHistory: {
        title: 'Historial Conductual',
        timeline: 'Línea de Tiempo',
        insights: 'Perspectivas',
        allTime: 'Todo el Tiempo',
        thisMonth: 'Este Mes',
        thisWeek: 'Esta Semana',
        prev: 'Anterior',
        next: 'Siguiente',
      },
      
      // Create Goal
      createGoal: {
        title: 'Crear Nueva Meta',
        goalName: 'Nombre de la Meta',
        goalNamePlaceholder: 'Ej: Ahorrar para vacaciones',
        description: 'Descripción',
        descriptionPlaceholder: 'Describe tu meta...',
        duration: 'Duración (días)',
        category: 'Categoría',
        categoryPlaceholder: 'Selecciona una categoría',
        goalType: 'Tipo de Meta',
        personal: 'Personal',
        professional: 'Profesional',
        createGoal: 'Crear Meta',
        goalCreated: '¡Meta Creada Exitosamente!',
        createAnother: 'Crear Otra Meta',
      },
      
      // Emotional Support
      emotionalSupport: {
        title: 'Apoyo Emocional',
        selfControlTips: 'Consejos de Autocontrol',
        progress: 'Progreso',
        yourCommitment: 'Tu Compromiso',
        commitmentPlaceholder: 'Escribe tu compromiso...',
        saveCommitment: 'Guardar Compromiso',
        commitmentSaved: '¡Compromiso guardado!',
        noTips: 'No hay consejos disponibles en este momento.',
      },
      
      // Gamification
      gamification: {
        title: 'Gamificación',
        points: 'Puntos',
        level: 'Nivel',
        badges: 'Insignias',
        levelProgress: 'Nivel 3: Resistente a Impulsos',
        toNextLevel: '60% para el siguiente nivel',
        achievements: 'Logros',
        leaderboard: 'Clasificación',
        rank: 'Rango',
        user: 'Usuario',
      },
      
      // Rewards
      rewards: {
        title: 'Recompensas',
        availableRewards: 'Recompensas Disponibles',
        unlock: 'Desbloquear',
        yourPoints: 'Tus Puntos',
        totalPoints: 'Puntos Totales',
        progressToNextReward: 'Progreso para la siguiente recompensa:',
        morePointsNeeded: 'más puntos necesarios',
        unlocked: '¡Desbloqueado!',
      },
      
      // Navigation
      nav: {
        dashboard: 'Panel',
        goals: 'Metas',
        history: 'Historial',
        support: 'Apoyo',
        gamification: 'Gamificación',
        rewards: 'Recompensas',
        community: 'Comunidad',
        settings: 'Configuración',
        track: 'Rastrear',
        learn: 'Aprender',
        challenges: 'Desafíos',
        transactions: 'Transacciones',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
