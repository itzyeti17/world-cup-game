import React, { useMemo, useState } from 'react';

const TEAMS = [
  { name: 'United States', confederation: 'CONCACAF', region: 'North America', titles: 0, best: 'Third place', clue: 'One of the three host nations.' },
  { name: 'Mexico', confederation: 'CONCACAF', region: 'North America', titles: 0, best: 'Quarter-finals', clue: 'One of the three host nations.' },
  { name: 'Canada', confederation: 'CONCACAF', region: 'North America', titles: 0, best: 'Group stage', clue: 'One of the three host nations.' },
  { name: 'Panama', confederation: 'CONCACAF', region: 'Central America', titles: 0, best: 'Group stage', clue: 'Made its World Cup debut in 2018.' },
  { name: 'Curacao', confederation: 'CONCACAF', region: 'Caribbean', titles: 0, best: 'Debut in 2026', clue: 'Caribbean nation making its World Cup debut.' },
  { name: 'Haiti', confederation: 'CONCACAF', region: 'Caribbean', titles: 0, best: 'Group stage', clue: 'Caribbean nation returning to the World Cup.' },
  { name: 'Argentina', confederation: 'CONMEBOL', region: 'South America', titles: 3, best: 'Champions', clue: 'The defending world champion.' },
  { name: 'Brazil', confederation: 'CONMEBOL', region: 'South America', titles: 5, best: 'Champions', clue: 'The only nation with five World Cup titles.' },
  { name: 'Colombia', confederation: 'CONMEBOL', region: 'South America', titles: 0, best: 'Quarter-finals', clue: 'South American side known for yellow shirts.' },
  { name: 'Ecuador', confederation: 'CONMEBOL', region: 'South America', titles: 0, best: 'Round of 16', clue: 'Andean nation from South America.' },
  { name: 'Paraguay', confederation: 'CONMEBOL', region: 'South America', titles: 0, best: 'Quarter-finals', clue: 'South American team with red-and-white stripes.' },
  { name: 'Uruguay', confederation: 'CONMEBOL', region: 'South America', titles: 2, best: 'Champions', clue: 'Won the first FIFA World Cup in 1930.' },
  { name: 'England', confederation: 'UEFA', region: 'Europe', titles: 1, best: 'Champions', clue: 'European team that won the 1966 World Cup.' },
  { name: 'France', confederation: 'UEFA', region: 'Europe', titles: 2, best: 'Champions', clue: 'European powerhouse with two World Cup titles.' },
  { name: 'Croatia', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Runners-up', clue: 'Reached the 2018 World Cup final.' },
  { name: 'Norway', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Round of 16', clue: 'Nordic team returning to the World Cup.' },
  { name: 'Portugal', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Third place', clue: 'European team long associated with Cristiano Ronaldo.' },
  { name: 'Germany', confederation: 'UEFA', region: 'Europe', titles: 4, best: 'Champions', clue: 'Four-time world champion from Europe.' },
  { name: 'Netherlands', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Runners-up', clue: 'European team famous for orange kits.' },
  { name: 'Switzerland', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Quarter-finals', clue: 'European side known for red kits and Alpine roots.' },
  { name: 'Scotland', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Group stage', clue: 'British team returning after a long World Cup wait.' },
  { name: 'Spain', confederation: 'UEFA', region: 'Europe', titles: 1, best: 'Champions', clue: 'Won the 2010 FIFA World Cup.' },
  { name: 'Austria', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Third place', clue: 'Central European nation with red-white-red colors.' },
  { name: 'Belgium', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Third place', clue: 'European team often called the Red Devils.' },
  { name: 'Bosnia and Herzegovina', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Group stage', clue: 'Balkan nation that also reached the 2014 World Cup.' },
  { name: 'Sweden', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Runners-up', clue: 'Nordic side that reached the 1958 final.' },
  { name: 'Turkiye', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Third place', clue: 'Finished third at the 2002 World Cup.' },
  { name: 'Czechia', confederation: 'UEFA', region: 'Europe', titles: 0, best: 'Runners-up as Czechoslovakia', clue: 'Central European team formerly linked to Czechoslovakia history.' },
  { name: 'Algeria', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Round of 16', clue: 'North African nation with green and white colors.' },
  { name: 'Cape Verde', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Debut in 2026', clue: 'Island nation making its World Cup debut.' },
  { name: 'Egypt', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Group stage', clue: 'African team associated with Mohamed Salah.' },
  { name: 'Ghana', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Quarter-finals', clue: 'African nation that made the 2010 quarter-finals.' },
  { name: 'Ivory Coast', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Group stage', clue: 'Also known as Côte d’Ivoire.' },
  { name: 'Morocco', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Fourth place', clue: 'African semifinalist at the 2022 World Cup.' },
  { name: 'Senegal', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Quarter-finals', clue: 'African team that stunned the world in 2002.' },
  { name: 'South Africa', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Group stage', clue: 'Hosted the 2010 FIFA World Cup.' },
  { name: 'Tunisia', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Group stage', clue: 'North African side with red kits.' },
  { name: 'Australia', confederation: 'AFC', region: 'Asia/Oceania', titles: 0, best: 'Round of 16', clue: 'The Socceroos.' },
  { name: 'Iran', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Group stage', clue: 'West Asian team with frequent World Cup appearances.' },
  { name: 'Japan', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Round of 16', clue: 'The first team to qualify for 2026.' },
  { name: 'Jordan', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Debut in 2026', clue: 'West Asian nation making its World Cup debut.' },
  { name: 'Uzbekistan', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Debut in 2026', clue: 'Central Asian nation making its World Cup debut.' },
  { name: 'Qatar', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Group stage', clue: 'Hosted the 2022 FIFA World Cup.' },
  { name: 'Saudi Arabia', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Round of 16', clue: 'Asian team that beat Argentina in 2022.' },
  { name: 'South Korea', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Fourth place', clue: 'Reached the 2002 World Cup semi-finals as a co-host.' },
  { name: 'New Zealand', confederation: 'OFC', region: 'Oceania', titles: 0, best: 'Group stage', clue: 'The only team from Oceania.' },
  { name: 'DR Congo', confederation: 'CAF', region: 'Africa', titles: 0, best: 'Debut in 2026 as DR Congo', clue: 'Qualified through the intercontinental playoff.' },
  { name: 'Iraq', confederation: 'AFC', region: 'Asia', titles: 0, best: 'Group stage', clue: 'Won the final intercontinental playoff spot.' },
];

const MAX_LIVES = 5;

function randomTeam(excludeName = null) {
  const pool = excludeName ? TEAMS.filter((team) => team.name !== excludeName) : TEAMS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function App() {
  const [currentTeam, setCurrentTeam] = useState(() => randomTeam());
  const [guess, setGuess] = useState('');
  const [lives, setLives] = useState(MAX_LIVES);
  const [message, setMessage] = useState('Guess the 2026 World Cup team from the clues below.');
  const [status, setStatus] = useState('playing');
  const [guesses, setGuesses] = useState([]);
  const [score, setScore] = useState(0);

  const hints = useMemo(() => {
    const baseHints = [
      `Confederation: ${currentTeam.confederation}`,
      `Region: ${currentTeam.region}`,
      `World Cup titles: ${currentTeam.titles}`,
      `Best finish: ${currentTeam.best}`,
      `Special clue: ${currentTeam.clue}`,
    ];

    const revealedCount = Math.min(MAX_LIVES - lives + 2, baseHints.length);
    return baseHints.slice(0, revealedCount);
  }, [currentTeam, lives]);

  const submitGuess = () => {
    if (status !== 'playing' || !guess.trim()) return;

    const normalizedGuess = normalize(guess);
    const normalizedAnswer = normalize(currentTeam.name);

    const acceptedAliases = {
      curacao: ['curaçao'],
      turkiye: ['turkey', 'türkiye'],
      czechia: ['czech republic'],
      ivorycoast: ["cotedivoire", "cote divoire"],
      drcongo: ['drc', 'democraticrepublicofthecongo', 'congodr'],
      southkorea: ['korearepublic', 'republicofkorea'],
      unitedstates: ['usa', 'us', 'unitedstatesofamerica'],
      bosniaandherzegovina: ['bosnia'],
    };

    const isExact = normalizedGuess === normalizedAnswer;
    const isAlias = (acceptedAliases[normalizedAnswer] || []).includes(normalizedGuess);

    const nextGuesses = [...guesses, guess.trim()];
    setGuesses(nextGuesses);

    if (isExact || isAlias) {
      setMessage(`Correct! It was ${currentTeam.name}.`);
      setStatus('won');
      setScore((prev) => prev + 1);
      return;
    }

    const nextLives = lives - 1;
    setLives(nextLives);

    if (nextLives <= 0) {
      setMessage(`You ran out of lives. The correct answer was ${currentTeam.name}.`);
      setStatus('lost');
    } else {
      setMessage(`Nope. ${nextLives} ${nextLives === 1 ? 'life' : 'lives'} left.`);
    }

    setGuess('');
  };

  const nextRound = () => {
    setCurrentTeam((prev) => randomTeam(prev.name));
    setGuess('');
    setLives(MAX_LIVES);
    setMessage('New round started. Guess the next team.');
    setStatus('playing');
    setGuesses([]);
  };

  const resetGame = () => {
    setCurrentTeam(randomTeam());
    setGuess('');
    setLives(MAX_LIVES);
    setMessage('Game reset. Guess the 2026 World Cup team from the clues below.');
    setStatus('playing');
    setGuesses([]);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                2026 FIFA World Cup Game
              </p>
              <h1 className="text-3xl font-bold md:text-5xl">Guess the Team</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                Use the clues, protect your 5 lives, and see how many real 2026 World Cup teams you can guess.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:w-72">
              <div className="rounded-2xl bg-slate-900/80 p-4 text-center ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-widest text-slate-400">Score</p>
                <p className="mt-2 text-3xl font-bold">{score}</p>
              </div>
              <div className="rounded-2xl bg-slate-900/80 p-4 text-center ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-widest text-slate-400">Lives</p>
                <p className="mt-2 text-3xl font-bold">{'❤️'.repeat(lives)}<span className="text-slate-600">{'🤍'.repeat(MAX_LIVES - lives)}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Clues</h2>
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                {status === 'playing' ? 'Round active' : status === 'won' ? 'You won' : 'You lost'}
              </span>
            </div>

            <div className="space-y-3">
              {hints.map((hint, index) => (
                <div
                  key={hint}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Hint {index + 1}</p>
                  <p className="mt-2 text-base text-slate-100">{hint}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">
              <p className="text-sm text-slate-200">{message}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Your Guess</h2>
              <p className="mt-2 text-sm text-slate-300">
                Type a team name exactly or close enough. Common aliases like USA, Turkey, and Czech Republic also work.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <input
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitGuess();
                  }}
                  disabled={status !== 'playing'}
                  placeholder="Enter a team..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={submitGuess}
                    disabled={status !== 'playing'}
                    className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit Guess
                  </button>

                  <button
                    onClick={nextRound}
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-semibold transition hover:bg-white/10"
                  >
                    Next Team
                  </button>

                  <button
                    onClick={resetGame}
                    className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-3 font-semibold text-rose-200 transition hover:bg-rose-400/20"
                  >
                    Reset Game
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Previous Guesses</h2>
              {guesses.length === 0 ? (
                <p className="mt-3 text-sm text-slate-400">No guesses yet this round.</p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {guesses.map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-sm text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 p-6 shadow-xl">
              <h2 className="text-xl font-semibold">How to Play</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                <li>• Every round picks a real team from the 2026 World Cup.</li>
                <li>• You start with 5 lives.</li>
                <li>• Wrong guess = lose 1 life and unlock more clues.</li>
                <li>• Lose all 5 lives and the round ends.</li>
                <li>• Keep playing to build your score.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

