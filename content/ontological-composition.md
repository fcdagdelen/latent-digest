---
title: "Ontological Composition: Transferring Organizational Structure Across Knowledge Domains"
date: 2026-01-19
tags:
  - ai-systems/knowledge-graphs
  - ai-systems/memory-systems
  - cognitive-architecture
summary: |
  The concept of "ontological composition"—using organizational structures discovered in one domain to illuminate structure in another—exists as a fragmented research space without unified terminology. This represents a genuine research gap worth pursuing, not a solved problem under different terminology.
---

The concept of "ontological composition"—using organizational structures discovered in one domain to illuminate structure in another—**exists as a fragmented research space without unified terminology**. The hypothesis that individuals have consistent cognitive patterns transferable across domains has moderate theoretical and empirical support, but the specific phenomenon of personal ontological transfer has not been directly studied or built into systems. This represents a genuine research gap worth pursuing, not a solved problem under different terminology.

## The terminological landscape is scattered but revealing

No single term captures the full concept of cross-domain ontological transfer for individuals. The closest existing vocabulary includes **"schema transfer,"** **"analogical knowledge structuring,"** and **"ontology design patterns"**—each capturing different facets of the idea. McDaniel et al.'s work on "individual differences in learning and transfer" (2014) comes closest in cognitive science, showing stable tendencies toward rule-based versus exemplar-based organization that persist across different categorization tasks. In ontology engineering, **BOLT-K** (Bootstrapping Ontology Learning via Transfer of Knowledge) explicitly addresses cross-domain ontology transfer, though for automated systems rather than personal cognition.

The terminology varies systematically by field. Cognitive psychologists speak of **cognitive styles** and **categorization strategies**. Information scientists use **personal classification schemes** and **personomies** (personal tag vocabularies). Ontology engineers work with **ontology design patterns** (ODPs) as reusable structural templates. Analogical reasoning researchers describe **schema abstraction** through structural alignment. None of these fully captures "using one's organizational structure from Domain A to bootstrap organization in Domain B," suggesting a gap worth naming.

## Cognitive science provides the strongest theoretical grounding

Research by Mark McDaniel and colleagues offers the most direct evidence that individuals have stable organizational tendencies transferring across domains. Their landmark 2014 study identified two distinct learner types: **"rule learners"** who extract abstract regularities and **"exemplar learners"** who memorize specific instances. Critically, these tendencies **persisted across fundamentally different categorization paradigms**, suggesting a stable trait rather than task-specific strategy. Working memory capacity correlated with rule-learning tendency (r = -.30 to -.39), pointing to cognitive architecture underlying organizational style.

Richard Nisbett's research on **holistic versus analytic cognition** demonstrates that cognitive orientation affects multiple domains simultaneously—categorization (taxonomic vs. thematic groupings), causal attribution, visual attention, and reasoning about contradictions. Though framed as cultural differences, the mechanism implies that domain-general cognitive orientation shapes organization across knowledge areas. The **Kozhevnikov framework** (2014) synthesizes these findings into four orthogonal dimensions: context dependence, rule-based processing, locus of processing, and integration style.

However, a critical gap exists: **no studies directly test whether someone who organizes biology taxonomically also organizes music taxonomically**. Most research examines different laboratory categorization paradigms, not naturally occurring knowledge domains. The hypothesis remains theoretically supported but empirically undertested.

## Ontology engineering has begun building transfer systems

The semantic web community has produced the most concrete implementations of cross-domain structural transfer, though focused on automated rather than personal ontologies. **BOLT-K** (Vedula et al., 2019) demonstrated **5-25% F1-score improvements** in ontology learning by transferring knowledge from functionally related source domains—proof that ontological structure can bootstrap learning in new domains. The system uses LSTM-based features to identify entity/concept pairs likely to be related, jointly training on source and target domain knowledge.

**Ontology Design Patterns** (ODPs) represent a mature approach to structural reuse. The MODL library (Shimizu, Hitzler et al.) curates documented, reusable patterns—including **metapatterns** (content-independent structural templates)—that successfully transfer across radically different domains: biomedicine, cultural heritage, smart cities, crisis management. Crucially, ODPs capture the **same structural insight appearing in different content domains**, exactly the phenomenon the user hypothesizes exists in personal cognition.

Recent work by Carriero, Groth, and Presutti (2024) on **Empirical ODPs** reverses the typical approach—instead of designing patterns top-down, they extract them bottom-up from Wikidata usage, revealing implicit structural regularities. This methodology could potentially be applied to personal knowledge graphs to discover individual organizational signatures.

## The analogical reasoning literature provides a theoretical bridge

Dedre Gentner's **structure-mapping theory** offers the strongest theoretical mechanism for ontological transfer. The theory holds that analogy maps relational structure from a base domain to a target domain, and through **schema abstraction**, the common structure becomes available for future transfer. This directly supports the idea that encountering how you organized Domain A creates an abstract organizational schema applicable to Domain B.

The **relational categories** research (Goldwater & Schalk, 2016) bridges analogy and classification. Categories like "barrier," "catalyst," or "predator" organize domains by **relational role rather than surface features**—exactly the kind of structural organization that should transfer. Scientific concepts like evolutionary theory or physics principles ARE relational categories requiring "flexible relational knowledge representations."

Computational models exist: the **Structure-Mapping Engine** (SME) constructs consistent alignments in polynomial time, **LISA** models schema induction through comparison, and **DORA** learns structured representations from unstructured inputs. However, **no existing system applies cognitive-style analogical reasoning to transfer full ontological structures**. The components exist but haven't been integrated for this purpose.

## Personal knowledge management research reveals a significant gap

Surprisingly little academic research examines organizational patterns in modern PKM tools. **Deborah Barreau's longitudinal study** (2008) provides the most relevant finding: revisiting managers 10+ years after initial study, she found that "PIM behaviors seem to have changed little over time, suggesting that technological advances are less important in determining how individuals organize information than are the tasks they perform." This **behavioral persistence** supports the existence of stable individual organizational signatures.

The **"filers versus pilers"** distinction in PIM research demonstrates consistent individual differences, and personality traits (particularly Conscientiousness) predict file organization patterns. William Jones, Ofer Bergman, and Steve Whittaker have established that organization serves **reminding functions**, not just retrieval—suggesting organizational structure reflects personal cognitive architecture rather than mere filing.

Yet **no studies compare the same individual's organizational structures across different tools or life domains**. No computational analysis examines user-created knowledge graphs (Obsidian vaults, Roam databases) for structural patterns. The modern networked note-taking revolution has been **almost entirely ignored by academic researchers**, despite enormous practitioner interest. This represents a major opportunity.

## Warburg's methodology offers a non-taxonomic alternative

Aby Warburg's **Mnemosyne Atlas** provides a historical model for cross-domain structural organization. Warburg organized images by **morphological similarity across historical time**, not by chronological or geographical categories. His concept of **Pathosformel** (emotionally charged visual tropes that persist across cultures) identifies structural elements that transfer across domains—exactly the kind of reusable organizational primitive the user hypothesizes.

Leonardo Impett and Franco Moretti's **"Totentanz"** (2017) successfully operationalized Pathosformeln computationally using pose clustering, confirming that structural analysis can identify cross-domain patterns. The Warburg Library's **"Law of the Good Neighbour"** classification—organizing by associative similarity rather than subject matter—offers a practical model for non-hierarchical, structurally-driven organization.

However, complete formalization remains elusive. Warburg's methodology involves **semantic polarity** (the same form carrying opposite emotional charges) and contextual knowledge that resists purely structural encoding. This suggests ontological transfer may work best for explicit, formally specified structures but struggle with implicit or culturally-loaded categories.

## Critical evaluation: failure modes and limitations

Several limitations emerge from the research:

- **Surface similarity interference**: Analogical retrieval research shows people tend to find surface-similar rather than structurally-similar cases. Finding appropriate source ontologies to transfer from may be difficult.
- **Information-integration categories don't transfer**: Research shows analogical transfer works for rule-based (verbally describable) structures but fails for categories requiring implicit integration of multiple dimensions. Not all organizational structures may be transferable.
- **Expertise is domain-specific**: While experts show different categorization patterns, expertise effects are primarily within-domain. A biologist's taxonomic thinking may not easily port to music.
- **Semantic loading**: As Warburg's work shows, the same structural pattern can carry opposite meanings in different contexts. Structure alone may be insufficient.
- **Individual variation in relational reasoning**: People differ significantly in working memory, inhibitory control, and spontaneous attention to relational structure. Not everyone may exhibit consistent transferable patterns.

## Key researchers and seminal works

The following researchers and papers represent the core literature:

**Cognitive Science**: Mark McDaniel (rule vs. exemplar learning), Maria Kozhevnikov (cognitive styles framework), Dedre Gentner (structure-mapping), Richard Nisbett (holistic/analytic cognition), Micah Goldwater (relational categories).

**Information Science**: Birger Hjørland (domain analysis), Jens-Erik Mai (contextual classification), Deborah Barreau (PIM persistence), Geoffrey Bowker and Susan Leigh Star (*Sorting Things Out*).

**Semantic Web**: Nikhita Vedula (BOLT-K), Pascal Hitzler and Cogan Shimizu (MODL, ontology design patterns), Aldo Gangemi (ODPs), Valentina Presutti (empirical ODPs).

**Digital Humanities**: Leonardo Impett and Franco Moretti (Totentanz), Lev Manovich (Cultural Analytics), Christopher Johnson (Warburg scholarship).

## Conclusion: a gap worth pursuing

Ontological composition is **not a solved problem hiding under different terminology**—it represents a genuine research gap at the intersection of cognitive science, information science, and knowledge engineering. Theoretical support exists from schema abstraction, cognitive style research, and analogical reasoning. Practical implementations exist for automated ontology transfer (BOLT-K) and structural pattern reuse (ODPs). But **no system currently exploits individual cross-domain organizational transfer** for personal knowledge management.

The most promising path forward would combine: (1) schema abstraction mechanisms from analogical reasoning, (2) ontology design patterns as transferable structural primitives, (3) computational analysis of personal knowledge graphs for individual signatures, and (4) the Warburgian insight that morphological/relational similarity enables non-taxonomic cross-domain organization. The research would need to directly test whether organizational patterns in individuals' notes on technical writing predict organizational patterns in their poetry—a study no one has yet conducted.
