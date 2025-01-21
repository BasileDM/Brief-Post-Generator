export default function createPrompt(inputValues: Record<string, string>): string {
    let prompt: string = "Génère un titre et un slogan pour un post de réseaux sociaux basé sur les informations suivantes : ";

    Object.entries(inputValues).forEach(([key, value]) => {
        switch (key) {
            case "Occasion":
                prompt += `**Occasion :** à l'occasion de/du ${value} \n`;
                break;
            case "Tonalité": 
                prompt += `**Tonalité :**  avec un ton ${value} \n`;
                break;
            default:
                break;
        }
    })

    prompt += "Le titre doit être court, accrocheur, et refléter l'occasion de manière positive. Le slogan doit être un message attrayant qui met en avant les caractéristiques de la voiture tout en utilisant la tonalité spécifiée. Le ton du slogan doit être adapté à la tonalité indiquée, et il doit inciter à l'action.";

    prompt += "Retourne la réponse en JSON sans formatage markDown avec l'attribut Slogan et l'attribut Titre";

    return prompt;
}