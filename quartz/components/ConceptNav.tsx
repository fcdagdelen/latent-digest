import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

// Concept definitions with display names and tag paths
const CONCEPTS = [
  { name: "Knowledge Graphs", tag: "ai-systems/knowledge-graphs" },
  { name: "Memory Systems", tag: "ai-systems/memory-systems" },
  { name: "Small Models", tag: "ai-systems/small-models" },
  { name: "Cognitive Architecture", tag: "ai-systems/cognitive-architecture" },
  { name: "Psyche Interfaces", tag: "human-ai-interaction/psyche-interfaces" },
  { name: "AI Experience Design", tag: "human-ai-interaction/ai-experience-design" },
  { name: "Bidirectional Context", tag: "human-ai-interaction/bidirectional-context" },
  { name: "Neuroscience", tag: "applied/neuroscience" },
  { name: "AI-Native Development", tag: "applied/ai-native-development" },
  { name: "Therapeutics", tag: "applied/therapeutics" },
]

export default (() => {
  const ConceptNav: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    // Build a map of tag -> articles
    const tagArticles = new Map<string, Array<{ title: string; slug: string }>>()

    for (const file of allFiles) {
      const tags = file.frontmatter?.tags ?? []
      const title = file.frontmatter?.title ?? "Untitled"
      const slug = file.slug ?? ""

      for (const tag of tags) {
        if (!tagArticles.has(tag)) {
          tagArticles.set(tag, [])
        }
        tagArticles.get(tag)!.push({ title, slug })
      }
    }

    return (
      <nav class={classNames(displayClass, "concept-nav")}>
        <h3 class="concept-nav-title">Concepts</h3>
        <ul class="concept-list">
          {CONCEPTS.map((concept) => {
            const articles = tagArticles.get(concept.tag) ?? []
            const count = articles.length

            return (
              <li class="concept-item" data-concept={concept.tag}>
                <span class="concept-name">{concept.name}</span>
                {count > 0 && <span class="concept-count">{count}</span>}
                {count > 0 && (
                  <div class="concept-tooltip">
                    <div class="tooltip-header">{concept.name}</div>
                    <ul class="tooltip-articles">
                      {articles.map((article) => (
                        <li>
                          <a
                            href={resolveRelative(fileData.slug!, article.slug)}
                            class="internal"
                          >
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  ConceptNav.css = `
.concept-nav {
  margin-top: 1rem;
}

.concept-nav-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--lightgray);
}

.concept-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.concept-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.concept-item:hover {
  background-color: var(--lightgray);
}

.concept-name {
  font-size: 0.875rem;
  color: var(--dark);
  flex-grow: 1;
}

.concept-count {
  font-size: 0.75rem;
  color: var(--gray);
  background: var(--lightgray);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  min-width: 1.5rem;
  text-align: center;
}

.concept-tooltip {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 0.5rem;
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.75rem;
  min-width: 220px;
  max-width: 280px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 100;
}

.concept-item:hover .concept-tooltip {
  display: block;
}

.tooltip-header {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--secondary);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--lightgray);
}

.tooltip-articles {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.tooltip-articles li {
  font-size: 0.8125rem;
  line-height: 1.4;
}

.tooltip-articles a {
  color: var(--dark);
  text-decoration: none;
}

.tooltip-articles a:hover {
  color: var(--secondary);
}

/* Dark mode */
[data-theme="dark"] .concept-item:hover {
  background-color: var(--darkgray);
}

[data-theme="dark"] .concept-count {
  background: var(--darkgray);
}

[data-theme="dark"] .concept-tooltip {
  background: var(--dark);
  border-color: var(--gray);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

/* Mobile: show tooltip below instead of to the side */
@media (max-width: 1200px) {
  .concept-tooltip {
    left: 0;
    top: 100%;
    margin-left: 0;
    margin-top: 0.25rem;
  }
}
`

  return ConceptNav
}) satisfies QuartzComponentConstructor
