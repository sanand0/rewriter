function bookmarklet() {
  if (!window.__rewrite__) {
    let popupWindow = null;
    let pendingText = null;

    window.addEventListener("message", function (event) {
      if (event.data === "🟢 READY") {
        if (pendingText) {
          popupWindow.postMessage(
            "⚙️" +
              JSON.stringify({
                OPENAI_API_BASE: "$OPENAI_API_BASE",
                OPENAI_API_KEY: "$OPENAI_API_KEY",
                MODEL: "$MODEL",
                INSTRUCTIONS: "$INSTRUCTIONS",
              }),
            "*"
          );
          popupWindow.postMessage("➡️" + pendingText, "*");
          pendingText = null;
        }
      } else if (event.data === "🔴 CLOSE") {
        popupWindow.close();
      }
    });

    window.__rewrite__ = function () {
      const selectedText = window.getSelection().toString();
      if (!selectedText) return alert("Please select some text first!");

      // Check if popup exists and is not closed
      if (!popupWindow || popupWindow.closed) {
        pendingText = selectedText;
        popupWindow = window.open("$ROOT/rewrite.html", "RewriteWindow", "width=600,height=500,resizable=yes");
      } else {
        // Popup is already open, send the new text
        popupWindow.postMessage("➡️" + selectedText, "*");
      }
    };
  }
  window.__rewrite__();
}
