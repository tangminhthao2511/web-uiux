# MANAE --- Personal UI/UX & Product Design Learning Platform

## Product Requirements Document (PRD) & Implementation Brief for Antigravity

**Document type:** Product brief + functional requirements +
implementation roadmap\
**Product:** Manae\
**Platform:** Responsive web application\
**Primary language:** Vietnamese\
**Primary user:** One learner transitioning into UI/UX Design and
Product Design\
**Reference UI:** Uploaded Manae learning-dashboard screenshot

------------------------------------------------------------------------

# 1. Product overview

## 1.1 Product vision

Build **Manae**, a personal UI/UX and Product Design learning platform
that guides the learner from foundational knowledge to practical,
job-ready Junior-level capabilities.

Manae must not behave like a static course website or a simple
collection of articles. It should combine:

-   A structured learning management system.
-   A practical exercise and case-study environment.
-   An AI Design Mentor that reviews submitted work and gives actionable
    feedback.
-   A Figma workspace for submitting and reviewing design work.
-   A skill assessment system based on demonstrated ability.
-   A portfolio builder that turns completed projects into presentable
    case studies.
-   A learning analytics dashboard that identifies skill gaps and
    recommends next steps.

The central learning cycle is:

**Learn → Understand → Practice → Submit → Evaluate → Improve →
Demonstrate competence**

The platform should prioritize the learner's ability to apply design
knowledge over the number of lessons completed.

## 1.2 Product goals

1.  Teach UI/UX and Product Design systematically, from beginner to
    intermediate and Junior job-ready level.
2.  Connect every important concept to a practical design task.
3.  Simulate common responsibilities and deliverables found in UI/UX
    Designer and Product Designer roles.
4.  Allow the learner to submit real work, including Figma links and
    screenshots.
5.  Evaluate UX reasoning and UI execution using transparent rubrics.
6.  Track progress by skill, not only by lesson completion.
7.  Help the learner build at least two or three strong portfolio case
    studies.
8.  Keep the curriculum maintainable so topics can be updated as tools,
    practices and job requirements change.

## 1.3 Target learner

The initial learner is transitioning from a Marketing background into
UI/UX and Product Design.

Current learning context:

-   Beginner-to-early stage in Figma.
-   Basic familiarity with Photoshop and Illustrator.
-   Some familiarity with marketing research and user-oriented thinking.
-   Interested in UX Research, User Flow, Product Thinking and
    AI-assisted UI/UX workflows.
-   Needs to strengthen UI visual design, Figma skills, product
    analytics and practical design execution.
-   Needs clear explanations and guided exercises rather than
    assumptions of prior professional design experience.

The platform should support a beginner without limiting future
progression to intermediate and advanced topics.

## 1.4 Product principles

-   **Practice over passive consumption:** every major topic should lead
    to an exercise or application.
-   **Evidence over assumptions:** skill levels must be based on
    submitted work, quizzes and demonstrated reasoning.
-   **Explain the why:** feedback must explain why something is a
    problem and what impact it has.
-   **Progressive learning:** introduce concepts in a sensible order and
    make prerequisites visible.
-   **Human judgment remains important:** AI feedback is guidance, not
    an unquestionable final authority.
-   **Honest integrations:** never claim to have inspected a Figma file
    or external resource unless access was successful.
-   **Useful over decorative:** prioritize clear information
    architecture and working interactions over visual effects.

------------------------------------------------------------------------

# 2. Visual direction and design system

## 2.1 Reference

Use the uploaded Manae screenshot as the main visual reference for the
product's visual language and dashboard composition. Do not copy it
pixel-for-pixel.

## 2.2 Visual style

-   Minimal, modern, friendly and polished.
-   Black or near-black top navigation.
-   Warm off-white or very light neutral page background.
-   Large rounded cards.
-   Pastel accent colors: lavender, light blue, mint green, soft pink
    and pale yellow.
-   Clear typography and generous whitespace.
-   Subtle borders and restrained shadows.
-   Small, purposeful animations only when they improve feedback or
    orientation.
-   Gamification should feel motivating and mature, not childish.

## 2.3 Layout direction

Desktop dashboard:

-   Top navigation bar.
-   Main content area for the learning roadmap and progress.
-   Right-side panel for today's tasks and reminders.
-   Progress summary cards near the top.
-   Learning cards with visible status and clear actions.

Responsive behavior:

-   Tablet: reorganize columns while preserving hierarchy.
-   Mobile: use a compact navigation pattern; stack cards; keep primary
    learning actions easy to reach.
-   Do not simply shrink the desktop layout.

## 2.4 Design system requirements

Create reusable design tokens and components for:

-   Colors and semantic status colors.
-   Typography scale.
-   Spacing scale.
-   Border radius.
-   Shadows and borders.
-   Buttons and icon buttons.
-   Navigation.
-   Cards.
-   Progress bars and progress indicators.
-   Badges and status labels.
-   Inputs, text areas and upload controls.
-   Dialogs and confirmation patterns.
-   Empty, loading, success and error states.

Use consistent component variants and avoid one-off styling where a
reusable component is appropriate.

## 2.5 Avoid

-   Excessive gradients.
-   Too many competing accent colors.
-   Dense dashboards.
-   Unnecessary floating controls.
-   Decorative charts with no meaningful data.
-   Generic LMS layouts that ignore the provided reference.
-   Fake progress or fabricated learning statistics.

------------------------------------------------------------------------

# 3. Information architecture

Main navigation:

1.  **Dashboard** --- overview and daily learning.
2.  **My Roadmap** --- stages, modules and lessons.
3.  **Lessons** --- theoretical learning content.
4.  **Practice Lab** --- practical exercises and submissions.
5.  **Case Studies** --- real-product analysis and simulated projects.
6.  **Figma Workspace** --- design links, screenshots and review
    submissions.
7.  **My Portfolio** --- selected projects and case-study presentation.
8.  **Progress & Skills** --- skill proficiency and learning analytics.
9.  **Settings** --- profile, preferences and integration settings.

Recommended hierarchy:

-   Learning Stage
    -   Module
        -   Lesson
            -   Learning content
            -   Knowledge check
            -   Related exercise
-   Practice assignment
    -   Brief
    -   Requirements
    -   Deliverables
    -   Submission
    -   Review
    -   Revision history
-   Case study
    -   Product context
    -   User and business problems
    -   Research material
    -   Design challenge
    -   Deliverables
-   Portfolio project
    -   Project overview
    -   Research
    -   UX process
    -   UI design
    -   Testing and iteration
    -   Outcome and reflection

------------------------------------------------------------------------

# 4. Learning curriculum

Build the curriculum around eight learning stages. Each stage should
contain modules and lessons with objectives, prerequisites, theory,
examples, exercises and assessment criteria.

## Stage 1 --- UX Foundation & Research

Goal: Understand user-centered design and learn to identify the right
problem before designing a solution.

Topics:

-   What is UX and UI?
-   UX Designer vs UI Designer vs Product Designer.
-   User-centered design.
-   Design thinking and problem framing.
-   Research planning.
-   Qualitative and quantitative research.
-   User interviews.
-   Surveys.
-   Research questions and interview bias.
-   Competitor and comparative analysis.
-   Research synthesis.
-   Affinity mapping.
-   User personas and their limitations.
-   Empathy maps.
-   User Journey Maps.
-   Problem statements.
-   Jobs to Be Done fundamentals.

Practical outputs:

-   Research plan.
-   Interview guide.
-   Research synthesis.
-   Persona or user profile when justified.
-   Journey map.
-   Problem statement.

## Stage 2 --- Product Analytics & Funnel

Goal: Understand how product data can reveal user experience problems
and help measure impact.

Topics:

-   Product metrics fundamentals.
-   Events and event tracking.
-   Conversion and drop-off.
-   Funnel analysis.
-   Activation and retention fundamentals.
-   Cohort concepts.
-   GA4 fundamentals.
-   Firebase Analytics fundamentals.
-   Heatmaps and session recordings.
-   Tools such as Hotjar or FullStory, where appropriate.
-   Choosing metrics for UX problems.
-   Data limitations and interpretation.

Practical outputs:

-   Define an event tracking plan.
-   Analyze a sample funnel.
-   Identify a potential UX drop-off.
-   Recommend a metric and explain why it is relevant.

## Stage 3 --- Information Architecture & UX Design

Goal: Structure information and design understandable user journeys and
interactions.

Topics:

-   Information Architecture.
-   Content hierarchy.
-   Navigation models.
-   Sitemap.
-   User flows.
-   Task flows.
-   Wireframing.
-   Interaction design.
-   Form design.
-   Search and filtering patterns.
-   Empty, loading, success and error states.
-   Error prevention and recovery.
-   Edge cases.
-   Responsive UX fundamentals.

Practical outputs:

-   Sitemap.
-   User flow.
-   Task flow.
-   Low-fidelity wireframes.
-   Interaction/state specifications.

## Stage 4 --- Prioritization & Product Thinking

Goal: Connect design decisions to product goals and choose which
problems to solve first.

Topics:

-   Product goals and user goals.
-   Problem prioritization.
-   Impact vs Effort.
-   RICE.
-   MoSCoW.
-   Opportunity solution tree fundamentals.
-   Product constraints.
-   Trade-offs.
-   Defining success metrics.
-   Communicating design rationale.

Practical outputs:

-   Prioritized problem list.
-   Impact/Effort matrix.
-   RICE exercise.
-   Design recommendation with rationale.

## Stage 5 --- Usability Testing & Experimentation

Goal: Validate design decisions and improve solutions through evidence.

Topics:

-   Usability principles.
-   Nielsen's usability heuristics.
-   Heuristic evaluation.
-   Usability testing plans.
-   Moderated and unmoderated testing.
-   Task scenarios.
-   Observation and note-taking.
-   Usability findings.
-   Severity and prioritization.
-   Hypothesis formation.
-   A/B testing fundamentals.
-   Experiment limitations.
-   Iteration based on findings.

Practical outputs:

-   Heuristic evaluation.
-   Usability test plan.
-   Test scenarios.
-   Findings report.
-   Improvement proposal.
-   Before/after design iteration.

## Stage 6 --- UI Design & Visual Design

Goal: Create clear, consistent and usable interfaces.

Topics:

-   Visual hierarchy.
-   Layout principles.
-   Grid systems.
-   Spacing systems.
-   Typography.
-   Color theory and semantic colors.
-   Contrast.
-   Alignment and proximity.
-   Component states.
-   Forms and tables.
-   Data-dense interfaces.
-   Responsive UI.
-   Accessibility fundamentals.
-   WCAG basics.
-   Visual consistency.

Practical outputs:

-   UI screen exercises.
-   Responsive screen variations.
-   Visual hierarchy improvements.
-   UI critique and redesign.

## Stage 7 --- Figma & Design System

Goal: Use Figma effectively and create maintainable design structures.

Topics:

-   Figma interface and file organization.
-   Frames and constraints.
-   Auto Layout.
-   Components.
-   Component properties.
-   Variants.
-   Variables.
-   Color and typography styles.
-   Design tokens.
-   Responsive patterns.
-   Prototyping.
-   Interactive components.
-   Libraries.
-   Design system documentation.
-   Developer handoff.

Practical outputs:

-   Reusable component set.
-   Button, input and form components.
-   Mini design system.
-   Interactive prototype.
-   Handoff specification.

## Stage 8 --- Product Design Case Study & Portfolio

Goal: Demonstrate end-to-end design capability and communicate decisions
professionally.

Topics:

-   End-to-end product design process.
-   Project framing.
-   Research and synthesis.
-   Problem definition.
-   Ideation.
-   User flows.
-   Wireframes.
-   UI exploration.
-   Prototype.
-   Usability validation.
-   Iteration.
-   Design rationale.
-   Outcomes and limitations.
-   Portfolio storytelling.
-   Interview presentation.
-   Collaboration with PM, BA and developers.

Practical outputs:

-   At least two or three portfolio-quality case studies.
-   Project presentation.
-   Design rationale.
-   Reflection and next steps.

## 4.1 Curriculum quality rules

-   Label content by Beginner, Intermediate and Advanced.
-   Identify prerequisites and recommended learning order.
-   Separate required knowledge from optional enrichment.
-   Avoid claiming that a topic is mandatory for every job.
-   Keep the curriculum editable and extensible.
-   Provide source links and a reviewed/updated date for externally
    sourced learning material.
-   Do not fabricate industry statistics, job requirements or product
    examples.
-   Distinguish foundational knowledge from tool-specific instructions.

------------------------------------------------------------------------

# 5. Standard lesson experience --- UC03

Every lesson should use a consistent structure:

1.  **Learning Objectives** --- what the learner should be able to do.
2.  **Theory** --- clear explanation in Vietnamese, retaining useful
    English terminology.
3.  **Why It Matters** --- why designers need the concept.
4.  **When to Use It** --- appropriate contexts and limitations.
5.  **Real-world Examples** --- grounded examples from digital products.
6.  **Good vs Bad Design** --- comparison with reasons.
7.  **Practical Application** --- a small task that applies the concept.
8.  **Knowledge Check** --- quiz or short questions.
9.  **Personal Notes** --- learner's own notes.
10. **Next Step** --- related lesson or exercise.

Lesson completion must not be triggered merely by opening a lesson.
Completion rules should be configurable per lesson and may require
reading milestones, quiz completion or a practical submission.

------------------------------------------------------------------------

# 6. Use Case specifications

## UC01 --- Learning Dashboard

**Priority:** P0 --- first implementation.

### Objective

Show the learner's current status and the most useful next learning
action.

### Main sections

-   Header and navigation.
-   Welcome message.
-   Learning overview:
    -   Total lessons.
    -   Completed lessons.
    -   Remaining lessons.
    -   Current stage.
-   My Learning Roadmap preview.
-   Today's Tasks:
    -   Lessons to learn.
    -   Exercises awaiting submission.
    -   Reviews awaiting action.
    -   Quizzes to complete.
-   Skill Overview.
-   Continue Learning.
-   XP, level and streak, if these features are implemented with real
    data.

### Interactions

-   Select a stage to open its details.
-   Select Continue Learning to resume the last unfinished lesson.
-   Select a task to open the relevant lesson or exercise.
-   Update progress when learning activities meet completion rules.

### States

-   New learner / no progress.
-   In progress.
-   Completed.
-   No tasks today.
-   Loading.
-   Error.

### Acceptance criteria

-   All dashboard data comes from persisted learning data.
-   No fabricated completion or skill values.
-   Continue Learning opens the correct unfinished activity.
-   Navigation and task actions work.
-   Responsive desktop, tablet and mobile behavior is verified.

## UC02 --- Learning Roadmap

**Priority:** P0.

### Objective

Display the eight stages and make learning order and prerequisites
understandable.

### Requirements

-   Show stage status: Not Started, In Progress, Completed and
    Locked/Prerequisite Required.
-   Show objectives and estimated learning time.
-   Show modules and lessons within each stage.
-   Show completion criteria.
-   Allow the learner to inspect future stages without falsely marking
    them complete.
-   Explain why an activity is locked.
-   Support curriculum updates without rebuilding the entire interface.

### Acceptance criteria

-   Stage and lesson status reflects stored progress.
-   Prerequisites are explicit.
-   Stage detail pages show meaningful objectives and content.
-   The learner can identify the next recommended action.

## UC03 --- Lesson Learning

**Priority:** P0.

### Objective

Deliver structured theoretical learning and knowledge checks.

### Requirements

-   Use the standard lesson structure in Section 5.
-   Support text, images, diagrams, examples and source links.
-   Support personal notes.
-   Support quizzes and explanations for answers.
-   Track lesson progress and completion criteria.
-   Link lessons to related exercises.

### Acceptance criteria

-   Lesson content is readable and structured.
-   Quiz answers are evaluated correctly.
-   Progress persists after refresh.
-   Completion follows the lesson's configured criteria.

## UC04 --- Practice Lab

**Priority:** P0.

### Objective

Give realistic exercises that simulate common UI/UX and Product Design
work.

### Exercise categories

-   UX research.
-   Problem framing.
-   User flow.
-   Information architecture.
-   Wireframing.
-   UI design.
-   Responsive design.
-   Design systems.
-   Usability evaluation.
-   Product thinking and analytics.

### Exercise brief structure

-   Business Context.
-   User Context.
-   Problem Statement.
-   Objective.
-   Requirements.
-   Constraints.
-   Expected Deliverables.
-   Evaluation Rubric.
-   Submission Instructions.

### Submission types

-   Text response.
-   Figma URL.
-   Image upload (PNG/JPG).
-   PDF upload where supported.
-   Multiple deliverables for one assignment.

### Submission management

-   Draft.
-   Submitted.
-   Under Review.
-   Feedback Available.
-   Revision Requested.
-   Resubmitted.
-   Accepted/Completed.

Preserve submission history and feedback across iterations.

## UC05 --- AI Design Mentor

**Priority:** P0 for the learning concept; advanced integration may
follow after the core submission workflow.

### Objective

Provide constructive, explainable review of submitted design work.

### Mentor capabilities

-   Explain UX/UI concepts.
-   Answer questions about design decisions.
-   Review submitted screenshots or accessible design information.
-   Identify usability and interaction problems.
-   Review user flows and information architecture.
-   Review visual hierarchy, typography, spacing, color contrast and
    consistency.
-   Identify missing states and edge cases.
-   Compare the submission against the exercise brief.
-   Provide actionable improvement suggestions.
-   Compare revisions and describe progress.

### Evaluation dimensions

**UX evaluation:**

-   Problem understanding.
-   User needs and context.
-   Information architecture.
-   User flow.
-   Usability.
-   Interaction logic.
-   Error handling and edge cases.
-   Accessibility considerations.

**UI evaluation:**

-   Visual hierarchy.
-   Layout and alignment.
-   Spacing.
-   Typography.
-   Color and contrast.
-   Component consistency.
-   Responsive behavior.
-   Design-system consistency.

Not every exercise needs every criterion. The rubric must be relevant to
the assignment.

### Feedback format

For each finding:

-   Criterion.
-   Score or status.
-   Evidence from the submitted work.
-   What is wrong or missing.
-   Why it matters.
-   Severity or priority.
-   Recommended improvement.
-   Example or hint, when useful.

### Scoring rules

-   Use a transparent rubric with defined score levels.
-   Do not give high scores solely because a screen looks attractive.
-   Do not penalize a design for requirements that were not part of the
    brief.
-   Distinguish objective issues from subjective visual preferences.
-   State uncertainty when the submitted material does not provide
    enough evidence.
-   Do not claim that an inaccessible Figma file was inspected.
-   Allow the learner to ask follow-up questions and resubmit.

## UC06 --- Figma Workspace

**Priority:** P1 after the basic submission workflow is stable.

### Objective

Connect actual Figma work to learning exercises and reviews.

### Required capabilities

-   Paste a Figma file or prototype URL.
-   Connect a Figma account through supported authorization, if
    available.
-   Import accessible design information through official, permissioned
    integration.
-   Display previews when available.
-   Select a frame or page for review when supported.
-   Attach screenshots as a fallback.
-   Store the submitted URL and review history.
-   Explain which parts of a file the system can and cannot inspect.

### Integration rules

-   Use official Figma APIs or supported integration methods.
-   Respect Figma permissions and access scopes.
-   Do not expose access tokens in frontend code.
-   Do not claim access if authentication or permissions fail.
-   A URL alone does not guarantee that the file's contents can be read.
-   Provide screenshot upload as a working fallback.
-   If API integration is not yet configured, implement the submission
    interface and clearly label the integration as pending.

## UC07 --- Case Study Library

**Priority:** P1.

### Objective

Teach through grounded analysis of real digital products and realistic
product scenarios.

### Suggested domains

-   SaaS.
-   E-commerce.
-   Fintech.
-   Travel technology.
-   Healthcare.
-   Admin dashboards and B2B systems.

### Case-study structure

-   Product Background.
-   Target Users.
-   Business Objectives.
-   User Pain Points.
-   Existing Experience.
-   Design Challenges.
-   Constraints.
-   Learning Points.
-   Suggested Tasks.

### Requirements

-   Clearly distinguish real sourced information from hypothetical
    exercise context.
-   Include source links for real product claims.
-   Do not fabricate user research findings and present them as real.
-   Allow simulated case studies when real internal data is unavailable;
    label them as simulations.

## UC08 --- Skill Assessment

**Priority:** P1.

### Objective

Measure demonstrated capability by skill category.

### Skill categories

-   UX Research.
-   UX Design.
-   Information Architecture.
-   Product Thinking.
-   Product Analytics.
-   Usability Testing.
-   UI Design.
-   Figma.
-   Design Systems.
-   Communication and Handoff.
-   Portfolio Presentation.

### Suggested proficiency scale

-   **Level 0 --- Not Started:** no learning evidence yet.
-   **Level 1 --- Beginner:** understands basic concepts.
-   **Level 2 --- Basic:** completes guided exercises.
-   **Level 3 --- Intermediate:** independently completes relevant tasks
    and explains decisions.
-   **Level 4 --- Job Ready:** consistently demonstrates the skill in
    realistic project work and can communicate trade-offs.

### Assessment rules

-   Do not infer job readiness from quiz scores alone.
-   Use exercise submissions, revisions, explanations and relevant
    quizzes as evidence.
-   Show which evidence supports each level.
-   Show confidence or evidence sufficiency.
-   Allow a skill to remain Not Yet Assessed when evidence is
    insufficient.

## UC09 --- Portfolio Builder

**Priority:** P1.

### Objective

Turn completed projects into clear, professional case studies.

### Case-study sections

1.  Project Overview.
2.  Role and Responsibilities.
3.  Context and Constraints.
4.  Problem Statement.
5.  Research.
6.  User Insights.
7.  User Flow / Information Architecture.
8.  Wireframes.
9.  UI Exploration.
10. Final Design.
11. Prototype.
12. Usability Testing.
13. Iteration.
14. Design Decisions.
15. Outcomes and Limitations.
16. Reflection and Learnings.

### Requirements

-   Reuse content and deliverables from completed exercises where
    appropriate.
-   Allow editing and reordering sections.
-   Allow image and Figma links.
-   Provide a preview mode.
-   Clearly distinguish measured outcomes from expected or hypothetical
    outcomes.
-   Do not invent business impact or research results.

## UC10 --- Learning Analytics

**Priority:** P2.

### Objective

Help the learner understand progress and decide what to learn next.

### Metrics

-   Lessons completed.
-   Exercises submitted.
-   Exercise completion rate.
-   Average rubric score, where meaningful.
-   Revision and improvement history.
-   Skill proficiency by category.
-   Learning activity over time.
-   Portfolio projects completed.
-   Learning streak and XP, if enabled.

### Recommendations

-   Identify skills with insufficient evidence.
-   Identify recurring feedback themes.
-   Recommend relevant lessons or exercises.
-   Suggest review of prerequisite concepts.
-   Explain why a recommendation is being made.

Do not generate recommendations from arbitrary or fabricated scores.

------------------------------------------------------------------------

# 7. Job-readiness alignment

The curriculum should reflect common capability areas found in UI/UX
Designer and Product Designer job descriptions, especially Junior-level
roles.

Capability groups:

1.  UX Research and problem discovery.
2.  UX flows, wireframes and interaction design.
3.  UI and visual design fundamentals.
4.  Figma and prototyping.
5.  Design systems and reusable components.
6.  Responsive design and accessibility fundamentals.
7.  Usability testing and iteration.
8.  Product thinking and prioritization.
9.  Product analytics fundamentals.
10. Collaboration, handoff and communication.
11. Case-study and portfolio presentation.

Requirements:

-   Do not claim every employer requires every skill.
-   Distinguish frequently requested skills from role-specific or
    advanced skills.
-   Support a maintainable JD reference library.
-   Store job title, seniority, company, source URL, date reviewed and
    extracted skills.
-   Allow skills to be mapped to lessons and exercises.
-   When comparing the learner to a JD, show matched evidence, gaps and
    skills not yet assessed.
-   Refresh external job-description references periodically through a
    separately configured workflow; do not fabricate current openings or
    requirements.

------------------------------------------------------------------------

# 8. Learning assessment and rubric design

## 8.1 Rubric principles

Every practical exercise should have a specific rubric. Criteria must
match the task and its expected deliverables.

Suggested rating scale:

-   1 --- Missing or fundamentally incorrect.
-   2 --- Needs significant improvement.
-   3 --- Meets basic expectations.
-   4 --- Strong execution with clear reasoning.
-   5 --- Excellent, consistent and well-supported execution.

A score must include a short explanation and evidence.

## 8.2 Example: User Flow exercise rubric

  Criterion              What to evaluate
  ---------------------- --------------------------------------------
  Goal clarity           Is the user's goal explicit?
  Flow completeness      Are the necessary steps included?
  Logical sequence       Does the sequence make sense?
  Decision points        Are branches and conditions represented?
  Error and edge cases   Are failure and recovery paths considered?
  Clarity                Can another person understand the flow?
  Requirement coverage   Does the flow satisfy the brief?

## 8.3 Example: UI screen exercise rubric

  Criterion               What to evaluate
  ----------------------- -------------------------------------------------
  Requirement coverage    Does the screen meet the brief?
  Visual hierarchy        Can users identify important information?
  Layout and spacing      Is the structure aligned and consistent?
  Typography              Is text readable and appropriately prioritized?
  Color and contrast      Is color used clearly and accessibly?
  Component consistency   Are repeated patterns consistent?
  States                  Are relevant component states considered?
  Responsive behavior     Is the layout adaptable where required?

------------------------------------------------------------------------

# 9. Data model --- recommended initial entities

Design a scalable data model. The following is a conceptual starting
point, not a mandate to use these exact table names.

-   User
-   LearningStage
-   Module
-   Lesson
-   LessonContentBlock
-   LearningObjective
-   Prerequisite
-   Quiz
-   QuizQuestion
-   QuizAttempt
-   Exercise
-   ExerciseDeliverable
-   EvaluationRubric
-   RubricCriterion
-   Submission
-   SubmissionAsset
-   SubmissionRevision
-   Review
-   ReviewFinding
-   Skill
-   SkillEvidence
-   SkillAssessment
-   CaseStudy
-   PortfolioProject
-   PortfolioSection
-   LearningTask
-   LearningProgress
-   LearningActivity
-   UserNote
-   FigmaConnection
-   ExternalJobReference
-   JobSkillMapping
-   XPTransaction (only if gamification is enabled)

Data requirements:

-   Persist user progress and submissions.
-   Preserve review and revision history.
-   Track the source of assessment evidence.
-   Support content updates without losing learner progress.
-   Keep external integration credentials secure.
-   Use server-side authorization for private user data.
-   Include created/updated timestamps where appropriate.

------------------------------------------------------------------------

# 10. Gamification

Gamification should motivate learning without replacing actual
competency measurement.

Optional features:

-   XP for meaningful learning activities.
-   Levels.
-   Learning streak.
-   Milestones.
-   Stage completion celebrations.
-   Weekly learning goals.

Rules:

-   Do not award XP simply for opening a lesson.
-   Do not let XP determine skill proficiency.
-   Make streak behavior understandable and forgiving.
-   Allow gamification to be reduced or disabled.
-   Avoid competitive leaderboards in the initial version.

------------------------------------------------------------------------

# 11. Technical and implementation requirements

## 11.1 Development approach

Before coding:

1.  Inspect the existing project and identify its current framework and
    structure.
2.  Review the uploaded visual reference.
3.  Define information architecture and navigation.
4.  Define the core user flows.
5.  Define reusable components and design tokens.
6.  Propose the data model and persistence approach.
7.  Identify external integrations and their requirements.
8.  Break development into use cases and milestones.

Do not replace an existing working project structure without explaining
why.

## 11.2 Architecture

-   Use reusable, maintainable components.
-   Separate UI, application logic and data access.
-   Use a persistent database for user progress and submissions.
-   Use server-side handling for secrets and external API calls.
-   Provide loading, empty, error and success states.
-   Validate user inputs and uploaded files.
-   Handle API errors and permission failures gracefully.
-   Keep the app responsive and accessible.
-   Avoid hardcoded values for data that should be user-specific.

Antigravity should inspect the current repository and choose compatible
technologies rather than blindly introducing a new stack.

## 11.3 AI integration

If an AI provider/API is required:

-   Keep API keys server-side.
-   Make the provider configurable.
-   Define structured inputs and outputs for reviews.
-   Use the exercise brief and rubric as review context.
-   Store review results and model/version metadata where appropriate.
-   Handle rate limits, timeouts and provider errors.
-   Do not fabricate a review if the AI service is unavailable.
-   Provide a clear error or retry state.

## 11.4 Figma integration

-   Use official and permissioned integration.
-   Handle OAuth securely if account connection is supported.
-   Respect file access permissions.
-   Provide screenshot upload fallback.
-   Clearly report access status.
-   Never expose private tokens in browser code.

## 11.5 Quality assurance

For each use case:

-   Test primary user flows.
-   Test empty, loading, error and success states.
-   Test persistence after refresh.
-   Test invalid input.
-   Test responsive layouts.
-   Check keyboard accessibility for important controls.
-   Check for broken links and console errors.
-   Verify that displayed metrics match stored data.
-   Do not proceed while critical interactions are broken.

------------------------------------------------------------------------

# 12. Implementation roadmap

Implement incrementally in this order:

  Phase   Use Case                      Priority
  ------- ----------------------------- ----------
  1       UC01 --- Learning Dashboard   P0
  2       UC02 --- Learning Roadmap     P0
  3       UC03 --- Lesson Learning      P0
  4       UC04 --- Practice Lab         P0
  5       UC05 --- AI Design Mentor     P0/P1
  6       UC06 --- Figma Workspace      P1
  7       UC07 --- Case Study Library   P1
  8       UC08 --- Skill Assessment     P1
  9       UC09 --- Portfolio Builder    P1
  10      UC10 --- Learning Analytics   P2

Dependencies:

-   UC01 depends on the basic curriculum and progress data structure.
-   UC02 defines the learning hierarchy used by UC01 and UC03.
-   UC03 and UC04 establish the learning and submission workflow.
-   UC05 depends on submissions, exercise briefs and rubrics.
-   UC06 extends the submission workflow.
-   UC08 depends on evidence from lessons and exercises.
-   UC09 reuses completed project content and deliverables.
-   UC10 depends on reliable historical learning data.

------------------------------------------------------------------------

# 13. Acceptance criteria for the overall product

The product is considered functionally successful when the learner can:

1.  Start with no prior progress and receive a clear learning path.
2.  Navigate the eight learning stages.
3.  Study structured lessons in Vietnamese.
4.  Complete knowledge checks.
5.  Receive realistic practical assignments.
6.  Submit text, screenshots and Figma links.
7.  Receive rubric-based feedback when the AI integration is configured.
8.  Revise work and compare feedback across submissions.
9.  See skill proficiency supported by actual evidence.
10. Build and preview portfolio case studies.
11. Track learning progress across sessions and devices, where
    authentication and persistence are configured.
12. Use the core experience on desktop and mobile.

The product must not:

-   Mark lessons complete merely because they were opened.
-   Display fake progress or fake AI evaluations.
-   Claim to inspect inaccessible Figma files.
-   Mark a skill Job Ready based only on quiz scores.
-   Present simulated case-study data as real research.
-   Present hypothetical project outcomes as measured business results.

------------------------------------------------------------------------

# 14. Instructions to Antigravity --- how to work with the user

The user wants to build this product collaboratively and review each use
case before moving forward.

Follow this workflow:

1.  Read this entire document.
2.  Inspect the current project files and identify the existing stack.
3.  Summarize the proposed architecture and implementation plan.
4.  Identify any critical missing decisions. Ask only questions that
    block implementation.
5.  Start with UC01 --- Learning Dashboard.
6.  Implement the complete UC01 experience, including working
    interactions and data handling appropriate to the current project.
7.  Test UC01 against its acceptance criteria.
8.  Report:
    -   What was implemented.
    -   Which interactions work.
    -   What data is persisted.
    -   What remains incomplete.
    -   Any technical limitations.
    -   Test results.
9.  Stop and wait for the user's approval before starting UC02.

Do not implement all ten use cases at once.

Do not create decorative placeholder buttons that do nothing.

If a backend, AI API or Figma integration is not configured, explain the
dependency and implement a clearly labeled, functional foundation where
possible. Never pretend an integration is live when it is not.

The user is learning UI/UX while building Manae. Explain important
design and technical decisions in accessible Vietnamese when reporting
implementation work.

**First task: inspect the project, confirm the implementation plan, and
then build UC01 only.**
