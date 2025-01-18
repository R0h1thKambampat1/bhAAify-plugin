// Function to replace 'A' or 'a' with 'AA' in a text node
function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
    node.nodeValue = node.nodeValue.replace(/A|a/g, "AA");
  }
}

// Function to iterate through all text nodes in the document
function replaceAllText() {
  const elements = document.querySelectorAll("*:not(script):not(style)");
  elements.forEach(element => {
    element.childNodes.forEach(node => replaceText(node));
  });
}

// Observe DOM changes for dynamically added content
function observeDOMChanges() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.querySelectorAll("*").forEach(child => {
            child.childNodes.forEach(grandchild => replaceText(grandchild));
          });
        } else if (node.nodeType === Node.TEXT_NODE) {
          replaceText(node);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Replace text on initial load and observe DOM for changes
function runScript() {
  replaceAllText();
  observeDOMChanges();
}

// Run the script after the DOM has fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runScript);
} else {
  runScript();
}
