export async function verificarFotoConIA(imagenBase64, mimeType = 'image/jpeg') {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    const prompt =
      'Analiza esta imagen. Responde SOLO con un JSON válido, sin texto adicional, sin markdown, en este formato exacto: {"valido": true o false, "razon": "explicación breve en español"}. Se considera VALIDO solo si la imagen muestra claramente a una persona recogiendo o sosteniendo basura/residuos en un espacio exterior real (calle, plaza, parque, playa, vereda). Se considera NO VALIDO si: es un interior, no hay basura visible, no se ve a una persona interactuando con el residuo, o la imagen parece preparada o no relacionada.';

    const body = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: imagenBase64,
              },
            },
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Si Gemini devuelve un error HTTP, capturamos el mensaje real
    if (!response.ok) {
      const mensajeError = data?.error?.message ?? 'Error desconocido de la API';
      return { valido: false, razon: `Error de API: ${mensajeError}` };
    }

    const textoRespuesta = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    // Limpiar posible markdown o texto extra alrededor del JSON
    const match = textoRespuesta.match(/\{[\s\S]*?\}/);
    if (!match) {
      return { valido: false, razon: 'Error al analizar la imagen, intentá de nuevo' };
    }

    const resultado = JSON.parse(match[0]);
    return {
      valido: Boolean(resultado.valido),
      razon: resultado.razon ?? '',
    };
  } catch {
    return { valido: false, razon: 'Error al analizar la imagen, intentá de nuevo' };
  }
}
