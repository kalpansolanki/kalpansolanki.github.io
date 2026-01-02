// ==============================
// 🔥 DISABLE BROWSER SCROLL RESTORATION
// ==============================
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

let filteredBlogData = [];
let isSearching = false;

// ==============================
// BLOG FILES
// ==============================
const blogs = [
  "blogs/myosa-submission-guidelines.md",
  "blogs/myosa-forest-sentinel.md",
  "blogs/ergonomic-biomechanics-and-active-feedback-system(2nd).md",
  "blogs/smart-lumbar-trainer.md",
  "blogs/myosa-interactive-learning-robot-myopet.md",
  "blogs/myosa-pothole-detection.md",
  "blogs/myosa-gesture-control-system-main.md", // Updated name
  "blogs/myosa-baby-monitor.md",              // Fixed missing dot
  "blogs/myosa-drowsiness.md",
  "blogs/smartpass-crowd-safety.md",
  "blogs/myosa-ppt-controller.md",
  "blogs/myosa-smart-helmet.md",
  "blogs/project-drishti.md",
  "blogs/kairos(13th).md",                   // Updated name
  "blogs/myotrack.md",
  "blogs/myosa_revive.md",
  "blogs/myosa-warehouse.md",
  "blogs/myosa-smartBioAir.md",
  "blogs/retry-fault-detection.md",
  "blogs/smart-butterfly.md",
  "blogs/TejasARK.md",
  "blogs/myosa-secure-ride-system.md",
  "blogs/sherpa.md",                         // Updated name
  "blogs/smart-vest-myosa.md",
  "blogs/lumina.md",
  "blogs/sitx.md",
  "blogs/safesite-worker-safety-monitor.md",
  "blogs/fault-detection(18th).md"           // Added missing file
];

// ==============================
// PAGINATION CONFIG - 6 PER PAGE
// ==============================
const BLOGS_PER_PAGE = 6; // 🔥 Changed from 5 to 6
let currentPage = 1;
let allBlogData = [];

// ==============================
// DATE FORMATTER
// ==============================
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  } catch (e) {
    return dateStr;
  }
}

// ==============================
// BLOG LIST PAGE
// ==============================
const blogList = document.getElementById("blogList");

if (blogList) {
  console.log("Loading blogs...");
  
  Promise.all(
    blogs.map(async (path) => {
      try {
        const res = await fetch(path);
        if (!res.ok) {
          console.warn(`Cannot load ${path}: ${res.status}`);
          return null;
        }
        const text = await res.text();

        const cleanedText = text.replace(/^\uFEFF/, "");
        const fm = cleanedText.match(/---([\s\S]*?)---/);

        if (!fm) {
          console.warn(`No frontmatter found in ${path}`);
          return null;
        }

        const meta = fm[1];
        const title = meta.match(/title:\s*(.+)/)?.[1]?.trim() ?? "Untitled";
        const dateRaw = meta.match(/publishDate:\s*(.+)/)?.[1]?.trim() ?? "";
        const image = meta.match(/image:\s*(.+)/)?.[1]?.trim();
        
        // Extract excerpt (first paragraph after frontmatter)
        const contentAfterFM = text.replace(/^---[\s\S]*?---/, "").trim();
        const firstPara = contentAfterFM.split('\n\n')[0]?.replace(/[#*_\[\]]/g, '').trim() || "";
        const excerpt = firstPara.length > 150 ? firstPara.substring(0, 150) + "..." : firstPara;

        console.log(`Loaded: ${title}`);

        return {
          path,
          title,
          date: dateRaw ? new Date(dateRaw) : new Date(),
          dateText: dateRaw || "No date",
          image,
          excerpt
        };
      } catch (err) {
        console.error(`Error loading ${path}:`, err);
        return null;
      }
    })
  ).then((data) => {
    allBlogData = data
      .filter(Boolean)
      .sort((a, b) => b.date - a.date);

    console.log(`Loaded ${allBlogData.length} blogs`);
    
    if (allBlogData.length === 0) {
      blogList.innerHTML = "<p style='text-align:center; padding:40px; color:#9ca3af; grid-column: 1/-1;'>No blogs found. Please check your blog files.</p>";
      return;
    }

    renderPage(1);
  }).catch(err => {
    console.error("Error loading blogs:", err);
    blogList.innerHTML = "<p style='text-align:center; padding:40px; color:#ef4444; grid-column: 1/-1;'>Error loading blogs. Check console for details.</p>";
  });
}

// ==============================
// RENDER PAGE
// ==============================
function renderPage(page) {
  if (allBlogData.length === 0) return;
  
  const totalPages = Math.ceil(allBlogData.length / BLOGS_PER_PAGE);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  blogList.innerHTML = "";

  const start = (page - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;

  allBlogData.slice(start, end).forEach(blog => {
    const card = document.createElement("div");
    card.className = "blog-card";

    card.onclick = () => {
      sessionStorage.setItem("fromBlogList", "true");
      window.location.href = `blog.html?file=${blog.path}`;
    };

    // Image
    if (blog.image) {
      const img = document.createElement("img");
      img.src = `assets/images/${blog.image}`;
      img.alt = blog.title;
      img.onerror = function() {
        console.warn(`Image not found: ${this.src}`);
        this.style.display = 'none';
      };
      card.appendChild(img);
    }

    // Content
    const info = document.createElement("div");
    info.className = "blog-info";
    info.innerHTML = `
      <small>🕒 ${formatDate(blog.dateText)}</small>
      <h2>${blog.title}</h2>
    `;
    
    // Optional: Add excerpt if you want preview text
    // Uncomment the next 3 lines to show excerpts
    // if (blog.excerpt) {
    //   info.innerHTML += `<p>${blog.excerpt}</p>`;
    // }

    card.appendChild(info);
    blogList.appendChild(card);
  });

  renderPagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==============================
// PAGINATION UI
// ==============================
function renderPagination() {
  let pagination = document.getElementById("pagination");

  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    pagination.className = "pagination";
    blogList.parentNode.insertBefore(pagination, blogList.nextSibling);
  }

  pagination.innerHTML = "";
  const totalPages = Math.ceil(allBlogData.length / BLOGS_PER_PAGE);

  if (totalPages <= 1) return;

  // PREVIOUS
  const prev = document.createElement("button");
  prev.textContent = "‹ Previous";
  prev.disabled = currentPage === 1;
  prev.onclick = () => renderPage(currentPage - 1);
  pagination.appendChild(prev);

  // PAGE NUMBERS
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => renderPage(i);
      pagination.appendChild(btn);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pagination.appendChild(dots);
    }
  }

  // NEXT
  const next = document.createElement("button");
  next.textContent = "Next ›";
  next.disabled = currentPage === totalPages;
  next.onclick = () => renderPage(currentPage + 1);
  pagination.appendChild(next);
}

// ==============================
// BLOG DETAIL PAGE
// ==============================
const content = document.getElementById("content");

if (content) {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  if (!file) {
    content.innerHTML = "<p style='text-align:center; padding:40px; color:#ef4444;'>No blog file specified.</p>";
  } else {
    console.log("Loading blog:", file);
    
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Blog not found: ${res.status}`);
        return res.text();
      })
      .then(md => {
        const fm = md.match(/^---([\s\S]*?)---/);
        const meta = fm ? fm[1] : "";

        const title = meta.match(/title:\s*(.+)/)?.[1]?.trim() ?? "Untitled";
        const dateRaw = meta.match(/publishDate:\s*(.+)/)?.[1]?.trim() ?? "";
        const image = meta.match(/image:\s*(.+)/)?.[1]?.trim();

        let cleaned = md.replace(/^---[\s\S]*?---/, "");
        cleaned = cleaned
          .replace(/\[cite_start\]/g, "")
          .replace(/\[cite:\s*\d+(,\s*\d+)*\]/g, "");

        let html = "";
        html += `<h1 class="blog-title">${title}</h1>`;
        html += `<p class="blog-date">🕒 ${formatDate(dateRaw)}</p>`;

        if (image) {
          html += `
            <img
              src="assets/images/${image}"
              class="blog-hero"
              alt="${title}"
              onerror="this.style.display='none'"
            />
          `;
        }

        html += marked.parse(cleaned);
        content.innerHTML = html;
      })
      .catch(err => {
        content.innerHTML = `<p style='text-align:center; padding:40px; color:#ef4444;'>Failed to load blog: ${err.message}</p>`;
        console.error("Blog loading error:", err);
      });
  }

}
