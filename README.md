# Profile Prompt Manager

A simple desktop-style web application built with HTML, JavaScript, and Tailwind CSS for managing user profiles, sending prompts (e.g., to OpenAI API), and exporting results to CSV. The app is fully client-side and runs in your browser.

## Features

- **Profile Management:** Create, edit, and delete profiles, each with a persona and prompt/response history (stored in localStorage).
- **Prompt Panel:** Enter prompts and generate responses for a selected profile or all profiles at once.
- **API Integration (Mock):** Simulates sending prompts to an API (easily replaceable with a real OpenAI API call).
- **Results Panel:** Displays responses per profile in a table or list.
- **CSV Export:** Download all results as a CSV file.
- **Performance:** Uses async/await and Promise.all for efficient parallel requests.
- **Manual Testing:** Add sample profiles, test CRUD operations, generate mock responses, and export CSV.

## Project Structure

- [`index.html`](index.html) – Main HTML template, includes Tailwind CSS.
- [`main.js`](main.js) – Application logic (profile management, prompt handling, API calls, CSV export).
- [`styles.css`](styles.css) – (Optional) Additional styles.
- [`plan.md`](plan.md) – Project plan and technical notes.

## Usage

1. **Clone or Download the Repository.**
2. **Open `index.html` in your web browser.**
   - No build step or server required; everything runs locally.

## Customization

- To connect to a real API (e.g., OpenAI), replace the `mockOpenAIAPI` function in [`main.js`](main.js) with a real fetch call. See the code comments for guidance.

## Example CSV Output

```
ID,Odpowiedź
123,"Odpowiedź 1"
456,"Odpowiedź 2"
```

## Development Notes

- All data is stored in your browser's localStorage.
- The UI is built with Tailwind CSS for rapid prototyping.
- For large numbers of profiles, consider implementing list virtualization.

## License

MIT License