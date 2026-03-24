// ===== Progress Tracking — Il Prof Bazzani =====
// Tracks which theory/exercise steps a student has viewed via localStorage

const Progress = (() => {
    const STORAGE_KEY = 'profbazzani_progress';

    function load() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
        catch { return {}; }
    }

    function save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // Mark a theory step as viewed
    function markTheoryStep(topicId, stepIndex, totalSteps) {
        const data = load();
        if (!data.theory) data.theory = {};
        if (!data.theory[topicId]) data.theory[topicId] = { viewed: [], total: totalSteps };
        data.theory[topicId].total = totalSteps;
        if (!data.theory[topicId].viewed.includes(stepIndex)) {
            data.theory[topicId].viewed.push(stepIndex);
            data.theory[topicId].viewed.sort((a, b) => a - b);
        }
        save(data);
    }

    // Mark an exercise step as viewed
    function markExerciseStep(problemIndex, stepIndex, totalSteps) {
        const data = load();
        if (!data.exercises) data.exercises = {};
        const key = String(problemIndex);
        if (!data.exercises[key]) data.exercises[key] = { viewed: [], total: totalSteps };
        data.exercises[key].total = totalSteps;
        if (!data.exercises[key].viewed.includes(stepIndex)) {
            data.exercises[key].viewed.push(stepIndex);
            data.exercises[key].viewed.sort((a, b) => a - b);
        }
        save(data);
    }

    // Get completion percentage for a topic (0-100)
    function getTheoryProgress(topicId) {
        const data = load();
        if (!data.theory || !data.theory[topicId]) return 0;
        const entry = data.theory[topicId];
        if (!entry.total || entry.total === 0) return 0;
        return Math.round((entry.viewed.length / entry.total) * 100);
    }

    // Get completion percentage for an exercise (0-100)
    function getExerciseProgress(problemIndex) {
        const data = load();
        const key = String(problemIndex);
        if (!data.exercises || !data.exercises[key]) return 0;
        const entry = data.exercises[key];
        if (!entry.total || entry.total === 0) return 0;
        return Math.round((entry.viewed.length / entry.total) * 100);
    }

    // Record quiz score
    function saveQuizScore(topicId, score, total) {
        const data = load();
        if (!data.quizzes) data.quizzes = {};
        data.quizzes[topicId] = { score, total };
        save(data);
    }

    // Get quiz score (or null if not taken)
    function getQuizScore(topicId) {
        const data = load();
        if (!data.quizzes || !data.quizzes[topicId]) return null;
        return data.quizzes[topicId];
    }

    return { markTheoryStep, markExerciseStep, getTheoryProgress, getExerciseProgress, saveQuizScore, getQuizScore };
})();
window.Progress = Progress;
