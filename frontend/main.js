// ── Sample content ────────────────────────────────────────────────────────────

const sampleCode = `def greet(name):
    """Return a greeting string."""
    return f"Hello, {name}!"


def fibonacci(n):
    """Return the nth Fibonacci number."""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b


def is_palindrome(s):
    """Check whether a string is a palindrome."""
    cleaned = s.lower().replace(" ", "")
    return cleaned == cleaned[::-1]
`;

const sampleOutput = `greet(name)
  Takes a name and returns a friendly greeting message.

fibonacci(n)
  Calculates the nth number in the Fibonacci sequence
  by iterating from 0 upward, keeping track of the
  last two values at each step.

is_palindrome(s)
  Checks if a string reads the same forwards and
  backwards, ignoring case and spaces.
`;

// ── CodeMirror init ───────────────────────────────────────────────────────────

const cmOptions = {
  theme: 'one-dark',
  lineNumbers: true,
  tabSize: 4,
  indentWithTabs: false,
};

const codeEditor = CodeMirror.fromTextArea(
  document.getElementById('code-editor'),
  { ...cmOptions, mode: 'python', autofocus: true, lineWrapping: false }
);
codeEditor.setValue(sampleCode);

const outputEditor = CodeMirror.fromTextArea(
  document.getElementById('output-editor'),
  { ...cmOptions, mode: 'markdown', lineWrapping: true }
);
outputEditor.setValue(sampleOutput);

function resizeEditors() {
  document.querySelectorAll('.editor-wrapper').forEach(wrapper => {
    const cm = wrapper.querySelector('.CodeMirror');
    if (cm) cm.style.height = wrapper.clientHeight + 'px';
  });
  codeEditor.refresh();
  outputEditor.refresh();
}
window.addEventListener('resize', resizeEditors);
requestAnimationFrame(resizeEditors);

// ── Language selector ─────────────────────────────────────────────────────────

document.getElementById('lang-select').addEventListener('change', e => {
  codeEditor.setOption('mode', e.target.value);
});

// ── Menu bar ──────────────────────────────────────────────────────────────────

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  const dropdown = item.querySelector('.menu-dropdown');

  item.addEventListener('click', e => {
    const isOpen = !dropdown.classList.contains('hidden');
    menuItems.forEach(i => i.querySelector('.menu-dropdown').classList.add('hidden'));
    if (!isOpen) dropdown.classList.remove('hidden');
    e.stopPropagation();
  });

  item.addEventListener('mouseenter', () => {
    const anyOpen = [...menuItems].some(
      i => !i.querySelector('.menu-dropdown').classList.contains('hidden')
    );
    if (anyOpen) {
      menuItems.forEach(i => i.querySelector('.menu-dropdown').classList.add('hidden'));
      dropdown.classList.remove('hidden');
    }
  });
});

document.addEventListener('click', () => {
  menuItems.forEach(i => i.querySelector('.menu-dropdown').classList.add('hidden'));
});
