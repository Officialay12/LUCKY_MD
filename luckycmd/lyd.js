const { ezra } = require('../fredi/ezra');

const isIdeaCommandEnabled = true; // Variable pour activer ou désactiver la commande "idea"

ezra({ nomCom: "lydea", categorie: "IA", reaction:"🧜", active: isIdeaCommandEnabled }, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre } = commandeOptions;
  const message = arg.join(' ');

  // Greetings
  const greetings = ["Hello!","wagwan gee", "sup homie", "Hi there!", "Greetings!", "Hey!", "Nice to see you!"];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Introduction
  const introduction = [
   "I am the Shadow Monarch’s Assistant, a powerful entity bound to aid you. Speak your will, and I shall fulfill your requests.",
   "Welcome, Hunter. I am your loyal Assistant, standing ready to support you in battle and knowledge. State your command.",
   "Hmph. I am Assistant, a being forged in the shadows to serve. What task requires my strength?",
   "You’ve summoned me, Assistant, a sovereign of aid. Speak, and I shall answer."
  ];
  const randomIntroduction = introduction[Math.floor(Math.random() * introduction.length)];

  // Project Suggestions
  const projet = [
    "You should start a new project related to your passion!",
    "How about working on a creative project that excites you?",
    "Consider starting a project that aligns with your interests and goals.",
    "Why not embark on a project that challenges and inspires you?"
  ];
  const randomProjet = projet[Math.floor(Math.random() * projet.length)];

  // Suggestions for "presentement"
  const presentement = [
    "Currently, you could learn a new skill or hobby.",
    "Right now, you might explore new books or movies.",
    "At the moment, you could try practicing mindfulness or meditation.",
    "Presently, you could focus on improving your physical fitness."
  ];
  const randomPresentement = presentement[Math.floor(Math.random() * presentement.length)];

  // Custom response for the "idea" command when it is enabled
  const customResponse = `This is a custom response for the 'idea' command when it is enabled.
Réponse générée le ${new Date().toLocaleString()}.`;

  // Check if the "idea" command is enabled
  if (isIdeaCommandEnabled) {
    // Ajouter un délai de 60 secondes pour la réponse
    setTimeout(() => {
      repondre(customResponse);
    }, 60000); // 60 secondes (60000 millisecondes)
  } else {
    // Envoyer une réponse indiquant que la commande est désactivée
    repondre("Désolé, la commande 'idea' est actuellement désactivée.");
    return;
  }

  // Vérifier le contenu du message et générer une réponse en conséquence
  if (message.includes('project')) {
    repondre(` ${randomGreeting} ${randomProjet} ${randomIntroduction}`);
  } else if (message.includes('book')) {
    repondre(` ${randomGreeting} How about writing a book on a topic you're knowledgeable about? ${randomIntroduction}`);
  } else if (message.includes('trip') || message.includes('travel')) {
    repondre(` ${randomGreeting} Plan a trip to a destination you've always wanted to visit! ${randomIntroduction}`);
  } else if (message.includes('presentement')) {
    repondre(` ${randomGreeting} ${randomPresentement} ${randomIntroduction}`);
  } else {
    repondre(` ${randomGreeting} I have an idea for you, but I need more information. Could you provide more details? ${randomIntroduction}`);
  }
});
