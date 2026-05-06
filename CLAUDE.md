# CLAUDE.md

This file provides guidance to AI coding assistants when working with code in this repository.

## 项目概述

这是一个基于 Electron + Vue3 + Vite 的企业级桌面应用模板。

## 技术栈

- Electron (主进程)
- Vue 3 + Composition API (渲染进程)
- Vite 5 (构建工具)
- Pinia (状态管理)
- TailwindCSS (样式)
- better-sqlite3 (数据持久化)
- electron-updater (自动更新)

## 开发命令

```bash
npm run dev      # 开发模式
npm run build    # 生产构建
npm run test     # 运行测试
npm run lint     # 代码检查
```

## 架构说明

- 主进程 (`src/main/`): 处理窗口管理、IPC、系统集成
- 渲染进程 (`src/renderer/`): Vue 应用 UI
- 共享代码 (`src/shared/`): IPC 通道常量等

## IPC 通信

所有主进程和渲染进程的通信通过 `contextBridge` 和 IPC 实现。通道定义在 `src/shared/constants/ipcChannels.ts`。

## 自动更新流程

1. 启动时检查更新
2. 有更新时后台下载
3. 下载完成后提示用户安装
4. 用户确认后安装并重启
