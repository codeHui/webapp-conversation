const translation = {
  common: {
    welcome: 'Bienvenue sur l\'application',
    appUnavailable: 'L\'application n\'est pas disponible',
    appUnkonwError: 'L\'application n\'est pas disponible',
  },
  chat: {
    newChat: 'Nouvelle conversation',
    newChatDefaultName: 'Nouvelle conversation',
    openingStatementTitle: 'Phrase d\'ouverture',
    powerBy: 'Propulsé par',
    prompt: 'Prompt',
    privatePromptConfigTitle: 'Param tres de la conversation',
    publicPromptConfigTitle: 'Prompt initial',
    configStatusDes: 'Avant de commencer, vous pouvez modifier les paramètres de la conversation',
    agents: 'Agents',
    showAgents: 'Afficher le panneau des agents',
    hideAgents: 'Masquer le panneau des agents',
    configDisabled:
      'Les paramètres de la session précédente ont été utilisés pour cette session.',
    startChat: 'Démarrer la conversation',
    privacyPolicyLeft:
      'Veuillez lire la ',
    privacyPolicyMiddle:
      'politique de confidentialité ',
    privacyPolicyRight:
      ' fournie par le développeur de l\'application.',
  },
  auth: {
    logout: 'Se déconnecter',
    noAuthorizedAgents: 'Aucun agent autorisé n’est disponible pour ce compte.',
    loginRequired: 'Le nom d’utilisateur et le mot de passe sont requis.',
    loginFailed: 'Connexion impossible. Vérifiez le compte dans rbac.json.',
    secureGateway: 'Passerelle sécurisée',
    signInTitle: 'Se connecter à la passerelle Dify',
    signInDescription: 'L’authentification est validée localement avec JWT et RBAC avant tout transfert vers Dify.',
    demoAccount: 'Compte',
    adminAccess: 'Accès à Agent 1 et Agent 2.',
    userAccess: 'Accès à Agent 1 uniquement.',
    welcomeBack: 'Bon retour',
    signIn: 'Se connecter',
    passwordHint: 'Les comptes sont gérés dans rbac.json. Le mot de passe par défaut est 123456.',
    username: 'Nom d’utilisateur',
    usernamePlaceholder: 'Saisissez le nom du compte',
    password: 'Mot de passe',
    signingIn: 'Connexion en cours...',
  },
  errorMessage: {
    valueOfVarRequired: 'La valeur des variables ne peut pas être vide',
    waitForResponse:
      'Veuillez attendre que la réponse au message précédent soit terminée.',
    waitForFileUpload:
      'Veuillez attendre la fin du téléversement de tous les fichiers avant l’envoi.',
  },
  variableTable: {
    optional: 'Facultatif',
  },
}

export default translation
