import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList, SortFn, byDateAndAlphabetical } from "../PageList"
import { FullSlug, getAllSegmentPrefixes, resolveRelative, simplifySlug } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"

interface TagContentOptions {
  sort?: SortFn
  numPages: number
}

const defaultOptions: TagContentOptions = {
  numPages: 10,
}

// Color palettes for each concept - [primary, secondary, accent]
const TAG_GRADIENTS: Record<string, [string, string, string]> = {
  "knowledge-graphs": ["#6366f1", "#8b5cf6", "#a78bfa"],
  "memory-systems": ["#0ea5e9", "#06b6d4", "#22d3ee"],
  "small-models": ["#f59e0b", "#f97316", "#fb923c"],
  "cognitive-architecture": ["#ec4899", "#f43f5e", "#fb7185"],
  "psyche-interfaces": ["#8b5cf6", "#a855f7", "#c084fc"],
  "ai-experience-design": ["#14b8a6", "#10b981", "#34d399"],
  "bidirectional-context": ["#3b82f6", "#6366f1", "#818cf8"],
  "neuroscience": ["#ef4444", "#f43f5e", "#fb7185"],
  "ai-native-development": ["#22c55e", "#10b981", "#34d399"],
  "therapeutics": ["#06b6d4", "#0ea5e9", "#38bdf8"],
}

const DEFAULT_GRADIENT: [string, string, string] = ["#64748b", "#475569", "#334155"]

const getTagKey = (tags: string[] | undefined): string => {
  if (!tags || tags.length === 0) return ""
  const tag = tags[0]
  const parts = tag.split("/")
  return parts[parts.length - 1]
}

const getGradientStyle = (tags: string[] | undefined): string => {
  const tagKey = getTagKey(tags)
  const colors = TAG_GRADIENTS[tagKey] || DEFAULT_GRADIENT
  return `linear-gradient(135deg, ${colors[0]}22 0%, ${colors[1]}33 50%, ${colors[2]}22 100%)`
}

const getPrimaryTag = (tags: string[] | undefined): string => {
  if (!tags || tags.length === 0) return ""
  const tag = tags[0]
  const parts = tag.split("/")
  const lastPart = parts[parts.length - 1]
  return lastPart.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

const truncateSummary = (summary: string | undefined, maxLength: number = 120): string => {
  if (!summary) return ""
  const clean = summary.replace(/\n/g, " ").trim()
  if (clean.length <= maxLength) return clean
  return clean.slice(0, maxLength).trim() + "..."
}

export default ((opts?: Partial<TagContentOptions>) => {
  const options: TagContentOptions = { ...defaultOptions, ...opts }

  const TagContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const slug = fileData.slug

    if (!(slug?.startsWith("tags/") || slug === "tags")) {
      throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`)
    }

    const tag = simplifySlug(slug.slice("tags/".length) as FullSlug)
    const allPagesWithTag = (tag: string) =>
      allFiles.filter((file) =>
        (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag),
      )

    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
    if (tag === "/") {
      const tags = [
        ...new Set(
          allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
        ),
      ].sort((a, b) => a.localeCompare(b))
      const tagItemMap: Map<string, QuartzPluginData[]> = new Map()
      for (const tag of tags) {
        tagItemMap.set(tag, allPagesWithTag(tag))
      }
      return (
        <div class="popover-hint">
          <article class={classes}>
            <p>{content}</p>
          </article>
          <p>{i18n(cfg.locale).pages.tagContent.totalTags({ count: tags.length })}</p>
          <div>
            {tags.map((tag) => {
              const pages = tagItemMap.get(tag)!
              const listProps = {
                ...props,
                allFiles: pages,
              }

              const contentPage = allFiles.filter((file) => file.slug === `tags/${tag}`).at(0)

              const root = contentPage?.htmlAst
              const content =
                !root || root?.children.length === 0
                  ? contentPage?.description
                  : htmlToJsx(contentPage.filePath!, root)

              const tagListingPage = `/tags/${tag}` as FullSlug
              const href = resolveRelative(fileData.slug!, tagListingPage)

              return (
                <div>
                  <h2>
                    <a class="internal tag-link" href={href}>
                      {tag}
                    </a>
                  </h2>
                  {content && <p>{content}</p>}
                  <div class="page-listing">
                    <p>
                      {i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}
                      {pages.length > options.numPages && (
                        <>
                          {" "}
                          <span>
                            {i18n(cfg.locale).pages.tagContent.showingFirst({
                              count: options.numPages,
                            })}
                          </span>
                        </>
                      )}
                    </p>
                    <PageList limit={options.numPages} {...listProps} sort={options?.sort} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      const pages = allPagesWithTag(tag)
      const sorter = options?.sort ?? byDateAndAlphabetical(cfg)
      const sortedPages = pages.sort(sorter)

      return (
        <div class="popover-hint">
          <article class={classes}>{content}</article>
          <div class="page-listing">
            <p class="tag-count">{i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}</p>
            <div class="tag-cards-grid">
              {sortedPages.map((page) => {
                const title = page.frontmatter?.title ?? "Untitled"
                const pageTags = page.frontmatter?.tags ?? []
                const summary = page.frontmatter?.summary ?? page.description ?? ""
                const primaryTag = getPrimaryTag(pageTags)
                const gradientStyle = getGradientStyle(pageTags)
                const tagKey = getTagKey(pageTags)
                const accentColor = (TAG_GRADIENTS[tagKey] || DEFAULT_GRADIENT)[0]

                return (
                  <a
                    href={resolveRelative(fileData.slug!, page.slug!)}
                    class="tag-card-link internal"
                  >
                    <article class="tag-card" style={`background: ${gradientStyle};`}>
                      <div class="tag-card-accent" style={`background: ${accentColor};`}></div>
                      {primaryTag && (
                        <span class="tag-card-tag" style={`color: ${accentColor};`}>{primaryTag}</span>
                      )}
                      <h3 class="tag-card-title">{title}</h3>
                      <p class="tag-card-summary">{truncateSummary(summary)}</p>
                    </article>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      )
    }
  }

  TagContent.css = concatenateResources(style, PageList.css, `
.tag-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 1.5rem;
  align-items: stretch;
  margin-top: 1rem;
}

@media (max-width: 1200px) {
  .tag-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 800px) {
  .tag-cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.tag-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  height: 100%;
}

.tag-card {
  position: relative;
  border: 1px solid var(--lightgray);
  border-radius: 12px;
  padding: 1.25rem;
  padding-top: 1.5rem;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}

.tag-card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 12px 12px 0 0;
}

.tag-card:hover {
  border-color: transparent;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.tag-card-tag {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tag-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  color: var(--dark);
}

.tag-card-summary {
  font-size: 0.85rem;
  color: var(--gray);
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
  opacity: 0.85;
}

.tag-count {
  color: var(--gray);
  margin-bottom: 0.5rem;
}

[data-theme="dark"] .tag-card {
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .tag-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

[data-theme="dark"] .tag-card-title {
  color: var(--light);
}

[data-theme="dark"] .tag-card-summary {
  color: var(--lightgray);
}
`)
  return TagContent
}) satisfies QuartzComponentConstructor
