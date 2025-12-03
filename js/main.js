async function loadStories() {
  const res = await fetch('data/stories.json');
  const stories = await res.json();

  // calculate total nuts for header
  const total = stories.reduce((a, s) => a + s.nutCount, 0);
  document.getElementById('totalNuts').textContent = total.toLocaleString();

  const container = document.getElementById('storyList');

  stories
    .sort((a, b) => b.nutCount - a.nutCount) // hottest first
    .forEach(story => {
      const card = document.createElement('a');
      card.href = `stories/${story.id}.md`; // we’ll auto-convert .md → .html later
      card.className = "block p-6 mb-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-red-800 transition";
      
      card.innerHTML = `
        <h2 class="text-2xl font-bold text-red-400 mb-2">${story.title}</h2>
        <p class="text-gray-400 mb-3">${story.summary}</p>
        <div class="flex flex-wrap gap-2 mb-3">
          ${story.tags.map(t => `<span class="px-3 py-1 bg-red-900/50 rounded-full text-xs">${t}</span>`).join('')}
        </div>
        <div class="text-sm text-gray-500">
          by ${story.author} • ${story.nutCount.toLocaleString()} nuts busted 💦 • ${story.date}
        </div>
      `;
      container.appendChild(card);
    });
}

loadStories();
