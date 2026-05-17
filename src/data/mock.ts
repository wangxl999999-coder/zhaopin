import type { Job, Company, Resume, ChatSession, MapRegion } from '@/types'

export const mockJobs: Job[] = [
  {
    id: 1,
    title: '高级前端开发工程师',
    company: '字节跳动',
    companyId: 1,
    salary: '25K-40K',
    salaryMin: 25000,
    salaryMax: 40000,
    experience: '3-5年',
    education: '本科',
    location: '北京',
    industry: '互联网',
    description: '负责公司核心产品的前端开发，参与技术架构设计和优化，提升用户体验。',
    benefits: ['六险一金', '年终奖金', '免费三餐', '健身房'],
    tags: ['Vue3', 'TypeScript', 'Node.js'],
    publishTime: '2024-01-15',
    isHot: true,
    isNew: true,
    lat: 39.9042,
    lng: 116.4074
  },
  {
    id: 2,
    title: 'Java后端开发工程师',
    company: '阿里巴巴',
    companyId: 2,
    salary: '30K-50K',
    salaryMin: 30000,
    salaryMax: 50000,
    experience: '5-10年',
    education: '本科',
    location: '杭州',
    industry: '电商',
    description: '负责电商平台后端系统开发，参与高并发系统设计和优化。',
    benefits: ['股票期权', '带薪年假', '年度体检', '节日福利'],
    tags: ['Java', 'Spring', 'MySQL', 'Redis'],
    publishTime: '2024-01-14',
    isHot: true,
    isNew: false,
    lat: 30.2741,
    lng: 120.1551
  },
  {
    id: 3,
    title: '产品经理',
    company: '腾讯',
    companyId: 3,
    salary: '20K-35K',
    salaryMin: 20000,
    salaryMax: 35000,
    experience: '3-5年',
    education: '本科',
    location: '深圳',
    industry: '互联网',
    description: '负责社交产品的规划和设计，协调开发团队完成产品落地。',
    benefits: ['年终奖', '免费班车', '员工宿舍', '带薪年假'],
    tags: ['产品设计', '用户研究', '数据分析'],
    publishTime: '2024-01-13',
    isHot: false,
    isNew: true,
    lat: 22.5431,
    lng: 114.0579
  },
  {
    id: 4,
    title: 'UI设计师',
    company: '美团',
    companyId: 4,
    salary: '15K-25K',
    salaryMin: 15000,
    salaryMax: 25000,
    experience: '1-3年',
    education: '本科',
    location: '北京',
    industry: 'O2O',
    description: '负责移动端和Web端的界面设计，提升产品视觉体验。',
    benefits: ['弹性工作', '下午茶', '年度旅游', '节日礼品'],
    tags: ['Figma', 'Sketch', '动效设计'],
    publishTime: '2024-01-12',
    isHot: true,
    isNew: false,
    lat: 39.9142,
    lng: 116.4174
  },
  {
    id: 5,
    title: '数据分析师',
    company: '百度',
    companyId: 5,
    salary: '18K-30K',
    salaryMin: 18000,
    salaryMax: 30000,
    experience: '2-4年',
    education: '硕士',
    location: '北京',
    industry: '搜索引擎',
    description: '负责业务数据分析，输出数据报告，支持业务决策。',
    benefits: ['股票期权', '技术培训', '弹性工作', '免费午餐'],
    tags: ['Python', 'SQL', '数据可视化'],
    publishTime: '2024-01-11',
    isHot: false,
    isNew: true,
    lat: 39.9242,
    lng: 116.4274
  },
  {
    id: 6,
    title: 'iOS开发工程师',
    company: '网易',
    companyId: 6,
    salary: '22K-38K',
    salaryMin: 22000,
    salaryMax: 38000,
    experience: '3-5年',
    education: '本科',
    location: '杭州',
    industry: '游戏',
    description: '负责iOS平台游戏应用开发，优化性能和用户体验。',
    benefits: ['游戏福利', '年终奖金', '年度体检', '健身房'],
    tags: ['Swift', 'Objective-C', 'iOS SDK'],
    publishTime: '2024-01-10',
    isHot: true,
    isNew: false,
    lat: 30.2841,
    lng: 120.1651
  },
  {
    id: 7,
    title: '测试开发工程师',
    company: '京东',
    companyId: 7,
    salary: '18K-30K',
    salaryMin: 18000,
    salaryMax: 30000,
    experience: '2-4年',
    education: '本科',
    location: '北京',
    industry: '电商',
    description: '负责测试框架开发和自动化测试，保障产品质量。',
    benefits: ['员工折扣', '带薪年假', '节日福利', '年度体检'],
    tags: ['Python', '自动化测试', '性能测试'],
    publishTime: '2024-01-09',
    isHot: false,
    isNew: true,
    lat: 39.9342,
    lng: 116.4374
  },
  {
    id: 8,
    title: '运维工程师',
    company: '小米',
    companyId: 8,
    salary: '15K-25K',
    salaryMin: 15000,
    salaryMax: 25000,
    experience: '1-3年',
    education: '本科',
    location: '北京',
    industry: '硬件',
    description: '负责服务器运维和监控，保障系统稳定运行。',
    benefits: ['员工折扣', '年终奖', '免费班车', '带薪年假'],
    tags: ['Linux', 'Docker', 'K8s'],
    publishTime: '2024-01-08',
    isHot: false,
    isNew: false,
    lat: 39.9442,
    lng: 116.4474
  }
]

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: '字节跳动',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20company%20logo%20modern%20blue&image_size=square',
    industry: '互联网',
    type: '民营公司',
    scale: '10000人以上',
    location: '北京',
    description: '字节跳动是一家全球化的互联网科技公司，旗下拥有抖音、今日头条、TikTok等多款知名产品。公司致力于通过技术创新连接全球信息，创造价值。',
    benefits: ['六险一金', '年终奖金', '免费三餐', '健身房', '弹性工作'],
    website: 'https://bytedance.com',
    lat: 39.9042,
    lng: 116.4074
  },
  {
    id: 2,
    name: '阿里巴巴',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ecommerce%20company%20logo%20orange&image_size=square',
    industry: '电商',
    type: '民营公司',
    scale: '10000人以上',
    location: '杭州',
    description: '阿里巴巴集团是全球领先的电子商务公司，业务涵盖电商、云计算、数字媒体等多个领域。',
    benefits: ['股票期权', '带薪年假', '年度体检', '节日福利'],
    website: 'https://alibaba.com',
    lat: 30.2741,
    lng: 120.1551
  },
  {
    id: 3,
    name: '腾讯',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20company%20logo%20green&image_size=square',
    industry: '互联网',
    type: '民营公司',
    scale: '10000人以上',
    location: '深圳',
    description: '腾讯是中国领先的互联网公司，拥有微信、QQ等社交平台和多款知名游戏产品。',
    benefits: ['年终奖', '免费班车', '员工宿舍', '带薪年假'],
    website: 'https://tencent.com',
    lat: 22.5431,
    lng: 114.0579
  },
  {
    id: 4,
    name: '美团',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=food%20delivery%20company%20logo%20yellow&image_size=square',
    industry: 'O2O',
    type: '民营公司',
    scale: '10000人以上',
    location: '北京',
    description: '美团是中国领先的生活服务电子商务平台，提供外卖、到店、酒店旅游等服务。',
    benefits: ['弹性工作', '下午茶', '年度旅游', '节日礼品'],
    website: 'https://meituan.com',
    lat: 39.9142,
    lng: 116.4174
  },
  {
    id: 5,
    name: '百度',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=search%20engine%20company%20logo%20blue%20paw&image_size=square',
    industry: '搜索引擎',
    type: '民营公司',
    scale: '10000人以上',
    location: '北京',
    description: '百度是全球最大的中文搜索引擎和人工智能公司，致力于用科技让复杂的世界更简单。',
    benefits: ['股票期权', '技术培训', '弹性工作', '免费午餐'],
    website: 'https://baidu.com',
    lat: 39.9242,
    lng: 116.4274
  },
  {
    id: 6,
    name: '网易',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20company%20logo%20red&image_size=square',
    industry: '游戏',
    type: '民营公司',
    scale: '5000-10000人',
    location: '杭州',
    description: '网易是中国领先的互联网技术公司，在游戏、教育、音乐、电商等多个领域拥有领先地位。',
    benefits: ['游戏福利', '年终奖金', '年度体检', '健身房'],
    website: 'https://netease.com',
    lat: 30.2841,
    lng: 120.1651
  },
  {
    id: 7,
    name: '京东',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=retail%20company%20logo%20red%20dog&image_size=square',
    industry: '电商',
    type: '民营公司',
    scale: '10000人以上',
    location: '北京',
    description: '京东是中国最大的自营式电商企业，业务涵盖零售、物流、科技等多个领域。',
    benefits: ['员工折扣', '带薪年假', '节日福利', '年度体检'],
    website: 'https://jd.com',
    lat: 39.9342,
    lng: 116.4374
  },
  {
    id: 8,
    name: '小米',
    logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smartphone%20company%20logo%20orange&image_size=square',
    industry: '硬件',
    type: '民营公司',
    scale: '10000人以上',
    location: '北京',
    description: '小米是一家以手机、智能硬件和IoT平台为核心的消费电子及智能制造公司。',
    benefits: ['员工折扣', '年终奖', '免费班车', '带薪年假'],
    website: 'https://mi.com',
    lat: 39.9442,
    lng: 116.4474
  }
]

export const mockResume: Resume = {
  id: 1,
  name: '张三',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20avatar&image_size=square',
  education: [
    {
      id: 1,
      school: '北京大学',
      major: '计算机科学与技术',
      degree: '本科',
      startDate: '2016-09',
      endDate: '2020-06'
    }
  ],
  experience: [
    {
      id: 1,
      company: '字节跳动',
      position: '前端开发工程师',
      startDate: '2020-07',
      endDate: '至今',
      description: '负责公司核心产品的前端开发，参与技术架构设计和优化。'
    }
  ],
  skills: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'CSS3'],
  introduction: '5年前端开发经验，熟悉主流前端框架，有大型项目开发经验。',
  expectedSalary: '25K-35K',
  expectedPosition: '高级前端开发工程师',
  expectedCity: '北京'
}

export const mockChatSessions: ChatSession[] = [
  {
    id: 1,
    userId: 1,
    userName: '字节跳动HR',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=HR%20avatar%20professional&image_size=square',
    lastMessage: '您好，请问您方便什么时候面试？',
    lastTime: '10:30',
    unreadCount: 2
  },
  {
    id: 2,
    userId: 2,
    userName: '阿里巴巴HR',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=HR%20avatar%20female%20professional&image_size=square',
    lastMessage: '您的简历已经通过初筛',
    lastTime: '昨天',
    unreadCount: 0
  },
  {
    id: 3,
    userId: 3,
    userName: '腾讯HR',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=HR%20avatar%20male%20professional&image_size=square',
    lastMessage: '期待您的加入！',
    lastTime: '前天',
    unreadCount: 0
  }
]

export const mockMapRegions: MapRegion[] = [
  { name: '北京', companyCount: 5, lat: 39.9042, lng: 116.4074, zoom: 12 },
  { name: '上海', companyCount: 8, lat: 31.2304, lng: 121.4737, zoom: 12 },
  { name: '杭州', companyCount: 4, lat: 30.2741, lng: 120.1551, zoom: 12 },
  { name: '深圳', companyCount: 6, lat: 22.5431, lng: 114.0579, zoom: 12 },
  { name: '广州', companyCount: 3, lat: 23.1291, lng: 113.2644, zoom: 12 }
]

export const jobCategories = [
  {
    name: '技术',
    children: [
      { name: '前端开发', children: ['Vue开发', 'React开发', 'Angular开发', '移动端H5'] },
      { name: '后端开发', children: ['Java开发', 'Python开发', 'Go开发', 'Node.js开发'] },
      { name: '移动开发', children: ['iOS开发', 'Android开发', 'Flutter开发', 'React Native'] },
      { name: '测试', children: ['测试开发', '功能测试', '自动化测试', '性能测试'] }
    ]
  },
  {
    name: '产品',
    children: [
      { name: '产品经理', children: ['C端产品', 'B端产品', '数据产品', 'AI产品'] },
      { name: '产品设计', children: ['交互设计', 'UI设计', '视觉设计', '用户研究'] }
    ]
  },
  {
    name: '运营',
    children: [
      { name: '内容运营', children: ['文案策划', '内容编辑', '新媒体运营'] },
      { name: '用户运营', children: ['用户增长', '社群运营', '会员运营'] }
    ]
  },
  {
    name: '市场',
    children: [
      { name: '市场营销', children: ['品牌营销', '数字营销', '活动策划'] },
      { name: '销售', children: ['客户经理', '销售代表', '渠道销售'] }
    ]
  }
]

export const salaryRanges = ['10K以下', '10K-20K', '20K-30K', '30K-50K', '50K以上']
export const experienceLevels = ['应届生', '1年以内', '1-3年', '3-5年', '5-10年', '10年以上']
export const educationLevels = ['大专', '本科', '硕士', '博士']
export const industries = ['互联网', '电商', '金融', '教育', '医疗', '游戏', 'O2O', '硬件', '人工智能']
export const companyTypes = ['民营公司', '上市公司', '国企', '外资', '创业公司']
export const companyScales = ['少于50人', '50-150人', '150-500人', '500-1000人', '1000-5000人', '5000-10000人', '10000人以上']
export const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '苏州']
