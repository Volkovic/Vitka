# 🔁 Prompt Reutilizable: Explicar un Módulo de Vitka

Copiá y pegá este prompt cuando quieras que se explique cualquier módulo nuevo. Solo cambiá la ruta del archivo al final.

---

## El Prompt

```
Explicame este módulo desde 0. Leé el archivo markdown del módulo y generá un artefacto completo con la explicación siguiendo EXACTAMENTE esta estructura y estilo:

## Formato obligatorio:

1. **Título y contexto**: Un bloque NOTE explicando qué pilar del curso es este módulo y qué se espera aprender.

2. **Analogía central**: Una analogía del mundo real que explique el concepto core del módulo entero. Formato "X = [analogía mala] vs. Y = [analogía buena]". Que sea memorable y fácil de visualizar (ej: guardarropa centralizado vs. cajón personal, buffet vs. chef a la carta, jam session vs. orquesta).

3. **Sección por sección**: Para CADA sección del módulo:
   - Título con emoji
   - Explicación en lenguaje simple
   - **Tabla comparativa** o tabla de referencia cuando aplique
   - **Ejemplo de código** mostrando el "antes" (❌ malo) vs. "después" (✅ bueno)
   - **Analogía específica** para esa sección (distinta a la central)
   - **Diagrama mermaid** cuando ayude a visualizar flujos o relaciones

4. **Resumen en una frase**: Un blockquote final que condense todo el módulo en 1-2 oraciones.

## Reglas de estilo:
- Usá español rioplatense (vos, tenés, usá) manteniendo términos técnicos en inglés
- Usá emojis en los títulos
- Usá bloques de alerta de GitHub (NOTE, TIP, IMPORTANT, WARNING, CAUTION) para destacar info clave
- Los ejemplos de código deben ser funcionales y en JSX/TSX cuando aplique
- Cada analogía debe ser distinta y memorable
- Las tablas deben ser limpias y escaneables

## Archivo del módulo a explicar:
[PEGAR RUTA DEL ARCHIVO ACÁ, ej: src/data/tailwind/module4.md]
```

---

## Ejemplo de uso

```
Explicame este módulo desde 0. Leé el archivo markdown del módulo y generá un artefacto...
[...todo el prompt de arriba...]

Archivo del módulo a explicar:
src/data/tailwind/module4.md
```

> [!TIP]
> Este prompt funciona para cualquier módulo de cualquier curso (tailwind, react, javascript, python, etc.) siempre que el contenido esté en un archivo `.md` con la misma estructura de secciones.
