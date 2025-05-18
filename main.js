console.log("main.js loaded");
console.log('[DEBUG] DOMContentLoaded handler registered');
document.addEventListener('DOMContentLoaded', () => {
  console.log('[DEBUG] DOMContentLoaded fired');
  // --- TRANSLATION LOGIC START ---
  const translations = {
    pl: {
      appTitle: "AI Profile Manager",
      tileGenerate: "Generowanie contentu",
      tileProfiles: "Menedżer profili",
      tileSettings: "Ustawienia",
      backBtn: "Wróć do menu",
      settingsTitle: "Ustawienia",
      apiKeyPlaceholder: "Klucz API OpenAI",
      saveApiKey: "Zapisz klucz",
      darkMode: "Tryb nocny",
      language: "Język",
      profileTitle: "Profile",
      profileIdPlaceholder: "ID profilu",
      profilePersonaPlaceholder: "Opis persony",
      profilePhonePlaceholder: "Model telefonu",
      // Add more as needed
    },
    en: {
      appTitle: "AI Profile Manager",
      tileGenerate: "Content Generation",
      tileProfiles: "Profile Manager",
      tileSettings: "Settings",
      backBtn: "Back to menu",
      settingsTitle: "Settings",
      apiKeyPlaceholder: "OpenAI API Key",
      saveApiKey: "Save key",
      darkMode: "Dark mode",
      language: "Language",
      profileTitle: "Profiles",
      profileIdPlaceholder: "Profile ID",
      profilePersonaPlaceholder: "Persona description",
      profilePhonePlaceholder: "Phone model",
      // Add more as needed
    }
  };

  function updateUIText(lang) {
    document.getElementById('app-title').textContent = translations[lang].appTitle;
    document.getElementById('tile-generate').textContent = translations[lang].tileGenerate;
    document.getElementById('tile-profiles').textContent = translations[lang].tileProfiles;
    document.getElementById('tile-settings').textContent = translations[lang].tileSettings;
    document.getElementById('back-btn').textContent = translations[lang].backBtn;
    document.querySelector('#settings-panel h2').textContent = translations[lang].settingsTitle;
    document.getElementById('api-key-input').placeholder = translations[lang].apiKeyPlaceholder;
    document.getElementById('save-api-key-btn').textContent = translations[lang].saveApiKey;
    document.getElementById('language-label').textContent = translations[lang].language;
    document.querySelector('#dark-mode-toggle').parentElement.querySelector('span').textContent = translations[lang].darkMode;
    document.querySelector('#profile-manager h2').textContent = translations[lang].profileTitle;
    document.getElementById('profile-id-input').placeholder = translations[lang].profileIdPlaceholder;
    document.getElementById('profile-persona-input').placeholder = translations[lang].profilePersonaPlaceholder;
    document.getElementById('profile-phone-input').placeholder = translations[lang].profilePhonePlaceholder;
    // Add more as needed
  }

  // Language selector logic
  const languageSelect = document.getElementById('language-select');
  let currentLang = localStorage.getItem('appLanguage') || 'pl';
  languageSelect.value = currentLang;
  updateUIText(currentLang);

  languageSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('appLanguage', currentLang);
    updateUIText(currentLang);
  });
  // --- TRANSLATION LOGIC END ---

  // Profile select list and image input
  const profileSelectList = document.getElementById('profile-select-list');
  const imageInput = document.getElementById('image-input');
  const dropArea = document.getElementById('image-drop-area');
  // Drag & Drop handlers for image upload
  dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    dropArea.classList.add('border-blue-500');
    dropArea.classList.add('dark:border-blue-400');
    dropArea.classList.remove('border-gray-400');
    dropArea.classList.remove('dark:border-gray-600');
  });
  dropArea.addEventListener('dragleave', e => {
    e.preventDefault();
    dropArea.classList.remove('border-blue-500');
    dropArea.classList.remove('dark:border-blue-400');
    dropArea.classList.add('border-gray-400');
    dropArea.classList.add('dark:border-gray-600');
  });
  dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.classList.remove('border-blue-500');
    dropArea.classList.remove('dark:border-blue-400');
    dropArea.classList.add('border-gray-400');
    dropArea.classList.add('dark:border-gray-600');
    const file = e.dataTransfer.files[0];
    if (file) {
      const dt = new DataTransfer();
      dt.items.add(file);
      imageInput.files = dt.files;
    }
  });

  // Dark mode toggle element
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Function to populate profile select list
  function updateProfileSelectList() {
      profileSelectList.innerHTML = '';
      profiles.forEach(profile => {
          const div = document.createElement('div');
          div.className = 'flex items-center';
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = profile.id;
          checkbox.id = `select-${profile.id}`;
          checkbox.checked = true;
          checkbox.className = 'mr-2';
          const label = document.createElement('label');
          label.htmlFor = checkbox.id;
          // Display ID along with social handle for easier identification
          const socialTag = profile.social ? ` (${profile.social})` : '';
          label.textContent = `${profile.id}${socialTag}`;
          div.appendChild(checkbox);
          div.appendChild(label);
// --- SELECT/DESELECT ALL PROFILES ---
const selectAllBtn = document.getElementById('select-all-btn');
const deselectAllBtn = document.getElementById('deselect-all-btn');
if (selectAllBtn) {
  selectAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('#profile-select-list input[type="checkbox"]').forEach(cb => cb.checked = true);
  });
}
if (deselectAllBtn) {
  deselectAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('#profile-select-list input[type="checkbox"]').forEach(cb => cb.checked = false);
  });
}
          profileSelectList.appendChild(div);
      });
  }
  const profileList = document.getElementById('profile-list');

  // Modal profile form elements
  const profileForm = document.getElementById('modal-profile-form');
  const idInput = document.getElementById('profile-id-input');
  const personaInput = document.getElementById('profile-persona-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const socialInput = document.getElementById('profile-social-input');
  const memoriesInput = document.getElementById('profile-memories-input');
  const addProfileBtn = document.getElementById('save-profile-btn');

  // Help modal logic
  const openHelpModalBtn = document.getElementById('open-help-modal');
  const helpModal = document.getElementById('help-modal');
  const closeHelpModalBtn = document.getElementById('close-help-modal');

  if (openHelpModalBtn && helpModal && closeHelpModalBtn) {
    openHelpModalBtn.addEventListener('click', () => {
      helpModal.classList.remove('hidden');
    });
    closeHelpModalBtn.addEventListener('click', () => {
      helpModal.classList.add('hidden');
    });
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) helpModal.classList.add('hidden');
    });
  }
  const openProfileModalBtn = document.getElementById('open-profile-modal');
  const profileModal = document.getElementById('profile-modal');
  const closeProfileModalBtn = document.getElementById('close-profile-modal');

  // Show modal for adding a new profile
  openProfileModalBtn.addEventListener('click', () => {
    profileForm.reset();
    idInput.value = '';
    personaInput.value = '';
    phoneInput.value = '';
    socialInput.value = '';
    memoriesInput.value = '';
    editingId = null;
    addProfileBtn.textContent = 'Dodaj';
    profileModal.classList.remove('hidden');
  });

  // Close modal
  closeProfileModalBtn.addEventListener('click', () => {
    profileModal.classList.add('hidden');
  });
  // Also close modal when clicking outside the modal content
  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) profileModal.classList.add('hidden');
  });
  // Close modal on "Anuluj" button
  const cancelProfileBtn = document.getElementById('cancel-profile-btn');
  if (cancelProfileBtn) {
    cancelProfileBtn.addEventListener('click', () => {
      profileModal.classList.add('hidden');
    });
  }

  const promptInput = document.getElementById('prompt-input');
  const settingsForm = document.getElementById('settings-form');
  const apiKeyInput = document.getElementById('api-key-input');

  // --- GROUP PERSONA GENERATION LOGIC START ---
  const groupGenerateBtn = document.getElementById('group-generate-btn');
  const groupModal = document.getElementById('group-generate-modal');
  const closeGroupModal = document.getElementById('close-group-modal');
  const groupForm = document.getElementById('group-generate-form');
  const groupResults = document.getElementById('group-generate-results');

  groupGenerateBtn.addEventListener('click', () => {
    groupModal.classList.remove('hidden');
    groupResults.innerHTML = '';
  });
  closeGroupModal.addEventListener('click', () => {
    groupModal.classList.add('hidden');
  });
  groupModal.addEventListener('click', (e) => {
    if (e.target === groupModal) groupModal.classList.add('hidden');
  });

  groupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    groupResults.innerHTML = '<div class="text-center text-gray-500">Generowanie person...</div>';
    const count = parseInt(document.getElementById('group-count').value, 10);
    const audience = document.getElementById('group-audience').value.trim();
    const style = document.getElementById('group-style').value.trim();

    // Build AI prompt for persona generation
    const aiPrompt =
      `Wygeneruj ${count} unikalnych person do social mediów (x.com/Twitter) dla grupy docelowej: "${audience}". ` +
      `Każda persona powinna mieć: unikalny ID (krótki, bez spacji), opis persony (max 2 zdania), model telefonu, nazwę z social mediów (np. @przyklad), oraz 2-4 krótkie wspomnienia (każde jako osobny string). ` +
      `Styl person: ${style}. ` +
      `Zwróć wynik jako poprawny JSON array, gdzie każdy obiekt ma pola: id, persona, phone, social, memories (array of strings). Nie dodawaj żadnych komentarzy ani tekstu poza JSON!`;

    try {
      // Use the same callOpenAIAPI function, but with a dummy profile
      const response = await callOpenAIAPI({}, aiPrompt, null);
      // Try to find the first JSON array in the response
      const match = response.match(/\[.*\]/s);
      if (!match) throw new Error("Nie znaleziono poprawnego JSON array w odpowiedzi AI.");
      const personas = JSON.parse(match[0]);
      // Display results and add button to import
      groupResults.innerHTML = `
        <div class="mb-4 font-semibold">Wygenerowane persony:</div>
        <ul class="mb-4 space-y-2">
          ${personas.map(p => `
            <li class="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
              <div><b>ID:</b> ${p.id}</div>
              <div><b>Persona:</b> ${p.persona}</div>
              <div><b>Telefon:</b> ${p.phone}</div>
              <div><b>Social:</b> ${p.social}</div>
              <div><b>Wspomnienia:</b> <ul class="list-disc ml-5">${p.memories.map(m => `<li>${m}</li>`).join('')}</ul></div>
            </li>
          `).join('')}
        </ul>
        <button id="import-group-personas" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl w-full shadow font-semibold transition-all duration-200">Dodaj wszystkie do profili</button>
      `;
      document.getElementById('import-group-personas').onclick = () => {
        personas.forEach(p => {
          profiles.push({
            id: p.id,
            persona: p.persona,
            phone: p.phone,
            social: p.social,
            memories: p.memories
          });
        });
        saveProfiles();
        renderProfiles();
        groupModal.classList.add('hidden');
      };
    } catch (err) {
      groupResults.innerHTML = `<div class="text-red-500">Błąd generowania lub parsowania odpowiedzi AI: ${err.message}</div>`;
    }
  });
  // --- GROUP PERSONA GENERATION LOGIC END ---
  // Load saved API key
  const savedKey = localStorage.getItem('openaiApiKey');
  if (savedKey) {
    apiKeyInput.value = savedKey;
  }
  const generateBtn = document.getElementById('generate-btn');
  const exportBtn = document.getElementById('export-btn');
  const resultsList = document.getElementById('results-list');
  // Menu and navigation elements
  const menu = document.getElementById('menu');
  const tileGenerate = document.getElementById('tile-generate');
  const tileProfiles = document.getElementById('tile-profiles');
  const tileSettings = document.getElementById('tile-settings');
  const backBtn = document.getElementById('back-btn');
  const appTitle = document.getElementById('app-title');
  const settingsPanelEl = document.getElementById('settings-panel');
  const profileManagerEl = document.getElementById('profile-manager');
  const promptPanelEl = document.getElementById('prompt-panel');
  const resultsPanelEl = document.getElementById('results-panel');
  const mainContainerEl = document.getElementById('main-container');

  // Navigation logic
  tileGenerate.addEventListener('click', () => {
    console.log('tile-generate clicked');
    menu.classList.add('hidden');
    mainContainerEl.classList.remove('hidden');
    promptPanelEl.classList.remove('hidden');
    resultsPanelEl.classList.remove('hidden');
    backBtn.classList.remove('hidden');
  });
  tileProfiles.addEventListener('click', () => {
    console.log('tile-profiles clicked');
    menu.classList.add('hidden');
    mainContainerEl.classList.remove('hidden');
    profileManagerEl.classList.remove('hidden');
    backBtn.classList.remove('hidden');
  });
  tileSettings.addEventListener('click', () => {
    console.log('tile-settings clicked');
    menu.classList.add('hidden');
    mainContainerEl.classList.remove('hidden');
    settingsPanelEl.classList.remove('hidden');
    backBtn.classList.remove('hidden');
  });
  backBtn.addEventListener('click', () => {
    menu.classList.remove('hidden');
    settingsPanelEl.classList.add('hidden');
    profileManagerEl.classList.add('hidden');
    promptPanelEl.classList.add('hidden');
    resultsPanelEl.classList.add('hidden');
    mainContainerEl.classList.add('hidden');
    backBtn.classList.add('hidden');
  });

 // Clicking title returns to main menu
 appTitle.addEventListener('click', () => {
   menu.classList.remove('hidden');
   settingsPanelEl.classList.add('hidden');
   profileManagerEl.classList.add('hidden');
   promptPanelEl.classList.add('hidden');
   resultsPanelEl.classList.add('hidden');
   mainContainerEl.classList.add('hidden');
   backBtn.classList.add('hidden');
 });

  let profiles = [];
  let editingId = null;

  function loadProfiles() {
    const data = localStorage.getItem('aiProfiles');
    console.log('[DEBUG] loadProfiles() called. Data from localStorage:', data);
    profiles = data ? JSON.parse(data) : [];
    console.log('[DEBUG] Profiles after load:', profiles);
  }

  function saveProfiles() {
    console.log('[DEBUG] saveProfiles() called. Saving profiles:', profiles);
    localStorage.setItem('aiProfiles', JSON.stringify(profiles));
    console.log('[DEBUG] Profiles saved to localStorage.');
  }

  function renderProfiles() {
    console.log('[DEBUG] renderProfiles() called. Current profiles:', profiles);
    // Update profile selector list
    updateProfileSelectList();
    profileList.innerHTML = '';
    profiles.forEach(profile => {
      const li = document.createElement('li');
      li.className = 'p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow flex flex-col';
      li.innerHTML = `
        <h3 class="text-lg font-bold mb-1">${profile.id} - ${profile.persona}</h3>
        <p><span class="font-semibold">Telefon:</span> ${profile.phone || '-'}</p>
        <p><span class="font-semibold">Social:</span> ${profile.social || '-'}</p>
        <div>
          <h4 class="font-semibold mt-2">Wspomnienia:</h4>
          ${profile.memories && profile.memories.length ?
            `<ul class="list-disc list-inside">${profile.memories.map(m => `<li>${m}</li>`).join('')}</ul>`
            : '<p>Brak</p>'}
        </div>
        <div class="mt-4 flex space-x-2">
          <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded">Edytuj</button>
          <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded">Usuń</button>
        </div>
      `;
      const editBtn = li.querySelector('.edit-btn');
      const deleteBtn = li.querySelector('.delete-btn');

      editBtn.addEventListener('click', () => {
        idInput.value = profile.id;
        personaInput.value = profile.persona;
        phoneInput.value = profile.phone || '';
        socialInput.value = profile.social || '';
        memoriesInput.value = (profile.memories || []).join('\n');
        editingId = profile.id;
        addProfileBtn.textContent = 'Zapisz';
        profileModal.classList.remove('hidden');
      });

      deleteBtn.addEventListener('click', () => {
        if (confirm(`Usunąć profil "${profile.id}"?`)) {
          profiles = profiles.filter(p => p.id !== profile.id);
          saveProfiles();
          renderProfiles();
        }
      });

      profileList.appendChild(li);
    });
  }

  profileForm.addEventListener('submit', event => {
    event.preventDefault();
    const id = idInput.value.trim();
    const persona = personaInput.value.trim();
    const phone = phoneInput.value.trim();
    const social = socialInput.value.trim();
    const memories = memoriesInput.value.trim().split('\n').filter(m => m.trim() !== '');
    if (!id || !persona) {
      alert('ID i opis persony są wymagane');
      return;
    }
    if (editingId) {
      // update existing profile
      if (id !== editingId && profiles.find(p => p.id === id)) {
        alert('ID już istnieje');
        return;
      }
      const idx = profiles.findIndex(p => p.id === editingId);
      if (idx !== -1) {
        profiles[idx].id = id;
        profiles[idx].persona = persona;
        profiles[idx].phone = phone;
        profiles[idx].social = social;
        profiles[idx].memories = memories;
      }
      editingId = null;
      addProfileBtn.textContent = 'Dodaj/Edytuj';
    } else {
      // add new profile
      if (profiles.find(p => p.id === id)) {
        alert('ID już istnieje');
        return;
      }
      profiles.push({ id, persona, phone, social, memories, history: [] });
    }
    idInput.value = '';
    saveProfiles();
    renderProfiles();
    profileForm.reset();
    personaInput.value = '';
    saveProfiles();
    renderProfiles();
  });

  async function callOpenAIAPI(profile, prompt, imageData) {
    const apiKey = localStorage.getItem('openaiApiKey');
    if (!apiKey) {
      alert('Brak klucza API. Wprowadź klucz w ustawieniach.');
      throw new Error('Brak klucza API');
    }
    // Przygotuj wiadomości
    let messages;
    if (imageData) {
      messages = [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageData } }
          ]
        }
      ];
    } else {
      messages = [
        { role: 'user', content: prompt }
      ];
    }

    // Retry logic for rate limits (429)
    const maxRetries = 3;
    let attempt = 0;
    let lastError = null;
    let wait = ms => new Promise(res => setTimeout(res, ms));

    while (attempt < maxRetries) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages
          })
        });
        if (response.status === 429) {
          // Rate limit, exponential backoff
          attempt++;
          const delay = 1000 * Math.pow(2, attempt - 1); // 1s, 2s, 4s
          console.warn(`OpenAI API rate limited (429). Retry ${attempt}/${maxRetries} after ${delay}ms.`);
          await wait(delay);
          continue;
        }
        if (!response.ok) {
          // Other error
          const errText = await response.text();
          throw new Error(`OpenAI API error: ${response.status} ${errText}`);
        }
        const data = await response.json();
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('OpenAI API returned unexpected response structure.');
        }
        return data.choices[0].message.content;
      } catch (err) {
        lastError = err;
        // Only retry on 429, otherwise break
        if (err.message && err.message.includes('429')) {
          attempt++;
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.warn(`Retrying after error: ${err.message}. Attempt ${attempt}/${maxRetries} after ${delay}ms.`);
          await wait(delay);
        } else {
          break;
        }
      }
    }
    throw lastError || new Error('Nie udało się wygenerować odpowiedzi z OpenAI API.');
  }

  generateBtn.addEventListener('click', async () => {
    let prompt = promptInput.value.trim();
    if (!prompt) {
      alert('Wprowadź temat wpisu lub treść, na którą odpowiadasz');
      return;
    }
    // Get selected profiles
    const selectedIds = Array.from(profileSelectList.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value);
    const selectedProfiles = profiles.filter(p => selectedIds.includes(p.id));
    if (selectedProfiles.length === 0) {
      alert('Wybierz przynajmniej jeden profil');
      return;
    }
    // Get post type (new or reply)
    const postType = document.getElementById('post-type-reply').checked ? 'reply' : 'new';

    // Clear previous latest results before generating new ones
    profiles.forEach(profile => { profile._latestResults = []; });

    resultsList.innerHTML = '';
    // Read image if provided
    let imageData = null;
    const file = imageInput.files[0];
    if (file) {
      // Compress image using canvas and encode as JPEG base64
      imageData = await new Promise(resolve => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => {
          img.onload = () => {
            // Set max width/height for compression
            const maxDim = 512;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round(height * (maxDim / width));
                width = maxDim;
              } else {
                width = Math.round(width * (maxDim / height));
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to JPEG, quality 0.6
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
            resolve(dataUrl);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      });
    }
    try {
      const promises = selectedProfiles.map(async profile => {
        // Build persona and memories string
        const persona = profile.persona || '';
        const memories = (profile.memories && profile.memories.length)
          ? profile.memories.map(m => `- ${m}`).join('\n')
          : '';
        let aiPrompt = '';
        if (postType === 'new') {
          aiPrompt =
            `Jesteś osobą o następującym opisie:\n${persona}\n` +
            `Masz swoje wspomnienia, ale nie musisz ich przywoływać w każdym wpisie. Używaj ich subtelnie, jeśli pasują do kontekstu.\n` +
            `Na podstawie powyższych informacji oraz tematu: "${prompt}" wygeneruj gotowy, realistyczny wpis na x.com (Twitter) w formie naturalnego, autentycznego posta. Wpis ma być krótki, realistyczny, bez emoji, z lekką ironią lub sarkazmem, w stylu polskiego Twittera (możesz użyć "xd", "XD", czutki twitterowej). Nie twórz analizy ani sugestii, tylko treść wpisu.`;
        } else {
          aiPrompt =
            `Jesteś osobą o następującym opisie:\n${persona}\n` +
            `Masz swoje wspomnienia, ale nie musisz ich przywoływać w każdej odpowiedzi. Możesz je wykorzystać subtelnie, jeśli pasują do kontekstu.\n` +
            `Na podstawie powyższych informacji oraz treści, na którą odpowiadasz: "${prompt}" wygeneruj gotową, realistyczną odpowiedź na x.com (Twitter). Odpowiedź ma być krótka, realistyczna, bez emoji, z lekką ironią lub sarkazmem, w stylu polskiego Twittera (możesz użyć "xd", "XD", czutki twitterowej). Nie twórz analizy ani sugestii, tylko treść odpowiedzi.`;
        }
        const response = await callOpenAIAPI(profile, aiPrompt, imageData);
        return { profile, response };
      });
      const results = await Promise.allSettled(promises);
      console.log('results:', results);
      results.forEach((item, idx) => {
        console.log('item:', item);
        if (item.status === 'fulfilled') {
          const { profile, response } = item.value;
          // Store latest results in a temporary array, not in profile.history
          if (!profile._latestResults) profile._latestResults = [];
          profile._latestResults.push({ prompt, response, image: imageData, edited: false });
        } else {
          // Show a user-friendly message in the results list
          const li = document.createElement('li');
          li.className = 'p-2 bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 rounded shadow';
          li.innerHTML = `<span class="font-semibold">Profile ${profiles[idx]?.id || idx}</span>: Błąd generowania (API limit lub inny problem)`;
          resultsList.appendChild(li);
          console.error('Promise rejected for profile', idx, item.reason);
        }
      });

      // --- Editable Results Rendering ---
      // Only show the latest generated results (not profile.history)
      resultsList.innerHTML = '';
      profiles.forEach(profile => {
        profile._latestResults = profile._latestResults || [];
        profile._latestResults.forEach((entry, idx) => {
          const li = document.createElement('li');
          li.className = 'p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded shadow mb-2 flex flex-col gap-2';
          if (!entry._editing) {
            li.innerHTML = `
              <div>
                <span class="font-semibold">${profile.id}</span>:
                <span>${entry.response}</span>
                ${entry.edited ? '<span class="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">Edytowano</span>' : ''}
              </div>
              <div class="flex gap-2">
                <button class="edit-result-btn bg-blue-500 text-white px-2 py-1 rounded text-sm">Edytuj</button>
                <button class="save-memory-btn bg-yellow-500 text-white px-2 py-1 rounded text-sm">Zapisz jako wspomnienie</button>
              </div>
            `;
            li.querySelector('.edit-result-btn').addEventListener('click', () => {
              entry._editing = true;
              renderEditableResults();
            });
            li.querySelector('.save-memory-btn').addEventListener('click', () => {
              profile.memories = profile.memories || [];
              profile.memories.push(entry.response);
              saveProfiles();
              li.querySelector('.save-memory-btn').disabled = true;
              li.querySelector('.save-memory-btn').textContent = 'Dodano do wspomnień';
            });
          } else {
            li.innerHTML = `
              <textarea class="edit-result-textarea w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-2 bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400" placeholder="Edytuj odpowiedź...">${entry.response}</textarea>
              <div class="flex gap-2">
                <button class="save-result-btn bg-green-500 text-white px-2 py-1 rounded text-sm">Zapisz</button>
                <button class="cancel-result-btn bg-gray-400 text-white px-2 py-1 rounded text-sm">Anuluj</button>
              </div>
            `;
            li.querySelector('.save-result-btn').addEventListener('click', () => {
              const newText = li.querySelector('.edit-result-textarea').value;
              entry.response = newText;
              entry.edited = true;
              entry._editing = false;
              renderEditableResults();
            });
            li.querySelector('.cancel-result-btn').addEventListener('click', () => {
              entry._editing = false;
              renderEditableResults();
            });
          }
          resultsList.appendChild(li);
        });
      });

      function renderEditableResults() {
        resultsList.innerHTML = '';
        profiles.forEach(profile => {
          profile._latestResults = profile._latestResults || [];
          profile._latestResults.forEach((entry, idx) => {
            const li = document.createElement('li');
            li.className = 'p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded shadow mb-2 flex flex-col gap-2';
            if (!entry._editing) {
              li.innerHTML = `
                <div>
                  <span class="font-semibold">${profile.id}</span>:
                  <span>${entry.response}</span>
                  ${entry.edited ? '<span class="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">Edytowano</span>' : ''}
                </div>
                <div class="flex gap-2">
                  <button class="edit-result-btn bg-blue-500 text-white px-2 py-1 rounded text-sm">Edytuj</button>
                  <button class="save-memory-btn bg-yellow-500 text-white px-2 py-1 rounded text-sm">Zapisz jako wspomnienie</button>
                </div>
              `;
              li.querySelector('.edit-result-btn').addEventListener('click', () => {
                entry._editing = true;
                renderEditableResults();
              });
              li.querySelector('.save-memory-btn').addEventListener('click', () => {
                profile.memories = profile.memories || [];
                profile.memories.push(entry.response);
                saveProfiles();
                li.querySelector('.save-memory-btn').disabled = true;
                li.querySelector('.save-memory-btn').textContent = 'Dodano do wspomnień';
              });
            } else {
              li.innerHTML = `
                <textarea class="edit-result-textarea w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-2 bg-white text-gray-900 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400" placeholder="Edytuj odpowiedź...">${entry.response}</textarea>
                <div class="flex gap-2">
                  <button class="save-result-btn bg-green-500 text-white px-2 py-1 rounded text-sm">Zapisz</button>
                  <button class="cancel-result-btn bg-gray-400 text-white px-2 py-1 rounded text-sm">Anuluj</button>
                </div>
              `;
              li.querySelector('.save-result-btn').addEventListener('click', () => {
                const newText = li.querySelector('.edit-result-textarea').value;
                entry.response = newText;
                entry.edited = true;
                entry._editing = false;
                renderEditableResults();
              });
              li.querySelector('.cancel-result-btn').addEventListener('click', () => {
                entry._editing = false;
                renderEditableResults();
              });
            }
            resultsList.appendChild(li);
          });
        });
      }

      saveProfiles();
      renderEditableResults();
    } catch (err) {
      console.error('Caught error:', err, err?.stack);
    }
  });

  // Export always uses the latest (possibly edited) responses
  exportBtn.addEventListener('click', () => {
    let csv = 'ID,Odpowiedź\n';
    profiles.forEach(profile => {
      (profile.history || []).forEach(entry => {
        const resp = entry.response.replace(/"/g, '""');
        csv += `${profile.id},"${resp}"\n`;
      });
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ai_responses.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  // TXT export logic (always uses the latest edited responses)
  const exportTxtBtn = document.getElementById('export-txt-btn');
  exportTxtBtn.addEventListener('click', () => {
    console.log('Eksportuj do TXT button clicked');
    let txt = '';
    profiles.forEach(profile => {
      (profile.history || []).forEach(entry => {
        txt += entry.response + '\n';
      });
    });
    txt = txt.trim(); // Remove trailing newline
    console.log('TXT export content:', txt);
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ai_responses.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  // Settings form save API key
  settingsForm.addEventListener('submit', event => {
    event.preventDefault();
    const key = apiKeyInput.value.trim();
    if (!key) {
      alert('Wprowadź klucz API');
      return;
    }
    localStorage.setItem('openaiApiKey', key);
    alert('Klucz API zapisany');
  });

  // Dark mode toggle handler
  darkModeToggle.addEventListener('change', () => {
    document.documentElement.classList.toggle('dark', darkModeToggle.checked);
    localStorage.setItem('darkMode', darkModeToggle.checked);
  });
  // Load dark mode preference
  const darkPref = localStorage.getItem('darkMode') === 'true';
  darkModeToggle.checked = darkPref;
  document.documentElement.classList.toggle('dark', darkPref);

  // init
  loadProfiles();
  renderProfiles();
});