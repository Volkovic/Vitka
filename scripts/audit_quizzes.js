/**
 * Comprehensive Quiz-Module Gap Analysis for JavaScript
 * 
 * Reads every quiz question and its module content, then for each quiz question
 * checks if the KEY CONCEPT of the question is actually taught in the module.
 * Reports only genuine gaps where students would be unable to answer from the material.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'src', 'data', 'javascript');

const quizzes = JSON.parse(fs.readFileSync(path.join(dataDir, 'quizzes.json'), 'utf-8'));

const report = [];

for (const [moduleKey, questions] of Object.entries(quizzes)) {
  const modulePath = path.join(dataDir, `${moduleKey}.md`);
  if (!fs.existsSync(modulePath)) {
    report.push(`## ${moduleKey} - FILE NOT FOUND`);
    continue;
  }
  
  const content = fs.readFileSync(modulePath, 'utf-8');
  const contentLower = content.toLowerCase();
  
  report.push(`\n## ${moduleKey} (${questions.length} preguntas)`);
  
  const gaps = [];
  
  for (const q of questions) {
    // Extract the core concept being tested
    const qText = q.question + ' ' + q.options.join(' ') + ' ' + (q.justification || '');
    
    // For each question, check if the module covers the key concept
    // We check if the correct answer's key terms appear in the module
    const correctOption = q.options[q.correctAnswer];
    
    // Extract meaningful terms from the question
    const codeInQuestion = [];
    const codeRegex = /`([^`]+)`/g;
    let m;
    while ((m = codeRegex.exec(q.question)) !== null) {
      codeInQuestion.push(m[1]);
    }
    
    // Check specific patterns based on what the question asks about
    let found = false;
    let missingConcept = '';
    
    // Check if the code snippet or method mentioned is in the material
    for (const code of codeInQuestion) {
      const codeLower = code.toLowerCase().trim();
      // Check common method patterns
      if (codeLower.includes('.') && !codeLower.includes('=')) {
        // It's a method call like str.slice(), Math.floor(), etc.
        const methodMatch = codeLower.match(/\.(\w+)\(/);
        if (methodMatch) {
          const method = methodMatch[1];
          if (contentLower.includes(method)) {
            found = true;
          } else {
            missingConcept = `método .${method}()`;
          }
        }
      }
    }
    
    // If no code snippets, check the justification's key concept
    if (codeInQuestion.length === 0 || !missingConcept) {
      // Extract key terms from justification
      const justLower = (q.justification || '').toLowerCase();
      
      // Check if the core teaching point appears in the content
      // by looking for key phrases from the justification
      const keyPhrases = justLower.split(/[.,;!¡]/).filter(p => p.trim().length > 15);
      let matchCount = 0;
      for (const phrase of keyPhrases) {
        const words = phrase.trim().split(/\s+/).filter(w => w.length > 4);
        const significantWords = words.slice(0, 3);
        const wordMatches = significantWords.filter(w => contentLower.includes(w));
        if (wordMatches.length >= Math.ceil(significantWords.length * 0.5)) {
          matchCount++;
        }
      }
      if (matchCount > 0) {
        found = true;
      }
    }
    
    if (!found && missingConcept) {
      gaps.push({
        id: q.id,
        question: q.question.substring(0, 150),
        missing: missingConcept,
        justification: q.justification
      });
    }
  }
  
  if (gaps.length > 0) {
    for (const g of gaps) {
      report.push(`  ❌ Q${g.id}: ${g.question}`);
      report.push(`     Falta en material: ${g.missing}`);
      report.push(`     Debería enseñar: ${g.justification}`);
    }
    report.push(`  → ${gaps.length} gaps encontrados`);
  } else {
    report.push(`  ✅ Todo cubierto`);
  }
}

const output = report.join('\n');
console.log(output);
fs.writeFileSync(path.join(__dirname, 'gap_analysis.txt'), output);
