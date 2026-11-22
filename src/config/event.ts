/** Toàn bộ thông tin sự kiện – chỉ cần sửa ở đây. */
export const EVENT = {
  host: 'Đặng Công Sơn',
  hostShort: 'Mình',
  hostInitials: 'SD',
  school: 'Đại học Bách khoa TP.HCM',
  schoolShort: 'HCMUT · Bách khoa TP.HCM',
  address: '268 Lý Thường Kiệt, Quận 10, TP.HCM',
  weekday: 'Thứ Bảy',
  date: '28.11.2026',
  time: '12:00 - 13:30',
  phone: '0902 448 134',
  phoneRaw: '0902448134',
  /** Giờ UTC (12:00–13:30 giờ VN = 05:00–06:30 UTC) */
  startUtc: '20261128T050000Z',
  endUtc: '20261128T063000Z',
} as const

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Trường Đại học Bách khoa - ĐHQG TP.HCM, 268 Lý Thường Kiệt, Quận 10, TP.HCM')

export function calendarUrl(guest: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Lễ tốt nghiệp của ${EVENT.host} 🎓`,
    dates: `${EVENT.startUtc}/${EVENT.endUtc}`,
    details: `${guest ? guest + ' ơi, ' : ''}nhớ ghé chung vui cùng ${EVENT.hostShort} tại ${EVENT.school} nha!`,
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
