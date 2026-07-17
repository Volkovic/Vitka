import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../src/data');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY no encontrada en el archivo .env o variables de entorno.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT_MD = `Eres un experto desarrollador de software y pedagogo técnico Senior.
Tu tarea es REESTRUCTURAR y MEJORAR la teoría de un módulo de programación para que alcance un nivel de excelencia académica, pero manteniéndose altamente comprensible.

REGLAS OBLIGATORIAS:
1. **Respetar temario (CRÍTICO):** NO ELIMINES NINGÚN concepto técnico, sintaxis, biblioteca o detalle (por ejemplo, si el original menciona \`@wraps\` de \`functools\`, DEBES incluirlo y explicar su propósito exhaustivamente). Mejora, no recortes.
2. **Estructura Slide:** Cada slide se separa exactamente por \`---\`. Un slide siempre debe contener teoría detallada + ejemplo desglosado.
3. **Agrupación lógica:** Map, Filter y Reduce DEBEN ir juntos obligatoriamente en un solo slide (no los separes con \`---\`).
4. **Estructura Didáctica (Jerárquica y Sobria):**
   Usa una jerarquía estricta de encabezados Markdown (###) y un tono profesional (elimina palabras como "magia" o "truco", usa "mecánica" o "implementación").
   
   REPLICA EXACTAMENTE ESTA ESTRUCTURA DE ENCABEZADOS POR CADA TEMA:

   ## [Nombre del Tema Principal]
   
   ### 1. El Concepto en la Vida Real
   Imagina que... [Usa una analogía clara y profesional].
   \`\`\`python
   # Estado base sin aplicar el concepto
   def enviar_mensaje():
       print("Mensaje enviado")
   \`\`\`
   El problema con este enfoque es que... [Explica la limitación]. Aquí es donde interviene **[CONCEPTO]** para resolverlo mediante...
   
   ### 2. Anatomía del Código Paso a Paso
   Esta es la estructura interna detallada de la implementación:
   \`\`\`python
   from functools import wraps # 0. Importamos la utilidad para preservar los metadatos de la función original
   
   def mi_decorador(funcion_original): # 1. La función superior recibe la función objetivo
       @wraps(funcion_original) # <-- Paso A: Protege la identidad (nombre y docstring) de la función original
       def wrapper():
           print("Ejecución previa") # <-- Paso B: Lógica antes de la función
           funcion_original() # <-- Paso C: Invocación de la función original
           print("Ejecución posterior") # <-- Paso D: Lógica después de la función
       return wrapper
   \`\`\`
   
   ### 3. Implementación Práctica y Resultado
   Al aplicar la sintaxis \`[SINTAXIS]\`, el intérprete ejecuta la lógica envolvente de forma transparente:
   \`\`\`python
   @mi_decorador
   def saludar():
       print("¡Hola Mundo!")
   \`\`\`
   **Resultado en consola:**
   \`\`\`text
   Ejecución previa
   ¡Hola Mundo!
   Ejecución posterior
   \`\`\`
   **Conclusión:** Hemos logrado extender el comportamiento de la función original de forma modular y mantenible.

FORMATO DE SALIDA:
Entrega ÚNICA Y EXCLUSIVAMENTE el string completo del Markdown reescrito. No uses bloques \`\`\`markdown, devuelve el texto plano.`;

const SYSTEM_PROMPT_QUIZ = `Eres un experto pedagogo creando quizzes técnicos.
Tu tarea es tomar un Markdown de teoría y crear/mejorar los quizzes para que cubran el 100% de la teoría.

REGLAS OBLIGATORIAS:
1. **Quizzes Balanceados (CRÍTICO):** Las opciones incorrectas (distractores) DEBEN tener una longitud de texto similar a la respuesta correcta y estar redactadas con lenguaje técnico verosímil.
2. Formato: Entrega ÚNICA Y EXCLUSIVAMENTE un JSON Array válido, MINIFICADO EN UNA SOLA LÍNEA, sin bloques \`\`\`json.`;

async function processModule(lang, moduleId) {
  const mdPath = path.join(dataDir, lang, `module${moduleId}.md`);
  const quizPath = path.join(dataDir, lang, 'quizzes.json');

  let originalMarkdown = '';
  try {
    originalMarkdown = await fs.readFile(mdPath, 'utf8');
  } catch(e) {
    console.log(`No se encontró ${mdPath}. Saltando.`);
    return;
  }
  
  let allQuizzes = {};
  try {
    const rawData = await fs.readFile(quizPath, 'utf8');
    allQuizzes = JSON.parse(rawData);
  } catch(e) {
    console.log(`No se encontró quizzes.json o está vacío. Se creará uno nuevo.`);
  }
  const originalQuizzes = allQuizzes[`module${moduleId}`] || [];

  const promptMd = `TEORÍA ORIGINAL:\n\n${originalMarkdown}\n\nReescribe esta teoría siguiendo tus reglas.`;

  console.log(`Generando Markdown para módulo ${moduleId}...`);
  try {
    const responseMd = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: promptMd,
      config: { systemInstruction: SYSTEM_PROMPT_MD, temperature: 0.2, maxOutputTokens: 8192 }
    });
    
    let updatedMarkdown = responseMd.text.trim();
    if (updatedMarkdown.startsWith('```markdown')) updatedMarkdown = updatedMarkdown.replace(/^```markdown/, '').replace(/```$/, '').trim();
    else if (updatedMarkdown.startsWith('```')) updatedMarkdown = updatedMarkdown.replace(/^```/, '').replace(/```$/, '').trim();

    await fs.writeFile(mdPath, updatedMarkdown, 'utf8');
    console.log(`✅ Markdown actualizado guardado.`);

    const promptQuiz = `TEORÍA ACTUALIZADA:\n\n${updatedMarkdown}\n\nQUIZZES ORIGINALES:\n\n${JSON.stringify(originalQuizzes, null, 2)}\n\nGenera los quizzes actualizados.`;
    
    console.log(`Generando Quizzes para módulo ${moduleId}...`);
    const responseQuiz = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: promptQuiz,
      config: { systemInstruction: SYSTEM_PROMPT_QUIZ, temperature: 0.2, maxOutputTokens: 8192 }
    });

    let quizzesJsonText = responseQuiz.text.trim();
    if (quizzesJsonText.startsWith('```json')) quizzesJsonText = quizzesJsonText.replace(/^```json/, '').replace(/```$/, '').trim();
    else if (quizzesJsonText.startsWith('```')) quizzesJsonText = quizzesJsonText.replace(/^```/, '').replace(/```$/, '').trim();

    // Clean raw newlines that break parse
    quizzesJsonText = quizzesJsonText.replace(/\n/g, "\\n").replace(/\r/g, "");

    const updatedQuizzes = JSON.parse(quizzesJsonText);
    if (updatedQuizzes && Array.isArray(updatedQuizzes)) {
      allQuizzes[`module${moduleId}`] = updatedQuizzes;
      await fs.writeFile(quizPath, JSON.stringify(allQuizzes, null, 2), 'utf8');
      console.log(`✅ Quizzes actualizados guardados.`);
    }
  } catch (error) {
    console.error(`❌ Error procesando el módulo ${moduleId} de ${lang}:`, error.message);
  }
}

async function main() {
  const targetLang = process.argv[2];
  const targetModule = process.argv[3];

  if (!targetLang) {
    console.log("Uso: node scripts/ai_processor.js <lenguaje> [id_modulo]");
    console.log("Ejemplo: node scripts/ai_processor.js python 15");
    console.log("Si omites el módulo, se intentarán procesar TODOS los módulos del lenguaje (puede tomar tiempo y consumir muchos tokens).");
    process.exit(1);
  }

  if (targetModule) {
    await processModule(targetLang, targetModule);
  } else {
    // Buscar todos los modulos
    const langDir = path.join(dataDir, targetLang);
    const files = await fs.readdir(langDir);
    const moduleFiles = files.filter(f => f.startsWith('module') && f.endsWith('.md'));
    
    // Sort numerically
    moduleFiles.sort((a, b) => {
      const numA = parseInt(a.match(/module(\d+)\.md/)[1]);
      const numB = parseInt(b.match(/module(\d+)\.md/)[1]);
      return numA - numB;
    });

    for (const file of moduleFiles) {
      const moduleId = file.match(/module(\d+)\.md/)[1];
      await processModule(targetLang, moduleId);
      // Pequeña pausa para no saturar la API
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log("\nProceso finalizado.");
}

main();
