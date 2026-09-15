export interface FormatDateOptions {
    /** Menampilkan jam dan menit. Default: true */
    showTime?: boolean;
    /** Menampilkan detik. Default: false */
    showSeconds?: boolean;
    /** Zona waktu IANA (contoh: 'Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura'). Default: 'Asia/Jakarta' */
    timeZone?: string;
    /** Kode lokal bahasa (contoh: 'id-ID', 'en-US'). Default: 'id-ID' */
    locale?: string;
}

type DateInput = string | Date | number | null | undefined;

/**
 * 1. Format Tanggal & Waktu Lengkap (Contoh: "15 September 2026, 16.09 WIB")
 */
export const formatDate = (
    dateInput: DateInput,
    options: FormatDateOptions = {}
): string => {
    if (!dateInput) return '-';

    const {
        showTime = true,
        showSeconds = false,
        timeZone = 'Asia/Jakarta',
        locale = 'id-ID'
    } = options;

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Tanggal tidak valid';

    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...(showTime && {
            hour: '2-digit',
            minute: '2-digit',
            ...(showSeconds && { second: '2-digit' }),
            hour12: false
        }),
        timeZone
    }).format(date);
};

/**
 * 2. Format Ringkas / Tanggal Saja (Contoh: "15/09/2026")
 */
export const formatDateShort = (
    dateInput: DateInput,
    locale: string = 'id-ID'
): string => {
    if (!dateInput) return '-';

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '-';

    return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
};

/**
 * 3. Format Waktu Relatif (Contoh: "5 menit yang lalu", "Kemarin")
 */
export const formatRelativeTime = (
    dateInput: DateInput,
    locale: string = 'id'
): string => {
    if (!dateInput) return '-';

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '-';

    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    const cutoffs: Array<{ name: Intl.RelativeTimeFormatUnit; value: number }> = [
        { name: 'year', value: 31536000 },
        { name: 'month', value: 2592000 },
        { name: 'day', value: 86400 },
        { name: 'hour', value: 3600 },
        { name: 'minute', value: 60 },
        { name: 'second', value: 1 }
    ];

    for (const cutoff of cutoffs) {
        if (Math.abs(diffInSeconds) >= cutoff.value || cutoff.name === 'second') {
            const delta = Math.round(diffInSeconds / cutoff.value);
            return rtf.format(delta, cutoff.name);
        }
    }

    return '-';
};