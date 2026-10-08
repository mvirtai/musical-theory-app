import { useState, type Dispatch } from "react";
import { AudioUnavailableError, playInterval, stopPlayback } from "../../lib/audio/interval-player";
import {
  LEVELS,
  XP_PER_CORRECT,
  buildRounds,
  getLevel,
  isLevelUnlocked,
  isSessionFinished,
  listenerRank,
  starsFor,
  type GameAction,
  type GameState,
  type LevelId,
  type Round,
  type Session,
  type Stars,
} from "../../lib/game/interval-game";
import { INTERVALS, noteName } from "../../lib/music/intervals";

interface IntervalGameProps {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

function StarRating({ count }: { count: Stars }) {
  return (
    <span aria-label={`${count} of 3 stars`} className="stars" role="img">
      {[1, 2, 3].map((position) => (
        <span aria-hidden="true" className={position <= count ? "stars__on" : undefined} key={position}>
          {position <= count ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

function notesAsText(round: Round): string {
  const interval = INTERVALS[round.intervalId];
  return `${noteName(round.startMidi)} → ${noteName(round.startMidi + interval.semitones)}`;
}

function IntervalGame({ state, dispatch }: IntervalGameProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [audioMessage, setAudioMessage] = useState<string | null>(null);
  const rank = listenerRank(state.xp);
  const session = state.session;

  function startLevel(levelId: LevelId) {
    stopPlayback();
    setAudioMessage(null);
    dispatch({ type: "start", levelId, rounds: buildRounds(getLevel(levelId), Math.random) });
  }

  function leave() {
    stopPlayback();
    setAudioMessage(null);
    dispatch({ type: "exit" });
  }

  async function listen(round: Round) {
    setAudioMessage(null);
    try {
      await playInterval(round.startMidi, INTERVALS[round.intervalId].semitones);
    } catch (error) {
      setAudioMessage(
        error instanceof AudioUnavailableError
          ? "Sound is not available in this browser. Turn on “Show the notes as text” to keep playing."
          : "The sound could not be played. Check your device volume and try again.",
      );
    }
  }

  function choose(choice: Round["intervalId"]) {
    stopPlayback();
    dispatch({ type: "answer", choice });
  }

  function next() {
    stopPlayback();
    dispatch({ type: "next" });
  }

  function renderLevels() {
    return (
      <ol className="trail-levels">
        {LEVELS.map((level) => {
          const unlocked = isLevelUnlocked(state.stars, level.id);
          return (
            <li key={level.id}>
              <button
                aria-disabled={!unlocked}
                className="trail-level"
                onClick={() => {
                  if (unlocked) startLevel(level.id);
                }}
                type="button"
              >
                <span aria-hidden="true" className="trail-level__number">
                  {level.id}
                </span>
                <span className="trail-level__body">
                  <strong>{level.title}</strong>
                  <span>{level.description}</span>
                </span>
                {unlocked ? (
                  <StarRating count={state.stars[level.id]} />
                ) : (
                  <span className="trail-level__lock">Earn a star on level {level.id - 1} to unlock</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    );
  }

  function renderSummary(finished: Session) {
    const earned = starsFor(finished.correct);
    const nextLevelId = (finished.levelId + 1) as LevelId;
    const hasNextLevel = finished.levelId < LEVELS.length;

    return (
      <div className="trail-round">
        <p className="trail-round__count">Level {finished.levelId} finished</p>
        <h3 className="trail-round__prompt">
          {earned > 0 ? "Nicely heard!" : "Good practice. Listen once more."}
        </h3>
        <p className="trail-summary">
          <StarRating count={earned} />
          <span>
            {finished.correct} of {finished.rounds.length} correct, +{finished.correct * XP_PER_CORRECT} XP
          </span>
        </p>
        <div className="trail-actions">
          {earned > 0 && hasNextLevel ? (
            <button className="button button--dark" onClick={() => startLevel(nextLevelId)} type="button">
              Next level
            </button>
          ) : null}
          <button
            className={earned > 0 && hasNextLevel ? "button button--ghost" : "button button--dark"}
            onClick={() => startLevel(finished.levelId)}
            type="button"
          >
            Play again
          </button>
          <button className="button button--ghost" onClick={leave} type="button">
            Back to levels
          </button>
        </div>
      </div>
    );
  }

  function renderRound(active: Session) {
    const round = active.rounds[active.index];
    const interval = INTERVALS[round.intervalId];
    const level = getLevel(active.levelId);
    const answered = active.answer !== null;
    const wasCorrect = active.answer === round.intervalId;

    return (
      <div className="trail-round">
        <div className="trail-round__top">
          <p className="trail-round__count">
            Level {active.levelId} · Round {active.index + 1} of {active.rounds.length}
          </p>
          <button className="button button--ghost" onClick={leave} type="button">
            Leave level
          </button>
        </div>

        <h3 className="trail-round__prompt">Which interval did you hear?</h3>

        <div className="trail-actions">
          <button className="button button--dark" onClick={() => void listen(round)} type="button">
            {answered ? "Hear it again" : "Listen to the two notes"}
          </button>
          <label className="trail-toggle">
            <input
              checked={showNotes}
              onChange={(event) => setShowNotes(event.target.checked)}
              type="checkbox"
            />
            Show the notes as text
          </label>
        </div>

        {showNotes ? <p className="trail-notes">Notes: {notesAsText(round)}</p> : null}
        {audioMessage ? <p className="trail-warning" role="alert">{audioMessage}</p> : null}

        <div aria-label="Interval choices" className="trail-choices" role="group">
          {level.pool.map((choiceId) => (
            <button
              aria-pressed={active.answer === choiceId}
              className="trail-choice"
              key={choiceId}
              onClick={() => choose(choiceId)}
              type="button"
            >
              {INTERVALS[choiceId].name}
            </button>
          ))}
        </div>

        <div className={wasCorrect ? "trail-feedback trail-feedback--correct" : "trail-feedback"} role="status">
          {answered ? (
            <>
              <strong>{wasCorrect ? `Correct! +${XP_PER_CORRECT} XP` : `Not quite. That was a ${interval.name.toLowerCase()}.`}</strong>
              <p>
                {interval.name}: {interval.semitones} semitones. {interval.description}
              </p>
              <p>{notesAsText(round)}</p>
            </>
          ) : null}
        </div>

        {answered ? (
          <div className="trail-actions">
            <button autoFocus className="button button--dark" onClick={next} type="button">
              {active.index + 1 < active.rounds.length ? "Next round" : "See results"}
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <section aria-labelledby="trail-title" className="trail-section" id="interval-trail">
      <div className="section-heading">
        <div>
          <p className="eyebrow eyebrow--muted">TRY IT YOURSELF</p>
          <h2 id="trail-title">The interval trail</h2>
          <p className="section-heading__description">
            Listen to two notes, name the interval, and collect stars. Mistakes never cost you anything.
          </p>
        </div>
        <div className="trail-rank">
          <p className="trail-rank__title">{rank.title}</p>
          <progress
            aria-label="Progress to the next listener rank"
            className="trail-rank__bar"
            max={100}
            value={Math.round(rank.progress * 100)}
          />
          <p className="trail-rank__caption">
            {rank.nextTitle && rank.nextMinXp !== null
              ? `${state.xp} XP · ${rank.nextMinXp - state.xp} to ${rank.nextTitle}`
              : `${state.xp} XP · top rank reached`}
          </p>
        </div>
      </div>

      <div className="trail-card">
        {session === null ? renderLevels() : isSessionFinished(session) ? renderSummary(session) : renderRound(session)}
      </div>
    </section>
  );
}

export default IntervalGame;
