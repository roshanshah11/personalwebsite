# Personal Website Audit Report

**Source of truth:** `/Users/roshanshah1/Downloads/roshan/` (vault)
**Target:** `/Users/roshanshah1/Projects/personalwebsite/` (Next.js site, last updated Spring 2026)
**Date:** July 22, 2026

---

## Executive Summary

The website is significantly outdated. It was last updated in Spring 2026 when Roshan was at UNC Kenan-Flagler. Since then, he has **transferred to UChicago**, **started a PE internship at Blue Oak Group**, **shipped multiple projects**, and **attended YC Startup School**. The site does not reflect any of this. There are also factual errors, a typo, and missing content throughout.

---

## 1. Site Metadata (layout.tsx:24-27)

| Field | Current | Should Be |
|---|---|---|
| `title` | `"Roshan Shah - Quantitative Finance + AI Research"` | Consider updating to reflect broader scope (e.g. "Roshan Shah — Finance + AI" or keep as-is; this is acceptable) |
| `description` | `"Business + Data Science student at UNC Chapel Hill focused on quantitative finance, volatility modeling, and building products."` | **"Economics + Data Science student at UChicago. PE analyst at Blue Oak Group. Building at the intersection of finance, AI, and technical systems."** |

**Verdict:** Description is stale. Title is borderline acceptable.

---

## 2. Hero Section (HeroSection.tsx)

| Element | Current | Status |
|---|---|---|
| Name | `ROSHAN SHAH` | OK |
| Subtitle | `FINANCE + AI` | OK — aligned with vault narrative |
| Tagline | "Building at the intersection of finance, AI, and technical systems across public markets, venture, and software." | OK — still accurate |

**Verdict:** No changes needed. This section is fine.

---

## 3. About Section (AboutSection.tsx)

### 3a. Bio text (line 62-67)

**Current:**
> "Finance and investing researcher focused on equity markets, valuation, and AI-driven tools for better decision-making."

**Issue:** Too narrow. The vault defines Roshan as someone who studies "how incentives and institutions shape collective behavior" and sees "financial markets as the ultimate engineering challenge." The bio undersells his actual intellectual identity.

**Suggested rewrite (from vault/Story.md + Profile.md):**
> "Finance and AI researcher focused on building technical systems for public markets, venture, and software. Currently a PE Summer Analyst at Blue Oak Group and incoming student at UChicago, studying economics, data science, and the institutional frameworks that organize markets."

### 3b. Education (lines 8-18)

**Current:**
- UNC Chapel Hill — Kenan-Flagler Business School — Honors B.S. Business Administration + Data Science (GPA 4.0)
- The Lawrenceville School — GPA 3.92/4.00

**Issues:**
- UNC is **historical**. He is no longer there.
- The current school is **UChicago** (BA Economics + Data Science spec, minor Entrepreneurship & Innovation, Sep 2026–2029).
- GPA 4.0 is from UNC and is technically accurate but should not be presented as current.
- Lawrenceville info is fine.

**Suggested:**
```
Education:
  1. The University of Chicago
     BA Economics + Data Science spec
     Minor: Entrepreneurship & Innovation (Sep 2026–2029)
     Formerly UNC Kenan-Flagler Business School (4.0 GPA, Honors Carolina)

  2. The Lawrenceville School
     GPA 3.92/4.00
     Herman Hollerith Prize, Cum Laude Society, McClellan Society
```

### 3c. Skills (lines 21-25)

**Current:**
- Languages: Python, R, C++, SQL
- Skills: DCF / Comps, Equity Research, Venture Diligence, AI / Technical Systems
- Interests: Poker, Football, Traveling, FOOD (like any), Reading, AI governance

**Issues:**
- Languages is incomplete. Missing: **Swift, JS/TS, SQL is there** (also missing: Next.js, FastAPI, React, Express, ArduPilot)
- Hardware skills missing: **PCB, KiCad, SolidWorks, Fusion360, soldering**
- Interests could include: **Tabla, Photography, Digital Design, UNC Basketball** (from Profile.md)

### 3d. Contact links (lines 113-160)

**Current email:** `roshah2007@gmail.com`
**Should add:** `rashah@uchicago.edu` as primary email

GitHub and LinkedIn links are correct.

---

## 4. Experience (WorkSection.tsx, ExperienceSection.tsx)

### 4a. MISSING experience — the biggest gap

**Blue Oak Group — PE Summer Analyst (May 2026–present)**
This is Roshan's current job and the most important role. It is completely absent from the website. From the vault:
- Built an AI acquisition-sourcing / broker-scraper workflow
- Worked on real PE deals (Foss Enterprises, Union Door)
- Sponsor: Coleman Kraemer
- The broker scraper is an active, real codebase

This should be the **first entry** in the experience list.

### 4b. Experience dates — all "Present" entries are wrong

| Role | Current date on site | Actual status | Action |
|---|---|---|---|
| Cofounders Capital | "Jan 2026 – Present" | **Ended** (he transferred to UChicago; this was a UNC-era role) | Change to end date |
| UNC Portfolio Management Team | "Sep 2025 – Present" | **Ended** (left UNC) | Change to end date |
| Kenan-Flagler CDR | "Oct 2025 – Present" | **Ended** (confirmed done 2026-07-09) | Change to end date |
| Carolina SkyLab | "Jan 2026 – Present" | **Ended** (left UNC) | Change to end date |
| Quantitative Finance Association | "Oct 2025 – Present" | **Ended** (left UNC) | Change to end date |
| Hitech Corporation | "Jul – Sep 2025" | OK (historical) | No change |
| Chakli Capital LLC | "May – Jul 2025" | OK (historical) | No change |
| DTV.AI | "May 2023 – Feb 2025" | OK (historical) | Remove $40K+ revenue metric (see below) |

### 4d. ExperienceSection.tsx has a stale entry

This component (lines 16-26) lists **"Black Swan Management — Researcher (Nov 2025 – Present)"** which is:
1. Not in the current WorkSection.tsx (so may be dead code)
2. Not confirmed in the vault (the vault has no mention of Black Swan Management)
3. Should be removed or verified

### 4e. Role descriptions — minor updates

- Hitech Corporation: description says "Developed U.S. market entry thesis for a $3.4M cross-border acquisition" — the vault confirms the deal was a **$3.4M+ automotive-plastics acquisition** and Roshan led US market entry. Fine as-is.
- Chakli Capital: vault says he built **5 DCFs, 7 trading comps, 3 TAM models** and published **8 weekly sector notes**. Current description mentions "valuation models (DCF, comps) and wrote sector memos" — could be more specific.

---

## 5. Projects (WorkSection.tsx, ProjectsSection.tsx)

### 5a. MISSING projects

These are real, shipped or active projects from the vault that don't appear on the site:

| Project | Status | Why it matters |
|---|---|---|
| **Murmur** | Shipped (Homebrew + DMG, github.com/roshanshah11/murmur) | Proof he ships macOS apps. Flagship build. |
| **Parcel** | Active Next.js repo, full vision doc | Most-developed startup (AI-native underwriting for tax-lien buyers). YC demo candidate. |
| **Broker Scraper** | Active codebase for Blue Oak | Real PE deliverable. Shows he builds for work, not just side projects. |
| **Networking OS** | Shipped (Electron + React + SQLite desktop app) | Ran a 206-firm cold-outreach campaign with it. Prior art for both networking and building threads. |

### 5b. Projects that are listed but may be stale

| Project | Status |
|---|---|
| **QuantVerse** | Confirmed **dead** (2026-07-08). Keep as proof he ships, but label as archived if desired. |
| **PEWP** | Hackathon project. Fine to keep. |
| **Transcript Analysis** | Lawrenceville tool. Fine to keep. |
| **Krypop** | E-commerce. Fine to keep as historical. |
| **AI and the HAL Revisited** | Fine — this is an actual paper. |
| **VertexLadder** | Fine — real systems work. |
| **VoiceBraille** | Fine — Penn MTSI project, won "Most Innovative Idea." |

### 5c. Project descriptions — minor issues

- **American Option Pricing**: vault says the precise citation is "American Option Pricing Under Time-Varying Rough Volatility: A Signature-Based Hybrid Framework" at arxiv.org/abs/2508.07151v2, under review for journal publication. Current description is fine.
- **DTV.AI**: listed as a project with role "Founder" but also listed in experience as "Co-Founder." The vault confirms it's a **co-founded** startup. Be consistent.

---

## 6. Awards & Honors (AwardsHoverPreview.tsx)

**Current awards:**
1. Herman Hollerith Prize — OK
2. Journal of Future Economists — OK
3. National Economics Challenge — OK
4. President's Volunteer Service Award — OK
5. Karl Bronson Prize — OK
6. Cum Laude Society — OK

**Missing awards (from AwardsSection.tsx which appears to be dead/unused code):**
- **Wharton Investment Comp** (Top 50 of 1,600+ teams, Jan 2024) — appears in AwardsSection.tsx but NOT in AwardsHoverPreview.tsx

**Recommendation:** Add the Wharton Investment Comp to AwardsHoverPreview.tsx if it's still relevant.

**Note:** AwardsSection.tsx appears to be dead code — it's imported nowhere in page.tsx. Can be removed or consolidated.

---

## 7. Footer (FooterSection.tsx)

| Element | Current | Action |
|---|---|---|
| "Open To" list | Public markets, Venture capital, Finance + AI, Technical systems, Investing | OK — matches vault |
| Contact | roshah2007@gmail.com, LinkedIn, GitHub | **Add UChicago email** (rashah@uchicago.edu) |
| "Built With" | Next.js, Three.js, Framer Motion | Could add GSAP, Lenis (both in package.json dependencies) |
| Copyright | "Updated Spring 2026" | **Update to current date** |
| Quote | "There is nothing so practical as a good theory." — Kurt Lewin | OK — confirmed in vault/Story.md |

---

## 8. Footer Command Bar (Footer.tsx)

**BUG on line 40:**
```
/home/rohan_shah
```
**Should be:**
```
/home/roshan_shah
```
"rohan" is a typo — his name is "Roshan."

---

## 9. Bio.tsx (possibly unused)

**Current (line 20-21):**
> "Student at UNC Chapel Hill"

**Action:** Update to "UChicago" or remove this component if it's dead code. It doesn't appear to be imported in page.tsx, but should be verified.

---

## 10. Resume PDF (public/roshan_shah_resume.pdf)

The current resume in the public folder is a static file. It needs to be replaced with a current version that includes:
- Blue Oak Group experience
- UChicago enrollment
- Updated projects list
- Removal of the $40K+ DTV.AI revenue claim

---

## 11. Public assets (public/)

Assets that are fine:
- `profile.jpeg`, `roshan_shah_resume.pdf` (needs replacement), `ai-and-the-hal-revisited.pdf`
- Award images: `cumlaudesociety.png`, `NEC.png`, `hsfedchallange.jpeg`, `2025-journal-of-future-economists.pdf`
- Project images: `PEWP.jpg`, `voicebraille.jpg`, `Hitech.jpeg`, `DTV.AI logo.png`

Potentially unused assets: `2024McClellanSociety.jpg`, `kenanflagler.jpeg`

---

## 12. Dead/Unused Components

| Component | Status |
|---|---|
| `Bio.tsx` | Not imported in page.tsx — likely dead code |
| `ExperienceSection.tsx` | Not imported in page.tsx — WorkSection.tsx is used instead. Contains stale "Black Swan Management" entry. |
| `ProjectsSection.tsx` | Not imported in page.tsx — WorkSection.tsx is used instead |
| `AwardsSection.tsx` | Not imported in page.tsx — AwardsHoverPreview.tsx is used instead. Has Wharton Investment Comp entry that's missing from the active component. |
| `NavigationMenu.tsx` | Not imported in page.tsx — likely dead code |
| `NextPageButton.tsx` | Not imported in page.tsx — likely dead code |
| `TextReveal.tsx` | Used by HeroSection — keep |
| `CommandBar.tsx` | Not imported in page.tsx — likely dead code |

---

## 13. Summary of All Changes Needed

### Critical (must fix)
1. **Add Blue Oak Group to experience** — current job, biggest gap
2. **Update education to UChicago** — AboutSection, layout metadata
3. **Fix all "Present" dates** — UNC roles are all historical
4. **Update resume PDF** in public/
5. **Fix "rohan" typo** in Footer.tsx

### High priority
6. **Add UChicago email** to contact section
7. **Add missing projects** (Murmur, Parcel, Broker Scraper, Networking OS)
8. **Update About bio text** to match vault narrative
9. **Remove DTV.AI $40K+ revenue** claim
10. **Update footer copyright** date

### Medium priority
11. **Add Wharton Investment Comp** to awards (it's in dead AwardsSection.tsx but not active AwardsHoverPreview.tsx)
12. **Update skills list** (add Swift, JS, hardware skills)
13. **Clean up dead components** (Bio.tsx, ExperienceSection.tsx, ProjectsSection.tsx, AwardsSection.tsx, NavigationMenu.tsx, NextPageButton.tsx, CommandBar.tsx)
14. **Update interests list** (add Tabla, Photography)

### Low priority
15. Review which public assets are still referenced (2024McClellanSociety.jpg, kenanflagler.jpeg)
16. Update "Built With" in footer to include GSAP, Lenis
17. Consider updating hero tagline for more specificity

---

## 14. Files to Modify

| File | Changes |
|---|---|
| `src/app/layout.tsx` | Update metadata description |
| `src/components/AboutSection.tsx` | Education (UChicago), bio text, skills, add UChicago email |
| `src/components/WorkSection.tsx` | Add Blue Oak, fix dates, remove DTV revenue, add missing projects |
| `src/components/AwardsHoverPreview.tsx` | Add Wharton Investment Comp |
| `src/components/FooterSection.tsx` | Add UChicago email, update copyright date, update "Built With" |
| `src/components/Footer.tsx` | Fix "rohan" → "roshan" typo |
| `src/components/Bio.tsx` | Update or remove (dead code) |
| `src/components/ExperienceSection.tsx` | Remove or archive (dead code, has Black Swan entry) |
| `src/components/ProjectsSection.tsx` | Remove or archive (dead code) |
| `src/components/AwardsSection.tsx` | Remove or archive (dead code) |
| `public/roshan_shah_resume.pdf` | Replace with current resume |
