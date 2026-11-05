import { useCallback, useState } from 'react'

const KEY = 'thiep-moi:guest-name'

function readStorage(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

/**
 * Tên khách mời. Ưu tiên `?name=...` trên URL (link cá nhân hoá),
 * sau đó tới tên đã nhập lần trước (localStorage).
 */
export function useGuestName() {
  const [fromUrl] = useState(() => new URLSearchParams(window.location.search).get('name')?.trim().slice(0, 30) ?? '')
  const [name, setNameState] = useState(() => fromUrl || readStorage())

  const setName = useCallback((value: string) => {
    setNameState(value)
    try {
      localStorage.setItem(KEY, value)
    } catch {
      /* ignore */
    }
  }, [])

  return { name, setName, hasUrlName: fromUrl.length > 0 }
}

