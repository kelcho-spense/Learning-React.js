/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as ZustandCounterRouteImport } from './routes/zustand-counter'
import { Route as TanstackStoreRouteImport } from './routes/tanstack-store'
import { Route as TanstackCounterRouteImport } from './routes/tanstack-counter'
import { Route as IndexRouteImport } from './routes/index'

const ZustandCounterRoute = ZustandCounterRouteImport.update({
  id: '/zustand-counter',
  path: '/zustand-counter',
  getParentRoute: () => rootRouteImport,
} as any)
const TanstackStoreRoute = TanstackStoreRouteImport.update({
  id: '/tanstack-store',
  path: '/tanstack-store',
  getParentRoute: () => rootRouteImport,
} as any)
const TanstackCounterRoute = TanstackCounterRouteImport.update({
  id: '/tanstack-counter',
  path: '/tanstack-counter',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/tanstack-counter': typeof TanstackCounterRoute
  '/tanstack-store': typeof TanstackStoreRoute
  '/zustand-counter': typeof ZustandCounterRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/tanstack-counter': typeof TanstackCounterRoute
  '/tanstack-store': typeof TanstackStoreRoute
  '/zustand-counter': typeof ZustandCounterRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/tanstack-counter': typeof TanstackCounterRoute
  '/tanstack-store': typeof TanstackStoreRoute
  '/zustand-counter': typeof ZustandCounterRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/tanstack-counter' | '/tanstack-store' | '/zustand-counter'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/tanstack-counter' | '/tanstack-store' | '/zustand-counter'
  id:
    | '__root__'
    | '/'
    | '/tanstack-counter'
    | '/tanstack-store'
    | '/zustand-counter'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TanstackCounterRoute: typeof TanstackCounterRoute
  TanstackStoreRoute: typeof TanstackStoreRoute
  ZustandCounterRoute: typeof ZustandCounterRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/zustand-counter': {
      id: '/zustand-counter'
      path: '/zustand-counter'
      fullPath: '/zustand-counter'
      preLoaderRoute: typeof ZustandCounterRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/tanstack-store': {
      id: '/tanstack-store'
      path: '/tanstack-store'
      fullPath: '/tanstack-store'
      preLoaderRoute: typeof TanstackStoreRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/tanstack-counter': {
      id: '/tanstack-counter'
      path: '/tanstack-counter'
      fullPath: '/tanstack-counter'
      preLoaderRoute: typeof TanstackCounterRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TanstackCounterRoute: TanstackCounterRoute,
  TanstackStoreRoute: TanstackStoreRoute,
  ZustandCounterRoute: ZustandCounterRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
