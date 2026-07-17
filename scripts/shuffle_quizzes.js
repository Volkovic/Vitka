import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../src/data');

async function shuffleQuizzes(lang) {
  const quizPath = path.join(dataDir, lang, 'quizzes.json');
  try {
    const data = await fs.readFile(quizPath, 'utf8');
    const quizzes = JSON.parse(data);

    for (const [moduleId, questions] of Object.entries(quizzes)) {
      for (const q of questions) {
        if (!q.options || q.options.length === 0) continue;
        
        // El correctAnswer actual es q.correctAnswer (índice original)
        const correctText = q.options[q.correctAnswer];
        
        // Fisher-Yates shuffle
        const shuffled = [...q.options];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        q.options = shuffled;
        // Encontrar el nuevo índice
        q.correctAnswer = shuffled.indexOf(correctText);
      }
    }

    await fs.writeFile(quizPath, JSON.stringify(quizzes, null, 2), 'utf8');
    console.log(`✅ Quizzes mezclados para ${lang}`);
  } catch (e) {
    console.error(`Error procesando ${lang}:`, e.message);
  }
}

async function main() {
  const languages = ['python', 'javascript', 'sql'];
  for (const lang of languages) {
    await shuffleQuizzes(lang);
  }
  console.log("Randomización de Quizzes terminada.");
}

main();
