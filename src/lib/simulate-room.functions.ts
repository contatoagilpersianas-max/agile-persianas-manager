import { createServerFn } from "@tanstack/react-start";

/**
 * Simulação de persiana em foto do cliente via Lovable AI Gateway
 * (Gemini 2.5 Flash Image). Substitui a antiga edge function
 * `simulate-room` (nunca deployada no Lovable Cloud).
 */
export const simulateRoom = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = (data ?? {}) as Record<string, unknown>;
    const imageDataUrl = typeof d.imageDataUrl === "string" ? d.imageDataUrl : "";
    const product = typeof d.product === "string" ? d.product : "";
    const color = typeof d.color === "string" ? d.color : "";
    const ambient = typeof d.ambient === "string" ? d.ambient : "";
    if (!imageDataUrl || !product) {
      throw new Error("imageDataUrl e product são obrigatórios");
    }
    return { imageDataUrl, product, color, ambient };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { error: "LOVABLE_API_KEY não configurada no servidor.", code: "no_key" as const };
    }

    const colorTxt = data.color ? ` na cor ${data.color}` : "";
    const ambTxt = data.ambient ? ` (ambiente: ${data.ambient})` : "";
    const prompt = `Você é um especialista em visualização de interiores. Identifique TODAS as janelas visíveis nesta foto de ambiente${ambTxt} e instale de forma fotorrealista uma ${data.product}${colorTxt} cobrindo cada janela completamente, do topo do batente até abaixo do peitoril, com largura proporcional ao vão.

Regras obrigatórias:
- Mantenha exatamente o mesmo enquadramento, perspectiva, móveis, paredes, piso, iluminação e cores do ambiente original.
- A persiana deve ter sombras coerentes com a luz natural da cena, textura do tecido visível, dobras suaves e fixação realista no topo da janela.
- Não altere nada além das janelas. Não adicione texto, marca d'água, bordas ou logotipos.
- Resultado em alta qualidade, parecendo uma fotografia real do ambiente já com a persiana instalada.`;

    let resp: Response;
    try {
      resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: data.imageDataUrl } },
              ],
            },
          ],
          modalities: ["image", "text"],
        }),
      });
    } catch (e) {
      console.error("[simulate-room] network", e);
      return { error: "Falha de rede ao contatar a IA.", code: "network" as const };
    }

    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      console.error("[simulate-room] gateway", resp.status, txt.slice(0, 300));
      if (resp.status === 429) return { error: "Muitas simulações em pouco tempo. Aguarde alguns segundos.", code: "rate_limited" as const };
      if (resp.status === 402) return { error: "Créditos de IA esgotados. Adicione créditos em Settings → Cloud & AI balance.", code: "credits_exhausted" as const };
      return { error: "Falha ao gerar simulação. Tente novamente.", code: "ai_error" as const };
    }

    const body = (await resp.json().catch(() => null)) as
      | { choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } }> } }> }
      | null;
    const url = body?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!url) {
      console.error("[simulate-room] sem imagem", JSON.stringify(body).slice(0, 300));
      return { error: "A IA não retornou imagem. Tente outra foto.", code: "no_image" as const };
    }
    return { imageUrl: url };
  });