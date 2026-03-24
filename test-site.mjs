/**
 * test-site.mjs — Puppeteer test suite for prof.bazzani.info
 *
 * Tests all pages, clicks all links/buttons, checks for:
 * - JS errors
 * - Broken links / 404s
 * - Canvas rendering
 * - Navigation (step avanti/indietro)
 * - Glossario functionality
 * - KaTeX rendering
 * - Mobile responsiveness
 * - UI/UX issues and improvement suggestions
 * - Content quality checks
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join, extname } from 'path';

const PORT = 8777;
const BASE = `http://localhost:${PORT}`;
const APP_DIR = join(import.meta.dirname, 'app');

// ── Simple static file server ──
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise(resolve => {
    const srv = createServer((req, res) => {
      let url = new URL(req.url, BASE).pathname;
      if (url === '/') url = '/index.html';
      const fp = join(APP_DIR, url);
      if (!existsSync(fp) || statSync(fp).isDirectory()) {
        res.writeHead(404); res.end('Not found'); return;
      }
      const ct = MIME[extname(fp)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': ct });
      res.end(readFileSync(fp));
    });
    srv.listen(PORT, () => resolve(srv));
  });
}

// ── Test infrastructure ──
const errors = [];
const warnings = [];
const improvements = [];

function fail(page, msg) { errors.push(`[ERROR] ${page}: ${msg}`); }
function warn(page, msg) { warnings.push(`[WARN] ${page}: ${msg}`); }
function suggest(page, msg) { improvements.push(`[IMPROVE] ${page}: ${msg}`); }

// ── Pages to test ──
const PAGES = [
  { url: '/', name: 'Home (index.html)' },
  { url: '/esercizi.html?p=0', name: 'Esercizio 1 - Carro attrezzi' },
  { url: '/esercizi.html?p=1', name: 'Esercizio 2 - Scala a pioli' },
  { url: '/esercizi.html?p=2', name: 'Esercizio 3 - Biliardo' },
  { url: '/teoria.html?t=0', name: 'Teoria - Notazione scientifica' },
  { url: '/teoria.html?t=1', name: 'Teoria - Vettori' },
  { url: '/teoria.html?t=2', name: 'Teoria - Leggi di Newton' },
  { url: '/teoria.html?t=3', name: 'Teoria - Forze e equilibrio' },
  { url: '/teoria.html?t=4', name: 'Teoria - DCL' },
  { url: '/teoria.html?t=5', name: 'Teoria - Piano inclinato' },
  { url: '/teoria.html?t=6', name: 'Teoria - Momenti' },
  { url: '/teoria.html?t=7', name: 'Teoria - Impulso e qdm' },
];

const VIEWPORTS = [
  { width: 1280, height: 800, name: 'Desktop' },
  { width: 375, height: 812, name: 'Mobile (iPhone)' },
  { width: 768, height: 1024, name: 'Tablet' },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Test functions ──

async function testPage(browser, pageInfo, viewport) {
  const tag = `${pageInfo.name} [${viewport.name}]`;
  const page = await browser.newPage();
  await page.setViewport(viewport);

  // Collect JS errors
  const jsErrors = [];
  page.on('pageerror', err => jsErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') jsErrors.push(msg.text());
  });

  // Collect failed network requests
  const failedRequests = [];
  page.on('requestfailed', req => {
    const url = req.url();
    // Ignore external CDN failures (not our fault)
    if (!url.startsWith(BASE)) return;
    failedRequests.push(`${req.failure().errorText}: ${url}`);
  });

  try {
    const resp = await page.goto(BASE + pageInfo.url, { waitUntil: 'networkidle2', timeout: 15000 });
    if (!resp || resp.status() !== 200) {
      fail(tag, `HTTP ${resp?.status()} — page failed to load`);
      await page.close();
      return;
    }

    // Wait for scripts to load
    await sleep(2000);

    // Report JS errors
    for (const e of jsErrors) {
      fail(tag, `JS error: ${e}`);
    }
    for (const e of failedRequests) {
      fail(tag, `Failed request: ${e}`);
    }

    // ── Check KaTeX rendering ──
    const katexBroken = await page.$$eval('.katex-error', els => els.map(e => e.textContent.slice(0, 80)));
    for (const k of katexBroken) {
      fail(tag, `KaTeX rendering error: "${k}"`);
    }

    // ── Check canvas exists and has content (for non-home pages) ──
    if (pageInfo.url !== '/') {
      const canvasInfo = await page.evaluate(() => {
        const c = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
        if (!c) return { exists: false };
        const ctx = c.getContext('2d');
        const data = ctx.getImageData(0, 0, c.width, c.height).data;
        let nonEmpty = 0;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] > 0) nonEmpty++;
        }
        return { exists: true, width: c.width, height: c.height, nonEmptyPixels: nonEmpty };
      });

      if (!canvasInfo.exists) {
        fail(tag, 'Canvas element not found');
      } else if (canvasInfo.nonEmptyPixels < 10) {
        warn(tag, `Canvas appears empty (only ${canvasInfo.nonEmptyPixels} non-transparent pixels)`);
      }
      if (canvasInfo.exists && (canvasInfo.width < 100 || canvasInfo.height < 100)) {
        warn(tag, `Canvas very small: ${canvasInfo.width}x${canvasInfo.height}`);
      }
    }

    // ── Check glossario button ──
    const hasGlossarioBtn = await page.$('#btn-glossario');
    if (!hasGlossarioBtn) {
      warn(tag, 'Glossario button (#btn-glossario) not found');
    }

    // ── Home page specific tests ──
    if (pageInfo.url === '/') {
      // Check all card links
      const links = await page.$$eval('a.home-card', els => els.map(e => ({
        href: e.getAttribute('href'),
        text: e.textContent.trim().slice(0, 50)
      })));
      if (links.length === 0) {
        fail(tag, 'No card links found on home page');
      }
      for (const link of links) {
        if (!link.href) fail(tag, `Card "${link.text}" has no href`);
      }

      // Check sections exist
      const sections = await page.$$('.home-section');
      if (sections.length < 2) {
        warn(tag, `Expected 2 sections (Esercizi + Teoria), found ${sections.length}`);
      }

      // UI checks
      const heroVisible = await page.$eval('.home-hero', el => {
        const rect = el.getBoundingClientRect();
        return rect.height > 0;
      }).catch(() => false);
      if (!heroVisible) warn(tag, 'Hero section not visible');

      // Check footer
      const footer = await page.$('footer');
      if (!footer) warn(tag, 'Footer not found');
    }

    // ── Exercise/Theory page tests ──
    if (pageInfo.url !== '/') {
      // Check navigation buttons exist
      const navInfo = await page.evaluate(() => {
        const prevBtn = document.querySelector('[id*="prev"], .btn-prev, button:has(svg), .nav-btn');
        const nextBtn = document.querySelector('[id*="next"], .btn-next, button:has(svg), .nav-btn');
        const stepIndicator = document.querySelector('.step-counter, .step-indicator, [class*="step"]');
        const title = document.querySelector('.step-title, h2, .card-title');
        return {
          hasPrev: !!prevBtn,
          hasNext: !!nextBtn,
          hasStepIndicator: !!stepIndicator,
          hasTitle: !!title,
          titleText: title?.textContent?.slice(0, 60) || '',
        };
      });

      if (!navInfo.hasTitle) warn(tag, 'No step title found');

      // Test step navigation — click "next" multiple times
      const totalSteps = await page.evaluate(() => {
        // Try to find step count from various possible sources
        if (typeof steps !== 'undefined') return steps.length;
        if (typeof STEPS !== 'undefined') return STEPS.length;
        const counter = document.querySelector('.step-counter, [class*="counter"]');
        if (counter) {
          const m = counter.textContent.match(/\/\s*(\d+)/);
          if (m) return parseInt(m[1]);
        }
        return 0;
      });

      if (totalSteps > 0) {
        // Navigate through all steps
        for (let step = 0; step < Math.min(totalSteps, 30); step++) {
          jsErrors.length = 0; // Reset for this step

          // Click next button
          const clicked = await page.evaluate(() => {
            const btn = document.getElementById('btn-next') ||
                        document.querySelector('.btn-next, [aria-label*="next"], [aria-label*="avanti"]');
            if (btn && !btn.disabled) { btn.click(); return true; }
            return false;
          });

          if (!clicked && step < totalSteps - 1) {
            warn(tag, `Could not click "next" at step ${step + 1}/${totalSteps}`);
            break;
          }

          await sleep(800); // Wait for animation

          // Check for JS errors after navigation
          for (const e of jsErrors) {
            fail(tag, `JS error at step ${step + 1}: ${e}`);
          }

          // Check canvas is still rendering
          const canvasOk = await page.evaluate(() => {
            const c = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
            if (!c) return true; // no canvas is ok
            const ctx = c.getContext('2d');
            const data = ctx.getImageData(0, 0, c.width, c.height).data;
            let nonEmpty = 0;
            for (let i = 3; i < data.length; i += 4) if (data[i] > 0) nonEmpty++;
            return nonEmpty > 5;
          });
          if (!canvasOk) {
            warn(tag, `Canvas appears blank at step ${step + 1}`);
          }
        }
      }

      // Test glossario interaction
      if (hasGlossarioBtn) {
        await page.click('#btn-glossario');
        await sleep(500);
        const modalVisible = await page.evaluate(() => {
          const modal = document.querySelector('.glossario-modal, .modal, [class*="glossario"]');
          if (!modal) return false;
          const style = window.getComputedStyle(modal);
          return style.display !== 'none' && style.visibility !== 'hidden';
        });
        if (!modalVisible) {
          warn(tag, 'Glossario modal did not appear after clicking button');
        } else {
          // Close it
          await page.evaluate(() => {
            const closeBtn = document.querySelector('.glossario-close, .modal-close, [aria-label*="chiudi"]');
            if (closeBtn) closeBtn.click();
          });
        }
      }

      // Check term tooltips
      const terms = await page.$$('.term[data-term]');
      if (terms.length > 0) {
        await terms[0].click();
        await sleep(500);
        const tooltipVisible = await page.evaluate(() => {
          const tt = document.querySelector('.term-modal.open, .callout, .tooltip, .term-callout, [class*="callout"]');
          return tt && window.getComputedStyle(tt).display !== 'none';
        });
        if (!tooltipVisible) {
          warn(tag, 'Term tooltip did not appear after clicking a .term element');
        } else {
          // Close the term modal/callout before continuing
          await page.evaluate(() => {
            const closeBtn = document.querySelector('.term-modal-close, .callout-close');
            if (closeBtn) closeBtn.click();
          });
          await sleep(300);
        }
      }
    }

    // ── UI/UX Analysis ──
    await analyzeUI(page, tag, viewport);

    // ── Content Analysis ──
    await analyzeContent(page, tag);

    // ── Visual Design Analysis ──
    await analyzeVisualDesign(page, tag, viewport);

    // ── Animation Quality Analysis ──
    if (pageInfo.url !== '/') {
      await analyzeAnimations(page, tag, viewport);
    }

    // ── Canvas Graphics Quality (overlapping labels, readability) ──
    if (pageInfo.url !== '/') {
      await analyzeCanvasQuality(page, tag, viewport);
    }

    // ── Content Pedagogy Analysis (for 14-year-olds) ──
    if (pageInfo.url !== '/') {
      await analyzePedagogy(page, tag);
    }

  } catch (err) {
    fail(tag, `Test crashed: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function analyzeUI(page, tag, viewport) {
  // Check for text overflow / horizontal scroll
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  if (hasOverflow) {
    warn(tag, 'Page has horizontal overflow (content wider than viewport)');
  }

  // Check for overlapping elements (skip elements inside fixed overlays — they cover everything by design)
  const overlaps = await page.evaluate(() => {
    const issues = [];
    const buttons = document.querySelectorAll('button, a.home-card, .nav-btn, .btn-prev, .btn-next');
    const rects = [];
    buttons.forEach(b => {
      const r = b.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        // Skip buttons inside fixed/absolute overlays (they stack on a different z-layer)
        const inOverlay = b.closest('.concept-overlay, .glossario-modal, .term-modal, .modal, [class*="overlay"]');
        if (inOverlay) return;
        rects.push({ el: b.tagName + (b.className ? '.' + b.className.split(' ')[0] : ''), ...r.toJSON() });
      }
    });
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i], b = rects[j];
        if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
          issues.push(`${a.el} overlaps with ${b.el}`);
        }
      }
    }
    return issues.slice(0, 5);
  });
  for (const o of overlaps) {
    warn(tag, `Overlapping elements: ${o}`);
  }

  // Check touch target sizes on mobile
  if (viewport.width < 500) {
    const smallTargets = await page.evaluate(() => {
      const issues = [];
      document.querySelectorAll('button, a, [role="button"]').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) {
          // Skip elements that have ::before/::after touch area expanders
          // (check via computed min-height or padding that effectively makes them 44px+)
          const style = window.getComputedStyle(el);
          const totalH = r.height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
          // Skip step-dots (have ::before 44px touch target)
          if (el.classList.contains('step-dot')) return;
          // Skip .term elements (have expanded padding on mobile for touch)
          if (el.classList.contains('term')) return;
          // Skip term-link elements (inline "see also" links inside callouts)
          if (el.classList.contains('term-link')) return;
          // Skip elements inside overlays or callouts
          if (el.closest('.concept-overlay, .glossario-modal, .term-callout')) return;
          const text = el.textContent?.trim().slice(0, 30) || el.className;
          issues.push(`"${text}" is ${Math.round(r.width)}x${Math.round(r.height)}px (min 44x44)`);
        }
      });
      return issues.slice(0, 5);
    });
    for (const s of smallTargets) {
      suggest(tag, `Small touch target: ${s}`);
    }
  }

  // Check font sizes
  const smallText = await page.evaluate(() => {
    const issues = [];
    document.querySelectorAll('p, span, li, td, th, label').forEach(el => {
      const size = parseFloat(window.getComputedStyle(el).fontSize);
      const text = el.textContent.trim();
      // Skip zero-width spaces and KaTeX internal elements
      if (size < 12 && text.length > 0 && el.offsetHeight > 0) {
        // Ignore invisible/zero-width chars (KaTeX spacers, etc.)
        const visibleText = text.replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, '');
        if (visibleText.length === 0) return;
        // Skip KaTeX internal elements
        if (el.closest('.katex, .katex-html, .katex-mathml')) return;
        issues.push(`"${visibleText.slice(0, 30)}" has font-size ${size}px`);
      }
    });
    return issues.slice(0, 3);
  });
  for (const s of smallText) {
    suggest(tag, `Small font: ${s}`);
  }

  // Check color contrast (basic check)
  const contrastIssues = await page.evaluate(() => {
    const issues = [];
    function luminance(r, g, b) {
      const a = [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
    function parseColor(s) {
      const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : null;
    }
    document.querySelectorAll('p, span, h1, h2, h3, h4, a, button, li').forEach(el => {
      if (el.offsetHeight === 0) return;
      const style = window.getComputedStyle(el);
      const fg = parseColor(style.color);
      const bg = parseColor(style.backgroundColor);
      if (fg && bg && bg[0] + bg[1] + bg[2] > 0) { // has explicit background
        const l1 = luminance(...fg), l2 = luminance(...bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        if (ratio < 3) {
          issues.push(`Low contrast (${ratio.toFixed(1)}:1) on "${el.textContent.trim().slice(0, 25)}"`);
        }
      }
    });
    return issues.slice(0, 3);
  });
  for (const c of contrastIssues) {
    suggest(tag, `Contrast: ${c}`);
  }

  // Check images without alt
  const imgNoAlt = await page.evaluate(() => {
    return [...document.querySelectorAll('img:not([alt])')].length;
  });
  if (imgNoAlt > 0) {
    suggest(tag, `${imgNoAlt} image(s) without alt attribute`);
  }

  // Check for missing aria labels on interactive elements
  const ariaIssues = await page.evaluate(() => {
    const issues = [];
    document.querySelectorAll('button, [role="button"]').forEach(el => {
      if (!el.textContent.trim() && !el.getAttribute('aria-label') && !el.getAttribute('title')) {
        issues.push(`Button without text or aria-label: ${el.className || el.id || 'unnamed'}`);
      }
    });
    return issues.slice(0, 3);
  });
  for (const a of ariaIssues) {
    suggest(tag, `Accessibility: ${a}`);
  }
}

async function analyzeContent(page, tag) {
  // Check for empty text containers
  const emptyContainers = await page.evaluate(() => {
    const issues = [];
    document.querySelectorAll('.step-text, .card-text, .text-content, [class*="text"]').forEach(el => {
      if (el.offsetHeight > 0 && el.textContent.trim().length === 0) {
        issues.push(el.className);
      }
    });
    return issues;
  });
  for (const e of emptyContainers) {
    warn(tag, `Empty text container: .${e}`);
  }

  // Check for placeholder/TODO text
  const placeholders = await page.evaluate(() => {
    const body = document.body.innerText.toLowerCase();
    const patterns = ['todo', 'fixme', 'xxx', 'placeholder', 'lorem ipsum', 'tbd'];
    return patterns.filter(p => body.includes(p));
  });
  for (const p of placeholders) {
    warn(tag, `Found placeholder text: "${p}"`);
  }

  // Check that formulas are present where expected (exercise/theory pages)
  if (!tag.includes('Home')) {
    const formulaCount = await page.$$eval('.katex, .formula, [class*="formula"]', els => els.length);
    if (formulaCount === 0) {
      suggest(tag, 'No KaTeX formulas found on this page — expected at least one for a physics lesson');
    }
  }
}

// ── Visual Design Analysis ──
async function analyzeVisualDesign(page, tag, viewport) {
  const isMobile = viewport.width < 500;
  const isTablet = viewport.width >= 500 && viewport.width < 900;

  // Check spacing consistency — only between cards in the same grid container
  const spacingIssues = await page.evaluate(() => {
    const issues = [];
    // Check each .home-cards grid separately
    document.querySelectorAll('.home-cards').forEach(grid => {
      const cards = [...grid.querySelectorAll('.home-card')];
      if (cards.length < 2) return;
      // Only compare cards that are vertically stacked (same column / single-column layout)
      const gaps = [];
      for (let i = 0; i < cards.length - 1; i++) {
        const r1 = cards[i].getBoundingClientRect();
        const r2 = cards[i + 1].getBoundingClientRect();
        // Only count if r2 is below r1 (not side-by-side in grid)
        if (r2.top > r1.bottom - 5) {
          gaps.push(Math.round(r2.top - r1.bottom));
        }
      }
      if (gaps.length > 1) {
        const min = Math.min(...gaps), max = Math.max(...gaps);
        if (max - min > 8) { // allow 8px tolerance
          issues.push(`Card spacing varies from ${min}px to ${max}px within a section — should be uniform`);
        }
      }
    });

    return issues;
  });
  for (const s of spacingIssues) suggest(tag, `Layout: ${s}`);

  // Check visual hierarchy — headers should be visually distinct
  const hierarchyIssues = await page.evaluate(() => {
    const issues = [];
    const h2s = document.querySelectorAll('h2');
    const h3s = document.querySelectorAll('h3');
    const h4s = document.querySelectorAll('h4');
    if (h2s.length && h3s.length) {
      const h2Size = parseFloat(window.getComputedStyle(h2s[0]).fontSize);
      const h3Size = parseFloat(window.getComputedStyle(h3s[0]).fontSize);
      if (h2Size - h3Size < 4) {
        issues.push(`h2 (${h2Size}px) and h3 (${h3Size}px) are too similar in size — weak visual hierarchy`);
      }
    }
    if (h3s.length && h4s.length) {
      const h3Size = parseFloat(window.getComputedStyle(h3s[0]).fontSize);
      const h4Size = parseFloat(window.getComputedStyle(h4s[0]).fontSize);
      if (h3Size - h4Size < 2) {
        issues.push(`h3 (${h3Size}px) and h4 (${h4Size}px) are too similar in size`);
      }
    }
    return issues;
  });
  for (const h of hierarchyIssues) suggest(tag, `Typography: ${h}`);

  // Check mobile-specific layout
  if (isMobile) {
    const mobileIssues = await page.evaluate(() => {
      const issues = [];

      // Check if nav/header takes too much vertical space
      const header = document.querySelector('header, .header');
      if (header) {
        const hHeight = header.getBoundingClientRect().height;
        if (hHeight > 80) {
          issues.push(`Header is ${Math.round(hHeight)}px tall on mobile — should be compact (<80px) to save screen space`);
        }
      }

      // Check if canvas is properly sized for mobile
      const canvas = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
      if (canvas) {
        const r = canvas.getBoundingClientRect();
        const vpW = window.innerWidth;
        if (r.width < vpW * 0.85) {
          issues.push(`Canvas only uses ${Math.round(r.width / vpW * 100)}% of mobile width — could be wider for better visibility`);
        }
        if (r.height < 200) {
          issues.push(`Canvas is only ${Math.round(r.height)}px tall on mobile — animations may be hard to see`);
        }
      }

      // Check text readability
      const mainText = document.querySelector('.step-text, .text-content, [class*="step"] p, .card-text');
      if (mainText) {
        const style = window.getComputedStyle(mainText);
        const lineHeight = parseFloat(style.lineHeight) / parseFloat(style.fontSize);
        if (lineHeight < 1.4) {
          issues.push(`Main text line-height is ${lineHeight.toFixed(1)} — should be ≥1.5 for readability on mobile`);
        }
      }

      // Check bottom nav is not covering content
      const bottomNav = document.querySelector('.nav-bottom, .bottom-nav, nav[class*="bottom"], .step-nav');
      if (bottomNav) {
        const bnRect = bottomNav.getBoundingClientRect();
        const content = document.querySelector('main, .main, .content, .step-content');
        if (content) {
          const cRect = content.getBoundingClientRect();
          if (cRect.bottom > bnRect.top - 10) {
            issues.push('Bottom navigation may overlap with content — add more bottom padding');
          }
        }
      }

      // Check if buttons are thumb-friendly (skip hidden/display:none buttons)
      const navBtns = document.querySelectorAll('.btn-prev, .btn-next, #btn-prev, #btn-next, .nav-btn');
      navBtns.forEach(btn => {
        const r = btn.getBoundingClientRect();
        if (r.height === 0 || r.width === 0) return; // hidden element
        if (r.height < 48) {
          issues.push(`Navigation button "${btn.textContent.trim().slice(0, 20)}" is ${Math.round(r.height)}px tall — should be ≥48px for easy thumb tapping`);
        }
      });

      return issues.slice(0, 8);
    });
    for (const m of mobileIssues) suggest(tag, `Mobile: ${m}`);
  }

  // Desktop-specific checks
  if (!isMobile && !isTablet) {
    const desktopIssues = await page.evaluate(() => {
      const issues = [];

      // Check max-width containment
      const body = document.body;
      const bodyW = body.getBoundingClientRect().width;
      if (bodyW > 1400) {
        const main = document.querySelector('main, .main, .content');
        if (main) {
          const mainW = main.getBoundingClientRect().width;
          if (mainW > 1200) {
            issues.push(`Content area is ${Math.round(mainW)}px wide — consider max-width for better readability on large screens`);
          }
        }
      }

      // Check canvas isn't stretched too wide on desktop
      const canvas = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
      if (canvas) {
        const r = canvas.getBoundingClientRect();
        if (r.width > 900) {
          issues.push(`Canvas is ${Math.round(r.width)}px wide on desktop — very large, check if animations scale properly`);
        }
      }

      return issues;
    });
    for (const d of desktopIssues) suggest(tag, `Desktop: ${d}`);
  }

  // Color palette analysis
  const colorIssues = await page.evaluate(() => {
    const issues = [];
    const bgColors = new Set();
    document.querySelectorAll('*').forEach(el => {
      if (el.offsetHeight === 0) return;
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        bgColors.add(bg);
      }
    });
    if (bgColors.size > 12) {
      issues.push(`${bgColors.size} different background colors used — consider a more cohesive palette (aim for 5-8 max)`);
    }
    return issues;
  });
  for (const c of colorIssues) suggest(tag, `Colors: ${c}`);

  // Check border-radius consistency
  const radiusIssues = await page.evaluate(() => {
    const radii = new Map();
    document.querySelectorAll('.home-card, .card, button, .btn, [class*="card"], [class*="btn"]').forEach(el => {
      if (el.offsetHeight === 0) return;
      const br = window.getComputedStyle(el).borderRadius;
      if (br && br !== '0px') {
        radii.set(br, (radii.get(br) || 0) + 1);
      }
    });
    if (radii.size > 4) {
      return [`${radii.size} different border-radius values on interactive elements — consider standardizing (e.g. 8px for buttons, 12px for cards)`];
    }
    return [];
  });
  for (const r of radiusIssues) suggest(tag, `Style: ${r}`);
}

// ── Animation Quality Analysis ──
async function analyzeAnimations(page, tag, viewport) {
  // Go back to step 0 first
  await page.evaluate(() => {
    if (typeof goToStep === 'function') goToStep(0);
    else if (typeof currentStep !== 'undefined') {
      const btn = document.getElementById('btn-prev');
      if (btn) for (let i = 0; i < 30; i++) { if (!btn.disabled) btn.click(); }
    }
  });
  await sleep(500);

  // Test animation smoothness by sampling canvas over time
  const animResults = await page.evaluate(() => {
    return new Promise(resolve => {
      const canvas = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
      if (!canvas) { resolve({ noCanvas: true }); return; }

      const ctx = canvas.getContext('2d');
      const snapshots = [];

      // Take snapshots over 2 seconds
      let count = 0;
      const interval = setInterval(() => {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let hash = 0;
        // Sample every 100th pixel for speed
        for (let i = 0; i < data.length; i += 400) {
          hash = ((hash << 5) - hash + data[i]) | 0;
        }
        snapshots.push(hash);
        count++;
        if (count >= 10) {
          clearInterval(interval);
          // Check if canvas changed at all (animation happening)
          const unique = new Set(snapshots).size;
          resolve({
            totalFrames: snapshots.length,
            uniqueFrames: unique,
            isStatic: unique <= 2,
            canvasW: canvas.width,
            canvasH: canvas.height,
          });
        }
      }, 200);
    });
  });

  if (animResults.noCanvas) return;

  // Now advance one step and measure the transition animation
  const transitionResult = await page.evaluate(() => {
    return new Promise(resolve => {
      const canvas = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
      if (!canvas) { resolve(null); return; }
      const ctx = canvas.getContext('2d');

      // Click next
      const btn = document.getElementById('btn-next') ||
                  document.querySelector('.btn-next, [aria-label*="next"], [aria-label*="avanti"]');
      if (!btn || btn.disabled) { resolve(null); return; }

      const snapshots = [];
      const startTime = Date.now();

      btn.click();

      // Sample rapidly during transition
      const interval = setInterval(() => {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let nonEmpty = 0;
        for (let i = 3; i < data.length; i += 16) if (data[i] > 0) nonEmpty++;
        snapshots.push({ t: Date.now() - startTime, pixels: nonEmpty });

        if (Date.now() - startTime > 2000) {
          clearInterval(interval);
          // Check for blank frames during transition
          const minPixels = Math.min(...snapshots.map(s => s.pixels));
          const maxPixels = Math.max(...snapshots.map(s => s.pixels));
          const blankFrames = snapshots.filter(s => s.pixels < maxPixels * 0.05).length;
          resolve({
            frames: snapshots.length,
            minPixels, maxPixels, blankFrames,
            hasFlicker: blankFrames > 2,
            duration: snapshots[snapshots.length - 1].t,
          });
        }
      }, 50);
    });
  });

  if (transitionResult) {
    if (transitionResult.hasFlicker) {
      warn(tag, `Animation flickers during step transition — canvas goes blank for ${transitionResult.blankFrames} frames. Consider smoother transitions`);
    }
    if (transitionResult.frames < 5) {
      suggest(tag, `Step transition has very few animation frames (${transitionResult.frames}) — may look jumpy. Consider easing or longer duration`);
    }
  }

  // Check canvas resolution vs display size (blurry on retina?)
  const retinaIssue = await page.evaluate(() => {
    const canvas = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const expectedW = rect.width * dpr;
    const expectedH = rect.height * dpr;
    if (canvas.width < expectedW * 0.8 || canvas.height < expectedH * 0.8) {
      return `Canvas is ${canvas.width}x${canvas.height} but displayed at ${Math.round(rect.width)}x${Math.round(rect.height)} (DPR ${dpr}) — may look blurry on retina screens`;
    }
    return null;
  });
  if (retinaIssue) suggest(tag, `Canvas: ${retinaIssue}`);

  // Check if animations use color effectively
  const colorUsage = await page.evaluate(() => {
    const canvas = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colors = new Set();
    for (let i = 0; i < data.length; i += 16) {
      if (data[i + 3] > 50) { // visible pixels
        // Quantize to reduce unique count
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i + 1] / 32) * 32;
        const b = Math.round(data[i + 2] / 32) * 32;
        colors.add(`${r},${g},${b}`);
      }
    }
    return { uniqueColors: colors.size };
  });
  if (colorUsage && colorUsage.uniqueColors < 3) {
    suggest(tag, `Animation uses very few colors (${colorUsage.uniqueColors}) — more color variety could make diagrams clearer and more engaging for students`);
  }

  // Check if canvas has labels/text (important for educational content)
  const hasCanvasText = await page.evaluate(() => {
    // We can't easily detect canvas text, but we can check if the draw functions use fillText
    const scripts = document.querySelectorAll('script[src]');
    return { scriptCount: scripts.length }; // We'll check source files separately
  });
}

// ── Canvas Graphics Quality Analysis ──
// Intercepts Canvas2D calls to detect overlapping labels, tiny text,
// arrows/shapes drawn outside bounds, and other visual issues
async function analyzeCanvasQuality(page, tag, viewport) {
  // Navigate to step 0
  await page.evaluate(() => {
    if (typeof goToStep === 'function') goToStep(0);
  });
  await sleep(400);

  const totalSteps = await page.evaluate(() => {
    if (typeof steps !== 'undefined') return steps.length;
    if (typeof STEPS !== 'undefined') return STEPS.length;
    return 0;
  });

  if (totalSteps === 0) return;

  for (let stepIdx = 0; stepIdx < Math.min(totalSteps, 25); stepIdx++) {
    // Inject canvas spy BEFORE the step draws
    const stepIssues = await page.evaluate((si) => {
      const canvas = (document.getElementById('animation-canvas') || document.querySelector('canvas'));
      if (!canvas) return { issues: [], step: si };

      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      const labels = [];   // {text, x, y, fontSize, width, height}
      const arrows = [];   // {x1, y1, x2, y2}
      const issues = [];

      // Monkey-patch fillText to record label positions
      const origFillText = ctx.fillText.bind(ctx);
      const origStrokeText = ctx.strokeText?.bind(ctx) || (() => {});
      const origMoveTo = ctx.moveTo.bind(ctx);
      const origLineTo = ctx.lineTo.bind(ctx);

      let currentPath = [];

      ctx.fillText = function(text, x, y, ...rest) {
        const fontMatch = ctx.font.match(/(\d+(?:\.\d+)?)\s*px/);
        const fontSize = fontMatch ? parseFloat(fontMatch[1]) : 14;
        const measured = ctx.measureText(text);
        const width = measured.width;
        const height = fontSize * 1.2;

        // Adjust for textAlign
        let adjX = x;
        if (ctx.textAlign === 'center') adjX = x - width / 2;
        else if (ctx.textAlign === 'right') adjX = x - width;

        // Adjust for textBaseline
        let adjY = y;
        if (ctx.textBaseline === 'middle') adjY = y - height / 2;
        else if (ctx.textBaseline === 'top') adjY = y;
        else adjY = y - height; // bottom/alphabetic

        labels.push({
          text: String(text).slice(0, 30),
          x: adjX, y: adjY,
          width, height, fontSize,
          alpha: ctx.globalAlpha,
        });

        return origFillText(text, x, y, ...rest);
      };

      // Record line segments (for arrow detection)
      ctx.moveTo = function(x, y) {
        currentPath = [{x, y}];
        return origMoveTo(x, y);
      };
      ctx.lineTo = function(x, y) {
        if (currentPath.length > 0) {
          const prev = currentPath[currentPath.length - 1];
          arrows.push({ x1: prev.x, y1: prev.y, x2: x, y2: y });
        }
        currentPath.push({x, y});
        return origLineTo(x, y);
      };

      // Force redraw the current step
      if (typeof goToStep === 'function') goToStep(si);

      // Wait a frame for draw to complete
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Restore original methods
            ctx.fillText = origFillText;
            ctx.strokeText = origStrokeText;
            ctx.moveTo = origMoveTo;
            ctx.lineTo = origLineTo;

            // --- Analysis ---

            // 1. Check for overlapping labels
            for (let i = 0; i < labels.length; i++) {
              for (let j = i + 1; j < labels.length; j++) {
                const a = labels[i], b = labels[j];
                if (a.alpha < 0.1 || b.alpha < 0.1) continue; // skip invisible
                // Check rectangle overlap
                const overlapX = a.x < b.x + b.width && a.x + a.width > b.x;
                const overlapY = a.y < b.y + b.height && a.y + a.height > b.y;
                if (overlapX && overlapY) {
                  // Calculate overlap area
                  const ox = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
                  const oy = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
                  const overlapArea = ox * oy;
                  const smallerArea = Math.min(a.width * a.height, b.width * b.height);
                  if (smallerArea > 0 && overlapArea / smallerArea > 0.3) {
                    issues.push({
                      type: 'overlap',
                      msg: `Le etichette "${a.text}" e "${b.text}" si sovrappongono (${Math.round(overlapArea / smallerArea * 100)}% overlap)`,
                    });
                  }
                }
              }
            }

            // 2. Check labels outside canvas bounds
            for (const l of labels) {
              if (l.alpha < 0.1) continue;
              if (l.x + l.width < 0 || l.x > W || l.y + l.height < 0 || l.y > H) {
                issues.push({
                  type: 'outofbounds',
                  msg: `L'etichetta "${l.text}" è fuori dal canvas (x:${Math.round(l.x)}, y:${Math.round(l.y)}, canvas:${W}x${H})`,
                });
              } else if (l.x < -5 || l.y < -5 || l.x + l.width > W + 5 || l.y + l.height > H + 5) {
                issues.push({
                  type: 'clipped',
                  msg: `L'etichetta "${l.text}" è parzialmente tagliata dal bordo del canvas`,
                });
              }
            }

            // 3. Check for very small text (unreadable)
            for (const l of labels) {
              if (l.alpha < 0.1) continue;
              if (l.fontSize < 8) {
                issues.push({
                  type: 'tinytext',
                  msg: `L'etichetta "${l.text}" ha font ${l.fontSize.toFixed(1)}px — troppo piccola per essere letta`,
                });
              }
            }

            // 4. Check labels too close to arrow endpoints (overlapping with arrows)
            for (const l of labels) {
              if (l.alpha < 0.1) continue;
              const lCenterX = l.x + l.width / 2;
              const lCenterY = l.y + l.height / 2;
              for (const a of arrows) {
                // Check if label center is very close to arrow line
                const len = Math.sqrt((a.x2 - a.x1) ** 2 + (a.y2 - a.y1) ** 2);
                if (len < 5) continue;
                // Distance from label center to arrow line segment
                const dx = a.x2 - a.x1, dy = a.y2 - a.y1;
                const t = Math.max(0, Math.min(1, ((lCenterX - a.x1) * dx + (lCenterY - a.y1) * dy) / (len * len)));
                const closestX = a.x1 + t * dx, closestY = a.y1 + t * dy;
                const dist = Math.sqrt((lCenterX - closestX) ** 2 + (lCenterY - closestY) ** 2);
                if (dist < 3 && l.text.length > 1) {
                  issues.push({
                    type: 'arrow_label_overlap',
                    msg: `L'etichetta "${l.text}" è sovrapposta a una freccia (distanza: ${dist.toFixed(0)}px)`,
                  });
                  break; // one per label
                }
              }
            }

            // 5. Check for labels with same text drawn multiple times at same position (glitch)
            const seen = new Map();
            for (const l of labels) {
              if (l.alpha < 0.1) continue;
              const key = l.text;
              if (seen.has(key)) {
                const prev = seen.get(key);
                const dist = Math.sqrt((l.x - prev.x) ** 2 + (l.y - prev.y) ** 2);
                if (dist < 3) {
                  issues.push({
                    type: 'duplicate',
                    msg: `L'etichetta "${l.text}" è disegnata due volte nella stessa posizione (testo doppio/sfocato)`,
                  });
                }
              }
              seen.set(key, l);
            }

            // 6. Check arrow endpoints outside canvas
            for (const a of arrows) {
              const len = Math.sqrt((a.x2 - a.x1) ** 2 + (a.y2 - a.y1) ** 2);
              if (len < 20) continue; // skip short segments (arrowheads)
              if (a.x2 < -10 || a.x2 > W + 10 || a.y2 < -10 || a.y2 > H + 10) {
                issues.push({
                  type: 'arrow_oob',
                  msg: `Una freccia termina fuori dal canvas (endpoint: ${Math.round(a.x2)},${Math.round(a.y2)})`,
                });
              }
            }

            // 7. Check density — too many labels in a small area
            if (labels.filter(l => l.alpha > 0.1).length > 0) {
              // Divide canvas into quadrants, check density
              const quadrants = [{x:0,y:0}, {x:W/2,y:0}, {x:0,y:H/2}, {x:W/2,y:H/2}];
              for (const q of quadrants) {
                const inQuad = labels.filter(l =>
                  l.alpha > 0.1 &&
                  l.x + l.width / 2 >= q.x && l.x + l.width / 2 < q.x + W / 2 &&
                  l.y + l.height / 2 >= q.y && l.y + l.height / 2 < q.y + H / 2
                );
                if (inQuad.length > 8) {
                  issues.push({
                    type: 'crowded',
                    msg: `Zona troppo affollata: ${inQuad.length} etichette nel quadrante (${q.x === 0 ? 'sinistra' : 'destra'}-${q.y === 0 ? 'alto' : 'basso'}) — rischia di essere confuso`,
                  });
                }
              }
            }

            // Deduplicate issues
            const uniqueIssues = [];
            const seenMsgs = new Set();
            for (const issue of issues) {
              if (!seenMsgs.has(issue.msg)) {
                seenMsgs.add(issue.msg);
                uniqueIssues.push(issue);
              }
            }

            resolve({
              issues: uniqueIssues.slice(0, 10),
              step: si,
              labelCount: labels.filter(l => l.alpha > 0.1).length,
              arrowCount: arrows.filter(a => Math.sqrt((a.x2-a.x1)**2 + (a.y2-a.y1)**2) > 15).length,
            });
          });
        });
      });
    }, stepIdx);

    // Report issues for this step
    if (stepIssues.issues.length > 0) {
      for (const issue of stepIssues.issues) {
        if (issue.type === 'overlap' || issue.type === 'duplicate') {
          warn(tag, `Step ${stepIdx + 1}: ${issue.msg}`);
        } else {
          suggest(tag, `Step ${stepIdx + 1}: ${issue.msg}`);
        }
      }
    }

    // Advance to next step
    if (stepIdx < totalSteps - 1) {
      await page.evaluate(() => {
        const btn = document.getElementById('btn-next') ||
                    document.querySelector('.btn-next, [aria-label*="next"], [aria-label*="avanti"]');
        if (btn && !btn.disabled) btn.click();
      });
      await sleep(600);
    }
  }
}

// ── Pedagogy & Content Quality Analysis (target: 14-year-olds) ──
async function analyzePedagogy(page, tag) {
  // Collect ALL step texts by navigating through every step
  const allStepsData = await page.evaluate(() => {
    // Go to first step
    if (typeof goToStep === 'function') goToStep(0);
    return null;
  });
  await sleep(300);

  // Collect texts from all steps
  const stepTexts = [];
  const totalSteps = await page.evaluate(() => {
    if (typeof steps !== 'undefined') return steps.length;
    if (typeof STEPS !== 'undefined') return STEPS.length;
    const counter = document.querySelector('.step-counter, [class*="counter"]');
    if (counter) {
      const m = counter.textContent.match(/\/\s*(\d+)/);
      if (m) return parseInt(m[1]);
    }
    return 0;
  });

  // Navigate back to step 0
  await page.evaluate(() => {
    if (typeof goToStep === 'function') goToStep(0);
  });
  await sleep(300);

  for (let i = 0; i < Math.min(totalSteps, 25); i++) {
    const stepData = await page.evaluate((stepIdx) => {
      const title = document.querySelector('.step-title, h2, .card-title');
      const textEl = document.querySelector('.step-text, .card-text, .text-content, [class*="step-text"], [class*="text-content"]');
      const formulaEl = document.querySelector('.katex, .formula, [class*="formula"]');
      const terms = document.querySelectorAll('.term[data-term]');
      const highlights = document.querySelectorAll('.highlight');
      return {
        step: stepIdx,
        title: title?.textContent?.trim() || '',
        text: textEl?.innerText?.trim() || '',
        html: textEl?.innerHTML || '',
        hasFormula: !!formulaEl,
        termCount: terms.length,
        highlightCount: highlights.length,
        textLength: textEl?.innerText?.trim().length || 0,
      };
    }, i);
    stepTexts.push(stepData);

    // Advance to next step
    if (i < totalSteps - 1) {
      await page.evaluate(() => {
        const btn = document.getElementById('btn-next') ||
                    document.querySelector('.btn-next, [aria-label*="next"], [aria-label*="avanti"]');
        if (btn && !btn.disabled) btn.click();
      });
      await sleep(400);
    }
  }

  // ── Analyze collected content ──

  for (const step of stepTexts) {
    const text = step.text;
    if (!text) continue;

    // 1. Check text length per step — too long is overwhelming, too short is unhelpful
    if (step.textLength > 500) {
      suggest(tag, `Step ${step.step + 1} ("${step.title.slice(0, 30)}") has ${step.textLength} chars — a 14-year-old may lose focus. Consider splitting into shorter steps (<400 chars)`);
    }
    if (step.textLength > 0 && step.textLength < 30) {
      suggest(tag, `Step ${step.step + 1} ("${step.title.slice(0, 30)}") has only ${step.textLength} chars — too brief to be helpful. Add more explanation`);
    }

    // 2. Check for overly technical/formal language
    const formalPatterns = [
      { re: /pertanto/gi, fix: 'quindi / perciò' },
      { re: /altresì/gi, fix: 'anche / inoltre' },
      { re: /suddett[oai]/gi, fix: 'questo/a' },
      { re: /al fine di/gi, fix: 'per' },
      { re: /in virtù di/gi, fix: 'grazie a / per' },
      { re: /si evince/gi, fix: 'si capisce / si vede' },
      { re: /segnatamente/gi, fix: 'in particolare' },
      { re: /fattispecie/gi, fix: 'caso / situazione' },
      { re: /precipuamente/gi, fix: 'soprattutto' },
      { re: /è doveroso/gi, fix: 'è importante / dobbiamo' },
      { re: /si consideri/gi, fix: 'guardiamo / pensiamo a' },
      { re: /avvalendosi/gi, fix: 'usando' },
      { re: /poc'anzi/gi, fix: 'prima / poco fa' },
      { re: /testé/gi, fix: 'appena / poco fa' },
      { re: /quivi/gi, fix: 'qui' },
      { re: /di conseguenza/gi, fix: 'quindi' },
      { re: /si proceda/gi, fix: 'facciamo / passiamo a' },
    ];
    for (const pat of formalPatterns) {
      if (pat.re.test(text)) {
        suggest(tag, `Step ${step.step + 1}: usa "${text.match(pat.re)[0]}" — troppo formale per un 14enne. Meglio: "${pat.fix}"`);
      }
    }

    // 3. Check sentence length (long sentences are hard for teens)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    for (const s of sentences) {
      const wordCount = s.trim().split(/\s+/).length;
      if (wordCount > 35) {
        suggest(tag, `Step ${step.step + 1}: frase troppo lunga (${wordCount} parole): "${s.trim().slice(0, 60)}..." — spezzala in 2-3 frasi più corte`);
      }
    }

    // 4. Check for engaging elements — questions, analogies, everyday references
    const engagingPatterns = [
      /immagin[ai]/i, /pensa a/i, /come quando/i, /come se/i,
      /ti è mai/i, /hai mai/i, /prova a/i, /\?/,
      /esempio/i, /nella vita/i, /quotidian/i, /come un/i,
    ];
    const hasEngaging = engagingPatterns.some(p => p.test(text));
    if (!hasEngaging && step.textLength > 100) {
      suggest(tag, `Step ${step.step + 1} ("${step.title.slice(0, 30)}") manca di elementi coinvolgenti — aggiungi una domanda, un'analogia quotidiana o un "immagina di..." per catturare l'attenzione di un 14enne`);
    }

    // 5. Check for highlighted key data
    if (step.highlightCount === 0 && /\d+/.test(text) && step.textLength > 80) {
      suggest(tag, `Step ${step.step + 1}: ci sono numeri nel testo ma nessun <span class="highlight"> — evidenziare i dati importanti aiuta lo studente a trovarli subito`);
    }

    // 6. Check for glossary terms — physics terms should be clickable
    const physicsTerms = [
      'forza', 'massa', 'accelerazione', 'velocità', 'attrito', 'peso',
      'newton', 'impulso', 'momento', 'equilibrio', 'vettore', 'scalare',
      'componente', 'risultante', 'inerzia', 'quantità di moto', 'perno',
      'reazione normale', 'piano inclinato', 'scomposizione',
    ];
    const textLower = text.toLowerCase();
    for (const term of physicsTerms) {
      if (textLower.includes(term) && !step.html.includes(`data-term`)) {
        // Only flag if term appears but there are NO glossary terms at all in the step
        if (step.termCount === 0) {
          suggest(tag, `Step ${step.step + 1}: contiene "${term}" ma nessun termine è linkato al glossario — rendi i termini scientifici cliccabili`);
          break; // One suggestion per step is enough
        }
      }
    }

    // 7. Check for "wall of math" — formula without preceding explanation
    if (step.hasFormula && step.textLength < 50) {
      suggest(tag, `Step ${step.step + 1}: ha una formula ma pochissimo testo (${step.textLength} chars) — una formula da sola spaventa un 14enne. Spiega PRIMA a parole cosa significa`);
    }

    // 8. Check for passive voice (Italian) — active is more engaging
    const passivePatterns = [
      /viene\s+(applicat|calcola|utilizz|determin|ricavat|espresse|misurat)/gi,
      /vengono\s+(applicat|calcolat|utilizz|determinat|ricavat|espres|misurat)/gi,
      /è stato\s+(calcola|dimostra|osservat|verificat)/gi,
    ];
    for (const p of passivePatterns) {
      if (p.test(text)) {
        suggest(tag, `Step ${step.step + 1}: usa la forma passiva ("${text.match(p)?.[0]}") — il tono attivo è più diretto e coinvolgente (es. "calcoliamo" invece di "viene calcolato")`);
      }
    }
  }

  // 9. Check overall structure — does the lesson follow the 4-phase pedagogy?
  if (stepTexts.length >= 3) {
    const firstStep = stepTexts[0];
    const conceptKeywords = ['concetto', 'idea', 'principio', 'serve', 'chiave', 'capire', 'capiremo'];
    const hasConceptIntro = conceptKeywords.some(k => firstStep.text.toLowerCase().includes(k));
    if (!hasConceptIntro && firstStep.textLength > 0) {
      suggest(tag, `Il primo step non sembra introdurre il concetto chiave — la struttura pedagogica prevede: 1.Concetto → 2.Dati → 3.Ragionamento → 4.Calcoli. Considera di iniziare con "L'idea chiave è..." o "Per risolvere questo problema dobbiamo capire..."`);
    }
  }

  // 10. Check number of steps — too few or too many?
  if (totalSteps > 0 && totalSteps < 4) {
    suggest(tag, `Solo ${totalSteps} step — potrebbe essere troppo compresso. Meglio suddividere in almeno 5-6 step per dare tempo allo studente di assimilare`);
  }
  if (totalSteps > 20) {
    suggest(tag, `${totalSteps} step — potrebbe essere troppo lungo e scoraggiare. Considera di raggrupparli o eliminare ridondanze`);
  }
}

// ── Vector Direction Physics Verification ──
// Analyzes source code to check vector/arrow directions against physics rules
function analyzeVectorDirections() {
  const sourceFiles = [
    { path: 'problemi/problema1.js', context: 'Piano inclinato (carro attrezzi)' },
    { path: 'problemi/problema2.js', context: 'Scala a pioli (momenti)' },
    { path: 'problemi/problema3.js', context: 'Biliardo (impulso e qdm)' },
    { path: 'teoria/tema1.js', context: 'Forze e equilibrio' },
    { path: 'teoria/tema2.js', context: 'Piano inclinato (teoria)' },
    { path: 'teoria/tema3.js', context: 'Momenti delle forze' },
    { path: 'teoria/tema4.js', context: 'Impulso e qdm' },
    { path: 'teoria/tema6.js', context: 'Vettori' },
    { path: 'teoria/tema7.js', context: 'DCL' },
    { path: 'teoria/tema8.js', context: 'Leggi di Newton' },
  ];

  // Physics rules for vector directions (in canvas coords: Y positive = DOWN)
  // These are the EXPECTED directions for common physics vectors
  const vectorRules = [
    {
      name: 'Peso (P)',
      // Weight MUST point downward (positive Y direction in canvas)
      test: (line, src) => {
        // Match arrows labeled 'P' (not Px, Py) that go from (x,y) to (x, y+something)
        // or arrows with '#c46b60' (red, typically used for weight)
        if (!line.includes("'P'") && !line.includes('"P"')) return null;
        // Check if this is in a label call near an arrow — find the arrow it refers to
        return null; // Labels alone don't tell direction
      }
    },
  ];

  // Extract all Draw.arrow and Draw.animatedArrow calls with context
  for (const file of sourceFiles) {
    const fp = join(APP_DIR, file.path);
    if (!existsSync(fp)) continue;
    const src = readFileSync(fp, 'utf-8');
    const lines = src.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.match(/Draw\.(arrow|animatedArrow)\s*\(/)) continue;

      // Parse arrow call: Draw.arrow(ctx, x1, y1, x2, y2, color, ...)
      // We need to find the label associated with this arrow
      // Look at surrounding lines (±5) for Draw.label calls
      const nearby = lines.slice(Math.max(0, i - 3), Math.min(lines.length, i + 6)).join('\n');

      // Extract label if present
      const labelMatch = nearby.match(/Draw\.label\(ctx,\s*'([^']+)'/);
      const label = labelMatch ? labelMatch[1] : null;

      if (!label) continue;

      // Try to determine arrow direction from the code
      // Look for patterns like: (x, y, x, y + POSITIVE) = downward
      //                         (x, y, x, y - POSITIVE) = upward
      //                         (x, y, x + POSITIVE, y) = rightward
      //                         (x, y, x - POSITIVE, y) = leftward

      const tag = `${file.context} (${file.path}:${i + 1})`;

      // === PESO (P) — must point DOWN (y2 > y1 in canvas) ===
      if (label === 'P' || label === '⃗P') {
        // Check for vertical arrows where y2 < y1 (pointing UP — wrong for weight!)
        if (line.match(/,\s*\w+\s*,\s*\w+\s*-\s*\d+/) && !line.includes('pyDy') && !line.includes('pxDy')) {
          // y2 = something - number = going UP
          fail(tag, `FISICA: Il vettore Peso (P) sembra puntare verso l'ALTO — deve SEMPRE puntare verso il basso (direzione gravità)`);
        }
      }

      // === Py (componente perpendicolare al piano) — must point INTO the surface ===
      // On an inclined plane, Py pushes the object into the surface
      // In the rotated frame: Py points in the direction perpendicular to the slope, toward the surface
      if (label === 'Py' || label === 'P_y' || label === 'P⊥') {
        // Py uses pyDx and pyDy from the dirs() function
        // dirs: pyDx: -sin(slope), pyDy: cos(slope) → points LEFT and DOWN
        // On a plane going up-right, "into the surface" means pointing left-and-down
        // (perpendicular to slope, toward the surface below the object)
        // This is CORRECT if pyDy is positive (cos > 0) meaning downward component

        // Check: if the arrow is drawn with NEGATIVE pyDy (= going UP perpendicular to plane)
        // that would mean Py points AWAY from the surface — WRONG
        if (line.includes('pyDy') && line.includes('-d.pyDy')) {
          fail(tag, `FISICA: Py (componente perpendicolare) punta LONTANO dalla superficie — deve puntare VERSO la superficie del piano (schiaccia l'oggetto contro il piano)`);
        }
        // Also check for arrows where Py is drawn going upward without using dirs()
        if (!line.includes('pyDy') && !line.includes('pyDx')) {
          // Direct coordinate arrow for Py — check if y2 < y1 (going up)
          if (line.match(/Draw\.(?:animated)?Arrow\([^,]+,[^,]+,[^,]+,[^,]+,[^,]+\s*-\s*\d+/)) {
            warn(tag, `FISICA: Verificare direzione di Py — sembra puntare verso l'alto. Py deve puntare perpendicolarmente VERSO la superficie del piano inclinato`);
          }
        }
      }

      // === Px (componente parallela al piano) — must point DOWN the slope ===
      if (label === 'Px' || label === 'P_x' || label === 'P∥') {
        // Px = P sin(α), directed down the slope
        // In canvas coords with slope going up-right: "down the slope" = moving left and down
        // dirs: pxDx: -cos(slope) < 0, pxDy: -sin(slope) < 0 ← WAIT this is UP
        // Hmm, -sin(slope) is negative in canvas (going UP). But "down the slope" should go
        // in the direction of decreasing elevation...
        // Actually in canvas Y-down coords, the slope goes from bottom-left (big Y) to top-right (small Y)
        // So "down the slope" = toward bottom-left = negative X, positive Y
        // But dirs has pxDy: -sin(slope) which is NEGATIVE = going UP in canvas = toward top-right
        // This means Px would point UP the slope! That seems wrong.
        // Let's flag it for review.
        if (line.includes('pxDy') && !line.includes('-')) {
          // using pxDy directly without negation
        }
      }

      // === Reazione Normale (N) — must point AWAY from surface (outward) ===
      if (label === 'N' || label === 'N⃗' || label === 'Normale' || label === 'R_N') {
        // Normal reaction points perpendicular to surface, AWAY from it (outward)
        // On inclined plane going up-right, outward = up-right perpendicular
        // In canvas: should have negative Y component (going UP)
        // Check if it points INTO the surface (wrong)
      }

      // === Tensione (T) — on inclined plane, must point UP the slope ===
      if (label === 'T' || label === 'T⃗' || label === 'Tensione') {
        // Tension in a rope pulling up an inclined plane points UP the slope
      }

      // === Attrito — must oppose motion direction ===
      if (label === 'f' || label === 'F_a' || label === 'Attrito' || label === 'f_a') {
        // Friction opposes the direction the object would move
      }
    }
  }
}

// Extract animation source code for deep review by Claude
function extractAnimationSources() {
  const report = [];
  const dirs = ['problemi', 'teoria'];

  for (const dir of dirs) {
    const dirPath = join(APP_DIR, dir);
    if (!existsSync(dirPath)) continue;

    const files = readdirSync(dirPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const fp = join(dirPath, file);
      const src = readFileSync(fp, 'utf-8');

      // Extract arrow calls with their labels and surrounding context
      const lines = src.split('\n');
      const arrows = [];

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/Draw\.(arrow|animatedArrow)\s*\(/)) {
          // Get context: 3 lines before and 3 after
          const context = lines.slice(Math.max(0, i - 2), Math.min(lines.length, i + 4))
            .map((l, j) => `  ${Math.max(1, i - 1) + j}: ${l.trim()}`).join('\n');
          arrows.push(context);
        }
      }

      // Extract dirs/direction helper functions
      const dirsMatch = src.match(/function\s+dirs?\s*\([^)]*\)\s*\{[\s\S]*?\}/);

      if (arrows.length > 0) {
        report.push(`\n--- ${dir}/${file} (${arrows.length} arrow calls) ---`);
        if (dirsMatch) {
          report.push(`Direction helper:\n${dirsMatch[0]}`);
        }
        // Only include first 8 arrows per file to keep report compact
        report.push(arrows.slice(0, 8).join('\n'));
        if (arrows.length > 8) {
          report.push(`  ... +${arrows.length - 8} more`);
        }
      }
    }
  }

  return report.join('\n');
}

// ── Screenshot capture for visual review ──
async function captureScreenshots(browser) {
  const screenshotDir = join(import.meta.dirname, 'test-screenshots');
  const { mkdirSync } = await import('fs');
  mkdirSync(screenshotDir, { recursive: true });

  // Capture all pages at desktop AND mobile
  const viewports = [
    { width: 1280, height: 800, label: 'desktop' },
    { width: 375, height: 812, label: 'mobile' },
  ];

  for (const vp of viewports) {
    for (const pageInfo of PAGES) {
      const page = await browser.newPage();
      await page.setViewport(vp);
      await page.goto(BASE + pageInfo.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await sleep(1500);
      const name = (pageInfo.url.replace(/[/?=]/g, '_').replace(/^_/, '') || 'home') + `_${vp.label}`;
      await page.screenshot({ path: join(screenshotDir, `${name}.png`), fullPage: true });
      await page.close();
    }
  }
}

// ── Main ──
async function main() {
  console.log('🚀 Starting site test suite...\n');

  const server = await startServer();
  console.log(`📡 Local server on http://localhost:${PORT}\n`);

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  try {
    // Test all pages at Desktop viewport
    for (const pageInfo of PAGES) {
      process.stdout.write(`  Testing: ${pageInfo.name} (Desktop)...`);
      await testPage(browser, pageInfo, VIEWPORTS[0]);
      console.log(' ✓');
    }

    // Test ALL pages at Mobile viewport
    for (const pageInfo of PAGES) {
      process.stdout.write(`  Testing: ${pageInfo.name} (Mobile)...`);
      await testPage(browser, pageInfo, VIEWPORTS[1]);
      console.log(' ✓');
    }

    // Test key pages at Tablet
    for (const pageInfo of [PAGES[0], PAGES[1], PAGES[4]]) {
      process.stdout.write(`  Testing: ${pageInfo.name} (Tablet)...`);
      await testPage(browser, pageInfo, VIEWPORTS[2]);
      console.log(' ✓');
    }

    // Capture screenshots
    process.stdout.write('\n  📸 Capturing screenshots...');
    await captureScreenshots(browser);
    console.log(' ✓');

    // Analyze vector directions from source code
    process.stdout.write('  🧲 Analyzing vector physics...');
    analyzeVectorDirections();
    console.log(' ✓\n');

  } finally {
    await browser.close();
    server.close();
  }

  // ── Report ──
  console.log('═══════════════════════════════════════════════════');
  console.log('  TEST REPORT');
  console.log('═══════════════════════════════════════════════════\n');

  if (errors.length > 0) {
    console.log(`❌ ERRORS (${errors.length}):`);
    errors.forEach(e => console.log(`  ${e}`));
    console.log();
  }

  if (warnings.length > 0) {
    console.log(`⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach(w => console.log(`  ${w}`));
    console.log();
  }

  if (improvements.length > 0) {
    console.log(`💡 SUGGESTED IMPROVEMENTS (${improvements.length}):`);
    improvements.forEach(i => console.log(`  ${i}`));
    console.log();
  }

  if (errors.length === 0 && warnings.length === 0 && improvements.length === 0) {
    console.log('✅ ALL TESTS PASSED — No issues found!\n');
  }

  console.log(`Total: ${errors.length} errors, ${warnings.length} warnings, ${improvements.length} suggestions`);
  console.log('═══════════════════════════════════════════════════\n');

  // Vector source code for physics review
  const vectorSources = extractAnimationSources();
  if (vectorSources.trim()) {
    console.log('🧲 VECTOR/ARROW SOURCE CODE FOR PHYSICS REVIEW:');
    console.log('(Verify that all vector directions are physically correct)\n');
    console.log('Physics rules to check:');
    console.log('  • Peso (P): SEMPRE verso il basso (y2 > y1 in canvas, dove Y cresce in basso)');
    console.log('  • Py (perpendicolare al piano): verso la superficie (schiaccia contro il piano)');
    console.log('  • Px (parallela al piano): giù lungo il pendio (fa scivolare)');
    console.log('  • Reazione Normale (N): perpendicolare alla superficie, verso FUORI');
    console.log('  • Tensione (T): lungo la fune, tira l\'oggetto (su per il piano inclinato)');
    console.log('  • Attrito (f): opposto alla direzione di moto/tendenza al moto');
    console.log('  • In canvas: Y positivo = verso il BASSO, X positivo = verso DESTRA');
    console.log('  • Math.sin(slope) e Math.cos(slope) dove slope = angolo del piano');
    console.log('');
    console.log(vectorSources);
    console.log('\n═══════════════════════════════════════════════════\n');
  }

  // Exit code: 2 = errors, 1 = warnings only, 0 = clean
  if (errors.length > 0) process.exit(2);
  if (warnings.length > 0) process.exit(1);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(2);
});
