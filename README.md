# Electron-Vite-Vue3 Enterprise Template

企业级 Electron + Vue3 + Vite 桌面应用模板，具备完整的工程化体系和自动更新能力。

## 特性

- ⚡ 基于 Vite 5 的快速开发体验
- 🎨 Vue 3 + Composition API + TypeScript
- 📦 Pinia 状态管理
- 🎭 TailwindCSS + HeadlessUI
- 🔒 安全的 IPC 通信 (contextBridge)
- 💾 SQLite 数据持久化
- 📝 electron-log 日志系统
- 🔄 GitHub 自动更新
- ✅ 完整的工程化配置 (ESLint, Prettier, Husky, Vitest)
- 🚀 CI/CD 自动化 (GitHub Actions)

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 运行测试
npm run test

# 代码检查
npm run lint
```

## 项目结构

```
src/
├── main/           # Electron 主进程
│   ├── index.ts    # 入口
│   ├── preload.ts  # 预加载脚本
│   ├── updater/    # 自动更新
│   ├── services/    # 服务
│   └── ipc/        # IPC 通道
├── renderer/        # Vue 渲染进程
│   ├── App.vue
│   ├── main.ts
│   ├── components/  # 组件
│   ├── views/      # 页面
│   ├── stores/     # Pinia stores
│   └── i18n/       # 国际化
└── shared/          # 共享类型和常量
```

## 自动更新

项目使用 `electron-updater` 实现 GitHub Releases 自动更新。

1. 创建 GitHub Personal Access Token
2. 在 `electron-builder.json5` 中配置 `publish` 的 `owner` 和 `repo`
3. 推送 tag 触发发布:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 构建

```bash
# Windows
npm run dist:win

# macOS
npm run dist:mac

# Linux
npm run dist:linux
```

## License

MIT
