const titles = window.PLATFORM_DATA.viewTitles;

    const navButtons = document.querySelectorAll(".nav-btn");
    const views = document.querySelectorAll(".view");
    const viewTitle = document.getElementById("viewTitle");
    const viewSubtitle = document.getElementById("viewSubtitle");
    const overallPercent = document.getElementById("overallPercent");
    const doneCount = document.getElementById("doneCount");
    const noteCount = document.getElementById("noteCount");
    const overallBar = document.getElementById("overallBar");
    const quizScoreStat = document.getElementById("quizScoreStat");
    const quizScore = document.getElementById("quizScore");
    const quizForm = document.getElementById("quizForm");
    const quizReset = document.getElementById("quizReset");
    const toast = document.getElementById("toast");
    const notesList = document.getElementById("notesList");
    const noteForm = document.getElementById("noteForm");
    const taskForm = document.getElementById("taskForm");
    const customTasks = document.getElementById("customTasks");
    const resetBtn = document.getElementById("resetBtn");
    const exportBtn = document.getElementById("exportBtn");

    let notes = JSON.parse(localStorage.getItem("fs-notes") || "[]");
    let tasks = JSON.parse(localStorage.getItem("fs-custom-tasks") || "[]");

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 1500);
    }

    function switchView(viewName) {
      navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
      views.forEach((view) => view.classList.toggle("active", view.id === viewName));
      viewTitle.textContent = titles[viewName][0];
      viewSubtitle.textContent = titles[viewName][1];
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    navButtons.forEach((button) => {
      button.addEventListener("click", () => switchView(button.dataset.view));
    });

    document.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => switchView(button.dataset.jump));
    });

    document.querySelectorAll(".example-tab").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.example;
        document.querySelectorAll(".example-tab").forEach((tab) => {
          tab.classList.toggle("active", tab === button);
        });
        document.querySelectorAll(".code-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.examplePanel === key);
        });
      });
    });

    document.querySelectorAll("[data-copy-code]").forEach((button) => {
      button.addEventListener("click", async () => {
        const code = document.getElementById("code-" + button.dataset.copyCode)?.innerText || "";
        try {
          await navigator.clipboard.writeText(code);
          showToast("Code copied");
        } catch (error) {
          showToast("Copy failed");
        }
      });
    });

    function allCheckboxes() {
      return Array.from(document.querySelectorAll("input[type='checkbox'][data-task]"));
    }

    function loadChecks() {
      allCheckboxes().forEach((box) => {
        box.checked = localStorage.getItem("fs-task-" + box.dataset.task) === "done";
        if (box.dataset.bound === "true") return;
        box.dataset.bound = "true";
        box.addEventListener("change", () => {
          if (box.checked) {
            localStorage.setItem("fs-task-" + box.dataset.task, "done");
          } else {
            localStorage.removeItem("fs-task-" + box.dataset.task);
          }
          updateStats();
        });
      });
    }

    function updateStats() {
      const boxes = allCheckboxes();
      const done = boxes.filter((box) => box.checked).length;
      const percent = boxes.length ? Math.round((done / boxes.length) * 100) : 0;
      overallPercent.textContent = percent + "%";
      doneCount.textContent = done;
      noteCount.textContent = notes.length;
      overallBar.style.width = percent + "%";
      const latestQuizScore = localStorage.getItem("fs-quiz-score") || "0/8";
      if (quizScoreStat) quizScoreStat.textContent = latestQuizScore;
      if (quizScore) quizScore.textContent = "Score: " + latestQuizScore;
    }

    function scoreQuiz() {
      if (!quizForm) return;
      let score = 0;
      const questions = Array.from(document.querySelectorAll(".quiz-question"));
      questions.forEach((question) => {
        const answer = question.dataset.answer;
        const selected = question.querySelector("input[type='radio']:checked");
        const isCorrect = selected?.value === answer;
        question.classList.toggle("correct", Boolean(selected && isCorrect));
        question.classList.toggle("wrong", Boolean(selected && !isCorrect));
        if (isCorrect) score += 1;
      });
      const result = score + "/" + questions.length;
      localStorage.setItem("fs-quiz-score", result);
      updateStats();
      showToast("Quiz score: " + result);
    }

    if (quizForm) {
      quizForm.addEventListener("submit", (event) => {
        event.preventDefault();
        scoreQuiz();
      });
    }

    if (quizReset) {
      quizReset.addEventListener("click", () => {
        quizForm.reset();
        document.querySelectorAll(".quiz-question").forEach((question) => {
          question.classList.remove("correct", "wrong");
        });
        localStorage.setItem("fs-quiz-score", "0/8");
        updateStats();
        showToast("Quiz reset");
      });
    }

    function saveNotes() {
      localStorage.setItem("fs-notes", JSON.stringify(notes));
      renderNotes();
      updateStats();
    }

    function renderNotes() {
      if (!notes.length) {
        notesList.innerHTML = '<div class="empty">No notes yet. Add your first note on JWT flow, API design, or project architecture.</div>';
        return;
      }
      notesList.innerHTML = notes.map((note) => `
        <article class="note">
          <div class="note-top">
            <div>
              <h4>${escapeHtml(note.title)}</h4>
              <p class="muted">${escapeHtml(note.category)} - ${escapeHtml(note.date)}</p>
            </div>
            <button class="small-btn danger" data-delete-note="${note.id}" type="button">Delete</button>
          </div>
          <pre>${escapeHtml(note.body)}</pre>
        </article>
      `).join("");

      document.querySelectorAll("[data-delete-note]").forEach((button) => {
        button.addEventListener("click", () => {
          notes = notes.filter((note) => note.id !== button.dataset.deleteNote);
          saveNotes();
          showToast("Note deleted");
        });
      });
    }

    noteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.getElementById("noteTitle").value.trim();
      const category = document.getElementById("noteCategory").value;
      const body = document.getElementById("noteBody").value.trim();
      if (!title || !body) {
        showToast("Add title and note");
        return;
      }
      notes.unshift({
        id: String(Date.now()),
        title,
        category,
        body,
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      });
      noteForm.reset();
      saveNotes();
      showToast("Note saved");
    });

    function saveTasks() {
      localStorage.setItem("fs-custom-tasks", JSON.stringify(tasks));
      renderTasks();
      loadChecks();
      updateStats();
    }

    function renderTasks() {
      if (!tasks.length) {
        customTasks.innerHTML = '<div class="empty">No custom tasks yet.</div>';
        return;
      }
      customTasks.innerHTML = tasks.map((task) => `
        <article class="lesson">
          <input type="checkbox" data-task="custom-${task.id}">
          <div>
            <strong>${escapeHtml(task.title)}</strong>
            <p>${escapeHtml(task.area)}</p>
          </div>
          <button class="small-btn danger" data-delete-task="${task.id}" type="button">Delete</button>
        </article>
      `).join("");

      document.querySelectorAll("[data-delete-task]").forEach((button) => {
        button.addEventListener("click", () => {
          localStorage.removeItem("fs-task-custom-" + button.dataset.deleteTask);
          tasks = tasks.filter((task) => task.id !== button.dataset.deleteTask);
          saveTasks();
          showToast("Task deleted");
        });
      });
    }

    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.getElementById("taskTitle").value.trim();
      const area = document.getElementById("taskArea").value;
      if (!title) {
        showToast("Add task title");
        return;
      }
      tasks.unshift({ id: String(Date.now()), title, area });
      taskForm.reset();
      saveTasks();
      showToast("Task added");
    });

    resetBtn.addEventListener("click", () => {
      if (!window.confirm("Reset all progress checkboxes? Notes will stay saved.")) return;
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("fs-task-")) localStorage.removeItem(key);
      });
      allCheckboxes().forEach((box) => { box.checked = false; });
      updateStats();
      showToast("Progress reset");
    });

    exportBtn.addEventListener("click", async () => {
      const text = notes.map((note) => `# ${note.title}\nCategory: ${note.category}\nDate: ${note.date}\n\n${note.body}`).join("\n\n---\n\n");
      if (!text) {
        showToast("No notes to export");
        return;
      }
      const blob = new Blob([text], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "java-fullstack-notes.md";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showToast("Notes exported");
    });

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    renderTasks();
    renderNotes();
    loadChecks();
    updateStats();
