const translation = {
  common: {
    welcome: 'ご利用いただきありがとうございます',
    appUnavailable: 'アプリは利用できません',
    appUnkonwError: 'アプリは利用できません',
  },
  chat: {
    newChat: '新しいチャット',
    newChatDefaultName: '新しい会話',
    openingStatementTitle: 'オープニングステートメント',
    powerBy: '提供元',
    prompt: 'プロンプト',
    privatePromptConfigTitle: '会話設定',
    publicPromptConfigTitle: '初期プロンプト',
    configStatusDes: '開始前に、会話設定を変更できます',
    agents: 'エージェント',
    showAgents: 'エージェントパネルを表示',
    hideAgents: 'エージェントパネルを隠す',
    configDisabled:
      '前回のセッション設定がこのセッションで使用されています。',
    startChat: '開始',
    privacyPolicyLeft:
      'ご利用前に、',
    privacyPolicyMiddle:
      'プライバシーポリシー',
    privacyPolicyRight:
      ' をお読みください。',
  },
  auth: {
    logout: 'ログアウト',
    noAuthorizedAgents: 'このアカウントに利用可能なエージェントがありません。',
    loginRequired: 'ユーザー名とパスワードは必須です。',
    loginFailed: 'ログインできませんでした。rbac.json のアカウント設定を確認してください。',
    secureGateway: 'セキュアゲートウェイ',
    signInTitle: 'Dify ゲートウェイにサインイン',
    signInDescription: 'すべてのリクエストは Dify に転送される前に、ローカルの JWT と RBAC で検証されます。',
    demoAccount: 'アカウント',
    adminAccess: 'Agent 1 と Agent 2 にアクセスできます。',
    userAccess: 'Agent 1 のみアクセスできます。',
    welcomeBack: 'お帰りなさい',
    signIn: 'サインイン',
    passwordHint: 'アカウントは rbac.json で管理されます。デフォルトのパスワードは 123456 です。',
    username: 'ユーザー名',
    usernamePlaceholder: 'アカウント名を入力してください',
    password: 'パスワード',
    signingIn: 'サインイン中...',
  },
  errorMessage: {
    valueOfVarRequired: '変数の値は空にできません',
    waitForResponse:
      '前のメッセージの応答が完了するまでお待ちください。',
    waitForFileUpload:
      'すべてのファイルのアップロードが完了してから送信してください。',
  },
  variableTable: {
    optional: '任意',
  },
}

export default translation
