'use client';

interface Objective {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface LabObjectivesProps {
  objectives: Objective[];
  onValidate?: () => void;
  validating?: boolean;
}

export default function LabObjectives({ objectives, onValidate, validating }: LabObjectivesProps) {
  const completed = objectives.filter(o => o.completed).length;
  const total = objectives.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-dark-700/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white">Objectives</h3>
          <span className="text-xs text-dark-400">{completed}/{total}</span>
        </div>
        <div className="progress-bar">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Objectives List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {objectives.map((objective, idx) => (
          <div
            key={objective.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
              objective.completed
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-dark-800/30 border-dark-700/30'
            }`}
          >
            {/* Status icon */}
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
              objective.completed
                ? 'bg-green-500/20 text-green-400'
                : 'bg-dark-700 text-dark-500'
            }`}>
              {objective.completed ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-xs font-medium">{idx + 1}</span>
              )}
            </div>

            {/* Content */}
            <div>
              <p className={`text-sm font-medium ${
                objective.completed ? 'text-green-400 line-through opacity-70' : 'text-white'
              }`}>
                {objective.title}
              </p>
              {objective.description && (
                <p className="text-xs text-dark-400 mt-0.5">{objective.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Validate Button */}
      <div className="p-4 border-t border-dark-700/50">
        <button
          onClick={onValidate}
          disabled={validating}
          className="w-full btn-primary text-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {validating ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Validating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check Objectives
            </>
          )}
        </button>
      </div>
    </div>
  );
}
