/** Toàn bộ thông tin sự kiện – chỉ cần sửa ở đây. */
export const EVENT = {
  host: 'Hà Tố Trinh',
  hostShort: 'Tố Trinh',
  hostInitials: 'TT',
  school: 'Trường ĐH Tài chính - Marketing',
  schoolShort: 'UFM',
  address: '306 Võ Văn Hát, Long Trường, Hồ Chí Minh',
  weekday: 'Thứ Năm',
  date: '12.11.2026',
  time: '10:00 - 12:00',
  /** Giờ UTC (10:00–12:00 giờ VN = 03:00–05:00 UTC) */
  startUtc: '20261112T030000Z',
  endUtc: '20261112T050000Z',
} as const

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Trường Đại học Tài chính - Marketing, 306 Võ Văn Hát, Long Trường, Hồ Chí Minh')

export function calendarUrl(guest: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Lễ tốt nghiệp của ${EVENT.host} 🎓`,
    dates: `${EVENT.startUtc}/${EVENT.endUtc}`,
    details: `${guest ? guest + ' ơi, ' : ''}nhớ đến chung vui với ${EVENT.hostShort} nha! 💐`,
    location: `${EVENT.school}, ${EVENT.address}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Dán link Web App của Google Apps Script (`https://script.google.com/macros/s/.../exec`)
 * vào đây (hoặc đặt biến môi trường `VITE_SHEET_WEBHOOK_URL` trên Vercel).
 */
export const GOOGLE_SHEET_WEBHOOK_URL: string =
  import.meta.env.VITE_SHEET_WEBHOOK_URL ?? 'https://script.google.com/macros/s/AKfycbyCDgIKP3tOwlnQDXpNoIbuHqo4TKfSKNQwxuyj8se6nQ2ip8jm5tGiYk8qc_9XW2Pd/exec'

/** Gửi ngầm tên khách mời về Google Sheets (không chặn giao diện nếu lỗi mạng) */
export function logGuestToSheet(name: string): void {
  const url = GOOGLE_SHEET_WEBHOOK_URL.trim()
  if (!url) return
  try {
    void fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name,
        time: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        userAgent: navigator.userAgent,
      }),
    })
  } catch {
    /* ignore */
  }
}

