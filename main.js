console.log("main.js loaded");
document.addEventListener('DOMContentLoaded', () => {
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
          profileSelectList.appendChild(div);
      });
  }
  const profileList = document.getElementById('profile-list');
  const profileForm = document.getElementById('profile-form');
  const idInput = document.getElementById('profile-id-input');
  const personaInput = document.getElementById('profile-persona-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const socialInput = document.getElementById('profile-social-input');
  const memoriesInput = document.getElementById('profile-memories-input');
  const addProfileBtn = document.getElementById('add-profile-btn');

  const promptInput = document.getElementById('prompt-input');
  const settingsForm = document.getElementById('settings-form');
  const apiKeyInput = document.getElementById('api-key-input');
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
    profiles = data ? JSON.parse(data) : [];
  }

  function saveProfiles() {
    localStorage.setItem('aiProfiles', JSON.stringify(profiles));
  }

  function renderProfiles() {
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
    const prompt = promptInput.value.trim();
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
          const li = document.createElement('li');
          li.className = 'p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded shadow';
          li.innerHTML = `<span class="font-semibold">${profile.id}</span>: ${response}`;
          resultsList.appendChild(li);
          profile.history = profile.history || [];
          profile.history.push({ prompt, response, image: imageData });
        } else {
          // Show a user-friendly message in the results list
          const li = document.createElement('li');
          li.className = 'p-2 bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 rounded shadow';
          li.innerHTML = `<span class="font-semibold">Profile ${profiles[idx]?.id || idx}</span>: Błąd generowania (API limit lub inny problem)`;
          resultsList.appendChild(li);
          console.error('Promise rejected for profile', idx, item.reason);
        }
      });
      saveProfiles();
    } catch (err) {
      console.error('Caught error:', err, err?.stack);
    }
  });

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