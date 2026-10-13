export interface Stat {
  num: string;
  label: string;
}

export interface Review {
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Step {
  title: string;
  desc: string;
  bg: string;
}

export interface Service {
  title: string;
  desc: string;
  details: string;
}

export interface LangDict {
  docTitle: string;
  logo: string;
  contactBtn: string;
  nav1: string;
  nav2: string;
  nav3: string;
  nav4: string;
  nav5: string;
  nav6: string;
  cta: string;
  heroTitles: string[];
  heroImages: string[];
  marqueeItems: string[];
  services: Service[];
  steps: Step[];
  case1t: string;
  case1d: string;
  case2t: string;
  case2d: string;
  case3t: string;
  case3d: string;
  statsTitle: string;
  stats: Stat[];
  reviews: Review[];
  faqs: Faq[];
  contact_title: string;
  contact_text: string;
  ph1: string;
  ph2: string;
  ph3: string;
  send: string;
  fillWarn: string;
  success: string;
  footer: string;
}

const B = import.meta.env.BASE_URL;

export const langDict: Record<string, LangDict> = {
  ru: {
    docTitle: "кодИИм — сайты, магазины и ИИ-решения",
    logo: "кодИИм",
    contactBtn: "Связь",
    nav1: "что делаем?",
    nav2: "как работаем?",
    nav3: "кейсы",
    nav4: "контакты",
    nav5: "FAQ",
    nav6: "отзывы",
    cta: "Обсудить проект",
    heroTitles: [
      "сайты и магазины",
      "ИИ-агенты и автоматизация",
      "CRM и аналитика"
    ],
    heroImages: [
      `${B}images/hero-1.webp`,
      `${B}images/hero-2.webp`,
      `${B}images/hero-3.webp`
    ],
    marqueeItems: [
      "разработка сайтов",
      "интернет-магазины",
      "ИИ-решения",
      "CRM-интеграции",
      "автоматизация",
      "аналитика"
    ],
    services: [
      {
        title: "Лендинги",
        desc: "Лендинги",
        details: "Быстрые страницы с высокой конверсией для рекламы и запуска продукта."
      },
      {
        title: "Интернет-магазины",
        desc: "E-commerce",
        details: "Каталог, корзина, оплата и доставка — продажи работают онлайн."
      },
      {
        title: "CRM и аналитика",
        desc: "CRM",
        details: "Связываем сайт с вашей CRM: заявки, сделки и отчёты в одном окне."
      },
      {
        title: "Поддержка и рост",
        desc: "Поддержка",
        details: "Скорость, SEO, A/B-тесты и обновления после запуска."
      }
    ],
    steps: [
      {
        title: "Бриф",
        desc: "Обсуждаем задачу, цели и сроки. Фиксируем объём работ.",
        bg: `${B}images/step-1.webp`
      },
      {
        title: "Прототип",
        desc: "Структура, смыслы и сценарии пользователя до дизайна.",
        bg: `${B}images/step-2.webp`
      },
      {
        title: "Дизайн и сборка",
        desc: "Макет, вёрстка, подключение CRM и тесты на реальных данных.",
        bg: `${B}images/step-3.webp`
      },
      {
        title: "Запуск",
        desc: "Публикуем, обучаем команду и сопровождаем проект.",
        bg: `${B}images/step-4.webp`
      }
    ],
    case1t: "Магазин косметики",
    case1d: "+38% к конверсии после переезда на новую платформу и CRM.",
    case2t: "Производство оборудования",
    case2d: "Заявки попадают в CRM за 1 день: сквозная аналитика без таблиц.",
    case3t: "Онлайн-школа",
    case3d: "Запуск сайта за 12 дней и рост заявок в 2 раза.",
    statsTitle: "в цифрах",
    stats: [
      { num: "120+", label: "проектов запущено" },
      { num: "98%", label: "клиентов остаются" },
      { num: "14", label: "дней — средний срок" },
      { num: "24/7", label: "поддержка после запуска" }
    ],
    reviews: [
      {
        name: "Анна Соколова",
        role: "CEO, Beauty Lab",
        text: "Переехали на новый сайт и CRM за 3 недели. Конверсия выросла на 38%, менеджеры наконец видят все заявки в одном месте.",
        avatar: `${B}images/avatar-1.webp`
      },
      {
        name: "Дмитрий Орлов",
        role: "Директор, ТехноПром",
        text: "Команда кодИИм сделала нам сайт с интеграцией в 1С и Bitrix24. Всё работает как часы, заявки не теряются.",
        avatar: `${B}images/avatar-2.webp`
      },
      {
        name: "Мария Чен",
        role: "Основатель, SkillUp",
        text: "За 12 дней получили готовый сайт онлайн-школы с воронкой и CRM. Заявки удвоились в первый месяц.",
        avatar: `${B}images/avatar-3.webp`
      },
      {
        name: "Игорь Белов",
        role: "CMO, FoodMarket",
        text: "ИИ-агент для обработки заказов сэкономил нам 40 часов в неделю. Окупился за месяц."
      }
    ],
    faqs: [
      {
        q: "Сколько стоит сайт?",
        a: "Лендинг — от 80 000 ₽, интернет-магазин — от 250 000 ₽, кастомный проект с CRM и ИИ — по брифу. Точную смету даём после обсуждения задачи."
      },
      {
        q: "Сколько времени занимает разработка?",
        a: "Лендинг — 7–14 дней, магазин — 3–6 недель, сложный проект — от 2 месяцев. Сроки фиксируем в договоре."
      },
      {
        q: "Какую CRM вы интегрируете?",
        a: "Работаем с Bitrix24, amoCRM, HubSpot, МойСклад, 1С и любыми кастомными системами. Если CRM ещё нет — поможем выбрать."
      },
      {
        q: "Что входит в поддержку после запуска?",
        a: "Мониторинг, обновления, мелкие доработки, A/B-тесты, SEO-оптимизация и консультации. Пакеты — от 15 000 ₽/мес."
      },
      {
        q: "Делаете ли вы ИИ-агентов?",
        a: "Да. Разрабатываем чат-ботов, агентов для обработки заявок, голосовых помощников и автоматизаций на базе GPT, Claude и open-source моделей."
      },
      {
        q: "Можно ли посмотреть примеры работ?",
        a: "Конечно! Раздел «кейсы» выше, а по запросу пришлём подробные кейсы с цифрами и ссылками на живые проекты."
      }
    ],
    contact_title: "обсудим ваш проект?",
    contact_text: "Оставьте контакты — вернёмся с планом и сметой в течение дня.",
    ph1: "имя",
    ph2: "email или telegram",
    ph3: "пара слов о задаче",
    send: "Отправить заявку",
    fillWarn: "Заполните имя и контакт",
    success: "Заявка отправлена! Свяжемся с вами в ближайшее время.",
    footer: "© 2026 кодИИм · сайты, магазины и ИИ-решения"
  },
  zh: {
    docTitle: "кодИИм — 网站、商店和AI解决方案",
    logo: "代码AI",
    contactBtn: "联系",
    nav1: "我们做什么？",
    nav2: "我们如何工作？",
    nav3: "案例",
    nav4: "联系方式",
    nav5: "常见问题",
    nav6: "评价",
    cta: "讨论项目",
    heroTitles: [
      "网站和商店",
      "AI代理和自动化",
      "CRM和分析"
    ],
    heroImages: [
      `${B}images/hero-1.webp`,
      `${B}images/hero-2.webp`,
      `${B}images/hero-3.webp`
    ],
    marqueeItems: [
      "网站开发",
      "网上商店",
      "AI解决方案",
      "CRM集成",
      "自动化",
      "分析"
    ],
    services: [
      {
        title: "落地页",
        desc: "落地页",
        details: "快速、高转化的页面，用于广告和产品发布。"
      },
      {
        title: "网上商店",
        desc: "电子商务",
        details: "目录、购物车、支付和配送 - 在线销售。"
      },
      {
        title: "CRM和分析",
        desc: "客户关系管理",
        details: "我们将您的网站连接到CRM：线索、交易和报告在一个窗口中。"
      },
      {
        title: "支持和增长",
        desc: "支持",
        details: "速度、SEO、A/B测试和启动后的更新。"
      }
    ],
    steps: [
      {
        title: "简报",
        desc: "我们讨论任务、目标和截止日期。我们确定工作范围。",
        bg: `${B}images/step-1.webp`
      },
      {
        title: "原型",
        desc: "设计前的结构、含义和用户场景。",
        bg: `${B}images/step-2.webp`
      },
      {
        title: "设计和构建",
        desc: "布局、标记、CRM连接和真实数据测试。",
        bg: `${B}images/step-3.webp`
      },
      {
        title: "启动",
        desc: "我们发布、培训团队并陪伴项目。",
        bg: `${B}images/step-4.webp`
      }
    ],
    case1t: "化妆品商店",
    case1d: "迁移到新平台和CRM后转化率提高38%。",
    case2t: "设备制造",
    case2d: "申请在1天内到达CRM：无需表格的端到端分析。",
    case3t: "在线学校",
    case3d: "12天内网站启动，申请增长2倍。",
    statsTitle: "数字",
    stats: [
      { num: "120+", label: "已启动项目" },
      { num: "98%", label: "客户保留" },
      { num: "14", label: "天 - 平均期限" },
      { num: "24/7", label: "启动后支持" }
    ],
    reviews: [
      {
        name: "Anna Sokolova",
        role: "CEO, Beauty Lab",
        text: "我们在3周内迁移到新网站和CRM。转化率提高了38%，经理们终于可以在一个地方看到所有申请。",
        avatar: `${B}images/avatar-1.webp`
      },
      {
        name: "Dmitry Orlov",
        role: "Director, TekhnoProm",
        text: "kodIIm团队为我们制作了一个集成到1C和Bitrix24的网站。一切运行良好，申请不会丢失。",
        avatar: `${B}images/avatar-2.webp`
      },
      {
        name: "Maria Chen",
        role: "Founder, SkillUp",
        text: "在12天内，我们收到了一个带有漏斗和CRM的在线学校网站。第一个月申请翻了一番。",
        avatar: `${B}images/avatar-3.webp`
      },
      {
        name: "Igor Belov",
        role: "CMO, FoodMarket",
        text: "用于处理订单的AI代理每周为我们节省40小时。它在一个月内收回了成本。"
      }
    ],
    faqs: [
      {
        q: "网站多少钱？",
        a: "落地页 - 从80,000₽起，网上商店 - 从250,000₽起，带有CRM和AI的定制项目 - 根据简报。在讨论任务后，我们会给出准确的估计。"
      },
      {
        q: "开发需要多长时间？",
        a: "落地页 - 7-14天，商店 - 3-6周，复杂项目 - 从2个月起。我们在合同中确定截止日期。"
      },
      {
        q: "您集成哪个CRM？",
        a: "我们使用Bitrix24、amoCRM、HubSpot、MoySklad、1C和任何定制系统。如果您还没有CRM - 我们将帮助您选择。"
      },
      {
        q: "启动后支持包括什么？",
        a: "监控、更新、小改进、A/B测试、SEO优化和咨询。套餐 - 从15,000₽/月起。"
      },
      {
        q: "您制作AI代理吗？",
        a: "是的。我们开发聊天机器人、处理申请的代理、语音助手和基于GPT、Claude和开源模型的自动化。"
      },
      {
        q: "我可以看工作示例吗？",
        a: "当然！«案例»部分在上面，根据请求，我们将发送详细的案例，包括数字和指向实时项目的链接。"
      }
    ],
    contact_title: "让我们讨论您的项目？",
    contact_text: "留下您的联系方式 - 我们将在一天内回复计划和估计。",
    ph1: "姓名",
    ph2: "电子邮件或telegram",
    ph3: "关于任务的几句话",
    send: "发送请求",
    fillWarn: "填写姓名和联系方式",
    success: "请求已发送！我们将尽快与您联系。",
    footer: "© 2026 кодИИм · 网站、商店和AI解决方案"
  }
};
