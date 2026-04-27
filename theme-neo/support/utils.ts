import { withBase } from 'vitepress'
import { isExternal, sanitizeFileName, treatAsHtml, escapeRegExp } from '../shared/shared'
import { useData } from '../composables/data'

export const inBrowser = typeof document !== 'undefined'

// Re-export for convenience
export { escapeRegExp }

/**
 * Converts a url path to the corresponding js chunk filename.
 */
export function pathToFile(path: string) {
  let pagePath = path.replace(/\.html$/, '')
  pagePath = decodeURIComponent(pagePath)
  pagePath = pagePath.replace(/\/$/, '/index') // /foo/ -> /foo/index
  
  if (inBrowser) {
    const base = (import.meta as any).env.BASE_URL
    pagePath =
      sanitizeFileName(
        pagePath.slice(base.length).replace(/\//g, '_') || 'index'
      ) + '.md'
    
    // @ts-ignore - __VP_HASH_MAP__ is injected by VitePress build
    let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()]
    if (!pageHash) {
      pagePath = pagePath.endsWith('_index.md')
        ? pagePath.slice(0, -9) + '.md'
        : pagePath.slice(0, -3) + '_index.md'
      // @ts-ignore
      pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()]
    }
    if (!pageHash) return null
    pagePath = `${base}${pagePath}.${pageHash}.js`
  } else {
    // ssr build uses much simpler name mapping
    pagePath = `./${sanitizeFileName(
      pagePath.slice(1).replace(/\//g, '_')
    )}.md.js`
  }

  return pagePath
}

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout
  let called = false

  return () => {
    if (timeoutId) clearTimeout(timeoutId)

    if (!called) {
      fn()
      ;(called = true) && setTimeout(() => (called = false), delay)
    } else timeoutId = setTimeout(fn, delay)
  }
}

export function ensureStartingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function normalizeLink(url: string): string {
  const { pathname, search, hash, protocol } = new URL(url, 'http://a.com')

  if (
    isExternal(url) ||
    url.startsWith('#') ||
    !protocol.startsWith('http') ||
    !treatAsHtml(pathname)
  )
    return url

  const { site } = useData()

  const normalizedPath =
    pathname.endsWith('/') || pathname.endsWith('.html')
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(
            /(\.md)?$/,
            site.value.cleanUrls ? '' : '.html'
          )}${search}${hash}`
        )

  return withBase(normalizedPath)
}
