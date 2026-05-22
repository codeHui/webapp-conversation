const translation = {
  common: {
    welcome: 'Bienvenido a usar',
    appUnavailable: 'App es inaccesible',
    appUnkonwError: 'App es inaccesible',
  },
  chat: {
    newChat: 'Nuevo chat',
    newChatDefaultName: 'Nueva conversación',
    openingStatementTitle: 'Frase de apertura',
    powerBy: 'Desarrollado por',
    prompt: 'Prompt',
    privatePromptConfigTitle: 'Ajustes de conversación',
    publicPromptConfigTitle: 'Prompt inicial',
    configStatusDes: 'Antes de comenzar, puede modificar la configuración de la conversación',
    agents: 'Agentes',
    showAgents: 'Mostrar panel de agentes',
    hideAgents: 'Ocultar panel de agentes',
    configDisabled:
      'La configuración de la sesión anterior se ha utilizado para esta sesión.',
    startChat: 'Comenzar chat',
    privacyPolicyLeft:
      'Por favor lea la ',
    privacyPolicyMiddle:
      'política de privacidad',
    privacyPolicyRight:
      ' proporcionada por el desarrollador de la aplicación.',
  },
  auth: {
    logout: 'Cerrar sesión',
    noAuthorizedAgents: 'No hay agentes autorizados para esta cuenta.',
    loginRequired: 'El nombre de usuario y la contraseña son obligatorios.',
    loginFailed: 'No se pudo iniciar sesión. Verifique la cuenta en rbac.json.',
    secureGateway: 'Puerta de enlace segura',
    signInTitle: 'Iniciar sesión en la puerta de enlace de Dify',
    signInDescription: 'La autenticación se valida localmente con JWT y RBAC antes de reenviar cualquier solicitud a Dify.',
    demoAccount: 'Cuenta',
    adminAccess: 'Acceso a Agent 1 y Agent 2.',
    userAccess: 'Acceso solo a Agent 1.',
    welcomeBack: 'Bienvenido de nuevo',
    signIn: 'Iniciar sesión',
    passwordHint: 'Las cuentas se administran en rbac.json. La contraseña predeterminada es 123456.',
    username: 'Usuario',
    usernamePlaceholder: 'Ingrese el nombre de la cuenta',
    password: 'Contraseña',
    signingIn: 'Iniciando sesión...',
  },
  errorMessage: {
    valueOfVarRequired: 'El valor de las variables no puede estar vacío',
    waitForResponse:
      'Por favor espere a que la respuesta al mensaje anterior se complete.',
    waitForFileUpload:
      'Espere a que todos los archivos terminen de cargarse antes de enviar.',
  },
}

export default translation
