type Topic = {
  title: string;
  description: string;
  label: string;
  icon: "intervals" | "harmony" | "rhythm";
  available: boolean;
};

const topics: Topic[] = [
  {
    title: "Intervals",
    description: "Hear the space between notes and discover how melodies move.",
    label: "Start here",
    icon: "intervals",
    available: true,
  },
  {
    title: "Harmony",
    description: "Find out how notes come together to create chords and color.",
    label: "Coming soon",
    icon: "harmony",
    available: false,
  },
  {
    title: "Rhythm",
    description: "Explore pulse, pattern, and the feeling of time in music.",
    label: "Coming soon",
    icon: "rhythm",
    available: false,
  },
];

const learningSteps = [
  {
    number: "01",
    title: "Listen",
    description: "Start with a sound, not a definition.",
  },
  {
    number: "02",
    title: "Explore",
    description: "Try things out and notice what changes.",
  },
  {
    number: "03",
    title: "Understand",
    description: "Connect what you hear to a useful idea.",
  },
];

function BrandMark() {
  return (
    <svg aria-hidden="true" className="brand__mark" viewBox="0 0 40 40">
      <rect width="40" height="40" rx="14" fill="currentColor" />
      <path
        d="M9 21h5l3-8 6 16 4-11h4"
        fill="none"
        stroke="var(--brand-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function NavGlyph({ kind }: { kind: "overview" | "paths" | "approach" }) {
  if (kind === "overview") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <rect x="3.25" y="3.25" width="5.5" height="5.5" rx="1.5" />
        <rect x="11.25" y="3.25" width="5.5" height="5.5" rx="1.5" />
        <rect x="3.25" y="11.25" width="5.5" height="5.5" rx="1.5" />
        <rect x="11.25" y="11.25" width="5.5" height="5.5" rx="1.5" />
      </svg>
    );
  }

  if (kind === "paths") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <circle cx="5" cy="5" r="2" />
        <circle cx="15" cy="15" r="2" />
        <path d="M7 5h4a4 4 0 0 1 4 4v4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M3 14.5 7 6l3.2 6 2.2-3.5L17 15" />
      <path d="M3 16.5h14" />
    </svg>
  );
}

function TopicGlyph({ kind }: { kind: Topic["icon"] }) {
  if (kind === "intervals") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="15.5" />
        <circle cx="24" cy="8.5" r="3.5" />
        <circle cx="37.4" cy="31.8" r="3.5" />
        <path d="M25.5 10.8 35 28.7" />
      </svg>
    );
  }

  if (kind === "harmony") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <path d="M9 31.5h30M13 23.5h22M17 15.5h14" />
        <circle cx="13" cy="31.5" r="3.5" />
        <circle cx="35" cy="23.5" r="3.5" />
        <circle cx="21" cy="15.5" r="3.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="M8 25h5l4-10 7 19 5-14 4 8h7" />
      <path d="M8 39h32" />
    </svg>
  );
}

function PitchArtwork() {
  return (
    <svg
      aria-hidden="true"
      className="pitch-art"
      fill="none"
      viewBox="0 0 360 340"
    >
      <circle className="pitch-art__outer" cx="180" cy="170" r="122" />
      <circle className="pitch-art__inner" cx="180" cy="170" r="83" />
      <circle className="pitch-art__core" cx="180" cy="170" r="40" />
      {Array.from({ length: 12 }, (_, index) => (
        <line
          className={
            index === 0 || index === 5
              ? "pitch-art__tick pitch-art__tick--bright"
              : "pitch-art__tick"
          }
          key={index}
          transform={`rotate(${index * 30} 180 170)`}
          x1="180"
          x2="180"
          y1="29"
          y2={index % 3 === 0 ? "44" : "38"}
        />
      ))}
      <path className="pitch-art__arc" d="M181 48a122 122 0 0 1 101 54" />
      <circle className="pitch-art__note pitch-art__note--one" cx="180" cy="48" r="8" />
      <circle className="pitch-art__note pitch-art__note--two" cx="285" cy="230" r="8" />
      <circle className="pitch-art__spark" cx="83" cy="83" r="3" />
      <circle className="pitch-art__spark" cx="289" cy="113" r="3" />
      <circle className="pitch-art__spark" cx="107" cy="280" r="3" />
      <path className="pitch-art__wave" d="M105 170h20l11-17 17 34 15-26 12 9h17" />
    </svg>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="app-shell">
        <aside className="sidebar">
          <a aria-label="Cadence home" className="brand" href="#overview">
            <BrandMark />
            <span className="brand__name">cadence</span>
            <span className="brand__note">MUSIC, MADE SENSE</span>
          </a>

          <div className="sidebar__section-label">YOUR SPACE</div>
          <nav aria-label="Main navigation" className="sidebar-nav">
            <a aria-current="page" className="sidebar-nav__link" href="#overview">
              <NavGlyph kind="overview" />
              <span>Overview</span>
              <span className="sidebar-nav__indicator" />
            </a>
            <a className="sidebar-nav__link" href="#learning-paths">
              <NavGlyph kind="paths" />
              <span>Learning paths</span>
            </a>
            <a className="sidebar-nav__link" href="#how-it-works">
              <NavGlyph kind="approach" />
              <span>How it works</span>
            </a>
          </nav>

          <div className="sidebar__note">
            <div aria-hidden="true" className="sidebar__note-orbit">
              <span />
            </div>
            <p>Good theory starts with a curious ear.</p>
            <span>TAKE IT ONE NOTE AT A TIME</span>
          </div>

          <div className="sidebar__footer">
            <span aria-hidden="true" className="status-dot" />
            <span>A little space to learn</span>
          </div>
        </aside>

        <main id="main-content" className="main-content" tabIndex={-1}>
          <header className="topbar">
            <div className="topbar__breadcrumb">
              <span>YOUR SPACE</span>
              <span aria-hidden="true">/</span>
              <span className="topbar__current">OVERVIEW</span>
            </div>
            <div className="topbar__message">
              <span aria-hidden="true" className="topbar__message-mark">
                ✳
              </span>
              <span>For curious ears, at any level</span>
            </div>
          </header>

          <div className="page-content">
            <section aria-labelledby="welcome-title" className="welcome" id="overview">
              <div className="welcome__copy">
                <p className="eyebrow">
                  <span className="eyebrow__line" />
                  A FRESH WAY TO LEARN
                </p>
                <h1 aria-label="Music theory, without the mystery" id="welcome-title">
                  Music theory,
                  <br />
                  <span>without the mystery.</span>
                </h1>
                <p className="welcome__description">
                  Understand what you hear. Explore the ideas behind the music you
                  love, one small discovery at a time.
                </p>
                <a className="button button--light" href="#learning-paths">
                  Find your first idea
                  <svg aria-hidden="true" viewBox="0 0 20 20">
                    <path d="M4 10h11M10 5l5 5-5 5" />
                  </svg>
                </a>
                <div className="welcome__caption">
                  <span aria-hidden="true" className="welcome__caption-dot" />
                  No experience needed. Just bring your ears.
                </div>
              </div>
              <div className="welcome__art-wrap">
                <div aria-hidden="true" className="welcome__art-caption">
                  <span>12 NOTES</span>
                  <span className="welcome__art-caption-dot" />
                  <span>ENDLESS POSSIBILITIES</span>
                </div>
                <PitchArtwork />
                <div aria-hidden="true" className="art-label art-label--top">
                  <span className="art-label__dot" />
                  THE SPACE BETWEEN
                </div>
                <div aria-hidden="true" className="art-label art-label--bottom">
                  LISTEN CLOSER
                  <span>↗</span>
                </div>
              </div>
              <div aria-hidden="true" className="welcome__grain" />
            </section>

            <section
              aria-labelledby="paths-title"
              className="learning-section"
              id="learning-paths"
            >
              <div className="section-heading">
                <div>
                  <p className="eyebrow eyebrow--muted">A PLACE TO BEGIN</p>
                  <h2 id="paths-title">Pick up a new idea</h2>
                  <p className="section-heading__description">
                    Follow a question that has always been in your ears.
                  </p>
                </div>
                <span className="section-heading__count">
                  <span>03</span> LEARNING PATHS
                </span>
              </div>

              <div className="topic-grid">
                {topics.map((topic, index) => (
                  <article
                    aria-labelledby={`topic-title-${topic.icon}`}
                    className={`topic-card topic-card--${topic.icon}`}
                    key={topic.title}
                  >
                    <div className="topic-card__top">
                      <div className="topic-card__icon">
                        <TopicGlyph kind={topic.icon} />
                      </div>
                      {topic.available ? (
                        <span className="topic-card__badge topic-card__badge--ready">
                          <span aria-hidden="true" />
                          {topic.label}
                        </span>
                      ) : (
                        <span className="topic-card__badge">{topic.label}</span>
                      )}
                    </div>
                    <div className="topic-card__copy">
                      <p className="topic-card__index">0{index + 1}</p>
                      <h3 id={`topic-title-${topic.icon}`}>{topic.title}</h3>
                      <p>{topic.description}</p>
                    </div>
                    {topic.available ? (
                      <a
                        aria-label="Start with intervals"
                        className="topic-card__link"
                        href="#how-it-works"
                      >
                        <span>Explore this path</span>
                        <svg aria-hidden="true" viewBox="0 0 20 20">
                          <path d="M4 10h11M10 5l5 5-5 5" />
                        </svg>
                      </a>
                    ) : (
                      <div aria-hidden="true" className="topic-card__coming">
                        A new path is taking shape
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="approach-title"
              className="approach-section"
              id="how-it-works"
            >
              <div className="approach-section__intro">
                <p className="eyebrow eyebrow--muted">LESS MEMORIZING, MORE MEANING</p>
                <h2 id="approach-title">
                  Start with what
                  <br />
                  <span>you can already hear.</span>
                </h2>
                <p>
                  Music makes more sense when ideas grow from listening and
                  experimenting, not from a list of rules.
                </p>
                <a className="text-link" href="#learning-paths">
                  Explore the learning paths
                  <svg aria-hidden="true" viewBox="0 0 20 20">
                    <path d="M4 10h11M10 5l5 5-5 5" />
                  </svg>
                </a>
              </div>
              <div className="approach-steps">
                {learningSteps.map((step) => (
                  <div className="approach-step" key={step.number}>
                    <span className="approach-step__number">{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                    <span aria-hidden="true" className="approach-step__arrow">
                      ↗
                    </span>
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="approach-section__decoration">
                <span />
                <span />
                <span />
              </div>
            </section>

            <footer className="page-footer">
              <a aria-label="Cadence home" className="footer-brand" href="#overview">
                <BrandMark />
                <span>cadence</span>
              </a>
              <span>Made for the love of listening.</span>
              <a href="#overview">Back to top <span aria-hidden="true">↑</span></a>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
