# Process

## Proof of concept

GitHub Copilot (Agent) on Claude 3.5 Sonnet.

> - Create a page `index.html` with some sample text.
> - This includes a JavaScript function, `rewrite()`, which, when called
>   - pops opens a new window showing `rewrite.html`.
>   - passes the contents of the selected text via postMessage to `rewrite.html`
>   - listens for postMessages from the popup and writes them on the console
> - `rewrite.html` receives the contents and
>   - converts the text to capitals
>   - displays it (so it's visible on the popup)
>   - sends the capitalized text back to `rewrite()` via postMessage, so that it's written on the console

Iterated the bugs:

> If the popupWindow is already open, don't re-open it. Just send it the currently selected text.

> popupWindow.onload isn't getting called.

> Even after the popup has loaded, popupWindow.document is not accessible.
> SecurityError: Failed to read a named property 'document' from Window (CSP).
> But popupWindow.postMessage works. Maybe create a protocol between rewrite.html and index.html to ping and check if it's up

... and it eventually worked.

## Rewrite UI

> Modify `rewrite.html` to include a "template" dropdown that lets the user pick a template. Default templates are: "Email polisher" (default), "Fix grammar"
> When the template changes, the "instructions" textarea should be populated as follows:
>
> {
> "Email polisher": "Refine this email to be concise. Use proper casing. Use words appropriately. Spell in US English. Keep tone informal, professional",
> "Fix grammar": "Rewrite clearly and concisely. Fix grammar & punctuation. Use Markdown to highlight key points",
> }
>
> Also add an "instructions" textarea. By default, it has the "Email polisher" instructions.
> Also add an "input" textarea. This is where the input message is pasted.
> Also add an "output" textarea. This is where the revised text is shown.
> Add a "Rewrite" button. This will trigger the OpenAI API call and send the input with instructions, and set the output.value from the response.
> Add an "Apply" button. This will send the contents of the output textarea to the opener via postMessage and window.opener.focus()
> Add an API Key and an API URL textbox inside a "Settings" collapsible section. Preserve these values in localStorage.
> When opening, collapse Settings if the values are available in localStorage.
> Use the OpenAI API base URL and API key from these.
>
> Do not use Bootstrap or any framework. Format this BEAUTIFULLY using CSS. Keep the contents compact and responsive.

## Improve UI

> This takes too much height. Remove the "Text Rewriter" heading. Reduce the top margin. Avoid the bordered card. Keep it compact!
> Move the Template dropdown alongside Rewrite and Apply buttons as a single line. Keep this above output text.
> Settings should be left aligned with the text boxes. Currently it is indented.
> When the API is running, show a `loading.svg` as the loading indicator.

## Bookmark Baker

This application, "Rewrite", creates bookmarklets that use LLMs to rewrite selected text.
Create a BEAUTIFUL, ELEGANT, ligthweight Bootstrap web app. It should briefly explain what the app does.
It should ask the user for these inputs:

- Name. Default: "Email polisher"
- Instructions (the system prompt) as a text area. Default: Refine this email to be concise. Use proper casing. Use words appropriately. Spell in US English. Keep tone informal, professional
- OpenAI API Base. Provide options as a datalist but allow any value. Datalist: https://api.openai.com, https://llmfoundry.straive.com/openai, https://openrouter.ai/api, https://aipipe.org/openrouter, https://aipipe.org/openai
- OpenAI API Key
- Model. Provide options as a datalist but allow any value. Datalist: gpt-5-nano, gpt-5-mini, gpt-4.1-nano, gpt-4.1-mini

Show a "Test API" button. Clicking on it will send a sample OpenAI request to the OpenAI API Base using the key and model and test it out.
When testing, show `loading.svg` as the loading indicator.
Indicate the result (success or failure) clearly.

Show a "Generate Bookmarklet" button. This should fetch `bookmarklet.js` as text, replace these values with the values from the inputs:

$OPENAI_API_BASE
$OPENAI_API_KEY
$MODEL
$INSTRUCTIONS

Then, it should create a prominent link (that looks like a button) and set its href to `"javascript:(" + bookmarkletText + ")()"`.
Then, it should write CLEAR instructions asking the user to drag it to their bookmarks bar.

## Improve UI

- Move the OpenAI API Base URL and API key and Model and Test API button into a single section. Use just 2 rows to draw these 4 items.
- Persist these values in localStorage and restore them on the next load.
- Create a GitHub action that will run npm run build on commit and then push to GitHub pages

## Refactor Rewriter

Modify rewrite.js so that:

- When it receives a message, it automatically triggers a click on rewriteBtn
- Shows a small footnote linking to [Rewriter](https://sanand0.github.io/rewrite/)

## README

Create a _professional_ README.md for this application. Use best practices.
Explain WHY this app is useful, listing a few REAL-LIFE business use cases.
Include these use cases in #file:index.html as well for users to get ideas. (Use good iconography and typography.)
In README.md, explain how to use the app.
Include #file:screenshot.webp as a screenshot.
Add a section for developers explaining how to set it up. (It's a static HTML app.)
Mention that the LLM prompts used for this app are under prompts/README.md #file:README.md
The code is at https://github.com/sanand0/rewriter and output at https://sanand0.github.io/rewriter/
The author is S Anand <root.node@gmail.com>.
Add an MIT LICENSE.

## Use cases

Clicking on any of these use cases should automatically update the name and instructions with an appropriate prompt (think of good prompts) and smoothly scroll down to bring the Name field into view.

## Refactor

Refactor this code to:

- Reduce custom CSS, replacing it with Bootstrap classes
- Replace FontAwesome with Bootstrap Icons
- Modularizing, simplifying, and modernizing the JavaScript code into more readable, elegant and concise code
