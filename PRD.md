# Product Requirements Document: XML/XSLT Transformer

A professional-grade XML to XSLT transformation tool supporting XSLT 1.0, 2.0, and 3.0 with comprehensive developer features including version control, project management, code snippets, and real-time validation.

**Experience Qualities**:
1. **Efficient**: Streamlined workflow with keyboard shortcuts, auto-save, and instant transformations that keep developers in their flow state
2. **Professional**: Clean, polished interface with sophisticated code editors, proper error handling, and enterprise-grade features like version control and project management
3. **Powerful**: Advanced XSLT capabilities spanning three specification versions with comprehensive snippets library and schema validation

**Complexity Level**: Complex Application (advanced functionality with multiple views)
- This is a sophisticated developer tool requiring multiple integrated systems: dual code editors with syntax highlighting, XSLT processing engines, file system integration, version control, and comprehensive developer tooling.

## Essential Features

### XML/XSLT Code Editors
- **Functionality**: Dual CodeMirror 6 editors with syntax highlighting, line numbers, and auto-formatting
- **Purpose**: Provide professional code editing experience with real-time feedback
- **Trigger**: User types or pastes code into XML or XSLT editor panels
- **Progression**: User edits code → Syntax validation runs → Errors display with line numbers → Format button fixes indentation → Code ready for transformation
- **Success Criteria**: Syntax highlighting works, line numbers display, Ctrl+Shift+F/G formats code, errors show with precise line markers

### XSLT Version Support (1.0/2.0/3.0)
- **Functionality**: Auto-detect XSLT version from stylesheet, manual override selector, appropriate processor selection
- **Purpose**: Support full XSLT specification range from basic 1.0 transforms to advanced 3.0 features
- **Trigger**: User loads XSLT or clicks version selector dropdown
- **Progression**: XSLT loaded → Version detected from version attribute → Badge displays detected version → User can override → Processor selected (Browser for 1.0, Saxon-JS for 2.0/3.0) → Transform executes
- **Success Criteria**: Version auto-detection accurate, manual override works, correct processor used, processor name shown in output

### Real-time Transformation
- **Functionality**: Execute XSLT transform on XML input with selected version processor
- **Purpose**: Instantly see transformation results to iterate quickly
- **Trigger**: User clicks Transform button or presses Ctrl+Enter
- **Progression**: User triggers transform → Inputs validated → Processor executes → Output displayed in results panel → Processor used and timing shown → Errors caught and displayed
- **Success Criteria**: Transform completes in <2 seconds for typical inputs, output formatted properly, errors show helpful messages

### Version Control System
- **Functionality**: Save transformation states with semantic versioning, descriptions, and metadata
- **Purpose**: Track transformation evolution and manage multiple variants
- **Trigger**: User clicks Save Version button (Ctrl+S)
- **Progression**: User clicks save → Dialog opens → Enters version number (1.0.0) and description → Saves → Version appears in sidebar → User can load, delete, or release versions
- **Success Criteria**: Versions persist after refresh, load restores exact state, semantic versioning enforced, release management works

### Project Folder Management
- **Functionality**: Link to local folder for auto-saving files using File System Access API
- **Purpose**: Maintain transformation projects as files on disk
- **Trigger**: User clicks folder icon and selects directory
- **Progression**: User selects folder → Permission granted → current.xml and current.xslt auto-save → Versions saved as version_{id}_{version}.xml/.xslt → versions.json stores metadata → Folder name badge displays in header
- **Success Criteria**: Files auto-save with 1-second debounce, folder loads existing project, files persist on disk, Chromium-only graceful fallback

### XSLT Snippets Library
- **Functionality**: 40+ ready-to-use XSLT templates organized by category with search and version filtering
- **Purpose**: Accelerate development with proven patterns and boilerplate
- **Trigger**: User clicks Snippets button or presses Ctrl+K
- **Progression**: User opens snippets panel → Browses categories or searches → Filters by XSLT version → Clicks snippet → Preview shows → Copies or inserts into editor
- **Success Criteria**: Panel toggles smoothly, search filters instantly, version badges accurate, insert adds at cursor position

### Activity Log
- **Functionality**: Bottom panel showing timestamped operations (transform, save, load, etc.)
- **Purpose**: Provide audit trail and debugging context
- **Trigger**: Any significant operation occurs
- **Progression**: Operation executes → Log entry added with timestamp → Scrolls to show latest → Persists across sessions
- **Success Criteria**: All operations logged, timestamps accurate, log survives refresh, scrollable history

### Keyboard Shortcuts
- **Functionality**: Comprehensive shortcuts for all major actions
- **Purpose**: Enable keyboard-first workflow for power users
- **Trigger**: User presses key combination
- **Progression**: Key pressed → Action executed → Toast confirms → UI updates
- **Success Criteria**: All documented shortcuts work, no conflicts with browser defaults, help dialog (?) shows complete list

## Edge Case Handling

- **Invalid XML/XSLT Syntax**: Parser catches errors, displays line numbers and descriptions, highlights problematic lines
- **Empty Inputs**: Validation prevents transform, shows helpful message about required inputs
- **Large Files (>1MB)**: Performance warning displayed, transform still executes but may be slower
- **Browser Compatibility**: File System API only works in Chromium browsers, graceful message for Firefox/Safari
- **XSLT Version Mismatch**: User warned if using 2.0/3.0 features in 1.0 stylesheet, processor selection prevents failures
- **Concurrent Auto-saves**: Debounce prevents save conflicts, last edit wins
- **Missing Saxon-JS**: Dynamic import failure caught, fallback message displayed, 1.0 still works

## Design Direction

The design should evoke **technical precision and professional confidence** - like a well-crafted IDE or specialized engineering tool. Users should feel they're working with sophisticated software that respects their expertise while remaining approachable and clean.

## Color Selection

Modern technical aesthetic with purple-blue primary for sophistication and warm orange accent for energy.

- **Primary Color**: Deep purple-blue `oklch(0.45 0.25 265)` - conveys technical expertise and reliability, used for primary actions and highlights
- **Secondary Colors**: 
  - Light purple-blue `oklch(0.55 0.15 265)` for secondary actions and hover states
  - Soft gray `oklch(0.92 0.01 265)` for subtle backgrounds and dividers
- **Accent Color**: Warm orange `oklch(0.55 0.22 25)` - energetic call-to-action color for Transform button and success states
- **Supporting Colors**:
  - Success green `oklch(0.65 0.20 145)` for completed operations
  - Warning amber `oklch(0.70 0.18 65)` for validation warnings
  - Error red (using accent orange tone) for critical issues
- **Foreground/Background Pairings**:
  - Background (Soft cream `oklch(0.98 0.005 85)`): Dark purple text `oklch(0.15 0.03 265)` - Ratio 12.1:1 ✓
  - Primary (Purple-blue `oklch(0.45 0.25 265)`): White text `oklch(0.98 0.01 265)` - Ratio 8.5:1 ✓
  - Accent (Warm orange `oklch(0.55 0.22 25)`): White text `oklch(0.98 0.01 25)` - Ratio 4.9:1 ✓
  - Card (White `oklch(1 0 0)`): Dark purple text `oklch(0.15 0.03 265)` - Ratio 14.2:1 ✓

## Font Selection

Typography should communicate **code precision and technical clarity** while remaining highly readable for long editing sessions.

- **Code Font**: JetBrains Mono for all editors - optimized for programming with clear character distinction and excellent readability
- **UI Font**: Inter for interface elements - modern, neutral, professional

- **Typographic Hierarchy**:
  - H1 (App Title): Inter SemiBold/24px/tight letter spacing/-0.02em
  - H2 (Panel Headers): Inter Medium/16px/normal tracking
  - H3 (Section Labels): Inter Medium/14px/0.01em tracking/uppercase
  - Body (UI Text): Inter Regular/14px/1.5 line height
  - Code (Editors): JetBrains Mono Regular/14px/1.6 line height
  - Small (Metadata): Inter Regular/12px/muted foreground

## Animations

Animations should feel **precise and purposeful** - like mechanisms in high-quality machinery. Subtle motion reinforces hierarchy and provides feedback without distraction.

- **Micro-interactions**: 150ms ease-out for button presses, hover states, and toggles
- **Panel transitions**: 300ms ease-in-out for sidebar and sheet animations with slight scale (0.98→1.0)
- **Toast notifications**: Slide up from bottom with spring physics
- **Loading states**: Subtle pulse on Transform button during processing
- **Success moments**: Quick scale bounce (1.0→1.05→1.0) on successful save
- **Error shake**: Small horizontal shake (±4px) for validation errors

## Component Selection

- **Components**:
  - Button: Primary actions (Transform, Save), secondary actions (Format, Import/Export), icon-only buttons (Snippets, Help)
  - Card: Editor containers, output panel, version cards, snippet cards - with subtle backdrop blur
  - Dialog: Save Version (with form), Release Notes, Schema Validation, XSLT Reference, Keyboard Shortcuts
  - Sheet: Snippets panel (right side), Settings (if needed)
  - Tabs: Mobile view for XML/XSLT/Output switching
  - Badge: XSLT version indicators, status badges (Released, Draft), folder name
  - Input/Textarea: Version number, description fields, search
  - Select: XSLT version selector, theme switcher
  - ScrollArea: Version list, snippets list, activity log
  - Separator: Visual dividers between sections
  - Popover: Quick actions menu on version cards
  
- **Customizations**:
  - CodeEditor: Custom wrapper around CodeMirror with theme integration and toolbar
  - VersionCard: Custom component with hover actions, badges, and metadata display
  - SnippetCard: Custom with category badge, version compatibility icons, copy/insert actions
  - ActivityLogEntry: Custom with icon, timestamp, and operation details
  
- **States**:
  - Buttons: Default has subtle shadow, hover lifts slightly, active scales down (0.97), disabled is muted with reduced opacity
  - Inputs: Focus shows primary ring, error state shows red border with shake, success shows green check
  - Cards: Hover shows subtle lift and border glow, selected has primary border
  - Editors: Focus shows primary border, error markers inline with red underline
  
- **Icon Selection** (Phosphor Icons - Bold weight):
  - Transform: Lightning (energy/action)
  - Save: FloppyDisk (classic save metaphor)
  - Folder: Folder (file management)
  - Version: GitBranch (version control)
  - Snippets: Code (code templates)
  - Help: Question (help/docs)
  - Theme: Moon/Sun (theme switching)
  - Format: TextIndent (formatting)
  - Import/Export: DownloadSimple/UploadSimple
  - Delete: Trash
  - Copy: Copy
  - Success: CheckCircle
  - Error: WarningCircle
  - Info: Info
  
- **Spacing**:
  - Page padding: p-6 (24px)
  - Card padding: p-4 (16px) on mobile, p-6 on desktop
  - Section gaps: gap-4 (16px) between related elements, gap-6 (24px) between sections
  - Editor toolbar: px-3 py-2 (12px/8px)
  - Version cards: space-y-2 (8px between cards)
  - Form fields: space-y-4 (16px between fields)
  
- **Mobile** (<768px):
  - Stack editors vertically using Tabs component (XML/XSLT/Output)
  - Collapse version panel into dialog triggered by floating action button
  - Activity log becomes collapsible accordion
  - Header condenses to single row with hamburger menu for secondary actions
  - Reduce padding to p-4, card padding to p-3
  - Touch targets minimum 44px
  - Bottom sheet for snippets instead of side sheet
