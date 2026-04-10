import { useCallback, useState } from 'react';
import { InterviewScreen } from './screens/InterviewScreen';
import { LandingScreen } from './screens/LandingScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import type {
  Difficulty,
  FinalInsightPayload,
  InterviewSession,
  InterviewType,
  PersonalityId,
  ScreenId,
} from './types';

type LandingConfig = {
  userName: string;
  userRole: string;
  interviewType: InterviewType;
  difficulty: Difficulty;
  personality: PersonalityId;
};

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('landing');
  const [config, setConfig] = useState<LandingConfig | null>(null);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [insights, setInsights] = useState<FinalInsightPayload | null>(null);

  const handleStart = useCallback((c: LandingConfig) => {
    setConfig(c);
    setScreen('interview');
  }, []);

  const handleFinish = useCallback(
    (payload: { session: InterviewSession; insights: FinalInsightPayload }) => {
      setSession(payload.session);
      setInsights(payload.insights);
      setScreen('results');
    },
    [],
  );

  if (screen === 'landing') {
    return <LandingScreen onStart={handleStart} />;
  }

  if (screen === 'interview' && config) {
    return (
      <InterviewScreen
        userName={config.userName}
        userRole={config.userRole}
        interviewType={config.interviewType}
        difficulty={config.difficulty}
        personality={config.personality}
        onFinish={handleFinish}
        onExitToLanding={() => {
          setScreen('landing');
          setConfig(null);
        }}
      />
    );
  }

  if (screen === 'results' && session && insights) {
    return (
      <ResultsScreen
        session={session}
        insights={insights}
        onTryAgain={() => {
          if (config) setScreen('interview');
        }}
        onNewInterview={() => {
          setSession(null);
          setInsights(null);
          setConfig(null);
          setScreen('landing');
        }}
      />
    );
  }

  return null;
}
