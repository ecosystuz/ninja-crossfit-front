export type TrainingGoal = '' | 'weight-loss' | 'muscle-gain'

export const useTrainingGoal = () => useState<TrainingGoal>('training-goal', () => '')
